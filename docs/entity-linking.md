# 研究层与源实体的保守链接

168条研究记录对应136个已链接源实体、22条未链接记录和10条待确认记录。全部原记录保留；不存在两个研究ID自动占用同一个QID的情况。完整源索引仍保留14,532个原身份，包括25个版本/翻译实体。

## 调用与契约

在仓库根目录运行 `python3 scripts/link-research.py`。脚本读取完整 `research/catalog.json` 和 `research/expanded-catalog.json.gz`，全程离线，只生成 `dist/assets/research-links.json`。没有修改输入数据。

```json
{
  "metadata": {"status_counts": {"linked": 136, "unlinked": 22, "ambiguous": 10}},
  "links": [{
    "research_id": "global10a",
    "status": "linked",
    "canonical_id": "Q607112",
    "basis": "题名、作者及文本粒度相符；分别保留连载与单行本年份。",
    "candidate_ids": ["Q607112"]
  }],
  "by_research_id": {"global10a": {"status": "linked", "canonical_id": "Q607112"}}
}
```

`links`每条还保留研究题名/作者/体裁以及`candidate_evidence`：来源URL、匹配题名、作者证据、源粒度、源说明、类型/genre ID、版年对照、拒绝理由和未决理由。`by_research_id`为旧研究链接的便捷索引，实际文件也含basis和candidate_ids。只有linked使用QID；其余canonical_id均为`local:<研究ID>`。候选ID不表示已经确认等价。

## 核对规则

题名来自研究原题、明确译名/括号内别名与扩展库全部语言label、altLabel及P1476。仅规范Unicode、标点空白、大小写与显式副标题；不靠近似题名猜测。系列列出的卷名只作组成作品候选，不能成为系列的身份。

作者使用源作者实体的全部已保存语言标签；若来源已有aliases亦纳入。研究英文姓名、明确括号姓名、已引用SFE作者条目和能对应完整源作者姓名的个人域名均留下证据。中间名/姓名次序规范化保留可见文字依据。相同研究作者字串只在其他研究条目已有独立证据且指向唯一作者实体时传播。源作者别名缺失时没有补造别名。

两组人工明示等价保存在脚本和JSON metadata内：斯特鲁伽茨基共同作者依据研究原有[SFE条目](https://sf-encyclopedia.com/entry/strugatski_arkady)，对应源集体作者与两位个人作者；豪尔赫·巴拉迪特依据研究原有[智利文学论文](https://rchd.uc.cl/index.php/alch/article/download/36455/28391/91019)首页的Jorge Baradit与Ygdrasil，核对源英文作者标签。阿米塔夫·高希的姓名差异通过研究原有[作者网站](https://amitavghosh.com/books/the-calcutta-chromosome/)域名和源Amitav Ghosh标签确认。

粒度先区分源版本、章节、系列，再读取明确文本说明和源类型/genre词。说明中“基于同名短篇”不能把扩写长篇重新当作原短篇。同名作品只有一个候选同时通过作者和粒度核对时才链接。类型长度标签冲突、源说明不足、扩写版本不清或整体系列只有单卷候选时保留local。

年份是证据与警示，不作为唯一身份键。源P577最小值可能对应连载、译本或不准确日期；研究记录按自己的版年与year_note保留。链接不会用源年份覆盖研究年份。

## 已通过的粒度区分

- 《献给阿尔吉侬的花束》研究1966长篇连接Q122463813，1959短篇Q837934保留为被拒候选。
- 《安德的游戏》研究1985长篇连接Q816016，1977中短篇Q5376051不合并。
- 《呼吸》研究2008单篇连接Q16747517，2019合集Q63677209不合并。
- 《三体》三卷分别连接Q607112、Q607276、Q607511。
- 《火星三部曲》整体留在local；Red/Green/Blue Mars及1985同名Green Mars中篇是组成或同名候选，不代替整个系列。

## 待确认与未链接记录

这张表列出全部32条local记录，具体证据在JSON中。unlinked并不表示作品不存在，只表示当前源检索集合和已保存资料不足以建立所需链接。

| 研究ID | 题名 | 状态 | 候选ID | 保守处理原因 |
| --- | --- | --- | --- | --- |
| early01 | 真实的故事 | ambiguous | Q783244 | 源仅标文学作品，未取得足以确认相同文本粒度的说明。 |
| early04 | 炽烈的世界 | ambiguous | Q1082871 | 源仅标文学作品，未取得足以确认相同文本粒度的说明。 |
| extra01 | 平面国 | ambiguous | Q728312 | 研究为单部长篇/前史叙事，源候选为单篇或合集。 |
| early13 | 时间机器 | ambiguous | Q627333 | 研究为单部长篇/前史叙事，源候选为单篇或合集。 |
| global01 | 月球殖民地小说 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global02 | 新中国 | unlinked | — | 当前完整源集合中没有题名候选。 |
| early18 | 获得解放的世界 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global21 | 陶威尔教授的头颅 | ambiguous | Q2499596 | 研究指定1938扩写长篇；源首年1925指向短篇原型阶段，未分清文本版本。 |
| global40 | 莫雷尔的发明 | ambiguous | Q2563052 | 研究为单篇，源候选为合集或长篇。 |
| global46 | 毁灭（暂译） | unlinked | — | 当前完整源集合中没有题名候选。 |
| early36 | 火星编年史 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global04 | 从地球到火星 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global26 | 无尽的流逝尽头 | unlinked | — | 当前完整源集合中没有题名候选。 |
| early54 | 模式之主 | ambiguous | Q23038229 | 源仅标文学作品，未取得足以确认相同文本粒度的说明。 |
| global05 | 小灵通漫游未来 | ambiguous | Q10959629 | 源仅标文学作品，未取得足以确认相同文本粒度的说明。 |
| global06 | 飞向人马座 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global07 | 城三部曲 | unlinked | Q682733 | 题名碰撞，但作者不对应。 |
| global41 | 帝国劫运（暂译） | unlinked | — | 当前完整源集合中没有题名候选。 |
| modern17 | 火星三部曲 | ambiguous | Q3294967, Q3294969, Q3294970, Q61774903 | 只匹配研究系列列出的组成作品题名，不能代表整个系列。；研究为系列，源候选未明示整体系列粒度。 |
| modern27 | 进化 | ambiguous | Q131471754, Q3592822, Q5418587, Q55230385 | 研究为单部长篇/前史叙事，源候选为单篇或合集。 |
| global11 | 红色海洋 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global13 | 蚁生 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global34 | 逃离（暂译） | unlinked | Q17747478, Q464683 | 题名碰撞，但作者不对应。 |
| global12 | 地铁 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global16 | 荒潮 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global17 | 时间之墟 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global18 | 童童的夏天 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global14 | 天年 | unlinked | — | 当前完整源集合中没有题名候选。 |
| global35 | 模糊机器：一次考核（暂译） | unlinked | — | 当前完整源集合中没有题名候选。 |
| global43 | 奥米昆莱的女佣／触须（暂译） | unlinked | — | 当前完整源集合中没有题名候选。 |
| global44 | 我在等你 | unlinked | — | 当前完整源集合中没有题名候选。 |
| modern48 | 自动面馆（暂译） | unlinked | — | 当前完整源集合中没有题名候选。 |

## 验证

检查168个研究ID全部且仅出现一次、所有linked QID均存在于完整源库、每个canonical只接受一个研究层、未确定条目的local身份保留、版本/章节/系列不混接。输入文件SHA256写入metadata，脚本重复运行生成一致结果，供后续数据更新和人工复核。
