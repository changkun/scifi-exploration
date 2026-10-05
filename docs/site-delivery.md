# Complete corpus, smaller publication package

The public `main` branch contains the full website, all lossless data shards, the research inputs and the complete corpus. Its data is not reduced for publication.

The Sites upload path repeatedly timed out on a roughly 39 MB compressed archive. `scripts/build-site-delivery.mjs` makes a separate delivery bundle from one exact Git commit already published to GitHub. It preserves the site's design and static documents. The four large JSON shard directories and compressed exports remain in the full repository; the delivery loader and download links request those exact bytes from `raw.githubusercontent.com` at the same immutable commit. Bibliographic and completion manifests also use that commit. Every view still receives the complete unified universe.

Run from the full repository, after confirming the dataset commit was pushed:

```sh
node scripts/build-site-delivery.mjs --dataset-commit <full-40-character-Git-SHA> --output <empty-directory>
node scripts/validate-site-delivery.mjs <same-directory>
```

The output's `assets/site-delivery.json` records the dataset commit, remote base, original asset hashes and remote shard directories. Resolve downloaded manifest paths against that documented base. The existing full-corpus download link using `main` follows the latest repository data; it is not a frozen snapshot link.

Validation compares every bibliographic and completion field, every detail-shard record, preserved documents/downloads/design bytes and rejection of a missing shard. A real browser check must additionally confirm that cross-origin GitHub requests load and that opening a detail works. A network failure remains an error rather than silently showing partial counts.

Publish the generated `dist` in a separate delivery checkout through the normal Sites source helper, archive save and deployment flow. Keep the full `main` checkout intact. The `site-delivery` branch records the generated website source; its dataset pin must advance only to another confirmed public commit. The application now depends on both Sites for static assets and GitHub Raw for its full data.
