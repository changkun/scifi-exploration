# 原始研究分片与笔记

这些文件保存制作研究目录时实际使用的输入快照，不是额外的已完成研究目录，也不应与最终目录相加计数。正式的 168 条记录与报告见上级目录的 [catalog.json](../catalog.json)、[catalog.csv](../catalog.csv) 与 [report.md](../report.md)。

| 文件 | 作用 | 输入记录数 |
|---|---|---:|
| [early.json](early.json) | 古代前史、欧洲前史与 1979 年以前的英语经典分片 | 55 |
| [global.json](global.json) | 中文、俄语、日语、波兰语、南亚、非洲、拉美等选择性补充 | 46 |
| [modern.json](modern.json) | 1980 年以来的英语作品与系列分片 | 50 |
| [extra.json](extra.json) | 主研究中补入的代表作品 | 15 |
| [early-notes.md](early-notes.md) | 早期分片的来源、历史解释与版本争议 | — |
| [global-notes.md](global-notes.md) | 全球补充分片的来源与覆盖盲区 | — |
| [modern-notes.md](modern-notes.md) | 现代英语分片的来源与解释边界 | — |
| [report-body.md](report-body.md) | 编入逐条索引和最终统计之前的报告正文输入 | — |

四个 JSON 输入合计 166 条。整理最终目录时，将 `global10` 的《三体》系列聚合记录拆为《三体》《黑暗森林》《死神永生》三卷，即 `global10a`、`global10b`、`global10c`，使最终目录成为 168 条。各卷的时间尺度不同，拆分后分别作了议题与科学前提判断。原始输入没有为此改写。

最终整理还修正了部分译名、版本显示、时间粗分及分支标签。原始笔记中针对输入快照的年份或标签描述，可能与最终目录不同；应结合 `year_note` 与 `evidence_note` 阅读，采用上级目录的最终记录。没有独立的 `extra` 原始笔记文件，因此这里没有补造一个同名笔记。

这里只归档研究 JSON 与文字笔记，不包含临时下载、浏览器状态、API 凭据或原作全文。研究方法与字段语义见 [方法说明](../../docs/methodology.md) 与 [数据字典](../../docs/data-dictionary.md)。
