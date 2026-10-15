import { defineField, defineType } from "sanity";

/**
 * A YouTube video, entered by hand.
 *
 * No API key and no scraping: an editor adds a video when it is published. The
 * fields are exactly what the site renders, so nothing has to be inferred.
 *
 * `publishedAt` is a real date rather than a captured "3d ago" string. That is
 * the whole point — the site computes the age at render, so the label can never
 * go stale the way the scraped catalogue's did.
 *
 * This type does NOT have to hold every video on the channel. The site treats
 * Sanity as authoritative and `lib/catalogue.json` as the back catalogue, so
 * entering a video here is what promotes it, and a `youtubeId` that already
 * exists in the catalogue replaces that entry.
 */
export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "youtubeId",
      title: "YouTube ID",
      type: "string",
      description:
        "11 karakter dari URL, mis. `KXtMZhIQD1E` pada youtube.com/watch?v=KXtMZhIQD1E. Ini yang mengikat video ini ke entri arsip, jadi harus tepat.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === "string" && !/^[\w-]{11}$/.test(value.trim())
              ? "YouTube ID biasanya 11 karakter (huruf, angka, - atau _)."
              : true,
          ),
    }),
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal terbit",
      type: "datetime",
      description: "Umur video di situs dihitung dari sini, bukan disimpan sebagai teks.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "durationSeconds",
      title: "Durasi (detik)",
      type: "number",
      description: "Isi detik saja, mis. 816 untuk 13:36. Situs memformatnya.",
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "views",
      title: "Jumlah tayangan",
      type: "number",
      description: "Angka mentah, mis. 1800. Diperbarui manual.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "venue",
      title: "Program",
      type: "string",
      options: {
        list: [
          { title: "Melodi Samsara", value: "Melodi Samsara" },
          { title: "Melodi Taman", value: "Melodi Taman" },
          { title: "Interview", value: "Interview" },
          { title: "Arsip & Lainnya", value: "Arsip & Lainnya" },
        ],
        layout: "radio",
      },
      initialValue: "Melodi Samsara",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuring",
      title: "Featuring",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Nama artis yang tampil, satu per tag.",
    }),
    defineField({
      name: "featured",
      title: "Tampilkan di beranda",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Terbaru", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Paling ditonton", name: "viewsDesc", by: [{ field: "views", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "venue", date: "publishedAt", views: "views" },
    prepare: ({ title, subtitle, date, views }) => ({
      title: title ?? "(tanpa judul)",
      subtitle: [
        subtitle,
        date ? new Date(date).toISOString().slice(0, 10) : null,
        typeof views === "number" ? `${views.toLocaleString("id-ID")} tayangan` : null,
      ]
        .filter(Boolean)
        .join(" • "),
    }),
  },
});
