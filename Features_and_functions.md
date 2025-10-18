# Dokumen Spesifikasi Fitur dan Fungsi Aplikasi  
## Sistem Manajemen Dokumen Berbasis Website  
### Nama Aplikasi: **Asisten Digital Arsip**

---

## 1. Pendahuluan

Dokumen ini menjelaskan spesifikasi fitur dan fungsi dari aplikasi **Asisten Digital Arsip**, yaitu sebuah sistem manajemen dokumen berbasis website yang dirancang untuk menyimpan, mengelola, dan memanfaatkan dokumen secara cerdas melalui integrasi teknologi kecerdasan buatan (AI). Aplikasi ini memungkinkan pengguna mengunggah dokumen, mengelompokkannya dengan tag, membagikannya secara selektif, serta berinteraksi dengan **Asisten AI berbasis GPT-4o** yang mampu menjawab pertanyaan berdasarkan konten dokumen yang telah di-augmentasi.

---

## 2. Tujuan Aplikasi

- Menyediakan sistem penyimpanan dokumen terpusat dan aman menggunakan AWS S3.  
- Memfasilitasi pengelolaan dokumen melalui fitur tagging, berbagi, dan pengaturan masa berlaku.  
- Menghadirkan pengalaman interaktif melalui **Asisten Digital** berbasis **GPT-4o** yang hanya merujuk pada dokumen internal yang relevan (RAG).  
- Menjamin keamanan dan kontrol akses melalui manajemen pengguna berbasis peran (admin dan standar) serta kebijakan keamanan akun yang ketat.

---

## 3. Fitur dan Fungsi Utama

### 3.1. Upload Dokumen ke AWS S3

- Pengguna dapat mengunggah dokumen dalam format umum: PDF, DOCX, TXT, PPTX, XLSX, dan lainnya.  
- Dokumen disimpan di **AWS S3** dengan enkripsi dan manajemen akses terkontrol.  
- Metadata otomatis dicatat: nama file, ukuran, tipe, tanggal upload, uploader, dan status augmentasi.

### 3.2. Opsi Augmentasi untuk RAG

- Saat upload, pengguna dapat mencentang **“Jadikan Referensi AI”**.  
- Jika dicentang:
  - Dokumen diproses menjadi teks (text extraction).
  - Dipecah menjadi potongan (*chunks*) berukuran optimal.
  - Di-*embed* menggunakan model embedding (misal: `text-embedding-3-small` dari OpenAI).
  - Disimpan ke **Qdrant** sebagai database vektor.
- Hanya dokumen yang di-augmentasi yang dapat diakses oleh Asisten Digital.

### 3.3. Sistem Tagging Dokumen

- Setiap dokumen dapat diberi satu atau lebih **tag** (misal: “HRD”, “Laporan Keuangan”, “Proyek Alpha”).  
- Tag bersifat dinamis dan dapat dibuat/dikelola oleh pengguna.  
- Digunakan untuk:
  - Filter cepat dalam antarmuka.
  - Pengelompokan dokumen.
  - Basis berbagi kolektif (seluruh dokumen dalam satu tag).

### 3.4. Berbagi Dokumen atau Tag

- Pengguna dapat membagikan:
  - **Satu dokumen**, atau
  - **Semua dokumen dalam satu tag**
  kepada pengguna lain yang terdaftar (berdasarkan email).
- Penerima mendapat akses baca (atau sesuai izin yang ditentukan) dan notifikasi.  
- Admin dapat mencabut akses kapan saja.

### 3.5. Masa Kadaluwarsa Dokumen

- Masa berlaku default: **3 tahun** sejak tanggal upload.  
- Sistem mengirim **notifikasi otomatis via email** kepada:
  - Pengunggah dokumen, dan
  - Semua admin  
  **30 hari sebelum masa berlaku berakhir**.
- Dokumen yang kadaluwarsa tidak dapat diakses kecuali diperpanjang oleh admin atau uploader.

### 3.6. Asisten Digital Berbasis GPT-4o dan RAG

- Aplikasi menyediakan **Asisten Digital** dalam bentuk antarmuka chat.  
- Asisten menggunakan **GPT-4o** sebagai model bahasa utama, dikombinasikan dengan **Retrieval-Augmented Generation (RAG)**.  
- Respons hanya dibangun berdasarkan dokumen internal yang telah di-augmentasi dan relevan dengan pertanyaan.  
- Setiap jawaban menyertakan **referensi eksplisit**: judul dokumen, tanggal upload, dan tautan langsung ke file asli.  
- Tidak ada data dokumen yang dikirim ke luar sistem tanpa proses embedding dan retrieval yang aman.

### 3.7. Manajemen Pengguna: Admin vs Standar

- **Admin**:
  - Menambah, mengedit, atau memblokir pengguna standar.
  - Membatasi akses ke dokumen/tag tertentu (misal: dokumen rahasia).
  - Mengelola masa berlaku dokumen secara massal.
- **Pengguna Standar**:
  - Hanya mengelola dokumen milik sendiri.
  - Dapat berbagi dokumen/tag dengan izin terbatas.
  - Tidak dapat mengakses konten yang dibatasi admin.

### 3.8. Notifikasi Sistem oleh Admin

- Admin dapat membuat dan mengirim **notifikasi resmi** kepada:
  - Semua pengguna, atau
  - Pengguna tertentu (berdasarkan peran, tag, atau email).
- Notifikasi muncul sebagai **pop-up/banner** di aplikasi dan dikirim via email.  
- Digunakan untuk pengumuman kebijakan, pemeliharaan sistem, atau peringatan keamanan.

### 3.9. Autentikasi dan Keamanan Akun

- Login menggunakan **email dan password**.  
- Password **wajib diubah setiap 4 bulan**.  
- Sistem:
  - Mengingatkan pengguna **7 hari sebelum jatuh tempo** pergantian password.
  - Memblokir sementara akses jika tidak diperbarui tepat waktu.
- Password disimpan dengan **hashing kuat (bcrypt)** dan tidak dapat dilihat oleh siapa pun, termasuk admin.

---

## 4. Arsitektur Teknis Singkat

- **Frontend**: React.js (dengan TypeScript)  
- **Backend**: Python (FastAPI)  
- **Database Relasional**: PostgreSQL (untuk user, metadata, tag, notifikasi)  
- **Penyimpanan File**: AWS S3  
- **Vector Database**: Qdrant (self-hosted atau cloud)  
- **Embedding**: OpenAI `text-embedding-3-small`  
- **Model Bahasa**: **GPT-4o** (via OpenAI API)  
- **Autentikasi**: JWT + refresh token, dengan enkripsi end-to-end untuk sesi sensitif  

---

## 5. Penutup

**Asisten Digital Arsip** hadir sebagai solusi cerdas untuk transformasi digital arsip dokumen. Dengan kombinasi penyimpanan aman, pengelolaan fleksibel, dan kecerdasan buatan berbasis **GPT-4o**, aplikasi ini tidak hanya menyimpan informasi—tapi juga menjadikannya hidup, mudah diakses, dan siap menjawab kebutuhan pengguna kapan saja.

Dokumen spesifikasi ini menjadi acuan utama dalam tahap desain, pengembangan, pengujian, dan peluncuran sistem.

---

**Disusun oleh**: Tim Pengembangan Produk  
**Tanggal**: 19 Oktober 2025  

> *Dokumen ini bersifat hidup dan dapat diperbarui seiring evolusi kebutuhan pengguna dan teknologi.*