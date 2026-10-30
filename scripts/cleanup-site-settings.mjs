import { getCliClient } from "sanity/cli";

/**
 * One-off cleanup for `siteSettings`.
 *
 * These fields were removed from the schema over the last passes but are still
 * stored in the production document. The site never reads them, and the Studio
 * no longer shows them, so they are invisible dead data. Unset once; safe to
 * re-run because `unset` on a missing path is a no-op.
 */
const client = getCliClient({ apiVersion: "2025-01-01" });

const FIELDS = [
  "curationNote",
  "description",
  "est",
  "owner",
  "strapline",
  "tagline",
  "tickerItems",
  "cardCurtain.featureLabel",
  "cardCurtain.featureCta",
];

const result = await client
  .patch("siteSettings")
  .unset(FIELDS)
  .commit({ visibility: "async" });

console.log(`siteSettings cleaned: ${result._id} (${result._rev})`);
