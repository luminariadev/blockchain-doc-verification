# 🔗 Blockchain Document Verification System

> Implementasi Blockchain untuk Menjamin Integritas Data pada Sistem Penyimpanan Dokumen Digital

[![SvelteKit](https://img.shields.io/badge/SvelteKit-4A4A55?style=flat-square&logo=svelte&logoColor=FF3E00)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Ethers](https://img.shields.io/badge/Ethers.js-2535a0?style=flat-square&logo=ethereum&logoColor=white)](https://docs.ethers.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Folder](#-struktur-folder)
- [Cara Install & Jalankan](#-cara-install--jalankan)
- [Cara Pakai](#-cara-pakai)
- [Tim Pengembang](#-tim-pengembang)
- [Roadmap](#-roadmap)

---

## 🎯 Tentang Proyek

Prototype sistem penyimpanan dokumen digital berbasis web yang menggunakan **SHA-256** dan **blockchain** untuk menjamin integritas dokumen.

**Konsep:**
- Dokumen asli disimpan secara lokal
- Hash SHA-256 dari dokumen dicatat ke blockchain
- Verifikasi dilakukan dengan membandingkan hash

---

## ✨ Fitur Utama

| Fitur | Status |
|:------|:------:|
| Upload dokumen (PDF, DOCX, TXT, JPG, PNG) | ✅ |
| Generate hash SHA-256 | ✅ |
| Simpan hash ke blockchain (mock) | ✅ |
| Verifikasi keaslian dokumen | ✅ |
| Dashboard history | 🚧 |
| Koneksi testnet nyata (Sepolia) | 🚧 |

✅ = Selesai | 🚧 = Dalam pengerjaan

---

## 🛠 Teknologi

| Lapisan | Teknologi |
|:--------|:----------|
| Frontend | SvelteKit 5 + TypeScript |
| Backend API | SvelteKit API Routes |
| Hashing | Node.js crypto (SHA-256) |
| Blockchain | ethers.js + Solidity |
| Styling | Native CSS |
| Dev Tools | Vite, ESLint, Prettier |

---

## 📁 Struktur Folder

```
blockchain-doc-verification/
│
├── src/
│   ├── lib/
│   │   ├── blockchain/
│   │   │   └── client.ts          # Blockchain client
│   │   ├── utils/
│   │   │   └── hashing.ts         # SHA-256 utility
│   │   └── types/
│   │       └── index.ts           # Type definitions
│   │
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte           # Halaman utama
│   │   │
│   │   └── api/
│   │       ├── hash/+server.ts    # POST /api/hash
│   │       ├── store/+server.ts   # POST /api/store
│   │       └── verify/+server.ts  # POST /api/verify
│   │
│   ├── app.html
│   └── app.d.ts
│
├── contracts/                      # Smart contract (coming soon)
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Cara Install & Jalankan

### Prasyarat

| Software | Minimal |
|:---------|:-------:|
| Node.js | v18+ |
| npm | v9+ |

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/blockchain-doc-verification.git
cd blockchain-doc-verification

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env

# 4. Jalankan development server
npm run dev
```

Buka `http://localhost:5173`

### Command Tersedia

| Command | Fungsi |
|:--------|:-------|
| `npm run dev` | Jalankan dev server |
| `npm run build` | Build production |
| `npm run preview` | Preview production |
| `npm run check` | Type checking |
| `npm run format` | Format code |
| `npm run lint` | Lint code |

---

## 📖 Cara Pakai

### Upload & Simpan Dokumen

1. Buka tab **"Upload & Store Document"**
2. Pilih file
3. Klik **"Upload & Store ke Blockchain"**
4. **Simpan Document ID** yang muncul (kode unik untuk verifikasi nanti)

### Verifikasi Dokumen

1. Buka tab **"Verify Document"**
2. Masukkan **Document ID**
3. Pilih file yang akan dicek
4. Klik **"Verifikasi Dokumen"**

Hasil:
- ✅ **VALID** = Dokumen asli, belum diubah
- ❌ **TIDAK VALID** = Dokumen sudah diubah/manipulasi

---

## 👥 Tim Pengembang

| Nama | Peran | GitHub |
|:-----|:------|:-------|
| Wisnu Uriawan | Dosen Pembimbing | @wisnu |
| Syahir Mohamad Ramdhan | Backend & Blockchain | @syahirmr125 |
| Salma Nur Oktavia | Frontend | @salmanuroktavia |
| Rizkia Nuari Fujiana | UI/UX & Testing | @rizkianuari83 |
| Yan Syafiq Albari | Dokumentasi & QA | @albarisyafiq04 |

---

## 📅 Roadmap

| Sprint | Target | Status |
|:------:|:-------|:------:|
| 1 | Hashing + UI dasar | ✅ |
| 2 | Smart Contract + Hardhat | 🔄 |
| 3 | Integrasi testnet Sepolia | ⏳ |
| 4 | Dashboard history | ⏳ |
| 5 | Testing & dokumentasi | ⏳ |

---

## 🤝 Panduan Kontribusi (Untuk Tim)

### Branching

```bash
# Pull terbaru
git checkout develop
git pull origin develop

# Buat branch fitur baru
git checkout -b feat/nama-fitur
git checkout -b fix/nama-bug
```

### Commit Message

| Prefix | Contoh |
|:-------|:-------|
| `feat:` | `feat: add dashboard history` |
| `fix:` | `fix: file upload error` |
| `docs:` | `docs: update README` |
| `style:` | `style: run prettier` |
| `refactor:` | `refactor: simplify hashing` |

### Push & Pull Request

```bash
git add .
git commit -m "feat: deskripsi singkat"
git push origin feat/nama-fitur
```

Lalu buat Pull Request di GitHub ke branch `develop`.

---

## 📞 Bantuan

| Keperluan | Cara |
|:----------|:-----|
| Bug report | Buat Issue dengan label `bug` |
| Feature request | Buat Issue dengan label `enhancement` |
| Pertanyaan | Diskusi di grup WhatsApp |

---

## 📜 Lisensi

MIT License - lihat file [LICENSE](LICENSE)

---

<div align="center">
  <sub>Dibuat dengan ❤️ oleh Kelompok 5 Sistem Terdistribusi | Informatics Department UIN Bandung</sub>
</div>
