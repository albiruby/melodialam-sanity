import { defineField, defineType } from "sanity";

/**
 * Curated Instagram posts, grouped by content pillar.
 *
 * The team curates a pool per pillar in the Studio; the site renders the first
 * few of each pillar as "Dari Feed" sections on /stories (photo pillars) and
 * /videos (reel pillars). `order` carries the curation order — leave it empty
 * and the section falls back to newest-first.
 */
export const pillarPost = defineType({
  name: "pillarPost",
  title: "Konten Pillar",
  description:
    "Post Instagram terkurasi per pillar konten. Tampil di section \"Dari Feed\" pada Stories dan Videos.",
  type: "document",
  fields: [
    defineField({
      name: "pillar",
      title: "Pillar",
      type: "string",
      options: {
        list: [
          { title: "Fakta Musik", value: "fakta-musik" },
          { title: "Lirik", value: "lirik" },
          { title: "Trivia", value: "trivia" },
          { title: "Kutipan Melodi Alam", value: "kutipan" },
          { title: "Rekomendasi Melodi", value: "rekomendasi" },
          { title: "Ulas Melodi", value: "ulas-melodi" },
          { title: "Clipper", value: "clipper" },
          { title: "Similar Song", value: "similar-song" },
          { title: "Meme Humor", value: "meme-humor" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Judul / kutipan caption",
      type: "string",
      description: "Satu baris pembuka caption. Muncul di kartu.",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "mediaType",
      title: "Jenis media",
      type: "string",
      options: {
        list: [
          { title: "Feed foto", value: "foto" },
          { title: "Reel", value: "reel" },
        ],
      },
      initialValue: "foto",
    }),
    defineField({
      name: "date",
      title: "Tanggal post",
      type: "date",
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "number",
      description: "Perkiraan dari tampilan Instagram; boleh dikosongkan.",
    }),
    defineField({
      name: "igUrl",
      title: "Link Instagram",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Gambar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Urutan kurasi",
      type: "number",
      description: "Kosongkan untuk urut tanggal terbaru.",
    }),
  ],
  orderings: [
    {
      title: "Pillar lalu urutan kurasi",
      name: "pillarOrder",
      by: [
        { field: "pillar", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "pillar", media: "image" },
  },
});
