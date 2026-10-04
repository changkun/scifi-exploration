"""Preserve source records and add traceable, explicitly provisional facets.

Run from any directory. This is a rule-based navigation aid, not literary
analysis or a confidence score. Unmatched fields remain pending.
"""
import argparse
import collections
import copy
import csv
import gzip
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', type=Path, default=ROOT / 'research/expanded-catalog.json.gz')
parser.add_argument('--notes', type=Path, default=ROOT / 'research/expanded-catalog-notes.json')
parser.add_argument('--hierarchy', type=Path, default=ROOT / 'research/expanded-genre-hierarchy.json')
parser.add_argument('--output', type=Path, default=ROOT / 'dist/assets/bibliography.json')
args = parser.parse_args()
data = json.loads(gzip.decompress(args.source.read_bytes()) if args.source.suffix == '.gz' else args.source.read_bytes())
notes = json.loads(args.notes.read_text()) if args.notes.exists() else {}
hierarchy = json.loads(args.hierarchy.read_text()) if args.hierarchy.exists() else {}
genres = {g['id']: g for g in hierarchy.get('genres', [])}
nodes = {g['id']: g for g in hierarchy.get('nodes', [])}

# Only explicit genre labels or source descriptions match these expressions.
# Titles and author identity never determine an issue or literary tradition.
RULES = [
    ('时间与因果', '时间旅行', r'time[- ]travel|alternate history|alternative history|时间旅行|時間旅行|架空历史|架空歷史|平行世界'),
    ('权力与制度', '反乌托邦', r'dystopi|totalitarian|political fiction|political novel|反乌托邦|反烏托邦|极权|極權|政治小说|政治小說'),
    ('权力与制度', '乌托邦', r'(?<![a-z])utopian|(?<!反)乌托邦|(?<!反)烏托邦'),
    ('生态与资源', '气候与生态科幻', r'climate fiction|climate change|ecological science fiction|eco-fiction|cli-fi|气候|氣候|生态科幻|生態科幻'),
    ('生存与风险', '灾难与末世', r'post[- ]apocalyp|apocalyptic fiction|apocalyptic novel|disaster fiction|末日|末世|灾难小说|災難小說'),
    ('技术与责任', '机器人与人工智能', r'artificial intelligence|robot fiction|robot novel|robotic|机器人|機器人|人工智能|人工智慧'),
    ('主体与意识', '机器人与人工智能', r'artificial intelligence|sentient robot|consciousness|人工智能|人工智慧|意识上传|意識上傳'),
    ('资本与劳动', '赛博朋克', r'cyberpunk|赛博朋克|賽博龐克|賽博朋克'),
    ('技术与责任', '赛博朋克', r'cyberpunk|赛博朋克|賽博龐克|賽博朋克'),
    ('性别与亲密', '女性主义与性别科幻', r'feminist science fiction|feminist novel|gender.*science fiction|女性主义科幻|女性主義科幻|性别科幻|性別科幻'),
    ('生命与人类定义', '生物与后人类科幻', r'biopunk|genetic engineering|posthuman|transhuman|生物朋克|基因工程|后人类|後人類|超人类|超人類'),
    ('殖民与他者', '第一接触', r'first contact|alien invasion|extraterrestrial invasion|第一接触|第一接觸|外星.*入侵'),
    ('文明与历史', '太空歌剧', r'space opera|galactic empire|太空歌剧|太空歌劇|银河帝国|銀河帝國'),
    ('知识与认识', '科学与认识', r'epistemolog|scientific discovery|science mystery|认识论|認識論|科学发现|科學發現'),
    ('文明与历史', '宇宙演化', r'cosmological|cosmic evolution|宇宙演化|宇宙进化|宇宙進化'),
]
compiled = [(topic, branch, re.compile(pattern, re.I)) for topic, branch, pattern in RULES]
utopia_rule = next(pattern for _, branch, pattern in compiled if branch == '乌托邦')
assert utopia_rule.search('反乌托邦作品') is None and utopia_rule.search('反烏托邦作品') is None
assert utopia_rule.search('乌托邦小说') and utopia_rule.search('utopian fiction')
records = copy.deepcopy(data.get('works', data.get('records', [])))
for record in records:
    evidence = []
    for genre in record.get('source_subject', []):
        if not isinstance(genre, dict):
            continue
        evidence.append(('source_genre', genre.get('label', ''), genre.get('id')))
        graph = genres.get(genre.get('id'), {})
        ancestor_ids = graph.get('ancestors', [])
        record.setdefault('genre_hierarchy_refs', []).append(genre.get('id'))
        for entry in [graph] + [nodes.get(qid, {}) for qid in ancestor_ids]:
            for label in entry.get('labels', {}).values():
                evidence.append(('source_genre_hierarchy', label, entry.get('id')))
    for field in ('description_en', 'description_zh'):
        if record.get(field):
            evidence.append((field, record[field], record['id']))
    topics, branches = {}, {}
    for topic, branch, pattern in compiled:
        matches = []
        for field, value, qid in evidence:
            if not isinstance(value, str):
                continue
            match = pattern.search(value)
            if match:
                basis = {'field': field, 'value': value, 'matched_text': match.group(0),
                         'entity_id': qid, 'source_url': 'https://www.wikidata.org/wiki/' + (qid or record['id'])}
                if basis not in matches:
                    matches.append(basis)
        if matches:
            topics.setdefault(topic, []).extend(b for b in matches if b not in topics.get(topic, []))
            branches.setdefault(branch, []).extend(b for b in matches if b not in branches.get(branch, []))
    record['topic_candidates'] = [{'topic': key, 'basis': value, 'confidence': '规则候选，待核'} for key, value in topics.items()]
    record['branch_candidates'] = [{'branch': key, 'basis': value, 'confidence': '规则候选，待核'} for key, value in branches.items()]
    record['classification_status'] = '有规则候选，待核' if topics or branches else '待分类：来源信息不足以提取候选'
    record['classification_method'] = 'source-label-rules-v1'
    record['narrative_time'] = {'story_era': None, 'duration': None, 'reach': None, 'status': '待核，未从发表日期推断叙事时间'}
    record['reality_future_fit'] = {'science_class': None, 'evidence': [], 'status': '待核，未从分支标签推断科学前提或预测匹配度'}

counts = collections.Counter(t['topic'] for r in records for t in r['topic_candidates'])
metadata = dict(data.get('metadata', {}))
metadata.update({
    'source_total': notes.get('source_entity_count', len(records)),
    'fetched_count': len(records),
    'excluded_count': notes.get('exclusion_count', 0),
    'coverage': '完整导出 Wikidata 既定科幻文学查询成员；作品、系列、组篇等来源类型并存。来源字段尚未逐条核实，分类候选按明确标签与说明提取，不等于文学深度研究。全球其他来源仍有覆盖缺口。',
    'sources': [{'name': 'Wikidata Query Service · 查询与来源说明', 'url': 'https://query.wikidata.org/'},
                {'name': '完整元数据与研究仓库', 'url': 'https://github.com/changkun/scifi-exploration/tree/main/research'}],
    'classification_method': 'source-label-rules-v1',
    'classification_note': '规则匹配只用来源分支、来源类型层级与来源说明，不用题名或作者身份猜测议题。每个候选保留命中字段、原值和来源实体。',
    'genre_hierarchy_file': './assets/genre-hierarchy.json',
    'topic_candidate_counts': dict(counts),
    'records_with_topic_candidates': sum(bool(r['topic_candidates']) for r in records),
    'records_pending_topic_classification': sum(not r['topic_candidates'] for r in records),
})
result = {'metadata': metadata, 'records': records, 'related_entities': data.get('related_entities', {})}
args.output.parent.mkdir(parents=True, exist_ok=True)
full_path = ROOT / 'work/structured-bibliography.json'
full_path.parent.mkdir(exist_ok=True)
obsolete_full = args.output.with_name('bibliography-full.json')
if obsolete_full.exists():
    obsolete_full.unlink()
details_path = args.output.parent / 'bibliography-details'
details_path.mkdir(exist_ok=True)
for stale in details_path.glob('*.json'):
    stale.unlink()
core = []
simple_keys = ['id', 'title', 'title_zh', 'title_en', 'title_missing', 'authors',
               'author_names_en', 'author_names_zh', 'first_year', 'subjects',
               'classification_status', 'source_entity_kind', 'source_url', 'edition_count']
for start in range(0, len(records), 250):
    chunk = records[start:start + 250]
    filename = f'{start // 250:03d}.json'
    (details_path / filename).write_text(json.dumps({'records': chunk}, ensure_ascii=False, separators=(',', ':')) + '\n')
    for record in chunk:
        slim = {key: record.get(key) for key in simple_keys}
        for key in ['source_subject', 'source_types', 'language_statements']:
            slim[key] = [{'id': value['id'], 'label': value.get('label', value['id'])} for value in record.get(key, [])]
        slim['title_aliases'] = list(dict.fromkeys(value for values in record.get('source_aliases', {}).values() for value in values))
        slim['topic_candidates'] = [{'topic': value['topic'], 'confidence': value['confidence']} for value in record['topic_candidates']]
        slim['branch_candidates'] = [{'branch': value['branch'], 'confidence': value['confidence']} for value in record['branch_candidates']]
        slim['detail_url'] = './assets/bibliography-details/' + filename
        core.append(slim)
metadata.update({'full_data_url': './assets/bibliography-full.json.gz',
                 'index_storage_note': '轻索引用于全量筛选；完整字段按需读取详情分片。全部记录与所有字段另提供一个完整JSON下载。',
                 'detail_chunks': (len(records) + 249) // 250})
index_dir = args.output.parent / 'bibliography-index'
index_dir.mkdir(exist_ok=True)
for stale in index_dir.glob('*.json'):
    stale.unlink()
index_chunks = []
for start in range(0, len(core), 1000):
    filename = f'{start // 1000:03d}.json'
    (index_dir / filename).write_text(json.dumps({'records': core[start:start + 1000]}, ensure_ascii=False, separators=(',', ':')) + '\n')
    index_chunks.append('./assets/bibliography-index/' + filename)
args.output.write_text(json.dumps({'format': 'source-index-manifest-v1', 'metadata': metadata, 'chunks': index_chunks}, ensure_ascii=False, separators=(',', ':')) + '\n')
full_path.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n')
with gzip.GzipFile(filename=str(args.output.with_name('bibliography-full.json.gz')), mode='wb', mtime=0) as handle:
    handle.write(full_path.read_bytes())
research_full = ROOT / 'research/structured-bibliography.json.gz'
research_full.write_bytes(args.output.with_name('bibliography-full.json.gz').read_bytes())

csv_path = ROOT / 'work/expanded-structured-catalog.csv'
csv_path.parent.mkdir(parents=True, exist_ok=True)
fields = ['id', 'title', 'title_zh', 'title_en', 'authors', 'first_year', 'publication_dates',
          'title_statements', 'source_subject', 'source_types', 'language_statements',
          'relationships', 'topic_candidates', 'branch_candidates', 'classification_status', 'source_url']
with csv_path.open('w', encoding='utf-8-sig', newline='') as handle:
    writer = csv.DictWriter(handle, fieldnames=fields)
    writer.writeheader()
    for record in records:
        writer.writerow({key: json.dumps(record[key], ensure_ascii=False) if isinstance(record.get(key), (list, dict))
                         else record.get(key, '') for key in fields})
print(json.dumps({'records': len(records), 'source_total': metadata['source_total'],
                  'excluded': metadata['excluded_count'], 'topic_candidates': dict(counts),
                  'with_candidates': metadata['records_with_topic_candidates']}, ensure_ascii=False))
with gzip.GzipFile(filename=str(ROOT / 'research/expanded-structured-catalog.csv.gz'), mode='wb', mtime=0) as handle:
    handle.write(csv_path.read_bytes())
