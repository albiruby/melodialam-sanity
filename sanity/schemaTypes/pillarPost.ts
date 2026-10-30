import { defineField, defineType } from "sanity";

/**
 * Instagram feed posts, grouped by content pillar.
 *
 * The team curates a pool per pillar in the Studio. `/discover` renders the
 * groups; the homepage Discover section takes the first five photo posts in
 * `order`. Leave `order` empty and the pool falls back to newest-first.
 */
export const pillarPost = defineType({
  name: "pillarPost",
  title: "Konten Pillar",
  description:
    "Post Instagram terkurasi per pillar. Tampil di halaman Discover (/discover); lima post foto pertama juga tampil di Discover beranda.",
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
      description: "Discover beranda hanya memakai feed foto; reel tetap tampil di /discover.",
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
      description:
        "Beranda mengambil tiga post foto pertama sesuai urutan ini. Kosongkan untuk urut tanggal terbaru.",
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
