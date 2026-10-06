import {gzipSync} from 'node:zlib';

export const LOCAL_COMPLETION_DOWNLOAD = './assets/completion-overlay.json.gz';
export const REPOSITORY_COMPLETION_DOWNLOAD = 'https://raw.githubusercontent.com/changkun/scifi-exploration/main/research/completion-overlay.json.gz';

// Keep the complete archive in the repository when it outgrows one hosted asset.
// The website continues loading every exact record from its lossless shards.
export function completionDelivery(metadata, records, maxBytes = 5 * 1024 * 1024) {
  const encode = url => {
    const deliveredMetadata = {...metadata, full_download_url: url};
    return {metadata: deliveredMetadata, bytes: gzipSync(JSON.stringify({metadata: deliveredMetadata, records}), {level: 9})};
  };
  const local = encode(LOCAL_COMPLETION_DOWNLOAD);
  return local.bytes.length <= maxBytes ? {...local, local: true} :
    {...encode(REPOSITORY_COMPLETION_DOWNLOAD), local: false};
}

export function completionChunks(records, maxBytes = 4 * 1024 * 1024, allowOversizedRecord = false) {
  const chunks = [];
  const envelopeBytes = Buffer.byteLength('{"records":[]}');
  let current = [], size = envelopeBytes;
  for (const record of records) {
    const recordBytes = Buffer.byteLength(JSON.stringify(record));
    if (recordBytes + envelopeBytes > maxBytes) {
      if (!allowOversizedRecord) throw new Error('A completion record exceeds the shard size limit: ' + record.id);
      if (current.length) chunks.push(current);
      chunks.push([record]);
      current = [];
      size = envelopeBytes;
      continue;
    }
    if (current.length && size + recordBytes + 1 > maxBytes) {
      chunks.push(current);
      current = [];
      size = envelopeBytes;
    }
    size += recordBytes + (current.length ? 1 : 0);
    current.push(record);
  }
  if (current.length) chunks.push(current);
  return chunks;
}

// A growing complete history may exceed the raw JSON limit. Isolate it,
// compress every shard losslessly and enforce the actual transmitted limit.
export function compressedCompletionChunks(records, maxBytes = 4 * 1024 * 1024) {
  return completionChunks(records, maxBytes, true).map(part => {
    const bytes = gzipSync(JSON.stringify({records: part}), {level: 9});
    if (bytes.length > maxBytes) throw new Error('A compressed completion shard exceeds the asset size limit: ' + part[0].id);
    return bytes;
  });
}
