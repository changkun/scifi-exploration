import {gzipSync} from 'node:zlib';

export const RECORDS_PER_GZIP_MEMBER = 4;
export const MAX_EXPORT_GZIP_BYTES = 50 * 1024 * 1024;

const white = byte => byte === 32 || byte === 9 || byte === 10 || byte === 13;
const skipWhite = (bytes, start) => {
  while (start < bytes.length && white(bytes[start])) start++;
  return start;
};
function stringEnd(bytes, start) {
  if (bytes[start] !== 34) throw new Error('Expected JSON string');
  for (let index = start + 1; index < bytes.length; index++) {
    if (bytes[index] === 92) index++;
    else if (bytes[index] === 34) return index + 1;
  }
  throw new Error('Unterminated JSON string');
}
function valueEnd(bytes, start) {
  const first = bytes[start];
  if (first === 34) return stringEnd(bytes, start);
  if (first === 123 || first === 91) {
    const stack = [first];
    for (let index = start + 1; index < bytes.length; index++) {
      const byte = bytes[index];
      if (byte === 34) index = stringEnd(bytes, index) - 1;
      else if (byte === 123 || byte === 91) stack.push(byte);
      else if (byte === 125 || byte === 93) {
        const expected = byte === 125 ? 123 : 91;
        if (stack.pop() !== expected) throw new Error('Unbalanced JSON value');
        if (!stack.length) return index + 1;
      }
    }
    throw new Error('Unterminated JSON value');
  }
  let end = start;
  while (end < bytes.length && !white(bytes[end]) && ![44, 125, 93].includes(bytes[end])) end++;
  if (end === start) throw new Error('Missing JSON value');
  JSON.parse(bytes.subarray(start, end).toString('utf8'));
  return end;
}

// Input must be generated JSON (normally JSON.stringify), not arbitrary text.
// The byte scanner locates a root property only, preserving all punctuation,
// UTF-8, property order and whitespace without serializing records separately.
export function jsonRecordMemberParts(rawInput, arrayKey, recordsPerMember = RECORDS_PER_GZIP_MEMBER) {
  if (!Number.isInteger(recordsPerMember) || recordsPerMember < 1) throw new Error('Invalid records/member');
  const bytes = Buffer.isBuffer(rawInput) ? rawInput : Buffer.from(rawInput, 'utf8');
  let index = skipWhite(bytes, 0), found = null;
  if (bytes[index++] !== 123) throw new Error('JSON export requires a root object');
  const keys = new Set();
  while (true) {
    index = skipWhite(bytes, index);
    if (bytes[index] === 125) { index++; break; }
    const keyEnd = stringEnd(bytes, index);
    const key = JSON.parse(bytes.subarray(index, keyEnd).toString('utf8'));
    if (keys.has(key)) throw new Error('Duplicate root JSON key');
    keys.add(key);
    index = skipWhite(bytes, keyEnd);
    if (bytes[index++] !== 58) throw new Error('Missing JSON property colon');
    index = skipWhite(bytes, index);
    if (key !== arrayKey) index = valueEnd(bytes, index);
    else {
      if (bytes[index++] !== 91) throw new Error('Record field is not an array');
      const contentStart = index, spans = [];
      index = skipWhite(bytes, index);
      if (bytes[index] !== 93) while (true) {
        if (bytes[index] !== 123) throw new Error('Record array elements must be objects');
        const end = valueEnd(bytes, index);
        spans.push({start: index, end});
        index = skipWhite(bytes, end);
        if (bytes[index] === 93) break;
        if (bytes[index++] !== 44) throw new Error('Missing record separator');
        index = skipWhite(bytes, index);
      }
      found = {contentStart, spans};
      index++;
    }
    index = skipWhite(bytes, index);
    if (bytes[index] === 125) { index++; break; }
    if (bytes[index++] !== 44) throw new Error('Missing root property separator');
  }
  if (skipWhite(bytes, index) !== bytes.length || !found) throw new Error('Unexpected root JSON export');
  const parts = [{kind: 'prefix', bytes: bytes.subarray(0, found.contentStart)}];
  let cursor = found.contentStart;
  for (let start = 0; start < found.spans.length; start += recordsPerMember) {
    const end = Math.min(start + recordsPerMember, found.spans.length);
    const rawEnd = found.spans[end - 1].end;
    parts.push({kind: 'records', recordStart: start, recordEnd: end, bytes: bytes.subarray(cursor, rawEnd)});
    cursor = rawEnd;
  }
  parts.push({kind: 'suffix', bytes: bytes.subarray(cursor)});
  return {parts, recordCount: found.spans.length, rawBytes: bytes};
}

export function csvRecordMemberParts(header, rows, recordsPerMember = RECORDS_PER_GZIP_MEMBER) {
  if (typeof header !== 'string' || !Array.isArray(rows) || rows.some(row => typeof row !== 'string')) throw new Error('CSV needs complete serialized rows');
  if (!Number.isInteger(recordsPerMember) || recordsPerMember < 1) throw new Error('Invalid records/member');
  const parts = [{kind: 'prefix', bytes: Buffer.from('\ufeff' + header, 'utf8')}];
  for (let start = 0; start < rows.length; start += recordsPerMember) {
    const end = Math.min(start + recordsPerMember, rows.length);
    parts.push({kind: 'records', recordStart: start, recordEnd: end,
      bytes: Buffer.from('\n' + rows.slice(start, end).join('\n'), 'utf8')});
  }
  // Old CSV joins lines without a final newline; a separate empty suffix is
  // valid gzip and introduces no decoded bytes.
  parts.push({kind: 'suffix', bytes: Buffer.alloc(0)});
  return {parts, recordCount: rows.length};
}

export function gzipRecordParts(parts, options = {}) {
  const {level = 9, maxCompressedBytes = MAX_EXPORT_GZIP_BYTES, onLayout, onFallback} = options;
  if (!Number.isInteger(maxCompressedBytes) || maxCompressedBytes < 1) throw new Error('Invalid gzip size bound');
  let compressed = Buffer.concat(parts.map(part => gzipSync(part.bytes, {level})));
  let layout = 'four-record-members', fallback = false;
  if (compressed.length >= maxCompressedBytes) {
    const memberBytes = compressed.length;
    compressed = gzipSync(Buffer.concat(parts.map(part => part.bytes)), {level});
    fallback = true;
    layout = 'single-member-size-fallback';
    const detail = {memberBytes, fallbackBytes: compressed.length, maxCompressedBytes};
    if (onFallback) onFallback(detail);
    else console.warn('gzip record members exceeded the export bound; lossless single-member fallback:', detail);
    if (compressed.length >= maxCompressedBytes) throw new Error('Complete gzip export still exceeds its size bound; keep the full source archive and explicitly plan bounded export shards. No records were truncated.');
  }
  onLayout?.({layout, fallback, memberCount: fallback ? 1 : parts.length, compressedBytes: compressed.length});
  return compressed;
}

export function gzipJsonRecordMembers(value, arrayKey, options = {}) {
  const raw = JSON.stringify(value);
  if (typeof raw !== 'string') throw new Error('JSON export cannot be serialized');
  const {parts} = jsonRecordMemberParts(raw, arrayKey, options.recordsPerMember ?? RECORDS_PER_GZIP_MEMBER);
  return gzipRecordParts(parts, options);
}

export function gzipCsvRowMembers(header, rows, options = {}) {
  const {parts} = csvRecordMemberParts(header, rows, options.recordsPerMember ?? RECORDS_PER_GZIP_MEMBER);
  return gzipRecordParts(parts, options);
}
