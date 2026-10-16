import { defineField, defineType } from "sanity";

/**
 * A YouTube playlist, shown in the block below the video catalogue.
 *
 * `count` is a number the editor keeps current; the site formats it. It is
 * separate from `videos` because a playlist on YouTube can hold videos the site
 * never lists.
 */
export const playlist = defineType({
  name: "playlist",
  title: "Playlists",
  description: "Playlist YouTube. Tampil di bagian Playlists pada halaman Videos.",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "playlistId",
      title: "YouTube playlist ID",
      type: "string",
      description: "Dari URL playlist, mis. `PL…` pada youtube.com/playlist?list=PL…",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "count",
      title: "Jumlah video",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      description: "Kecil ke besar. Kosongkan untuk mengurutkan dari jumlah terbanyak.",
    }),
  ],
  orderings: [
    { title: "Urutan tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Terbanyak", name: "countDesc", by: [{ field: "count", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", count: "count" },
    prepare: ({ title, count }) => ({
      title: title ?? "(tanpa judul)",
      subtitle: typeof count === "number" ? `${count} video` : undefined,
    }),
  },
});
