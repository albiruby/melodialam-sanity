import type { StructureBuilder } from "sanity/structure";

/**
 * Structures for the two workspaces.
 *
 * The only real job here is pinning the `siteSettings` singleton: it must open
 * directly, and it must not appear in a list where an editor could create a
 * second one. Everything else is the default document-type list.
 */

/** Document types that must never show as a creatable list. */
const SINGLETONS = ["siteSettings"];

export const contentStructure = (S: StructureBuilder) =>
  S.list()
    .title("Konten")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() ?? "")),
    ]);

export const submissionsStructure = (S: StructureBuilder) =>
  S.list().title("Antrean Demo").items(S.documentTypeListItems());
