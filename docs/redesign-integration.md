# Redesign integration

The local `redesign` branch at `f118e894ddf434093c76b71da5967742780aeb8d` was merged onto the published research checkpoint `f5eece3468d19edb824fa98fc4bb5a16b469152b`. The merge retained the new index body and the existing research data; no catalog or analysis files were regenerated.

`app.js` now changes to the library view before applying a `data-filter` value, so the browser's history event cannot overwrite the new filter with the previous URL state. The temporary capture-phase workaround in `jump.mjs` was removed. Both script URLs received a cache revision.

Validation on 2026-10-04:

- All five existing validators passed: 74 checks.
- A fresh browser preview on port 8788 rendered 14,564 records and switched among scale, time and topic lenses.
- Command-K opened the palette; searching for 神经漫游者 and pressing Shift-Enter selected its map marker.
- The 知识与认识 browse button on the themes view reached `#library` with the topic preserved in the URL and controls, showing 831 matching records.
- At 390px width, the map and library had a document width of 390px. Temporary viewport settings were reset after inspection.
- No browser warnings or errors were recorded during these interactions.

Data and application logic remain owned by the research workflow. The five stylesheets, `universe.mjs`, `jump.mjs`, `atlas-store.mjs`, `icon.svg`, report styles and index body structure belong to the design workflow. The jump workaround removal above was the explicitly requested integration change. Shared control IDs, record fields, zone IDs and era IDs remain unchanged.

The catalog still has 2,091 core analyses and 12,473 analysis gaps at this checkpoint. Subsequent research batches must merge on top of this redesign and preserve its markup and assets.
