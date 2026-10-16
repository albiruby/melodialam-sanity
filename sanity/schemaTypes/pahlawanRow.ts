import { defineField, defineType } from "sanity";

/**
 * One row of the Pahlawan Musik Kota & Skena directory.
 *
 * Curated, not derived: which city or scene deserves a row is an editorial
 * call, and the list stays short on purpose. The row is a signpost rather than
 * a link — the READ/WATCH action group was removed on request — so there is
 * deliberately no `videoId` or `articleSlug` field here. Target fields only
 * make sense again together with a UI that renders an action.
 *
 * `imagePath` follows the article convention: a local path in the website repo
 * used until an editor uploads a real image.
 */
export const pahlawanRow = defineType({
  name: "pahlawanRow",
  title: "Pahlawan Kota",
  description: "Baris direktori genre dan skena. Tampil di halaman Pahlawan Kota.",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul baris",
      type: "string",
      description: 'Mis. "Bogor dan Pamulang — Indie Folk / Chamber Pop".',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Kunci stabil baris ini di situs. Generate dari judul sudah cukup.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "artists",
      title: "Musisi",
      type: "string",
      description: 'Nama dipisah titik tengah, mis. "Endah N Rhesa • Starrducc • Topi Jerami".',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "image",
      title: "Gambar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePath",
      title: "Path gambar sementara",
      type: "string",
      description:
        "Untuk baris yang belum punya gambar terunggah: path lokal seperti /photos/dsc08397.webp. Dipakai hanya kalau Gambar kosong — unggah Gambar untuk menggantinya.",
      hidden: ({ document }) => Boolean(document?.image),
    }),
    defineField({
      name: "tags",
      title: "Tag",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Label kecil di bawah deskripsi, mis. indie pop, folk.",
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      description: "Kecil ke besar. Kosongkan untuk mengurutkan dari judul.",
    }),
  ],
  orderings: [
    { title: "Urutan tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Judul", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "artists", media: "image" },
  },
});
