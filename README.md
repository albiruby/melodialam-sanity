# Melodi Alam — Sanity Studio

Content model and Studio for **Melodi Alam**. The website that reads this content
lives in [`albiruby/melodialam-website`](https://github.com/albiruby/melodialam-website).

| | |
|---|---|
| **Project** | `03sgar5q` |
| **Studio** | https://melodi-alam.sanity.studio |
| **Datasets** | `production` (public), `submissions` (private) |

---

## Menjalankan

Prasyarat: **Node.js >= 20**.

```bash
npm install
npm run dev        # Studio lokal di http://localhost:3333
```

Masuk dengan akun Sanity Anda. `npm run dev` menjalankan Studio standalone di port
**3333**, yang sudah terdaftar sebagai CORS origin project ini.

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Studio lokal di port 3333 |
| `npm run build` | Build Studio ke `dist/` |
| `npm run deploy` | Build + unggah ke https://melodi-alam.sanity.studio |
| `npm run typecheck` | `tsc --noEmit` |

Tidak ada variabel lingkungan yang diperlukan: project id dan nama dataset adalah
literal di `lib/sanity-project.ts` (lihat alasannya di berkas itu).

---

## Dua dataset, dan kenapa dipisah

| Dataset | ACL | Isi | Siapa yang membaca |
|---|---|---|---|
| `production` | publik | `article` | situs, tanpa token |
| `submissions` | **privat** | `demoSubmission`, `demoContact` | situs, **wajib token** |

Pemisahan ini bukan kerapian. Dataset Sanity yang publik dapat dibaca siapa pun
yang tahu project id, dan `demoContact` menyimpan nomor WhatsApp manajer musisi.
Menaruhnya di `production` berarti membocorkannya.

Terbukti: kueri tanpa token terhadap `submissions` mengembalikan `null` untuk
dokumen yang kueri sama kembalikan dengan token.

---

## Tipe konten

| Tipe | Workspace | Field penting |
|---|---|---|
| `article` | Konten | `title`, `slug`, `category`, `date`, `excerpt`, `image`, `body` (Portable Text), `featured` |
| `pahlawanRow` | Konten | `title`, `slug`, `artists`, `description`, `image` (+ `imagePath`), `tags`, `order` |
| `demoSubmission` | Antrean Demo | `artist`, `city`, `title`, `genre`, `program`, `link`, `story`, `status`, `submittedAt` |
| `demoContact` | Antrean Demo | `submission` (reference), `contact` |

### Moderasi antrean demo

`BR-002`: kiriman publik **selalu** dibuat sebagai `IN REVIEW` — situs tidak pernah
mengirim status lain. Hanya kurator yang mengubahnya, dan hanya
`SHORTLISTED (SAMSARA)` dan `APPROVED (ARTICLE)` yang tampil di antrean publik
(ADR-0005).

---

## Kosakata bersama dua repo

`lib/taxonomy.ts` dan `lib/sanity-project.ts` **sengaja diduplikasi** di
`melodialam-website`. Situs perlu nilai yang sama untuk memvalidasi kiriman demo,
memberi label artikel, dan membaca dataset — dan situs tidak boleh mengimpor dari
repo ini saat build.

Konsekuensinya: mengubah salah satunya berarti mengubah yang lain juga. Nilai yang
dimaksud adalah rubrik artikel (`ARTICLE_CATEGORY_VALUES`) dan seluruh enum antrean
demo (`DEMO_STATUSES`, `DEMO_GENRES`, `DEMO_PROGRAMS`).

---

## Setelah mengubah skema

```bash
npm run typecheck
npm run deploy          # skema ikut terunggah bersama Studio
```

`npm run deploy` mengunggah skema, jadi editor langsung mendapat struktur terbaru.
Untuk melihat apa yang akan diunggah tanpa mengubah apa pun:

```bash
npx sanity deploy --dry-run -y
```

Kalau perubahan skema menyentuh `lib/taxonomy.ts`, perbarui salinannya di
`melodialam-website` pada perubahan yang sama.

---

## Catatan verifikasi

- `npm run build` menghasilkan `dist/` tanpa error.
- `npm run deploy` → `https://melodi-alam.sanity.studio`, **2/2 skema** terunggah.
- 16 Oktober 2026: deploy ulang setelah menambah `pahlawanRow` — berhasil;
  `deployment.appId` dipin di `sanity.cli.ts` supaya `npm run deploy` tidak bertanya lagi.
- Bundel hasil build memuat `03sgar5q`, `production`, `submissions`, dan keempat
  rubrik artikel — yaitu literal dari `lib/sanity-project.ts` dan `lib/taxonomy.ts`
  benar-benar ter-*inline*, bukan `undefined`.
