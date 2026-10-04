// Scheduling changes the order of work, never its evidence or completion status.
export function researchPriority(work) {
  const complete = work.issue_analysis_status !== 'missing';
  const log = work.source_search_log;
  const attempts = log ? [...(log.previous_attempts || []), log] : [];
  const unsuccessful = new Set();
  for (const attempt of attempts) {
    const searched = (attempt.queries || []).length || (attempt.materials_checked || []).length;
    const added = /^added(?:_|$)/.test(attempt.issue_result || '') ||
      /analysis_added/.test(attempt.attempt_state || '');
    if (!searched || added) continue;
    // Preserve the original logs. Repeated copies of the same archived attempt
    // must not create additional failures.
    unsuccessful.add(JSON.stringify([
      attempt.attempt_input || null,
      attempt.attempt_state || null,
      attempt.queries || [],
      (attempt.materials_checked || []).map(material => material.url),
    ]));
  }
  const ready = (work.reading_materials || []).some(material =>
    material.has_description &&
    material.previous_identity_status === 'title_author_correspondence' &&
    material.same_dump_title && material.same_dump_authors);
  const failureCount = unsuccessful.size;
  return {
    state: complete ? 'verification_later' : failureCount ? 'deferred_retry' : 'first_pass',
    unsuccessful_attempt_count: failureCount,
    matched_description_available: ready,
    first_pass_seconds_target: 90,
    unproductive_source_attempts_limit: 2,
    reading_strategy: 'single_pass_existing_synopsis',
    detail_review: 'after_first_pass',
    retry_rule: '现成明确简介一次读取，先补简短议题和依据；缺信息留未知，复核与补细节在覆盖后进行。无具体内容即延后，失败轮次越多越靠后。',
  };
}

export function compareResearchPriority(a, b, currentYear) {
  const pa = a.priority, pb = b.priority;
  if (pa.unsuccessful_attempt_count !== pb.unsuccessful_attempt_count)
    return pa.unsuccessful_attempt_count - pb.unsuccessful_attempt_count;
  if (pa.matched_description_available !== pb.matched_description_available)
    return Number(pb.matched_description_available) - Number(pa.matched_description_available);
  const dateGroup = r => r.publication_year_candidate == null ? 2 :
    r.publication_year_candidate > currentYear ? 1 : 0;
  const group = dateGroup(a) - dateGroup(b);
  if (group) return group;
  const year = (b.publication_year_candidate ?? -Infinity) -
    (a.publication_year_candidate ?? -Infinity);
  if (Number.isFinite(year) && year) return year;
  return a.id.localeCompare(b.id, 'en');
}
