import { defineField, defineType } from "sanity";

/**
 * Copy for the /videos page's three section heads — a singleton.
 *
 * One document with the fixed id `videosPage`, pinned in the Konten structure
 * so an editor cannot create a second one. The site falls back to the strings
 * the page hard-coded before the CMS owned them, and the small notes default to
 * live counts ("9 episode pilihan", "101 sesi panggung"), so an empty field is
 * always safe and never goes stale.
 */
export const videosPage = defineType({
  name: "videosPage",
  title: "Halaman Melodi Samsara",
  description:
    "Judul, catatan kecil, dan label tautan pada bagian-bagian halaman Melodi Samsara.",
  type: "document",
  fieldsets: [
    { name: "samsara", title: "Bagian Melodi Samsara", options: { collapsible: false } },
    { name: "playlists", title: "Bagian Playlists", options: { collapsible: false } },
  ],
  fields: [
    defineField({
      name: "samsaraTitle",
      title: "Judul",
      type: "string",
      fieldset: "samsara",
      initialValue: "Melodi Samsara",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "samsaraNote",
      title: "Catatan kecil",
      type: "string",
      fieldset: "samsara",
      description:
        'Muncul kecil di samping judul. Kosong = dihitung otomatis, mis. "101 sesi panggung".',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "samsaraLinkLabel",
      title: "Label tautan kanan",
      type: "string",
      fieldset: "samsara",
      description: 'Kosong = "YouTube Channel". Tanda ↗ ditambahkan situs.',
      initialValue: "YouTube Channel",
      validation: (rule) => rule.max(60),
    }),

    defineField({
      name: "playlistsTitle",
      title: "Judul",
      type: "string",
      fieldset: "playlists",
      initialValue: "Playlists",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "playlistsNote",
      title: "Catatan kecil",
      type: "string",
      fieldset: "playlists",
      description:
        'Kosong = dihitung otomatis, mis. "5 playlist publik • melodialam".',
      validation: (rule) => rule.max(60),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Halaman Videos" }),
  },
});
