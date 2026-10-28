import { defineField, defineType } from "sanity";

/**
 * Site-wide copy and contact facts — a singleton.
 *
 * One document with the fixed id `siteSettings`, pinned at the top of the
 * Konten structure so an editor cannot create a second one. The site reads it
 * for the footer name, the Stories-page note and hover curtain, and the two
 * contact addresses.
 *
 * Not here, deliberately:
 * - Header brand copy and navigation are code-owned; the current masthead does
 *   not read a tagline, strapline, owner or EST from the CMS.
 * - The ticker was removed from the site; its old fields are no longer exposed.
 * - `url` and `locale` are technical, and the origin has to come from the
 *   environment so a preview deployment produces correct canonical URLs.
 * - Navigation and footer links map to routes that exist in code; making them
 *   editable invites dead links.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  description:
    "Identitas situs, catatan kurasi, panel kartu, dan kontak. Dipakai di footer, halaman Stories, dan halaman kontak.",
  type: "document",
  fieldsets: [
    { name: "brand", title: "Identitas", options: { collapsible: false } },
    { name: "contact", title: "Kontak", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nama situs",
      type: "string",
      fieldset: "brand",
      description: "Muncul di copyright footer.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "curationNote",
      title: "Catatan kurasi",
      type: "string",
      fieldset: "brand",
      description:
        'Muncul kecil di samping judul Stories, mis. "kurasi redaksi". Jangan taruh bulan atau tahun di sini — itu akan kedaluwarsa.',
      validation: (rule) => rule.max(60),
    }),

    defineField({
      name: "cardCurtain",
      title: "Panel hijau kartu (hover)",
      type: "object",
      description: "Label pada panel hijau yang muncul saat kursor di atas kartu artikel.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "articleLabel",
          title: "Label kanan atas (kartu Stories)",
          type: "string",
          description: 'Kosong = "READ STORY".',
          initialValue: "READ STORY",
          validation: (rule) => rule.max(24),
        }),
        defineField({
          name: "articleCta",
          title: "Tombol bawah (kartu Stories)",
          type: "string",
          description: 'Kosong = "Buka Catatan Redaksi".',
          initialValue: "Buka Catatan Redaksi",
          validation: (rule) => rule.max(40),
        }),
      ],
    }),

    defineField({
      name: "contactEmail",
      title: "Email redaksi",
      type: "string",
      fieldset: "contact",
      description: "Muncul di footer, halaman privasi, ketentuan, dan tentang. Kosong = fallback situs.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "partnerEmail",
      title: "Email partnership",
      type: "string",
      fieldset: "contact",
      description: "Muncul di footer dan halaman tentang. Kosong = fallback situs.",
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "curationNote" },
  },
});
