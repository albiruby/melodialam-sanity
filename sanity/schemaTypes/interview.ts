import { defineField, defineType } from "sanity";

/**
 * A curated row on the Bicara Melodi index.
 *
 * This is not a mirror of the video catalogue — it is the editor's short list of
 * episodes worth putting on the front of the section. The video stats come from
 * the `video` document with the same `youtubeId` (or the catalogue behind it),
 * so nothing here has to be kept in sync by hand.
 *
 * No image field: the card uses the episode's YouTube thumbnail, which is
 * derived from `youtubeId` and therefore always matches the real video.
 */
export const interview = defineType({
  name: "interview",
  title: "Bicara Melodi",
  description:
    "Episode pilihan untuk halaman Bicara Melodi dan teaser beranda. Thumbnail diambil dari YouTube ID.",
  type: "document",
  fields: [
    defineField({
      name: "artist",
      title: "Nama musisi",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Huruf besar semua, mengikuti judul episode di YouTube.",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube ID",
      type: "string",
      description: "Video episodenya. Thumbnail dan statistik diambil dari sini.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === "string" && !/^[\w-]{11}$/.test(value.trim())
              ? "YouTube ID biasanya 11 karakter."
              : true,
          ),
    }),
    defineField({
      name: "caption",
      title: "Keterangan kecil",
      type: "string",
      description: 'Muncul dalam tanda kurung, mis. "bicara melodi ep.30".',
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      description: "Kecil ke besar. Kosongkan untuk mengurutkan dari yang terbaru.",
    }),
  ],
  orderings: [
    { title: "Urutan tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Nama", name: "artistAsc", by: [{ field: "artist", direction: "asc" }] },
  ],
  preview: {
    select: { title: "artist", subtitle: "headline" },
  },
});
