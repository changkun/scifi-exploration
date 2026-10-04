#!/usr/bin/env python3
"""Audit the complete saved catalogue without network access or data mutation.

The output is an evidence inventory and structural check, not independent
bibliographic verification. All paths are relative to this repository by default.
"""
import argparse
import collections
import gzip
import hashlib
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RELATIONSHIPS = {
    "P179": "系列", "P361": "组成", "P155": "前作", "P156": "后作",
    "P144": "基于", "P747": "版本关联",
}
RAW_FIELDS = ["P50", "P2093", "P577", "P407", "P31", "P136", "P1476", "P648"]
FIELD_KEYS = [
    "title", "original_title", "author", "publication_date", "original_language",
    "language_statements", "form", "spatial", "story_era", "story_duration",
    "temporal_reach", "science", "topics", "issue", "branches", "relationships",
    "external_identifiers",
]
REQUIRED_CANONICAL = [
    "id", "research_id", "source_id", "title_zh", "title_original", "author",
    "first_year", "language_tradition", "form", "topics", "branches", "duration",
    "story_era", "reach", "science_class", "science_note", "issue",
    "source_entity_kind", "spatial_primary", "research", "source_index",
]
PLACEHOLDERS = {
    "", "未知", "待核", "待分类", "故事时代未知", "最大时间视野未知",
    "底层议题待研究", "语言未知", "作者未知", "作者待核", "原语未知",
    "原题待核（见来源标题声明）", "原题待核", "尚未进行科学前提分析。",
}


def load(path):
    raw = path.read_bytes()
    return json.loads(gzip.decompress(raw) if path.suffix == ".gz" else raw)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def relative(path):
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return path.name  # Never expose a host-specific absolute path.


def norm(value):
    return "".join(c for c in unicodedata.normalize("NFKD", value or "").casefold()
                   if c.isalnum() and not unicodedata.combining(c))


def available(value):
    return value is not None and value != [] and value != {} and str(value) not in PLACEHOLDERS


def year(date):
    match = re.match(r"^([+-]?\d+)-\d\d-\d\dT", date or "")
    return int(match.group(1)) if match else None


def entry(value, status, availability, basis, source_value=None, research_value=None,
          sources=None, review_reasons=None):
    return {"value": value, "status": status, "availability": availability,
            "basis": basis, "source_value": source_value, "research_value": research_value,
            "sources": sources or [], "review_reasons": review_reasons or [],
            "independently_verified": False}


def issue(code, field, detail, severity="review", **evidence):
    return {"code": code, "field": field, "severity": severity,
            "detail": detail, **evidence}


def source_granularity(work, related):
    kind = work.get("source_entity_kind")
    if kind != "work_or_unspecified":
        return kind
    text = (work.get("description_en") or "").casefold()
    text = re.split(r",\s*(?:based on|later|which|subsequently)|;\s*", text, maxsplit=1)[0]
    if re.search(r"short story collection|collection of short stories|story collection|anthology|fix-up|fixup", text):
        return "collection_or_fixup"
    if re.search(r"novel series|book series|trilogy|series of .*novels", text):
        return "series_description"
    if re.search(r"\bnovella\b|\bnovelette\b|short story|short fiction", text):
        return "short_text_description"
    if re.search(r"\bnovel\b", text):
        return "novel_description"
    labels = [related.get(t["id"], {}).get("labels", {}).get("en", t.get("label", ""))
              for t in work.get("source_types", [])]
    if any(re.search(r"novel|short story|novella|anthology", t, re.I) for t in labels):
        return "specific_source_type"
    return "unspecified_granularity"


def read_raw_cache(directory):
    """Read every saved raw export, verify its manifest, retain direct-field sets."""
    manifest_path = directory / "manifest.json"
    if not manifest_path.exists():
        return {"available": False, "note": "原始缓存目录未提供。"}, {}, set()
    manifest = load(manifest_path)
    direct = collections.defaultdict(lambda: collections.defaultdict(set))
    coverage, summaries, mismatches = set(), [], []
    members = set()
    for item in manifest["files"]:
        path = directory / item["file"]
        raw = gzip.decompress(path.read_bytes())
        actual = hashlib.sha256(raw).hexdigest()
        if actual != item["sha256_uncompressed"]:
            mismatches.append(item["file"])
        data = json.loads(raw)
        rows = data.get("results", {}).get("bindings", []) if isinstance(data, dict) else []
        summaries.append({"file": relative(path), "sha256_uncompressed": actual,
                          "manifest_matches": actual == item["sha256_uncompressed"],
                          "row_count": len(rows) if rows else len(data),
                          "container": type(data).__name__})
        if item["file"] == "membership.json.gz":
            members = {v["work"]["value"].rsplit("/", 1)[-1] for v in rows}
        if not re.fullmatch(r"fields-large-\d+\.json\.gz", item["file"]):
            continue
        for row in rows:
            qid = row["work"]["value"].rsplit("/", 1)[-1]
            prop = row["field"]["value"]
            coverage.add(qid)
            if prop in RAW_FIELDS:
                value = row["value"]
                direct[qid][prop].add((value["value"], value.get("xml:lang", "")))
    queries = [{"file": relative(p), "sha256": digest(p)}
               for p in sorted((directory / "queries").glob("*.sparql"))]
    return {"available": True, "snapshot_date": manifest.get("snapshot_date"),
            "files": summaries, "queries": queries, "manifest_mismatches": mismatches,
            "direct_field_entity_count": len(coverage), "membership_count": len(members),
            "claim_detail_coverage": {
                "statement_ids": False, "rank_metadata": False, "references": False,
                "qualifiers": False, "time_precision": False, "calendar_model": False,
                "note": "查询读取 wdt 直接值及标签；未导出完整 claim 元数据。日期字符串中的月日不能证明声明精度。",
            }}, direct, members


def raw_source_checks(work, direct):
    if work["id"] not in direct:
        return [issue("raw_field_coverage_missing", "source", "未找到该实体的完整原始字段缓存。", "structural_error")]
    raw = direct[work["id"]]
    sets = {
        "P50": {(a["id"], "") for a in work["author_entities"]},
        "P577": {(d, "") for d in work["publication_dates"]},
        "P407": {(v["id"], "") for v in work["language_statements"]},
        "P31": {(v["id"], "") for v in work["source_types"]},
        "P136": {(v["id"], "") for v in work["source_subject"]},
        "P1476": {(v["value"], v.get("language", "")) for v in work["title_statements"]},
        "P648": {(v, "") for v in work["openlibrary_work_ids"]},
    }
    errors = []
    for prop, actual in sets.items():
        expected = {(v.rsplit("/", 1)[-1] if prop in {"P50", "P407", "P31", "P136"} else v, lang)
                    for v, lang in raw.get(prop, set())}
        if prop == "P648":
            # This normalized field deliberately contains work IDs only. Edition
            # identifiers remain in the raw export and in the audit below.
            expected = {(v, lang) for v, lang in expected if re.fullmatch(r"OL\d+W", v)}
        if actual != expected:
            errors.append(issue("normalized_source_differs_from_raw", prop,
                                "规范化来源值与保存的完整原始导出不同，需检查数据流程。", "structural_error",
                                normalized_values=sorted(actual), raw_values=sorted(expected)))
    for name, _ in raw.get("P2093", set()):
        if name not in work["authors"]:
            errors.append(issue("author_name_statement_not_preserved", "author",
                                "原始 P2093 作者字符串未在规范化作者列表中保留。", "structural_error", raw_name=name))
    return errors


def audit_record(c, source_by_id, research_by_id, related, ol_reverse, direct, snapshot_date):
    snapshot_year = int(snapshot_date[:4])
    s = source_by_id.get(c.get("source_id"))
    r = research_by_id.get(c.get("research_id"))
    link = c.get("entity_link") or {}
    source_urls = s.get("sources", []) if s else []
    research_urls = r.get("sources", []) if r else []
    all_urls = list(dict.fromkeys(source_urls + research_urls))
    issues, comparisons = [], []
    for key in REQUIRED_CANONICAL:
        if key not in c:
            issues.append(issue("canonical_key_missing", key, "统一快照缺少约定字段。", "structural_error"))
    if c.get("source_id") and not s:
        issues.append(issue("source_identity_missing", "id", "统一目录引用的源身份不在源库。", "structural_error"))
    if c.get("research_id") and not r:
        issues.append(issue("research_identity_missing", "id", "统一目录引用的研究身份不在研究库。", "structural_error"))
    if not re.fullmatch(r"Q\d+|local:[a-zA-Z0-9_-]+", c["id"]):
        issues.append(issue("invalid_canonical_id", "id", "身份格式不符合 QID 或 local 约定。", "structural_error"))
    if s and c["id"] != s["id"]:
        issues.append(issue("canonical_source_id_difference", "id", "源实体身份与统一身份不一致。", "structural_error"))
    embedded = {key: value for key, value in (c.get("research") or {}).items() if key != "report_index"}
    if r and embedded != r:
        issues.append(issue("embedded_research_differs", "research", "嵌入研究层与研究原始记录不同。", "structural_error"))
    if s and direct:
        issues.extend(raw_source_checks(s, direct))

    f = {}
    f["title"] = entry(c.get("title_zh"), "research_documented" if r else "source_asserted",
                       "present" if available(c.get("title_zh")) else "missing",
                       "来源标签、题名声明与研究展示题名分别保留；展示题名不等于原题确认。",
                       {"title": s["title"], "title_zh": s["title_zh"], "title_en": s["title_en"],
                        "label_language_count": len(s["source_labels"]), "title_statements": s["title_statements"]} if s else None,
                       {"title_zh": r["title_zh"], "title_original": r["title_original"]} if r else None, all_urls)
    original_title = r.get("title_original") if r else (s.get("title_original") if s else None)
    title_reasons = []
    if s and not s["title_statements"]:
        title_reasons.append("P1476 缺失；标签只能提供展示题名。")
    if s and len({v.get("language") for v in s["title_statements"]}) > 1:
        issues.append(issue("multilingual_title_statements", "original_title",
                            "P1476 有多语言题名，可能涉及译名或版本；不能自动选作原题。",
                            source_values=s["title_statements"]))
    if original_title and re.search(r"暂译|译名待核", original_title):
        title_reasons.append("研究题名包含暂译／待核标识。")
    f["original_title"] = entry(original_title, "research_documented" if r else "needs_review",
                                "research_statement" if available(original_title) else "unconfirmed",
                                "P1476 的语言标记不是原题的独立核验；研究原题按现有引用保留。",
                                {"explicit_original_title": s["title_original"], "P1476": s["title_statements"]} if s else None,
                                r.get("title_original") if r else None, all_urls, title_reasons)
    names = s["authors"] if s else []
    author_ids = [v["id"] for v in s["author_entities"]] if s else []
    raw_named = sorted(v for v, _ in direct.get(s["id"], {}).get("P2093", set())) if s else []
    has_author = bool(names) or bool(r and available(r.get("author")))
    unresolved = [v for v in author_ids if not related.get(v, {}).get("labels")]
    if unresolved or any(re.fullmatch(r"Q\d+", v or "") for v in names):
        issues.append(issue("author_label_unresolved", "author", "有作者实体尚无可读标签，不能视为作者名已补全。", author_ids=unresolved))
    if s and not author_ids and names:
        issues.append(issue("author_name_without_entity", "author", "来源有作者字符串而无 P50 实体；字符串合法，身份仍可进一步核对。", "info", source_values=names))
    f["author"] = entry(c.get("author"), "research_documented" if r else ("source_asserted" if has_author else "missing"),
                        "present" if has_author else "missing",
                        "P50 作者实体与 P2093 作者字符串均保留；作者标签译法差异不视为冲突。",
                        {"names": names, "entity_ids": author_ids, "P2093": raw_named,
                         "related_entity_labels": "research/expanded-catalog.json.gz#related_entities"} if s else None,
                        r.get("author") if r else None, all_urls)

    dates = s["publication_dates"] if s else []
    years = sorted({year(v) for v in dates if year(v) is not None})
    source_year = s["first_year"] if s else None
    research_year = r.get("first_year") if r else None
    date_reasons = []
    if s:
        date_reasons.append("未获取 claim 精度、历法、适用版本、地区与参考资料；P577 最小年仅为候选。")
    if len(dates) > 1:
        issues.append(issue("multiple_publication_dates", "publication_date", "来源有多个发表日期；可能是合法的连载、版本或地区差别。", source_values=dates))
    if len(years) > 1:
        issues.append(issue("multiple_publication_years", "publication_date", "来源日期跨多个年份，需确认哪一阶段对应所记录实体。", source_values=dates, years=years))
    if s and years and source_year != min(years):
        issues.append(issue("candidate_year_calculation_difference", "publication_date", "源候选首年不等于保存日期的最小年份。", "structural_error", source_year=source_year, dates=dates))
    if any(v > snapshot_year for v in years):
        issues.append(issue("future_publication_in_source", "publication_date", "源日期晚于快照年份，可能为预告出版；不能当作已出版完成。", source_values=dates))
    later_dates = [v for v in dates if year(v) is not None and year(v) >= 0 and v[:10] > snapshot_date]
    if later_dates:
        issues.append(issue("publication_date_after_snapshot", "publication_date", "源日期字符串晚于快照日；可能为预告或版本日期，且未取得声明精度，需独立核对。", source_values=later_dates, snapshot_date=snapshot_date))
    non_dates = [v for v in dates if year(v) is None]
    if non_dates:
        issues.append(issue("publication_date_unknown_value", "publication_date", "P577 含未知值节点或非日期值；无年份候选是合法未知，需显示其语义。", source_values=non_dates))
    if r and s and source_year is not None and research_year != source_year:
        comparisons.append({"field": "publication_date", "status": "needs_review", "comparison": "different_year_values",
                            "research_value": research_year, "research_note": r["year_note"],
                            "source_value": source_year, "source_dates": dates,
                            "source_description": s.get("description_en"),
                            "basis": "双方字段的版本规则不同；值差异本身不能证明哪一方错误。"})
        issues.append(issue("research_source_year_difference", "publication_date", "研究版本年与源最小日期年不同；保留双方值核对。",
                            research_value=research_year, source_value=source_year, research_note=r["year_note"], source_dates=dates))
    if r and re.search(r"供排序|排序占位|仅.*排序|并非.*初刊|约公元|约\d.*世纪", r.get("year_note", "")):
        issues.append(issue("approximate_research_year", "publication_date", "研究年份是近似或排序占位，不能显示为精确首刊年。", research_value=research_year, research_note=r["year_note"]))
    f["publication_date"] = entry(c.get("first_year"), "needs_review" if s else "research_documented",
                                  "present_candidate" if c.get("first_year") is not None else "missing",
                                  "发表时间与故事时间分开；研究版本年、排序年、源日期及候选年全部保留。",
                                  {"dates": dates, "candidate_first_year": source_year, "precision": None, "calendar_model": None,
                                   "qualifiers": None, "claim_references": None} if s else None,
                                  {"first_year": research_year, "sort_year": r.get("sort_year"),
                                   "year_display": r.get("year_display"), "year_note": r["year_note"]} if r else None,
                                  all_urls, date_reasons)

    languages = s["language_statements"] if s else []
    language_ids = [v["id"] for v in languages]
    if len(language_ids) > 1:
        issues.append(issue("multiple_source_languages", "original_language", "P407 有多个语言声明，可能为合法多语文本、方言或版本；原語角色待核。", source_values=languages))
    f["original_language"] = entry(r.get("language_tradition") if r else (s.get("original_language") if s else None),
                                   "research_documented" if r else "needs_review",
                                   "research_language_context" if r else "unconfirmed",
                                   "研究字段含创作语言及文学语境；P407 仅是关联语言声明，未自动推为原语。",
                                   {"explicit_original_language": s["original_language"], "P407": languages} if s else None,
                                   r.get("language_tradition") if r else None, all_urls,
                                   ["原语与译本语言／方言角色需独立确认。"])
    f["language_statements"] = entry(languages, "source_asserted" if languages else "missing",
                                    "present" if languages else ("research_only" if r else "missing"),
                                    "只记录来源 P407，不将语言数量或未知作为结构错误。", languages if s else None,
                                    r.get("language_tradition") if r else None, all_urls)
    if r and s:
        comparisons.append({"field": "language", "status": "not_semantically_compared", "research_value": r["language_tradition"],
                            "source_value": languages, "basis": "文学语境字符串与 P407 实体的语义粒度不同；未凭字符串差异判冲突。"})

    kind = s["source_entity_kind"] if s else "local_research_record"
    granularity = source_granularity(s, related) if s else "research_form_only"
    boundary = {"source_entity_kind": kind, "source_granularity_candidate": granularity,
                "source_types": s["source_types"] if s else [], "research_form": r.get("form") if r else None,
                "is_structural_error": False,
                "note": "单卷、系列、章节、连载、版本保持原身份；这些是合法实体层级，不因层级不同自动删除或合并。"}
    if s and granularity == "unspecified_granularity":
        issues.append(issue("source_text_granularity_unspecified", "form", "来源只足以确认文学相关实体，单卷／短篇／合集等具体粒度尚待确认。"))
    media_labels = [(v["id"], related.get(v["id"], {}).get("labels", {}).get("en", v.get("label", "")))
                    for v in s["source_types"]] if s else []
    media_types = [{"id": qid, "label": label} for qid, label in media_labels
                   if re.search(r"comic|manga|graphic novel|television|film|animation|anime|video game|disambiguation", label, re.I)]
    if media_types:
        issues.append(issue("literary_media_scope_boundary", "form", "来源含图像、视听或其他交叉媒介类型；是否纳入纯小说浏览须人工确定，当前保留来源实体。", source_values=media_types))
    if r and link.get("status") in {"ambiguous", "unlinked"}:
        issues.append(issue("research_source_identity_unresolved", "id", "研究记录保留独立 local 身份；候选关系不代表已确认等价。",
                            link_status=link["status"], candidate_ids=link.get("candidate_ids", [])))
    f["form"] = entry(c.get("form"), "research_documented" if r else "source_asserted", "present",
                      "源类型及研究文本形态分开，不将系列和单卷混合。", boundary, r.get("form") if r else None, all_urls)

    spatial = c.get("spatial_evidence")
    spatial_known = bool(spatial and c.get("spatial_primary") not in {None, "unknown"})
    f["spatial"] = entry(c.get("spatial_primary"), "research_interpretation" if spatial_known else ("needs_review" if spatial else "missing"),
                         "present_analysis" if spatial_known else ("unconfirmed" if spatial else "missing"),
                         "空间标签为阅读导航；不由出版年代或故事时长推算空间。",
                         None, {"current_evidence": spatial, "original_evidence": c.get("original_spatial_evidence")} if r else None,
                         research_urls, ["没有足够空间证据。"] if not spatial else (["原研究有导航候选，统一地图仍保留空间未知。"] if not spatial_known else (["标签为暂定，需剧情证据。"] if spatial.get("confidence") == "暂定" else [])))
    for field, key, text in [
        ("story_era", "story_era", "故事发生时代为研究解释，不能用发表年份填补。"),
        ("story_duration", "duration", "主体故事时长采用粗分；待核不假定精确时长。"),
        ("temporal_reach", "reach", "最大时间视野和空间范围独立；背景待核不等于已有量化跨度。"),
    ]:
        value = c.get(key)
        f[field] = entry(value if available(value) else None, "research_interpretation" if available(value) and r else "missing",
                         "present_analysis" if available(value) and r else "missing", text, None,
                         r.get(key) if r else None, research_urls,
                         ["研究说明保留待核或未量化信息。"] if available(value) and re.search(r"待核|未量化|未给|未定", str(value)) else [])
    science_present = bool(r and available(c.get("science_class")))
    f["science"] = entry({"class": c.get("science_class"), "note": c.get("science_note")} if science_present else None,
                         "research_interpretation" if science_present else "missing", "present_analysis" if science_present else "missing",
                         "科学前提为已有研究的定性解释，不是逐条科学实验或预测命中核验。", None,
                         {"class": r.get("science_class"), "note": r.get("science_note")} if r else None, research_urls)
    topics = c.get("research_topics") or []
    candidates = c.get("topic_candidates") or []
    f["topics"] = entry(c.get("topics", []), "research_interpretation" if topics else ("analysis_candidate" if candidates else "missing"),
                        "present_analysis" if topics else ("candidate_only" if candidates else "missing"),
                        "研究议题与来源标签推导候选分开；候选不代表逐本内容核验。",
                        candidates, topics or None, all_urls)
    f["issue"] = entry(r.get("issue") if r else None, "research_interpretation" if r else ("analysis_candidate" if candidates else "missing"),
                       "present_analysis" if r else ("candidate_only" if candidates else "missing"),
                       "只有研究层有原创核心提问；来源议题候选提示语不当作核心问题已补全。", candidates,
                       r.get("issue") if r else None, research_urls)
    f["branches"] = entry(c.get("branches", []), "research_interpretation" if r else "source_asserted", "present",
                          "来源 genre、规则候选与研究分支含义不同，分别保存；源分类并非阅读评审。",
                          {"source_genres": s["source_subject"], "branch_candidates": c.get("source_index", {}).get("branch_candidates", [])} if s else None,
                          r.get("branches") if r else None, all_urls)

    relations = s["relationships"] if s else None
    f["relationships"] = entry(relations, "source_asserted" if s else "missing", "source_exported" if s else "not_exported",
                               "关系为空仅表示本查询无此值，不能证明作品不属于任何系列；目标可在当前集合外。",
                               relations, None, source_urls)
    for prop, values in (relations or {}).items():
        if any(v.get("id") == c["id"] for v in values):
            issues.append(issue("self_relationship_in_source", "relationships", "源包含指向自身的关系，需核查；不自动修复。", property=prop, source_values=values))
    ol_ids = s["openlibrary_work_ids"] if s else []
    raw_ol_ids = sorted(v for v, _ in direct.get(s["id"], {}).get("P648", set())) if s else []
    edition_ids = [v for v in raw_ol_ids if re.fullmatch(r"OL\d+M", v)]
    other_ids = [v for v in raw_ol_ids if not re.fullmatch(r"OL\d+[WM]", v)]
    if edition_ids:
        issues.append(issue("openlibrary_edition_identifier_in_source", "external_identifiers", "原始 P648 含 M 类型版本标识；从 work 字段分开保留，不作作品 ID 使用。", "info", source_values=edition_ids))
    if other_ids:
        issues.append(issue("unexpected_raw_openlibrary_identifier_shape", "external_identifiers", "原始 P648 含无法识别的标识，保留原值待核。", source_values=other_ids))
    shared = [{"openlibrary_id": v, "source_ids": sorted(ol_reverse[v])} for v in ol_ids if len(ol_reverse[v]) > 1]
    if len(ol_ids) > 1:
        issues.append(issue("multiple_openlibrary_ids", "external_identifiers", "同一源实体有多个 P648 ID；保留全部并核对文本层级，不假设互为同本。", source_values=ol_ids))
    if shared:
        issues.append(issue("shared_openlibrary_id", "external_identifiers", "P648 被多个源实体共用；禁止仅据该 ID 合并短篇、长篇、系列或版本。", source_values=shared))
    invalid = [v for v in ol_ids if not re.fullmatch(r"OL\d+W", v)]
    if invalid:
        issues.append(issue("unexpected_openlibrary_identifier_shape", "external_identifiers", "本字段保存非预期 work ID 形态，需人工核对，不删除。", source_values=invalid))
    f["external_identifiers"] = entry({"wikidata_id": s["id"] if s else None, "openlibrary_work_ids": ol_ids,
                                       "openlibrary_edition_ids": edition_ids, "raw_P648": raw_ol_ids},
                                     "source_asserted" if s else "missing", "present" if ol_ids else "openlibrary_id_missing",
                                     "保存的是 Wikidata P648 声明，尚未查询 Open Library 内容验证。",
                                     {"P648_work_ids": ol_ids, "P648_edition_ids": edition_ids, "P648_unrecognized": other_ids,
                                      "raw_P648": raw_ol_ids, "shared_work_ids": shared}, None, source_urls,
                                     ["外部标识对应实体与粒度仍需独立核对。"] if ol_ids else ["此快照未取得 Open Library ID；不等于该作品无馆藏。"])
    if r and s:
        selected = next((v for v in link.get("candidate_evidence", []) if v["id"] == s["id"]), {})
        comparisons.extend([
            {"field": "title", "status": "identity_evidence_present", "research_value": {"zh": r["title_zh"], "original": r["title_original"]},
             "source_value": {"display": s["title"], "P1476": s["title_statements"]}, "matched_titles": selected.get("matched_titles", []),
             "basis": "实体链接使用的题名证据；译名差异不作文字冲突。"},
            {"field": "author", "status": "identity_evidence_present", "research_value": r["author"],
             "source_value": {"names": names, "entity_ids": author_ids}, "author_evidence": selected.get("author_evidence", []),
             "basis": "作者标签、引用及明确别名支撑身份；未声明全体作者已外部核验。"},
            {"field": "form", "status": "identity_granularity_supported", "research_value": r["form"],
             "source_value": {"types": s["source_types"], "kind": kind, "description": s.get("description_en")},
             "basis": "现有实体链接粒度依据；源层级本身不是错误。"},
        ])
    if r and not s:
        comparisons.append({"field": "identity", "status": link.get("status", "unlinked"), "research_value": r["id"],
                            "candidate_ids": link.get("candidate_ids", []),
                            "candidate_evidence": link.get("candidate_evidence", []),
                            "basis": "候选详情保留源与研究双方值，不自动覆盖或合并。"})
    assert set(f) == set(FIELD_KEYS)
    errors = [v for v in issues if v["severity"] == "structural_error"]
    return {"id": c["id"], "research_id": c.get("research_id"), "source_id": c.get("source_id"),
            "title": c.get("title_zh"), "status": "structural_checked",
            "verification": {"structural_checked": True, "structural_result": "fail" if errors else "pass",
                             "source_verified": False, "independent_verification_scope": "none_in_this_run",
                             "prior_research_evidence": "citation_documented_not_field_specific_verification" if r else None,
                             "requires_independent_bibliographic_review": True},
            "fields": f, "issues": issues, "source_boundary": boundary,
            "research_source_comparisons": comparisons,
            "missing_fields": [key for key, val in f.items() if val["availability"] == "missing"],
            "unconfirmed_fields": [key for key, val in f.items() if val["availability"] in {"unconfirmed", "candidate_only", "not_exported", "openlibrary_id_missing"}],
            "source_urls": all_urls}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--snapshot", type=Path, default=ROOT / "research/audit-baseline-universe.json.gz")
    parser.add_argument("--source", type=Path, default=ROOT / "research/expanded-catalog.json.gz")
    parser.add_argument("--research", type=Path, default=ROOT / "research/catalog.json")
    parser.add_argument("--raw-cache", type=Path, default=ROOT / "research/source-export")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "research")
    args = parser.parse_args()
    if args.snapshot == ROOT / "research/audit-baseline-universe.json.gz" and not args.snapshot.exists():
        # Capture the current snapshot once. Later completion overlays never
        # replace this baseline or silently change the audit's source universe.
        args.snapshot.write_bytes((ROOT / "research/canonical-universe.json.gz").read_bytes())
    universe, source, research = load(args.snapshot), load(args.source), load(args.research)
    works, source_works, research_works = universe["works"], source["works"], research["works"]
    by_source = {v["id"]: v for v in source_works}
    by_research = {v["id"]: v for v in research_works}
    raw_summary, direct, members = read_raw_cache(args.raw_cache)
    ol_reverse = collections.defaultdict(set)
    for work in source_works:
        for value in work["openlibrary_work_ids"]:
            ol_reverse[value].add(work["id"])
    date = universe["metadata"].get("research_date", "2026-10-04")
    records = [audit_record(c, by_source, by_research, source["related_entities"], ol_reverse, direct, date) for c in works]
    field_summary = {}
    for key in FIELD_KEYS:
        field_summary[key] = {
            "status_counts": dict(sorted(collections.Counter(v["fields"][key]["status"] for v in records).items())),
            "availability_counts": dict(sorted(collections.Counter(v["fields"][key]["availability"] for v in records).items())),
            "independently_verified_count": 0,
        }
    failures = [v["id"] for v in records if v["verification"]["structural_result"] != "pass"]
    global_errors = []
    if len({v["id"] for v in works}) != len(works):
        global_errors.append("duplicate_canonical_ids")
    if len(by_source) != len(source_works):
        global_errors.append("duplicate_source_ids")
    if {v["source_id"] for v in works if v.get("source_id")} != set(by_source):
        global_errors.append("canonical_source_coverage_difference")
    if {v["research_id"] for v in works if v.get("research_id")} != set(by_research):
        global_errors.append("canonical_research_coverage_difference")
    if members and not set(by_source) <= members:
        global_errors.append("source_outside_saved_membership")
    if raw_summary.get("manifest_mismatches"):
        global_errors.append("raw_cache_hash_mismatch")
    issue_counts = collections.Counter(v["code"] for record in records for v in record["issues"])
    ol_records = [v for v in source_works if v["openlibrary_work_ids"]]
    shared_ids = {k: sorted(v) for k, v in sorted(ol_reverse.items()) if len(v) > 1}
    raw_ol = {qid: sorted(v for v, _ in direct.get(qid, {}).get("P648", set())) for qid in by_source}
    raw_ol_values = [v for vals in raw_ol.values() for v in vals]
    date_diff = [v for v in records if any(i["code"] == "research_source_year_difference" for i in v["issues"])]
    metadata = {
        "format": "record-field-audit-v1", "snapshot_date": date, "record_count": len(records),
        "source_record_count": len(source_works), "research_record_count": len(research_works),
        "structural_checked_count": len(records), "structural_pass_count": len(records) - len(failures),
        "source_verified_count": 0, "field_independently_verified_count": 0,
        "method": "完整离线快照逐记录逐字段结构检查、原始缓存一致性及证据／缺口登记；未进行新的独立外部书目核验。",
        "status_note": "structural_checked 是检查阶段；structural_result 是结构结果。source_verified 仅在有独立、逐字段可追溯证据时使用，本轮不赋值。",
        "inputs": [{"file": relative(p), "sha256": digest(p)} for p in [args.snapshot, args.source, args.research]],
        "record_output": relative(args.output_dir / "record-audit.json.gz"),
    }
    summary = {
        "metadata": metadata, "structural": {"pass": not failures and not global_errors,
            "failed_record_ids": failures, "global_errors": global_errors,
            "missing_values_are_structural_errors": False},
        "field_summary": field_summary, "issue_counts": dict(sorted(issue_counts.items())),
        "openlibrary": {"property": "P648", "with_work_id_entity_count": len(ol_records),
            "without_work_id_entity_count": len(source_works) - len(ol_records),
            "identifier_value_count": sum(len(v["openlibrary_work_ids"]) for v in source_works),
            "unique_work_id_count": len(ol_reverse), "multiple_id_entity_count": sum(len(v["openlibrary_work_ids"]) > 1 for v in source_works),
            "shared_id_count": len(shared_ids), "shared_id_entity_count": len({qid for ids in shared_ids.values() for qid in ids}),
            "shared_ids": shared_ids,
            "raw_P648": {"entity_count": sum(bool(v) for v in raw_ol.values()), "value_count": len(raw_ol_values),
                "unique_value_count": len(set(raw_ol_values)),
                "work_value_count": sum(bool(re.fullmatch(r"OL\d+W", v)) for v in raw_ol_values),
                "edition_value_count": sum(bool(re.fullmatch(r"OL\d+M", v)) for v in raw_ol_values),
                "edition_entity_count": sum(any(re.fullmatch(r"OL\d+M", v) for v in vals) for vals in raw_ol.values()),
                "unrecognized_values": [{"id": qid, "value": v} for qid, vals in raw_ol.items() for v in vals if not re.fullmatch(r"OL\d+[WM]", v)]},
            "note": "这些是已保存 Wikidata ID 声明，未访问 Open Library 核实；多值或共享值需核对，不能据此合并。"},
        "source_field_missing": {key: sum(not v[key] for v in source_works) for key in
            ["authors", "author_entities", "first_year", "publication_dates", "language_statements", "title_statements", "title_original", "original_language", "openlibrary_work_ids"]},
        "source_entity_kind_counts": dict(sorted(collections.Counter(v["source_entity_kind"] for v in source_works).items())),
        "research_source_date_differences": [{"id": v["id"], "research_id": v["research_id"], "title": v["title"],
            "comparison": next(c for c in v["research_source_comparisons"] if c.get("comparison") == "different_year_values")} for v in date_diff],
        "raw_source_export": raw_summary,
        "review_priorities": [
            {"code": "independent_bibliographic_verification", "count": len(records), "note": "逐条原题、作者、原语、初刊阶段尚待独立来源核对。"},
            {"code": "claim_precision_and_scope", "count": len(source_works), "note": "补完整 claim 精度、限定符、参考资料；不把日期字符串当声明精度。"},
            {"code": "openlibrary_id_assessment", "count": len(ol_records), "note": "优先用合法公开来源确认已有外部 ID 和作品层级；严格遵守服务批量访问政策。"},
            {"code": "narrative_and_science_evidence", "count": sum(not v.get("research") for v in works), "note": "书目元数据不足以补故事时代、时长、空间与科学前提；不能用题名猜剧情。"},
        ],
    }
    args.output_dir.mkdir(parents=True, exist_ok=True)
    payload = json.dumps({"metadata": metadata, "records": records}, ensure_ascii=False, separators=(",", ":")).encode()
    (args.output_dir / "record-audit.json.gz").write_bytes(gzip.compress(payload, mtime=0))
    (args.output_dir / "audit-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"records": len(records), "structural_pass": summary["structural"]["pass"],
                      "failed_records": len(failures), "source_verified": 0,
                      "openlibrary_entities": len(ol_records), "date_differences": len(date_diff),
                      "output_bytes_compressed": (args.output_dir / "record-audit.json.gz").stat().st_size}, ensure_ascii=False))
    return 0 if summary["structural"]["pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
