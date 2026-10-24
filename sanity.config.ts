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
    title: "Submit Karya",
    basePath: "/submissions",
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_SUBMISSIONS_DATASET,
    // No `visionTool` here on purpose. It is a free GROQ console, and this
    // workspace is the private one: it holds the demo queue and the manager
    // contacts. Anyone with access to the workspace already sees the documents
    // through the structure, but the console would let them read, in one query,
    // every contact at once — and to keep it there would be a standing invitation
    // to paste a document somewhere it does not belong.
    plugins: [structureTool({ structure: submissionsStructure })],
    schema: { types: submissionSchemaTypes },
  },
]);
