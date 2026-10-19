import { article } from "./article";
import { demoContact } from "./demoContact";
import { demoSubmission } from "./demoSubmission";
import { interview } from "./interview";
import { pahlawanRow } from "./pahlawanRow";
import { pillarPost } from "./pillarPost";
import { playlist } from "./playlist";
import { siteSettings } from "./siteSettings";
import { video } from "./video";
import { videosPage } from "./videosPage";

/**
 * Two datasets, two schema sets, deliberately never mixed:
 *
 * - `contentSchemaTypes` → the public `production` dataset: articles (Stories),
 *   Bicara Melodi interviews, videos, playlists, the Pahlawan Kota directory and
 *   the site-wide settings singleton. The order below is the order of the
 *   website's navigation, because the Studio sidebar follows it.
 * - `submissionSchemaTypes` → the private `submissions` dataset: demo queue rows
 *   and the manager contacts that must never be publicly readable.
 *
 * Keeping them apart is what lets the article and video reads stay tokenless and
 * CDN-cacheable while the PII stays behind the server token.
 */

export const contentSchemaTypes = [
  article,
  interview,
  video,
  playlist,
  pillarPost,
  pahlawanRow,
  siteSettings,
  videosPage,
];

export const submissionSchemaTypes = [demoSubmission, demoContact];
