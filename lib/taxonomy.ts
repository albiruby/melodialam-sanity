/**
 * Shared vocabulary: the editorial desks and the demo-queue enums.
 *
 * These are the values the CMS stores, so the schema and anything reading the
 * data must agree on them exactly. Here they drive the field options and the
 * validation; in `melodialam-website` the same list narrows what comes back out
 * of a query and supplies the display labels.
 *
 * DUPLICATED, ON PURPOSE: `melodialam-website/lib/taxonomy.ts` holds the same
 * values, because the website validates demo submissions and labels articles
 * without importing from this repo. Change one, change the other.
 *
 * Kept dependency-free so the Studio bundle stays small.
 */

/* --- Articles ------------------------------------------------------------ */

export const ARTICLE_CATEGORY_VALUES = [
  "Fakta Musik",
  "Rekomendasi Melodi",
  "Bicara Melodi",
  "Liputan Panggung",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORY_VALUES)[number];

/* --- Demo queue ---------------------------------------------------------- */

/**
 * `BR-002` — a submission always starts `IN REVIEW` and only a curator moves it
 * on. `SHORTLISTED (SAMSARA)` and `APPROVED (ARTICLE)` are the two outcomes the
 * PRD names; `ARCHIVED` is the terminal state for a reviewed-and-parked
 * submission.
 *
 * A podcast-bound submission has no outcome of its own in `BR-002`, so it stays
 * `IN REVIEW` until a curator picks one.
 */
export const DEMO_STATUSES = [
  "IN REVIEW",
  "SHORTLISTED (SAMSARA)",
  "APPROVED (ARTICLE)",
  "ARCHIVED",
] as const;

export type DemoStatus = (typeof DEMO_STATUSES)[number];

/** The only status a public submission may be created with. */
export const DEMO_INITIAL_STATUS: DemoStatus = "IN REVIEW";

/** The two statuses a curator has approved, and so the only ones shown publicly. */
export const DEMO_APPROVED_STATUSES = ["SHORTLISTED (SAMSARA)", "APPROVED (ARTICLE)"] as const;

export const DEMO_GENRES = [
  "Indie Pop / Folk",
  "Alternative Rock / Shoegaze",
  "Surf Rock / Punk",
  "R&B / Soul / Jazz",
  "Ska / Reggae / Dub",
  "Electronic / Experimental",
] as const;

export const DEMO_PROGRAMS = [
  "Review Artikel dan Rekomendasi IG",
  "Live at Melodi Samsara",
  "Tamu Podcast Bicara Melodi",
] as const;

/** The list shape Sanity's `options.list` wants, from a readonly tuple. */
export function asOptions(values: readonly string[]): { title: string; value: string }[] {
  return values.map((value) => ({ title: value, value }));
}
