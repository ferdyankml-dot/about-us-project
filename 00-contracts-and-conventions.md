# 00. CONTRACTS.md — Kontrak Antar-Peran
## Disiapkan oleh Peran 1 (Frontend Lead) di Hari 0, dipakai SEMUA peran untuk kerja PARALEL

---

## Kenapa File Ini Ada

Model lama: Peran 3 tunggu Peran 2 merge dulu, Peran 5 tunggu Peran 3 merge dulu, dst → **berurutan, lambat**.

Model file ini: semua kontrak/interface disepakati **di awal, sebelum ada kode nyata**. Begitu kontrak fix, **5 developer (Peran 2–6) langsung checkout branch masing-masing dari `develop` di hari yang sama dan bekerja SIMULTAN**, memakai dummy/stub yang mengikuti kontrak ini. Tidak ada yang menunggu PR orang lain di-merge untuk mulai kerja. Integrasi nyata terjadi di **Integration Day** (lihat bagian 7).

Aturan emas: **selama kontrak di bawah ini dipatuhi, kode siapa pun boleh belum ada — tetap bisa saling "nyambung" saat digabung nanti.**

---

## 1. Kontrak Class CSS (Design System API)

Peran 2 WAJIB membuat class ini persis dengan nama berikut (isi/style boleh menyusul, tapi nama class fix dari hari 0). Peran 3, 4, 6 boleh langsung memakai nama-nama ini di HTML mereka **walau `css/components.css` masih kosong** — nanti begitu Peran 2 selesai, style otomatis "nempel" tanpa perlu ubah HTML.

```
.btn, .btn--primary, .btn--outline
.card, .card__image, .card__body, .card__title, .card__text
.container
.grid, .grid--2col, .grid--3col
h1–h6, .hero__tagline
```

> Peran 3/4/6: silakan pakai class-class ini di markup kalian dari hari 0, meski file `components.css` belum berisi apa-apa. Halaman akan terlihat polos tanpa style — itu wajar, style menyusul otomatis saat `develop` menarik hasil Peran 2.

---

## 2. Kontrak HTML Section & ID (Content Structure API)

Peran 3 WAJIB memakai `id` berikut di `index.html` (boleh kosongkan isinya dulu berupa placeholder teks, tapi wrapper + id harus ada dari hari 0 dan langsung di-push ke `develop` di commit pertama):

```html
<section id="hero"></section>
<section id="visi-misi"></section>
<section id="sejarah"></section>
<section id="tim"></section>
```

> Peran 4, 5, 6 TIDAK perlu menunggu isi section selesai. Cukup tahu id-nya sudah pasti ada, mereka bisa mulai menulis kode yang menyasar id tersebut (`document.querySelector('#tim')`, CSS `#hero { ... }`, dsb) sejak hari 0, di **sandbox/demo file mereka sendiri** (lihat bagian 6), lalu tempel ke `index.html` asli belakangan dalam PR kecil terpisah.

---

## 3. Kontrak Atribut Animasi

Disepakati bersama Peran 3 & 4 di hari 0:

```
data-animate="fade-up" | "fade-in" | "slide-left"
class is-visible   (ditambahkan otomatis oleh js/animations.js saat elemen masuk viewport)
```

> Peran 3 boleh langsung menaruh `data-animate="fade-up"` di elemen-elemen section saat menulis HTML pertama kali — tidak perlu menunggu `js/animations.js` jadi. Peran 4 tidak perlu menunggu HTML final — cukup tahu atribut apa yang akan dicari.

---

## 4. Kontrak Data API / JSON Shape

Peran 5 WAJIB mengembalikan data dengan bentuk PERSIS ini dari `php/api/team.php`:

```json
{
  "success": true,
  "data": [
    { "name": "string", "role": "string", "photo": "string (path relatif)" }
  ]
}
```

> Peran 3 membuat `js/data/team-dummy.js` dengan bentuk objek **identik** (name, role, photo) sejak hari 0. Karena bentuknya sama persis, saat Peran 5 selesai, tinggal ganti sumber data (`team-dummy.js` → `fetch('php/api/team.php')`) — tidak perlu ubah kode render sama sekali. Peran 5 tidak perlu menunggu HTML tim jadi; dia bisa test API-nya sendiri pakai `demo/data-test.html` (lihat bagian 6).

---

## 5. Kontrak ARIA & Aksesibilitas (Dipakai Semua Peran Sejak Awal, Bukan Cuma Peran 6 di Akhir)

Supaya Peran 6 tidak jadi "penambal" di akhir, semua peran menerapkan aturan dasar ini dari awal, dan Peran 6 audit **berkala setiap hari** (bukan cuma di ujung):

```
- Semua <img> WAJIB punya alt (Peran 3/5 yang menulis <img> mengisi ini langsung)
- Heading berurutan h1 > h2 > h3, tidak loncat (Peran 3 yang menjaga saat menulis section)
- Semua elemen interaktif harus bisa di-Tab (Peran 2 yang memastikan <button>/<a> dipakai, bukan <div onclick>)
- prefers-reduced-motion WAJIB didukung Peran 4 sejak animasi pertama dibuat
```

Peran 6 tetap membuat PR akhir untuk audit menyeluruh, tapi PR-nya jadi jauh lebih kecil karena dasar-dasarnya sudah benar sejak awal.

---

## 6. Sandbox / Demo File — Kunci Supaya Tidak Saling Menunggu

Setiap peran yang butuh "menguji" sesuatu terhadap HTML/data yang belum final membuat **file demo sendiri**, bukan menunggu `index.html` asli:

```
demo/
├── component-preview.html   (Peran 2 — preview semua komponen tanpa perlu index.html asli)
├── animation-test.html      (Peran 4 — test animasi dengan markup dummy sendiri)
└── data-test.html           (Peran 5 — test fetch API dengan HTML dummy sendiri)
```

File di folder `demo/` tidak pernah konflik dengan siapa pun karena masing-masing 100% milik satu peran. Ini yang memungkinkan kerja benar-benar simultan.

---

## 7. Jadwal Kerja Paralel

```
Hari 0 (Peran 1):
  - Setup struktur folder + CONTRACTS.md ini + push ke develop
  - Buat 5 branch feature/* dari develop, semua langsung open untuk dikerjakan

Hari 0–3 (Peran 2, 3, 4, 5, 6 — SIMULTAN, tidak ada yang menunggu):
  - Semua checkout branch masing-masing dari develop DI HARI YANG SAMA
  - Semua bekerja berdasarkan CONTRACTS.md, bukan menunggu kode nyata peran lain
  - Peran yang butuh uji coba nyata pakai folder demo/ milik sendiri
  - Commit & push ke branch masing-masing kapan saja, tidak perlu menunggu urutan

Hari 4 — INTEGRATION DAY (semua peran hadir bersama):
  - Merge PR satu per satu ke develop dengan urutan: 2 → 3 → 4 → 5 → 6
    (urutan merge ini teknis saja karena file index.html/components.css ditumpuk,
     BUKAN berarti Peran 3 baru boleh MULAI kerja setelah Peran 2 selesai — 
     mereka sudah kerja dari Hari 0, ini cuma urutan menggabungkan hasil)
  - Konflik diselesaikan bersama saat itu juga, karena semua kontribusi sudah
    mengikuti kontrak yang sama, konflik seharusnya kecil (hanya baris yang
    tumpang tindih, bukan struktur besar yang beda)

Hari 5 (Peran 6 + Peran 1):
  - Audit akhir singkat + merge develop → main
```

---

## 8. File Ownership Map (Ringkasan)

| File/Folder | Pemilik | Boleh disentuh peran lain? |
|---|---|---|
| `css/variables.css`, `css/components.css` | Peran 2 | Ya, tambahan kecil dengan koordinasi |
| `index.html` (section), `css/sections.css` | Peran 3 | Ya, atribut tambahan (animasi/ARIA) |
| `css/animations.css`, `js/animations.js` | Peran 4 | Jarang, koordinasi dulu |
| `php/api/*`, `js/api.js` | Peran 5 | Jarang, koordinasi dulu |
| `css/responsive.css` | Peran 6 | Milik penuh Peran 6 |
| `demo/*` | Sesuai sub-folder | Tidak, murni sandbox pribadi |

---

**Setelah file ini di-commit dan di-push ke `develop` oleh Peran 1, kirim sinyal "GO" ke seluruh tim — semua 5 developer boleh mulai bekerja hari itu juga, di waktu yang sama, tanpa saling menunggu.**
