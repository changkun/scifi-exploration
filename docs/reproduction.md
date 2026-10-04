# 如何复现与核对

仓库保留本次来源快照、完整元数据、实际 SPARQL 查询、请求记录、校验值和转换脚本。运行位置为仓库根目录，Python 脚本只使用标准库。

## 离线重建来源层

```sh
python3 scripts/reproduce-wikidata.py --output-dir research/reproduced --cache-dir research/source-export
```

默认读取已保存的 15 份压缩缓存，不再向来源逐条请求；该快照的作品和相关实体标签已逐字段比较，完整分支图的节点与边也已比较。`research/source-export/manifest.json` 记录每份缓存 SHA256。`research/reproduced/` 是可重新生成的临时结果，未重复提交。

需要获取来源当前快照时，使用新的空缓存目录，避免改写本次研究快照：

```sh
python3 scripts/reproduce-wikidata.py --fresh --output-dir work/new-snapshot --cache-dir work/new-cache
```

脚本按完成请求间隔至少 65 秒，尊重服务端限速与 Retry-After；超时和拒绝会停止或记录，不以不完整结果宣告完成。新快照的成员数、标签、关系与来源类型可能变化，需要重新核对范围和排除理由。

## 生成候选分类与网页数据

```sh
python3 scripts/enrich-bibliography.py
node scripts/validate.mjs
```

分类脚本以 `research/expanded-catalog.json.gz`、`expanded-catalog-notes.json` 和 `expanded-genre-hierarchy.json` 为输入，添加可解释规则候选；保留每条原始字段，生成完整结构化 JSON、核心 CSV、轻索引、59 个按需详情分片及无损压缩下载。新快照时可通过 `--source`、`--notes`、`--hierarchy` 显式选择输入。网站的谱系数据须与输入快照同步，不能混用不同版本。

验证覆盖目录身份、来源字段、全部分片与索引一致性、研究记录引用、空间映射、年份和组合筛选、分享链接状态与资源。默认不允许发布空的扩展书目占位。

## 研究目录与报告

`scripts/build-curated-research.py` 保留初始研究输入的整理、拆卷和修订规则，可生成研究目录与 Markdown 报告。其输入是 `research/source-notes/`；网页读取最终目录，已生成的独立报告页面直接位于 `dist/report.html`。分类修订后应同时核对报告、CSV、JSON 与网页记录，不只更新一个显示副本。

## 当前覆盖仍有缺口

离线结果的完整性说明仅针对这次来源查询。ISFDB、地区国家书目与其他专业索引的接入、跨来源作品／版本归并，以及大量底层议题、叙事时间与现实匹配核查，仍未完成。详见 [来源覆盖](coverage-sources.md)。
