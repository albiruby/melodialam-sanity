/**
 * Public Sanity identifiers for the Studio.
 *
 * These are literals, not environment variables, and that is deliberate.
 *
 * `sanity.config.ts` is read by TWO different bundlers across the two repos:
 *
 * - This repo's Sanity/Vite build, which produces the hosted Studio at
 *   melodi-alam.sanity.studio. Vite's `envPrefix` exposes only `SANITY_STUDIO_*`,
 *   and it exposes them as `import.meta.env`, not `process.env`.
 * - Next, in `melodialam-website`, when it reads content from the same project.
 *   Next inlines `NEXT_PUBLIC_*` into the client bundle.
 *
 * A config that reads either form breaks the other build: the hosted Studio once
 * shipped with all three values `undefined` and refused to boot. A literal is the
 * one shape both bundlers agree on.
 *
 * None of this is secret. The project id appears in every Studio URL and in every
 * image URL Sanity serves. The things that ARE secret — the read token and the
 * webhook secret — belong to the website, never here.
 *
 * Keep this module dependency-free: it is pulled into the Studio bundle.
 *
 * DUPLICATED, ON PURPOSE: `melodialam-website/lib/sanity-project.ts` holds the
 * same three values, because the website needs them to read the datasets. Change
 * one, change the other.
 */

/** Sanity project. */
export const SANITY_PROJECT_ID = "03sgar5q";

/** Public dataset: articles and their images. */
export const SANITY_DATASET = "production";

/** Private dataset: the demo queue and the manager contacts behind it. */
export const SANITY_SUBMISSIONS_DATASET = "submissions";
