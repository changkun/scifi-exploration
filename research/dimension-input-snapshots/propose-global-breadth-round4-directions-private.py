from pathlib import Path
import json,copy,hashlib
P=Path(__file__).resolve().parent;REPO=P.parent/'science-fiction-site'
sha=lambda b:hashlib.sha256(b).hexdigest()
rs=lambda x:sha(json.dumps(x,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode())
sb=(P/'global-breadth-selection-round4.json').read_bytes();s=json.loads(sb)
assert sha(sb)=='7099068f045d7d332fe4ed8051cfe3c10015b4afe1fdd718344becf28c712a0b'
rb=(REPO/'research/classification-registry.json').read_bytes();reg=json.loads(rb)
assert sha(rb)=='ecf0bafbed798edc6ac8f0f8523910ff0c2b62c586b28b3740ff864139e7260e'
assert len(reg['categories'])==49 and len(reg['discovery_candidates'])==188
inventory=[]
for kind,key in [('category','categories'),('pending','discovery_candidates')]:
 for o in reg[key]:
  definition=o.get('definition') or o.get('definition_boundary') or ''
  inventory.append({'kind':kind,'id':o['id'],'label':o.get('label') or o.get('proposed_label'),'dimension':o.get('axis') or o.get('dimension') or o.get('proposed_dimension'),'definition':definition,'definition_sha256':sha(definition.encode()),'whole_registry_record_sha256':rs(o)})
invpath=P/'global-breadth-round4-classification-comparison-inventory-private.json';assert not invpath.exists()
inraw=(json.dumps({'metadata':{'status':'frozen_private_exact_registry_comparison_inventory','registry_file':'research/classification-registry.json','registry_sha256':sha(rb),'category_count':49,'pending_count':188,'no_registry_write':True},'records':inventory},ensure_ascii=False,indent=2)+'\n').encode();invpath.write_bytes(inraw)
lookup={v['id']:v for v in inventory}
# All support choices are explicit. A series' multiple volumes never count as independent examples.
D=[
('intrinsic-capability-payments','topic','内在能力作为支付与抵押',
 '个人的语言能力或未来活力被直接扣减、抵押为交易资源。只比较两种明确虚构条件，不把它们当相同神经机制，也不扩为所有债务、时间定价或失忆故事。',
 '当日常支付或借贷削减了理解、好奇和未来行动能力，交易是否仍只是外在资源交换？',
 [53,47],
 ['topic:debt-surviving-death','topic:replayable-experience-consent'],
 '已有类讨论死亡后的合同或经验访问同意；本项聚焦支付直接减少内在行动能力，保留命运抵押与语言扣款的差别。',
 '普通收入损失、借入他人记忆、义务延续或仅比喻“透支未来”不自动加入。'),
('concurrent-recreated-role-holders','narrative','重造替身同时在场的角色冲突',
 '原持有者与再造替身同时在场，使本来排他的工作或伴侣位置无法维持。比较再生雇员与克隆妻子，不认定两种主体技术和伦理关系相同。',
 '同一角色出现两个活着的持有者时，制度或关系能否仅凭制造先后决定谁可以留下？',
 [3,126],
 ['topic:asynchronous-backup-and-consent','topic:debt-surviving-death','science:carrier'],
 '旧人格备份类关注后来决定被旧版倒退，本项要求两个主体同时在场并产生角色排他问题；非复原旧回忆本身。',
 '只恢复一个人格、外貌相似而未知重造来源、纯平行世界相遇不自动加入；Defekt五个相似Derek不计本项独立重造例证。'),
('environment-engineering-in-inhabited-worlds','science','既有居地中的行星环境改造',
 '明确在人类已居住的世界以大型工程改变环境条件：地球高空硫干预与冥王星巨镜改造分别保留。登记虚构工程机制和受影响位置，不判定可行性或实际温度效果。',
 '工程针对整个世界的环境，已有居民和不同地区怎样进入目的与后果的讨论？',
 [106,56],
 ['reality:systems','discovery:quick-retry-modern-classification-candidates-r5-r6:1'],
 '生态复原旧候选要求恢复早期生态会消灭后来物种；此项不要求该结果，只比较明确的天体环境工程，不补当地生命或副作用已发生。',
 '普通气候变化、房屋空调、未知风的利用或仅称殖民新星球不自动加入。'),
('certified-inner-state-and-survival','reality','内在状态认证与生存资格',
 '虚构制度把内在幸福或符合标准的意见、价值和形象转为维持生存条件的资格。比较幸福来信与Virtual升阶，不称为同一种算法、心理诊断或现实评分预测。',
 '由制度认定的幸福、价值或合格形象怎样从私人生活转成取得生存保障的条件？',
 [172,275],
 ['topic:coercive-truth-and-thought','topic:predictive-risk-and-care-exclusion','pending:round92-global-desire-shaping-governance'],
 '欲望塑造旧候选改变愿望形成过程；此项限定内在状态被认证为资源资格，不断言愿望已被技术改写。风险预测类评价未来风险，本项不是预测。',
 '普通贫富分层、仅宣扬幸福或只按外在工作成绩排名不自动加入；两个制度的具体生存条件分别保留。'),
('living-host-habitation-control','space','活体栖居宿主与神经支配',
 '城市明确寄居活体迁徙动物，居民又能以神经信号保护、操纵宿主。先只登记巨蟹一个实例，保留新版评论与原2021版本对应待核，不自动建共享类。',
 '支撑家园的动物同时受居民保护和操纵时，互相依赖怎样避免变成单方支配？',
 [192],
 ['space:constructed-habitation','space:support'],
 '人工栖居地类是建造的支持环境；此项强调一个有生命且有界限的宿主，不据此改变地图主尺度。',
 '植物状船屋、无生命巨构、仅把星球比喻为生物不自动加入。'),
('pre-activation-literature-for-autonomy','science','启动前的文学知识与自主余地',
 '研究者在机器人启动前秘密植入改写童话，目的在于提供不只服务人类的理解和选择。这里只登记上传安排与研究者意图，不声称文学已制造意识或全文所有童话的效果。',
 '设计者给予机器的不确定理解何时被机构从教育视为非法改动？',
 [263],
 ['topic:language','topic:coercive-truth-and-thought','discovery:quick-retry2-early-classification-candidates-round9:Q10470092-scoped-form-r9'],
 'AI互讲故事旧候选是启动后链式叙事框架；此项是启动前知识植入条件，不把内容谈童话等同文本采用框架形式。',
 '机器人读书、普通参数训练、所有启蒙叙事不自动加入；仅一篇前部节选，不补后半。'),
('interoperable-local-community-rules','reality','互操作中的社群自治与参与保留',
 '作品说明明确用互操作使社群自定反骚扰规则，同时保留大平台可见度、社交与工作联系。只登记故事方案的文学关系，不声称真实平台已经实现或验证。',
 '安全治理能否在不要求退出主要社交机会的条件下交还给受骚扰者？',
 [93],
 ['topic:media','topic:maintenance','pending:round93-global-public-knowledge-resource-asymmetry'],
 '公共百科旧候选关注协作资源不对称；此项要求具体互操作与本地规则并存，不把所有开放网络都称社群自治。',
 '单纯退出平台、另建封闭论坛、一般信息自由或没有技术互操作依据的自治愿望不自动加入。'),
('artificial-critic-obituary-and-freezing','form','人工批评家的悼词与冻结状态',
 '以AI批评家的悼词回顾语料、作者争议和最终冻结，使纪念文体同时处理被保存状态是否延续主体的问题。只据本篇明确回顾框架，未补所有段落组织。',
 '悼词称一个人工主体已经逝去时，硬件快照究竟保存了什么？',
 [266],
 ['form:fictional-person-documentary-biography','form:compiled-fictional-records'],
 '文献式拟传记通过文件或故事组织完整传主生平；此项限定悼词式纪念框架和状态冻结，不要求材料卷宗拼编。',
 '真实人物讣告、普通机器死亡情节或仅有生平介绍不自动加入。'),
('discarded-day-memory-and-relationships','time','被舍弃时日的记忆与关系延续',
 '世界重过同一天，只有叙述者记住未被选中的经历；这类非公共记忆仍影响亲密关系。先只取首卷开端，不认定未散也记得或世界选择日子的具体规则。',
 '未被世界保留的一天是否仍能构成人的关系经验？',
 [123],
 ['time:repetition','time:asynchronous-experience'],
 '循环重演类是上位入口；本项只是可比较的窄候选，限定“未选中的日子”和单人记忆，不替换或重定义旧类。',
 '所有时间循环、普通忘记日期或双方均保留记忆的重复经历不自动加入。'),
]
records=[];allwork=set()
for slug,axis,label,definition,question,indices,nearest,diff,negative in D:
 evidence=[]
 for index in indices:
  o=s['records'][index];part=index//50+1;pp=P/f'global-breadth-round4-part{part}-proposals.json';pb=pp.read_bytes();p=json.loads(pb)['records'][index%50]
  assert p['id']==o['id'];allwork.add(o['id'])
  evidence.append({'id':o['id'],'identity':copy.deepcopy(o['identity']),'basis':copy.deepcopy(o['current_core_fields']['issue']),'facet_bases':[f['basis'] for f in o['current_core_fields']['issue_facets'] or []],'exact_support_scope':'仅准确原A、活跃核心和本轮待核维度提案的派生；原URL不是本轮新读。完整材料范围在original_material_scope，具体卷/选篇/版本和未知身份均保留。','original_material_scope':copy.deepcopy(o['original_material_scope']),'sources':copy.deepcopy(o['retained_source_urls']),'knowledge_analysis':True,'actual_content_source_read_this_batch':False,'new_queries':0,'new_opens':0,'new_material_read':False,'independently_verified':False,'original_analysis':copy.deepcopy(o['source_analysis_ref']),'original_analysis_record':copy.deepcopy(o['source_analysis_record']),'active_core_assertion':copy.deepcopy(o['active_core_assertion']),'active_core_assertion_sha256':o['active_core_assertion_sha256'],'selection_ref':{'file':'work/evidence/global-breadth-selection-round4.json','sha256':sha(sb),'record_pointer':f'$.records[{index}]','record_sha256':rs(o)},'dimension_proposal_ref':{'file':f'work/evidence/{pp.name}','sha256':sha(pb),'record_pointer':f'$.records[{index%50}]','record_sha256':rs(p)},'dimension_proposed_values':{k:v['proposed_value'] for k,v in p['proposed_fields'].items()},'whole_prior':copy.deepcopy(o['current_source_search_log']),'whole_prior_sha256':o['current_source_search_log_sha256'],'original_record_presence':copy.deepcopy(o['original_record_provenance_presence']),'original_metadata_presence':copy.deepcopy(o['original_metadata_provenance_presence']),'original_metadata_reference':copy.deepcopy(o['source_analysis_metadata_reference']),'source_identity_grain':copy.deepcopy(o['current_grain_and_date']),'source_index_sha256':o['current_source_index_sha256'],'no_original_url_new_read_claim':True})
 records.append({'id':f'pending:round94-global-{slug}','dimension':axis,'proposed_label':label,'definition_boundary':definition,'question':question,'status':'pending_further_comparison_unverified','evidence_mode':'knowledge_dimension_proposal_derivative_without_new_source_read','independent_work_support_count':len(indices),'independence_scope':'每个证据是不同作品；未把同系列不同册或同一篇的合集容器计为独立支持。' if len(indices)>1 else '单例待比较，尚不足成为正式类或自动传播。','deduplication':{'registry_file':'research/classification-registry.json','registry_sha256':sha(rb),'comparison_inventory_file':f'work/evidence/{invpath.name}','comparison_inventory_sha256':sha(inraw),'compared_category_count':49,'compared_pending_count':188,'nearest_existing':[copy.deepcopy(lookup[n]) for n in nearest],'specific_difference':diff,'negative_boundary':negative,'automatic_assignment':False},'work_evidence':evidence,'adoption_scope':'Pending comparison only. No new category/member, changed definition, topic assignment, core, feasibility, spatial scale, query, read or verification.'})
assert len(records)==9 and len(allwork)==13
out=P/'global-breadth-round4-classification-proposals.json';assert not out.exists()
metadata={'status':'frozen_private_pending_direction_proposals','date':'2026-10-06','target_round':94,'candidate_count':9,'multi_independent_work_candidates':4,'single_example_candidates':5,'distinct_work_count':len(allwork),'existing_categories':49,'existing_pending_candidates':188,'existing_registry_sha256':sha(rb),'selection_sha256':sha(sb),'selection_source_publication_pending_as_originally_recorded':True,'last_published_separate':copy.deepcopy(s['metadata']['last_published_separate']),'category_count_added':0,'member_count_added':0,'new_core_count':0,'new_query_count':0,'new_open_count':0,'new_material_read_count':0,'independently_verified_count':0,'scope':'Nine pending directions across topic/narrative/science/reality/space/form/time. Four compare two independent works each; five remain one exact example. All evidence derived from original active core and pending descriptor proposals, no new material read. Parent semantic review required before additive registry packet.'}
raw=(json.dumps({'metadata':metadata,'discovery_candidates':records,'not_proposed_duplicate_or_insufficient_support':[{'id':'Q123682427','reason':'反模因前提已有R92候选；旧背封版本和2025重写版不得混算独立作品。'},{'id':'Q114812127/Q114812130','reason':'Neptune相邻册不计跨作品独立支持。'},{'id':'Q131002130','reason':'Defekt相似Derek未在旧简介明确技术来源，不将其强加为重造技术的独立支持。'},{'id':'Q139600779—Q139600838','reason':'Kaiju单卷范围保留，但不以系列多个册虚增机制的独立作品数。'}]},ensure_ascii=False,indent=2)+'\n').encode();out.write_bytes(raw)
print(json.dumps({'file':str(out),'sha256':sha(raw),'candidates':9,'distinct_works':len(allwork),'inventory_file':str(invpath),'inventory_sha256':sha(inraw)},ensure_ascii=False))
