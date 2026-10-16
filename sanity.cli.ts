import { defineCliConfig } from "sanity/cli";
import { SANITY_DATASET, SANITY_PROJECT_ID } from "./lib/sanity-project";

/**
 * Config for the Sanity CLI.
 *
 * `studioHost` is the subdomain the Studio is published at:
 * `https://melodi-alam.sanity.studio`. Changing it here and redeploying moves the
 * Studio; the old hostname stops working.
 *
 * The identifiers are literals from `lib/sanity-project.ts` rather than env vars
 * — see that module for why.
 */

export default defineCliConfig({
  api: { projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET },
  studioHost: "melodi-alam",
  // Pinned so `sanity deploy` never prompts for the application id again.
  deployment: { appId: "c5dgz2kfpyz1u2tc1b7yni6j" },
});
