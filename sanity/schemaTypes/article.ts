import { defineField, defineType } from "sanity";
import { ARTICLE_CATEGORY_VALUES, CATEGORY_LABELS } from "../../lib/taxonomy";

/**
 * An editorial article — the "Stories" page on the site. Lives in the public
 * `production` dataset, so reads need no token and can be served through the CDN.
 */
export const article = defineType({
  name: "article",
  title: "Stories",
  description:
    "Esai, liputan panggung, dan catatan redaksi. Tampil di beranda Latest News dan halaman Stories (/journal).",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Menjadi alamat URL: /journal/<slug>. Ganti setelah terbit akan mematikan URL lama.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Rubrik",
      type: "string",
      options: {
        list: ARTICLE_CATEGORY_VALUES.map((value) => ({ title: CATEGORY_LABELS[value], value })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Tanggal terbit",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan",
      description: "Dipakai di kartu, meta description, dan JSON-LD.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "image",
      title: "Sampul",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePath",
      title: "Path gambar sementara",
      type: "string",
      description:
        "Untuk artikel yang belum punya sampul terunggah: path lokal seperti /photos/dsc09408.webp. Dipakai hanya kalau Sampul kosong — unggah Sampul untuk menggantinya.",
      hidden: ({ document }) => Boolean(document?.image),
    }),
    defineField({
      name: "body",
      title: "Isi",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  orderings: [
    {
      title: "Terbaru",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
