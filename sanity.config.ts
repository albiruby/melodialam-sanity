"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_SUBMISSIONS_DATASET,
} from "./lib/sanity-project";
import { contentSchemaTypes, submissionSchemaTypes } from "./sanity/schemaTypes";
import { contentStructure, submissionsStructure } from "./sanity/structure";

/**
 * Two workspaces, one Studio.
 *
 * The split is not cosmetic: `production` is a public dataset, so the website can
 * read it with no credentials, while `submissions` is private and holds musician
 * contact details. A single workspace cannot span both datasets.
 *
 * `basePath` is required per workspace once there is more than one — it is not
 * optional even for a standalone Studio. These are the paths the hosted Studio
 * serves: https://melodi-alam.sanity.studio/content and /submissions.
 *
 * The identifiers come from `lib/sanity-project.ts` as literals rather than env
 * vars, because this config has been built by two different bundlers. See that
 * module.
 */

export default defineConfig([
  {
    name: "content",
    title: "Konten",
    basePath: "/content",
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    plugins: [structureTool({ structure: contentStructure }), visionTool()],
    schema: { types: contentSchemaTypes },
  },
  {
    name: "submissions",
    title: "Antrean Demo",
    basePath: "/submissions",
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_SUBMISSIONS_DATASET,
    plugins: [structureTool({ structure: submissionsStructure }), visionTool()],
    schema: { types: submissionSchemaTypes },
  },
]);
