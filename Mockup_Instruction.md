# Mockup Antarmuka Pengguna: Asisten Digital Arsip  
*Gaya: Formal-Casual (Profesional namun Ramah)*

> **Catatan**: Ini adalah deskripsi teks mockup — bukan gambar visual. Gunakan sebagai panduan untuk desainer UI/UX atau alat prototyping (Figma, Adobe XD, dll).

---

## 🎨 Gaya Visual Umum

### Palet Warna
- **Primer**: `#1E3A8A` (Biru tua – profesional & tepercaya)  
- **Sekunder**: `#F3F4F6` (Abu-abu lembut – latar belakang netral)  
- **Aksen**: `#10B981` (Hijau muda – aksi positif: upload, sukses)  
- **Netral**: Putih & abu-abu terang untuk ruang bernapas

### Tipografi
- **Judul**: `Inter Bold` atau `Poppins SemiBold`  
- **Isi**: `Inter Regular` (ukuran responsif, mudah dibaca)

### Komponen UI
- Sudut card: radius `8–12px`  
- Bayangan: soft shadow (halus, tidak berat)  
- Ikon: minimalis (gunakan [Phosphor Icons](https://phosphoricons.com/) atau [Heroicons](https://heroicons.com/))

### Nada Interaksi
- Bahasa antarmuka: sopan & hangat  
  Contoh: _“Hai, [Nama]! Ada yang bisa dibantu?”_  
- Notifikasi: non-intrusif, bisa di-dismiss  
- Animasi: micro-interaction halus (hover, loading, sukses)

---

## 🖥️ Struktur Halaman Utama

### 1. Halaman Login
- **Latar belakang**: gradien biru lembut  
- **Card login** di tengah layar:
  - Logo + nama aplikasi  
  - Form:
    - Email (input)
    - Password (input + toggle lihat/samar)
    - Checkbox: _“Ingat saya”_
    - Tombol: **Masuk** (warna primer)
  - Tautan: _“Lupa password?”_  
- **Footer**: `© 2025 Asisten Digital Arsip`

---

### 2. Dashboard Utama (Setelah Login)

#### Sidebar Kiri (Navigasi Tetap)
- Logo + nama aplikasi  
- Menu:
  - 📁 **Dokumen Saya**  
  - 🔍 **Cari & Jelajahi**  
  - 💬 **Asisten Digital**  
  - 🏷️ **Tag Saya**  
  - ⏳ **Akan Kadaluwarsa**  
  - 👤 **Profil & Keamanan**  
  - *(Admin only)* 👮 **Kelola Pengguna**  
  - *(Admin only)* 📢 **Kirim Notifikasi**

#### Header Atas
- Salam: _“Hai, Budi!”_  
- Ikon notifikasi (dengan badge jika ada)  
- Profil pengguna (dropdown: Lihat Profil, Ganti Password, Keluar)

#### Konten Utama: Dokumen Saya
- **Filter cepat**:  
  `Semua` | `Di-augmentasi` | `Dibagikan` | `Kadaluwarsa dalam 30 hari`  
- **Pencarian global** di atas daftar  
- **Daftar dokumen** (card grid atau tabel ringkas):
  - Nama dokumen + ikon tipe file  
  - Tag (chip berwarna lembut)  
  - Tanggal upload & masa berlaku  
  - Status: ✅ Augmentasi / ❌ Tidak  
  - Tombol aksi: **Bagikan**, **Lihat**, **Edit Tag**, **Perpanjang**

> _Hover card_: muncul preview kecil + tombol aksi cepat

---

### 3. Halaman Upload Dokumen

- **Judul**: _Unggah Dokumen Baru_  
- **Area drag-and-drop** besar:
  - Teks: _“Tarik file ke sini, atau klik untuk memilih”_  
  - Dukungan format: `PDF`, `DOCX`, `TXT`, `PPTX`, `XLSX`  
- Setelah file dipilih:
  - Preview nama file  
  - Input: **Judul Dokumen** (opsional)  
  - Input multi-tag (autocomplete dari tag yang pernah dipakai)  
  - Checkbox: ☑️ **Jadikan Referensi AI**  
    > Tooltip: _“Dokumen ini bisa ditanyakan ke Asisten Digital”_  
  - Tombol: **Unggah** (warna aksen hijau)

> Setelah sukses: notifikasi toast _“Dokumen berhasil diunggah!”_ + redirect ke daftar

---

### 4. Halaman Asisten Digital

- **Layout**: antarmuka chat (mirip WhatsApp/Slack, tapi lebih bersih)  
- **Sidebar kiri** (opsional): riwayat percakapan  
- **Area utama**:
  - Header: _“Asisten Digital Arsip”_ + status (🟢 Aktif)  
  - Riwayat chat:
    - **User**: _“Apa isi kebijakan cuti tahunan?”_  
    - **AI (GPT-4o)**:  
      > _“Berdasarkan dokumen **Kebijakan SDM 2024.pdf** (diunggah oleh HRD, 12 Jan 2024):  
      > Cuti tahunan diberikan 12 hari kerja per tahun...  
      > [Lihat Dokumen](#)”_
  - **Input bawah**: textarea + tombol kirim  
  - Placeholder: _“Tanyakan apa saja tentang dokumen yang telah di-augmentasi...”_

> Desain respons AI: latar `#EFF6FF`, border kiri biru lembut

---

### 5. Halaman Kelola Pengguna *(Admin Only)*

- **Tabel pengguna**:
  - Kolom: Nama, Email, Peran (Admin/Standar), Status