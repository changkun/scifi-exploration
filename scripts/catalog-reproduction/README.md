# 可复现公开书目导出

本工具只复制明确的 Wikidata 查询集合，不声称涵盖所有科幻。集合为：P136 指向 science fiction（Q24925）或其 P279 子类，且 P31 指向 literary work（Q7725634）或其 P279 子类。

在仓库根目录运行：

```sh
python3 scripts/reproduce-wikidata.py --output-dir research/reproduced --cache-dir research/source-export
```

仓库附带完整 `.json.gz` 原始响应，默认调用读取缓存，无须联网。生成完整书目、两条非虚构排除记录、类型上级图以及覆盖与缺失说明。作者、语言、类型和 genre 的多语言标签集中在 `related_entities`，每条记录通过 QID 关联。作品的全部语言 label/altLabel 与来源系列关系分别保留在各条记录中。

要另存当下来源快照，使用新的空缓存目录：

```sh
python3 scripts/reproduce-wikidata.py --fresh --output-dir research/current-output --cache-dir research/current-source
```

首次获取约需十分钟，取决于源集合规模和服务状态。脚本使用官方 SPARQL POST 导出，顺序请求，并在每次网络请求完成后至少等 65 秒；收到 429 时尊重 Retry-After，最多一次延后重试。其他服务错误停止，不反复加压。不要同时运行多个联网导出，也不要改 IP 或绕过频率限制。

`first_year` 为直接 P577 的最小年份候选，未逐条核初刊与原语版本。P407 是关联语言声明，原语保持未知。label 和 altLabel 是来源显示名，不保证原题。源索引同时含文学作品、系列、漫画、章节及 25 条版本/翻译实体；`source_entity_kind` 保留这些边界，实体总数不能当成独立小说数量。类型上级图包含泛类与自身路径，仅用于可解释的候选分类。

结构化数据为 CC0。官方文档：
- https://www.wikidata.org/wiki/Wikidata:Data_access
- https://www.wikidata.org/wiki/Wikidata:Licensing
- https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual
- https://www.wikidata.org/wiki/Property:P407
- https://www.wikidata.org/wiki/Property:P577

Open Library 仅做过规模与接口核查，未批量下载其 API：2026-10-04 的精确 subject-key 检索显示 21,216 条，宽泛 subject 检索显示 86,772 条。官方大规模获取要求改用月度 dump；这些条目没有冒充本库已收录。
