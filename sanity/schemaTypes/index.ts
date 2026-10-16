import { article } from "./article";
import { demoContact } from "./demoContact";
import { demoSubmission } from "./demoSubmission";
import { interview } from "./interview";
import { pahlawanRow } from "./pahlawanRow";
import { playlist } from "./playlist";
import { siteSettings } from "./siteSettings";
import { video } from "./video";

/**
 * Two datasets, two schema sets, deliberately never mixed:
 *
 * - `contentSchemaTypes` → the public `production` dataset: articles, videos,
 *   playlists, the Pahlawan Kota directory and the site-wide settings singleton.
 * - `submissionSchemaTypes` → the private `submissions` dataset: demo queue rows
 *   and the manager contacts that must never be publicly readable.
 *
 * Keeping them apart is what lets the article and video reads stay tokenless and
 * CDN-cacheable while the PII stays behind the server token.
 */

export const contentSchemaTypes = [article, video, playlist, interview, siteSettings];

export const submissionSchemaTypes = [demoSubmission, demoContact];
