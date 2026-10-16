import type { StructureBuilder } from "sanity/structure";

/**
 * Structures for the two workspaces.
 *
 * The only real job here is pinning the singletons: they must open directly,
 * and they must not appear in a list where an editor could create a second
 * one. Everything else is the default document-type list.
 */

/** Document types that must never show as a creatable list. */
const SINGLETONS = ["siteSettings", "videosPage"];

export const contentStructure = (S: StructureBuilder) =>
  S.list()
    .title("Konten")
    .items([
      S.listItem()
        .title("Pengaturan Situs")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Halaman Videos")
        .id("videosPage")
        .child(S.document().schemaType("videosPage").documentId("videosPage")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() ?? "")),
    ]);

export const submissionsStructure = (S: StructureBuilder) =>
  S.list().title("Submit Karya").items(S.documentTypeListItems());
