# 科幻文明图谱 · Science Fiction Exploration

从完整书目索引出发，沿着发表时间、文学空间、科幻分支和底层议题探索科幻文学。

**[浏览公开网站](https://science-fiction-civilization-atlas.ouchangkun.chatgpt.site/)**

网站提供可旋转和缩放的三维地球、行星、恒星际、星系与宇宙图景，发表时间长廊，可展开的分支谱系，结构化研究目录，扩展书目筛选与逐条来源。三维坐标是文学导航示意；只有已有空间依据的研究记录进入地图。

## 内容与覆盖

- **研究目录：168 条记录**，包括 160 条科幻作品、5 条科幻前史、3 条混合与边界参照。每条保留书目、议题、分支、叙事跨度、科学前提、版本备注与资料来源；不是逐本全文细读。
- **扩展书目：14,532 条索引记录**（14,534 个 Wikidata 科幻文学查询成员，2 条明确非虚构记录另存归档）。可重复获取的查询、来源字段、排除项及覆盖统计一并保存；它包含长短篇、系列、组篇等不同单位，并不等于全球全部科幻小说。
- **分类保持证据层次**：来源自己的细分标签原样保存；规则生成的议题与分支只作候选；没有证据的字段保留待核，不自动继承研究目录的结论。

详细边界见 [研究方法](docs/methodology.md)、[字段说明](docs/data-dictionary.md)、[来源覆盖](docs/coverage-sources.md) 与扩库的 `research/expanded-catalog-notes.json`。全量覆盖是按来源与范围逐步核对的工作，不以一个大数字宣告完成。

## 仓库结构

| 路径 | 内容 |
| --- | --- |
| `dist/` | 可直接托管的完整网站与本地资源，无需构建 |
| `dist/assets/catalog.json` | 168 条研究目录 |
| `dist/assets/bibliography.json` | 完整索引分片清单与覆盖元数据 |
| `research/structured-bibliography.json.gz` | 所有记录的完整结构化字段与候选分类依据 |
| `dist/assets/bibliography-full.json.gz` | 上述完整 JSON 的无损压缩下载 |
| `dist/assets/bibliography-details/` | 按需读取的完整详情分片，避免初始加载全部字段 |
| `dist/assets/genre-hierarchy.json` | 454 个原始分支标签及其 1,176 个层级节点 |
| `dist/assets/spatial.json` | 空间航区、逐条依据与确定性 |
| `research/` | Markdown 报告、CSV/JSON、扩库来源元数据与查询记录 |
| `research/source-notes/` | 初始研究记录与工作笔记，最终修订以 `catalog.json` 为准 |
| `scripts/` | 数据验证、索引获取与候选分类脚本 |
| `docs/` | 方法、字段、覆盖、素材署名与网站预览 |

## 本地浏览

使用任何静态 HTTP 服务托管 `dist/`，例如：

```sh
python3 -m http.server 8787 --directory dist
```

打开 `http://localhost:8787/`。使用 HTTP 服务可正常加载 JSON 与 JavaScript 模块。

```sh
node scripts/validate.mjs
```

无需安装前端依赖。Three.js 的固定版本和地球纹理已放入仓库。报告保留独立的阅读页面。

## 参与补充

欢迎通过 Issue 或 Pull Request 提交遗漏作品、来源、版本纠错或分类依据。请提供可核查的作者、题名、文本形态、初刊/单行本口径和链接。系列、单卷、单篇、译本及重版应保留关系，避免以题名相似进行错误合并。候选议题的修订应保留原始证据与修改理由。

## 许可与署名

网站代码使用 [MIT](LICENSE)。本项目撰写的研究文字与人工分类使用 [CC BY 4.0](LICENSE-DATA.md)。Wikidata 数据适用 CC0；Three.js 与 NASA 地球纹理依其各自许可和使用指引，详见 [署名说明](docs/attribution.md)。这些许可不包含原小说正文、书封及外部网页，也不改变原作者的权利。

## 复现与验证

详见 [复现说明](docs/reproduction.md)。本次验证通过23项数据与筛选检查；完整原始缓存通过SHA256及离线重建核对。浏览器已核验三维导航、年份联动、分支跳转、全量与候选议题筛选、按需详情；手机布局也已检查。

![三维宇宙预览](docs/preview-universe.jpg)

![完整书目浏览](docs/preview-bibliography.jpg)
