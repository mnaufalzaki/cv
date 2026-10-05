# Portofolio Muhammad Naufal Zaki

Versi source code lokal dari website portofolio bilingual Muhammad Naufal Zaki. Proyek ini tidak terikat pada hosting sebelumnya dan seluruh isi utama ditulis langsung di dalam source code.

## Yang dibutuhkan

- Node.js 22.13 atau lebih baru
- npm

Unduh Node.js versi LTS dari https://nodejs.org apabila belum terpasang.

## Menjalankan di lokal

1. Ekstrak file ZIP.
2. Buka Terminal, Command Prompt, atau terminal VS Code pada folder proyek.
3. Jalankan:

```bash
npm install
npm run dev
```

4. Buka http://localhost:3000 di browser.

Hentikan server dengan menekan `Ctrl+C` pada terminal.

Development memakai cache `.next-dev`, sedangkan build produksi memakai `.next`, sehingga build tidak mengganggu server development yang sedang berjalan.

## Membuat versi produksi

```bash
npm run build
npm run preview
```

Hasil website statis akan dibuat di folder `out`. Folder tersebut dapat diunggah ke layanan static hosting.

## Bagian yang paling sering diedit

- `app/portfolio-data.ts`: profil, pengalaman, proyek, skill, tautan GitHub/LinkedIn, dan isi bilingual.
- `components/portfolio-page.tsx`: struktur dan interaksi halaman.
- `app/globals.css`: warna, font, layout, animasi, dan tampilan responsif.
- `public/profile.jpg`: foto profil asli yang dipertahankan.
- `public/profile.webp`: foto teroptimasi yang digunakan halaman (512 px; tampilan dan crop tetap sama).
- `public/muhammad-naufal-zaki-cv.pdf`: CV yang dapat diunduh.
- `public/og-image.png`: gambar preview saat tautan website dibagikan.

## Sebelum hosting

Salin `.env.example` menjadi `.env.local`, lalu ganti nilai berikut dengan domain final:

```env
NEXT_PUBLIC_SITE_URL=https://domain-kamu.com
```

Setelah itu jalankan kembali `npm run build`.

## Struktur halaman

- `/` — beranda, pengalaman, pendidikan, proyek pilihan, skill, dan kontak.
- `/projects/` — daftar lengkap proyek dengan tautan GitHub dan demo jika tersedia. LinkedIn tetap tersedia pada profil dan footer.

Website mendukung bahasa Inggris/Indonesia serta tema gelap/terang. Pilihan pengguna disimpan di browser menggunakan `localStorage`.

Jika penyimpanan browser diblokir, pilihan tetap berlaku selama kunjungan dan navigasi antarhalaman. Setelah reload, browser tersebut kembali menggunakan bahasa Inggris dan tema gelap. Tema tersimpan diterapkan sebelum halaman tampil.

URL produksi dipusatkan di `lib/site-config.ts` dan digunakan oleh metadata, canonical, Open Graph, structured data, sitemap, dan robots. Nilai default adalah `https://naufalzaki.tech`; perubahan environment memerlukan build ulang.

## Intro dan kemunculan Home

Pembukaan Home pertama pada sesi tab menampilkan satu intro GSAP selama 6,6 detik, dengan scene WELCOME selama 1,8 detik. Semua scene memakai satu baris dengan Geist Mono: WELCOME pada latar hitam → TO MY PORTFOLIO pada latar putih → NAUFAL ZAKI PORTFOLIO pada latar hitam. Warna scene mengikuti urutan ini pada kedua tema website. Kata PORTFOLIO memakai satu elemen dan bergeser agar nama yang lebih panjang tetap berada di tengah. Fade terakhir berlangsung 1,5 detik.

Kemunculan kata pada seluruh Home dimulai pada detik 6,1 dan selesai sekitar detik 8,3. Latar samping tetap tersembunyi sampai 1 detik setelah intro selesai (detik 7,6), lalu fade in selama 3 detik dengan easing sine dan selesai pada detik 10,6. Animasi berjalan saat pembukaan, termasuk bagian di bawah layar, sehingga scroll tidak memutar animasi kembali. React merender wrapper kata; GSAP hanya mengubah opacity dan transform.

`components/portfolio-intro.tsx` mengatur sesi, interaksi, pemuatan GSAP, dan pembatalan; `lib/portfolio-motion.ts` mengatur timeline. Intro tidak memiliki tombol Skip. Escape, Tab, atau Shift+Tab langsung menampilkan seluruh konten dan memindahkan fokus ke skip link website. Reload, navigasi, Projects, URL dengan hash, reduced motion, JavaScript mati, dan session storage yang diblokir membuka konten langsung. Pengaman sebelum hidrasi 4,5 detik berubah menjadi 12 detik setelah GSAP mulai, termasuk fade latar yang ditunda. Untuk menonton ulang, buka Home pada tab baru.

## Pemeriksaan

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run test:preferences
npm run test:intro
npm run build
```

Laporan pemeriksaan browser, ukuran aset produksi, dan screenshot tersimpan di `artifacts/portfolio-audit/`.

Screenshot scene GSAP dan hasil pemeriksaannya tersimpan di `artifacts/portfolio-gsap/`.

Revisi terbaru dengan satu baris dan urutan hitam → putih → hitam tersimpan di `artifacts/portfolio-gsap-single-line/`.

Folder `artifacts/` berisi hasil pemeriksaan lokal dan diabaikan oleh Git. File tersebut tetap tersedia di komputer pengembang, tetapi tidak disertakan saat repository di-clone. Cache TypeScript (`*.tsbuildinfo`) juga diabaikan; `.env.example` tetap disertakan sebagai contoh konfigurasi.
