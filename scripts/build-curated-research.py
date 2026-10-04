import copy,csv,json,re
from collections import Counter
from pathlib import Path

base=Path(__file__).resolve().parents[1]
out=base/'research'
out.mkdir(exist_ok=True)
works=[]
for name in ['early','global','modern','extra']:
    works.extend(json.loads((base/'research'/'source-notes'/f'{name}.json').read_text()))

# Replace the aggregate with individual volumes: these have distinct time scales.
series=next(r for r in works if r['id']=='global10')
works=[r for r in works if r['id']!='global10']
for suffix,zh,original,year,ynote,era,duration,reach,issue,topics,branches,snote in [
 ('a','三体','三体',2008,'2006年连载；本条记录2008年中文单行本。','20世纪历史与21世纪初接触情境','多尺度或非线性','主体行动与跨数十年的历史回忆；更远未来属于续卷','当基本实验与证据失去可信性，人类如何判断一个可能的外部威胁？',['知识与认识','技术与责任','殖民与他者'],['硬科幻','第一接触'],'三体动力学有现实基础；智子和信息能力是重大虚构装置。'),
 ('b','黑暗森林','三体Ⅱ：黑暗森林',2008,'2008年中文单行本；地球往事三部曲第二卷。','危机纪元及两百年后的威慑时代','多代—百年','冬眠使个体经历与约两百年的外部历史分离','沟通、先发风险与威慑的特定条件下，文明如何避免互相毁灭？',['生存与风险','文明与历史','权力与制度','殖民与他者'],['硬科幻','第一接触'],'智子、材料与星际通信设定需独立假设；黑暗森林不是已验证行为定律。'),
 ('c','死神永生','三体Ⅲ：死神永生',2010,'2010年中文单行本；地球往事三部曲第三卷。','威慑时代至极远未来','百万年—宇宙尺度','历史回溯、冬眠与跳跃将视野推至宇宙末期；人物固有时间不同','个体的伦理选择怎样面对远超其寿命与理解能力的文明风险？',['生存与风险','文明与历史','时间与因果','生命与人类定义'],['硬科幻','宇宙演化','后人类'],'维度武器、小宇宙与宇宙工程是重大反事实装置，不能当作实证物理。'),
]:
    r=copy.deepcopy(series)
    r.update(id='global10'+suffix,title_zh=zh,title_original=original,first_year=year,year_note=ynote,form='长篇',story_era=era,duration=duration,reach=reach,issue=issue,topics=topics,branches=branches,science_class='强反事实设定',science_note=snote)
    r['series_name']='地球往事／三体三部曲'
    r['evidence_note']='来源支持三卷书目与主要设定；首卷2006连载／2008单行本存在版本口径，目录分别记录。三卷拆分后的议题、跨度与科学判断为本报告的分析。'
    works.append(r)

for r in works:
    r['inclusion_status']='科幻前史' if r['form']=='前史叙事' else '科幻作品'
    if r['id'] in ['global41','global43','modern35']:
        r['inclusion_status']='混合与边界参照'
    r['year_display']='约2世纪' if r['id']=='early01' else str(r['first_year'])
    r['sort_year']=r['first_year']
    if r['id']=='extra03':
        r['sort_year']=1928
        r['year_display']='1928连载／1946单行本'
    if r['id']=='extra15':
        r['year_display']='2014商版（此前有自出版）'
        r['sources'].append('https://www.nasa.gov/podcasts/on-a-mission/the-danger-of-going-to-mars/')
    if r['id']=='early02':
        r['year_display']='1626／1627（版本见备注）'
    if r['id']=='early38':
        r['year_display']='1959发售／1960题年'
    if r['id']=='global09':
        r['first_year']=2004
        r['sort_year']=2004
        r['year_display']='2004／2005（版本存异）'
        r['year_note']='作者授权译介目录记2004；CiNii英译版权页转录记中文原版2005。本条按已知公开版本2004记录，单行本首版仍待直接核验原版版权页；2018为英译商版。'
        r['evidence_note']='授权目录与馆藏版权转录存在年份差异；不将后续版权年份当作已确定的首次单行本年。议题、时间粗分与科学判断为本报告分析。'
    if r['id']=='global33':
        r['year_display']='1995／1996（版本存异）'
    if r['id']=='extra06':
        r['duration']='日—月'
    if r['id']=='extra14':
        r['science_class']='依赖未证技术'
    if r['id']=='modern02':
        r['branches']=[b for b in r['branches'] if b!='赛博朋克']+['蒸汽朋克']
    if r['id']=='modern42':
        r['branches'].append('太阳朋克')
        r['sources'].append('https://sf-encyclopedia.com/entry/solarpunk')
    if r['id']=='modern21':
        r['title_zh']='置换城市／排列城市'
    if r['id']=='modern44':
        r['title_zh']='莫失莫忘／别让我走'
    r['sources']=list(dict.fromkeys(r['sources']))
    r['branches']=list(dict.fromkeys(r['branches']))

works.sort(key=lambda r:(r['sort_year'],r['first_year'],r['id']))
assert len({r['id'] for r in works})==len(works)
required=['id','title_zh','title_original','author','first_year','year_note','language_tradition','form','topics','branches','story_era','duration','reach','issue','science_class','science_note','sources','evidence_note']
for r in works:
    assert all(k in r for k in required),(r['id'],'missing fields')
    assert all(re.match(r'^https?://',u) for u in r['sources'])
    assert r['sources'] and r['topics'] and r['branches']
    assert r['science_class'] in ['近现实外推','依赖未证技术','强反事实设定','混合或不适用']

metadata=dict(title='科幻小说的历史与问题地图',research_date='2026-10-04',coverage='全球取向代表样本；古代前史至2025；非穷尽书目',record_count=len(works),inclusion_counts=dict(Counter(r['inclusion_status'] for r in works)),form_counts=dict(Counter(r['form'] for r in works)),method='书目与主题研究；未逐本全文细读。出版信息与设定链接核查；主题、跨度粗分、科学前提为研究者解释。',year_rule='first_year是所记录文本形态的主要首次出版版本年，通常优先单行本；初刊/连载/自出版见year_note。sort_year仅在已核重要连载例中用于历史排序，不是统一首发字段。',limits='逐条完成科学前提的定性分类；其他三维匹配在报告框架及八组案例中讨论，未对每部作品建立完整实证匹配矩阵。')
(out/'catalog.json').write_text(json.dumps({'metadata':metadata,'works':works},ensure_ascii=False,indent=2),encoding='utf-8')

headers={'id':'条目ID','title_zh':'作品中文检索名','title_original':'原题','author':'作者','first_year':'主要出版版本年','year_note':'版本与年代备注','language_tradition':'语言与文学语境','form':'体裁','inclusion_status':'收录边界','topics':'底层议题','branches':'分支标签','story_era':'故事所在时代','duration':'主体历时粗分','reach':'最大时间视野','issue':'核心问题','science_class':'科学前提分类','science_note':'科学前提分析','sources':'核查来源','evidence_note':'证据与解释边界'}
with (out/'catalog.csv').open('w',encoding='utf-8-sig',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=list(headers.values()))
    writer.writeheader()
    for r in works:
        writer.writerow({cn:' | '.join(r[k]) if isinstance(r[k],list) else r[k] for k,cn in headers.items()})

body=(base/'research'/'source-notes'/'report-body.md').read_text()
counts=metadata['inclusion_counts']
summary=f"本次共收录 **{len(works)}条记录**：{counts.get('科幻作品',0)}条科幻作品、{counts.get('科幻前史',0)}条前史叙事、{counts.get('混合与边界参照',0)}条混合与边界参照。系列条目与单卷条目不混作同一数量单位；本目录的条目数不等于全部单篇／单卷数。\n\n"
body=body.replace('这份调研把科幻文学',summary+'这份调研把科幻文学',1)
body=body.replace('目录中的 science_class 只是第一维的筛选入口','本次目录逐条完成的是科学与工程前提分类；已发生的技术对应、社会机制的解释力及未来情境的稳健性在本节通过框架和八组案例展开，尚未为每部作品建立完整证据矩阵。\n\n目录中的 science_class 只是第一维的筛选入口')
body=body.replace('多代—百年 | 家庭','多代—百年（含数百年量级） | 家庭')
body=body.replace('| first_year / year_note |','| first_year / year_note / year_display |')
body=body.replace('前史的估计年不作精确排序依据','重要的连载／单行本差异在显示年中显式保留；前史的估计年不作精确年代证据')
body+='\n## 十、代表作品的逐条索引\n\n以下条目与CSV、JSON一致。条目中的问题和分类为本报告的分析；点击来源可查看出版信息及设定依据。\n\n'
for i,r in enumerate(works,1):
    links='、'.join(f'[来源{j+1}]({u})' for j,u in enumerate(r['sources']))
    body+=f"### {i:03d}. {r['title_zh']}\n\n"
    body+=f"{r['author']}｜{r['year_display']}｜{r['form']}｜{r['language_tradition']}｜{r['inclusion_status']}\n\n"
    body+=f"原题：{r['title_original']}。版本：{r['year_note']}\n\n"
    body+=f"**核心问题：**{r['issue']}\n\n"
    body+=f"议题：{'、'.join(r['topics'])}。分支：{'、'.join(r['branches'])}。\n\n"
    body+=f"故事时代：{r['story_era']}。主体历时：{r['duration']}。最大时间视野：{r['reach']}。\n\n"
    body+=f"科学前提：{r['science_class']}。{r['science_note']}\n\n"
    body+=f"证据与边界：{r['evidence_note']} {links}\n\n"
(out/'report.md').write_text(body,encoding='utf-8')


print(json.dumps(metadata,ensure_ascii=False,indent=2))
