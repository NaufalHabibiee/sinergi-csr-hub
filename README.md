# Universa CSR Hub — Social Governance & Impact Orchestration Platform

Universa CSR Hub adalah platform web digital untuk tata kelola program *Corporate Social Responsibility* (CSR), kurasi mitra sosial pelaksana, pengelolaan pendanaan, pengukuran dampak sosial penerima manfaat, dan pelaporan kepatuhan formal (termasuk draf kriteria PROPER KLHK).

---

## 🚀 Fitur Utama MVP

1. **Dashboard Overview Berbasis Data Konsisten (Single Source of Truth):**
   - 8 Kartu KPI Finansial & Operasional dinamis: *Total Committed Funding*, *Total Disbursed Funding*, *Available/Unallocated Balance*, *Active Programs*, *Active Partners*, *Beneficiaries Reached*, *Proposals Needing Review*, dan *Reporting Completion Rate*.
   - 4 Visualisasi Recharts interaktif: Tren Komitmen vs Realisasi per Bulan, Komposisi Alokasi Sektor CSR, Capaian Sasaran Penerima Manfaat, dan Sebaran Kategori.
   - Panel *Quick Actions* untuk percepatan operasional.

2. **Peta Alur Ekosistem Interaktif (Ecosystem Map):**
   - Visualisasi grafis hubungan: **Corporate / Funder** ⇄ **Universa CSR Hub** ⇄ **Mitra Pelaksana** ⇄ **Penerima Manfaat**, serta aliran **Proper Report** ke **Pemerintah (Regulator/KLHK)**.
   - Filter interaktif: *Semua Alur*, *Aliran Dana (Funding & Distribution)*, dan *Aliran Laporan (Reporting & PROPER)*.
   - Node interaktif yang dapat diklik untuk meninjau rincian peran tata kelola.

3. **Manajemen Program CSR & Detail 6 Tab:**
   - Direktori program dengan pencarian, filter multi-dimensi (sektor, status, funder, mitra), dan pengurutan (budget, progres, tanggal).
   - Form pembuatan & pengeditan program dengan validasi data ketat.
   - Halaman detail program dengan 6 tab:
     - **Overview & Indikator:** Ringkasan, tujuan, metodologi, dan target vs realisasi KPI.
     - **Funding:** Riwayat pencairan dana bertahap per termin milestone.
     - **Penerima Manfaat:** Data sasaran per kelompok masyarakat.
     - **Bukti Kegiatan:** Dokumen berita acara, foto geotagging, presensi kegiatan.
     - **Laporan Dampak:** Dokumen evaluasi triwulan dan akhir program.
     - **Audit Log:** Jejak kronologis pembaruan program.
   - Modal interaktif untuk memperbarui progres fisik (%) dan mengunggah berkas bukti baru.

4. **Pipeline & Kurasi Proposal Mitra:**
   - Alur status lengkap: `Draft` → `Submitted` → `Under Review` → `Approved / Rejected` → `Converted to Program`.
   - Form pengajuan proposal baru dari mitra pelaksana.
   - Modal peninjauan (Review Drawer) dengan catatan kurator.
   - Fitur **1-Klik Konversi Proposal ke Program Aktif** dengan mempertahankan referensi asal (`sourceProposalId`).

5. **Direktori Mitra Pelaksana (Implementing Partners):**
   - Registrasi lembaga sosial, yayasan konservasi, komunitas UMKM, dan relawan bencana.
   - Status verifikasi: `Verified (Demo)`, `Pending Review`, `Needs Update`, `Suspended`.
   - Profil lengkap fokus program dan rekam jejak penyaluran.

6. **Direktori Corporate Funders:**
   - Profil BUMN, perusahaan swasta nasional, dan perbankan penyedia dana CSR.
   - Ringkasan otomatis: Total Komitmen, Total Dialokasikan, Total Disalurkan, dan Saldo Bebas per Funder.

7. **Penerima Manfaat & Kepatuhan Privasi (Beneficiaries):**
   - Mengutamakan data agregat tanpa memaparkan data pribadi sensitif (NIK/data medis individu).
   - Transparansi metodologi hitung guna mencegah klaim ganda (*double-counting*):
     - `unique_verified`: Individu unik terverifikasi (beasiswa, intervensi stunting, NIB UMKM).
     - `participation_event`: Partisipasi kegiatan/acara (volunter tanam mangrove, workshop).
     - `household_estimate`: Estimasi Kepala Keluarga terkonversi.

8. **Buku Besar Funding & Penyaluran Dana (Ledger):**
   - Pencatatan Komitmen, Alokasi Program, dan Distribusi Termin.
   - Validasi saldo real-time:
     - Alokasi tidak boleh melebihi saldo komitmen bebas funder.
     - Distribusi tidak boleh melebihi alokasi yang tersisa pada program.
   - Ekspor data transaksi ke berkas CSV.

9. **Laporan Dampak & Kesiapan PROPER KLHK (Impact Reports):**
   - Template resmi CSR Annual Report, Evaluasi Akhir Program, dan **Draf Kesiapan PROPER Lingkungan**.
   - Pratinjau dokumen formal dengan kop surat dan lembar pengesahan.
   - Fitur cetak langsung / *Save as PDF* dengan format print-friendly.
   - Ekspor ringkasan laporan ke CSV.

10. **Role-Based Access Control (Demo RBAC) & Settings:**
    - Role Switcher instan di Topbar untuk 5 sudut pandang:
      1. `Platform Admin`
      2. `CSR Manager / Universa Operator`
      3. `Corporate Funder (PT NEL)`
      4. `Mitra Pelaksana (YMLI)`
      5. `Viewer / Auditor ESG`
    - Notifikasi in-app dengan penanda status baca.
    - Pencarian global dengan shortcut keyboard `/`.
    - Fitur **Reset Data Demo** dilengkapi dialog konfirmasi interaktif.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS dengan palet khusus CSR (Deep Forest, Emerald, Soft Mint, Ink)
- **Routing:** React Router DOM v6
- **Charts:** Recharts
- **Icons:** Lucide React
- **State & Storage:** React Context API + LocalStorage persistence
- **Testing:** Vitest

---

## 💻 Cara Menjalankan di Localhost

### 1. Prasyarat
- Node.js versi 18+ (direkomendasikan Node.js 20 atau 24)
- npm versi 9+

### 2. Masuk ke Direktori Proyek
```bash
cd /Users/habibie/universa-csr-hub
```

### 3. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser pada alamat: **http://localhost:5173**

### 4. Menjalankan Pengujian (Unit Tests)
```bash
npm run test
```

### 5. Memeriksa Typecheck
```bash
npm run typecheck
```

### 6. Membangun Berkas Produksi (Production Build)
```bash
npm run build
```

---

## ⚠️ Batasan MVP & Pernyataan Lingkungan Demo

- Seluruh tindakan pendanaan, persetujuan proposal, dan laporan pada MVP ini adalah **simulasi prototipe** dan diberi label demo secara jelas.
- Tidak ada transaksi uang nyata, integrasi payment gateway bank, atau pengiriman otomatis ke instansi pemerintah tanpa izin dan kredensial resmi.
