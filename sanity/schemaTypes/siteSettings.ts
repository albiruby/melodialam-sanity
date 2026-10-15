import { defineField, defineType } from "sanity";

/**
 * Site-wide copy and channel facts — a singleton.
 *
 * One document with the fixed id `siteSettings`, pinned at the top of the
 * Konten structure so an editor cannot create a second one. The site reads it
 * for the header, the footer, page metadata and the home-page ticker.
 *
 * Not here, deliberately:
 * - `url` and `locale` are technical, and the origin has to come from the
 *   environment so a preview deployment produces correct canonical URLs.
 * - Navigation and footer links map to routes that exist in code; making them
 *   editable invites dead links.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fieldsets: [
    { name: "brand", title: "Identitas", options: { collapsible: false } },
    { name: "channel", title: "Fakta kanal", options: { collapsible: true, collapsed: false } },
    { name: "ticker", title: "Ticker beranda", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nama situs",
      type: "string",
      fieldset: "brand",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      fieldset: "brand",
      description: "Muncul di header dan di judul metadata.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "strapline",
      title: "Strapline",
      type: "string",
      fieldset: "brand",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "owner",
      title: "Pemilik",
      type: "string",
      fieldset: "brand",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "est",
      title: "Berdiri",
      type: "string",
      fieldset: "brand",
      description: 'Ditulis apa adanya, mis. "EST. 2017".',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 3,
      fieldset: "brand",
      description: "Meta description bawaan untuk halaman yang tidak punya sendiri.",
      validation: (rule) => rule.max(300),
    }),

    defineField({
      name: "youtubeSubscribers",
      title: "Subscriber YouTube",
      type: "string",
      fieldset: "channel",
      description: 'Ditulis seperti tampil di YouTube, mis. "20.9K".',
    }),
    defineField({
      name: "youtubeVideos",
      title: "Jumlah video (diklaim kanal)",
      type: "string",
      fieldset: "channel",
    }),
    defineField({
      name: "youtubeViews",
      title: "Total tayangan",
      type: "string",
      fieldset: "channel",
    }),
    defineField({ name: "youtubeJoined", title: "Bergabung", type: "string", fieldset: "channel" }),
    defineField({
      name: "instagramFollowers",
      title: "Follower Instagram",
      type: "string",
      fieldset: "channel",
    }),
    defineField({
      name: "instagramPosts",
      title: "Postingan Instagram",
      type: "string",
      fieldset: "channel",
    }),
    defineField({
      name: "scrapedAt",
      title: "Terakhir diperbarui",
      type: "string",
      fieldset: "channel",
      description: "Kapan angka-angka di atas terakhir dicek.",
    }),

    defineField({
      name: "tickerItems",
      title: "Item ticker",
      type: "array",
      fieldset: "ticker",
      of: [
        {
          type: "object",
          name: "tickerItem",
          fields: [
            defineField({
              name: "label",
              title: "Teks",
              type: "string",
              validation: (rule) => rule.required().max(200),
            }),
            defineField({
              name: "href",
              title: "Tautan",
              type: "string",
              description: "Opsional. Boleh path internal (/submit) atau URL penuh.",
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
      validation: (rule) => rule.max(8),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline" },
  },
});
