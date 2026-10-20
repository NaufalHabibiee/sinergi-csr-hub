import {
  Organization,
  Program,
  Proposal,
  FundingRecord,
  BeneficiaryAggregate,
  ImpactReport,
  ActivityEvent,
  InAppNotification,
  UserProfile,
  CommunityAspiration
} from '../types/csr';

export const INITIAL_USER: UserProfile = {
  id: 'usr_001',
  displayName: 'Habibie CSR Lead',
  role: 'manager',
  organizationName: 'Universa CSR Hub Operator',
  emailDemo: 'csr.lead@universa.id',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const SEED_FUNDERS: Organization[] = [
  {
    id: 'fnd_001',
    name: 'PT Nusantara Energi Lestari',
    code: 'NEL',
    type: 'funder',
    subType: 'BUMN Energi',
    description: 'Badan Usaha Milik Negara yang berfokus pada ketahanan energi terbarukan, dekarbonisasi industri, dan pemberdayaan masyarakat lingkar tambang.',
    region: 'DKI Jakarta / Nasional',
    focusAreas: ['lingkungan', 'infrastruktur', 'pendidikan'],
    contactPerson: {
      name: 'Rian Kurniawan (VP CSR)',
      emailDemo: 'rian.k@nusantaraenergi.demo',
      phoneDemo: '+62 811-2233-4455'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 3,
    totalFundingOrReceived: 4_500_000_000,
    createdAt: '2026-01-10'
  },
  {
    id: 'fnd_002',
    name: 'PT Telko Digital Nusantara Tbk',
    code: 'TDN',
    type: 'funder',
    subType: 'Korporasi Telekomunikasi',
    description: 'Perusahaan infrastruktur telekomunikasi terkemuka yang mendedikasikan CSR untuk literasi digital generasi muda dan ekonomi pedesaan.',
    region: 'DKI Jakarta / Jawa Barat',
    focusAreas: ['pendidikan', 'ekonomi_umkm'],
    contactPerson: {
      name: 'Sarah Amanda (CSR Director)',
      emailDemo: 'sarah.amanda@telkodigital.demo',
      phoneDemo: '+62 812-3344-5566'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 2,
    totalFundingOrReceived: 3_000_000_000,
    createdAt: '2026-01-15'
  },
  {
    id: 'fnd_003',
    name: 'Bank Mandiri Sejahtera Tbk',
    code: 'BMS',
    type: 'funder',
    subType: 'Perbankan Nasional',
    description: 'Lembaga keuangan perbankan dengan pilar tanggung jawab sosial pada inklusi keuangan, pembiayaan UMKM mikro, dan kesehatan masyarakat.',
    region: 'Nasional',
    focusAreas: ['ekonomi_umkm', 'kesehatan'],
    contactPerson: {
      name: 'Dedi Prasetyo (Head of ESG)',
      emailDemo: 'dedi.p@bankmandirisejahtera.demo',
      phoneDemo: '+62 813-4455-6677'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 2,
    totalFundingOrReceived: 2_500_000_000,
    createdAt: '2026-02-01'
  },
  {
    id: 'fnd_004',
    name: 'PT Mineral Pasifik Raya',
    code: 'MPR',
    type: 'funder',
    subType: 'Swasta Nasional Sumber Daya',
    description: 'Perusahaan hilirisasi mineral yang fokus mendukung pemenuhan baku mutu PROPER KLHK dan kelestarian ekosistem darat-laut.',
    region: 'Sulawesi Selatan / Maluku',
    focusAreas: ['lingkungan', 'kesehatan', 'tanggap_bencana'],
    contactPerson: {
      name: 'Maya Indriani (Manager TJSL)',
      emailDemo: 'maya.indriani@mineralpasifik.demo',
      phoneDemo: '+62 815-5566-7788'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 1,
    totalFundingOrReceived: 2_000_000_000,
    createdAt: '2026-02-12'
  },
  {
    id: 'fnd_005',
    name: 'PT Agro Lestari Sentosa',
    code: 'ALS',
    type: 'funder',
    subType: 'Agroindustri & Konsumen',
    description: 'Grup produsen hasil perkebunan berkelanjutan yang berkomitmen menjaga konservasi koridor satwa dan ketahanan pangan petani.',
    region: 'Sumatera Utara / Riau',
    focusAreas: ['lingkungan', 'ekonomi_umkm'],
    contactPerson: {
      name: 'Bambang Sudibyo (Senior CSR Lead)',
      emailDemo: 'bambang.s@agrolestari.demo',
      phoneDemo: '+62 816-6677-8899'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 1,
    totalFundingOrReceived: 1_200_000_000,
    createdAt: '2026-02-20'
  }
];

export const SEED_PARTNERS: Organization[] = [
  {
    id: 'ptr_001',
    name: 'Yayasan Mangrove Lestari Indonesia',
    code: 'YMLI',
    type: 'partner',
    subType: 'Lembaga Konservasi Lingkungan',
    description: 'Organisasi non-profit spesialis restorasi ekosistem hutan bakau, mitigasi abrasi pantai, dan pembibitan bibit pesisir berbasis masyarakat.',
    region: 'Jawa Barat & DKI Jakarta',
    focusAreas: ['lingkungan', 'ekonomi_umkm'],
    contactPerson: {
      name: 'Ir. Hendra Gunawan',
      emailDemo: 'hendra@mangrovelestari.org.demo',
      phoneDemo: '+62 812-9988-7766'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 2,
    totalFundingOrReceived: 1_250_000_000,
    createdAt: '2026-01-05'
  },
  {
    id: 'ptr_002',
    name: 'Lembaga Edukasi Cendekia Bangsa',
    code: 'LECB',
    type: 'partner',
    subType: 'Yayasan Pendidikan & Beasiswa',
    description: 'Yayasan pendidikan yang menyalurkan beasiswa siswa berprestasi, fasilitas pelatihan coding & vokasi untuk anak keluarga prasejahtera.',
    region: 'Jawa Tengah & DI Yogyakarta',
    focusAreas: ['pendidikan'],
    contactPerson: {
      name: 'Dr. Nurul Hidayati',
      emailDemo: 'nurul@cendekiabangsa.org.demo',
      phoneDemo: '+62 813-8877-6655'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 2,
    totalFundingOrReceived: 1_500_000_000,
    createdAt: '2026-01-12'
  },
  {
    id: 'ptr_003',
    name: 'Koperasi Berdaya Bersama',
    code: 'KBB',
    type: 'partner',
    subType: 'Komunitas Pemberdayaan UMKM',
    description: 'Koperasi pendamping pelaku usaha mikro dan ultra mikro perempuan, memberikan pelatihan pengemasan, pembukuan, dan sertifikasi halal.',
    region: 'Jawa Timur (Pantura)',
    focusAreas: ['ekonomi_umkm'],
    contactPerson: {
      name: 'Siti Aminah, M.M.',
      emailDemo: 'siti@koperasiberdaya.demo',
      phoneDemo: '+62 814-7766-5544'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 1,
    totalFundingOrReceived: 850_000_000,
    createdAt: '2026-01-20'
  },
  {
    id: 'ptr_004',
    name: 'Sahabat Alam Borneo',
    code: 'SAB',
    type: 'partner',
    subType: 'Lembaga Pelestari Keanekaragaman Hayati',
    description: 'Aliansi aktivis konservasi hutan hujan tropis Kalimantan, pencegahan kebakaran gambut, dan patroli keanekaragaman flora-fauna.',
    region: 'Kalimantan Timur & Riau',
    focusAreas: ['lingkungan'],
    contactPerson: {
      name: 'Yohanes Ronald',
      emailDemo: 'ronald@sahabatborneo.demo',
      phoneDemo: '+62 815-6655-4433'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 1,
    totalFundingOrReceived: 750_000_000,
    createdAt: '2026-02-02'
  },
  {
    id: 'ptr_005',
    name: 'Relawan Sehat Nusantara',
    code: 'RSN',
    type: 'partner',
    subType: 'Lembaga Kesehatan Masyarakat',
    description: 'Inisiatif tenaga medis sukarela dalam intervensi penanganan stunting, skrining anemia remaja, dan edukasi sanitasi lingkungan terpencil.',
    region: 'Nusa Tenggara Timur & Maluku',
    focusAreas: ['kesehatan'],
    contactPerson: {
      name: 'dr. Farhan Malik',
      emailDemo: 'farhan@relawansehat.demo',
      phoneDemo: '+62 816-5544-3322'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 1,
    totalFundingOrReceived: 650_000_000,
    createdAt: '2026-02-08'
  },
  {
    id: 'ptr_006',
    name: 'Yayasan Bina Mandiri Inklusif',
    code: 'YBMI',
    type: 'partner',
    subType: 'Pemberdayaan Disabilitas & Vokasi',
    description: 'Pusat pelatihan vokasi keterampilan kerja modern (desain grafis, data entry, perakitan mekanik) untuk penyandang disabilitas.',
    region: 'DKI Jakarta & Banten',
    focusAreas: ['pendidikan', 'ekonomi_umkm'],
    contactPerson: {
      name: 'Lestari Rahayu',
      emailDemo: 'lestari@binamandiri.demo',
      phoneDemo: '+62 817-4433-2211'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 1,
    totalFundingOrReceived: 500_000_000,
    createdAt: '2026-02-15'
  },
  {
    id: 'ptr_007',
    name: 'Forum Air Bersih Masyarakat Nusa',
    code: 'FABMN',
    type: 'partner',
    subType: 'Infrastruktur Komunitas Desa',
    description: 'Spesialis instalasi pompa tenaga surya, sumur bor dalam, dan jaringan pipanisasi air bersih bagi desa langganan kekeringan karst.',
    region: 'DI Yogyakarta & Jawa Tengah',
    focusAreas: ['infrastruktur'],
    contactPerson: {
      name: 'Agus Wibowo, S.T.',
      emailDemo: 'agus.w@airbersihnusa.demo',
      phoneDemo: '+62 818-3322-1100'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 1,
    totalFundingOrReceived: 700_000_000,
    createdAt: '2026-02-18'
  },
  {
    id: 'ptr_008',
    name: 'Pos Bersama Tanggap Bencana',
    code: 'PBTB',
    type: 'partner',
    subType: 'Relawan Tanggap Darurat & Mitigasi',
    description: 'Unit reaksi cepat bantuan kemanusiaan logistik darurat, dapur umum higienis, dan pelatihan kesiapsiagaan bencana bagi warga lokal.',
    region: 'Jawa Barat & Sumatera Barat',
    focusAreas: ['tanggap_bencana'],
    contactPerson: {
      name: 'Kurnia Ramadhan',
      emailDemo: 'kurnia@posbersama.demo',
      phoneDemo: '+62 819-2211-0099'
    },
    verifiedDemo: true,
    verificationBadge: 'Verified (Demo)',
    activeProgramsCount: 0,
    totalFundingOrReceived: 350_000_000,
    createdAt: '2026-02-22'
  }
];

export const SEED_PROGRAMS: Program[] = [
  {
    id: 'prg_001',
    code: 'PRG-2026-001',
    title: 'Penanaman 50.000 Mangrove & Restorasi Pesisir Muara Gembong',
    summary: 'Program perlindungan pesisir dari abrasi ekstrem dan pemberdayaan tambak ramah lingkungan bersama kelompok nelayan pesisir Bekasi.',
    category: 'lingkungan',
    location: 'Muara Gembong, Kabupaten Bekasi',
    province: 'Jawa Barat',
    partnerId: 'ptr_001',
    funderId: 'fnd_001',
    proposedBudget: 750_000_000,
    approvedBudget: 750_000_000,
    committedAmount: 750_000_000,
    allocatedAmount: 750_000_000,
    disbursedAmount: 500_000_000,
    targetBeneficiaries: 1200,
    reachedBeneficiaries: 950,
    startDate: '2026-01-15',
    endDate: '2026-08-30',
    status: 'active',
    progressPercent: 68,
    indicators: [
      { id: 'ind_1_1', label: 'Bibit Mangrove Tertanam & Hidup', target: 50000, current: 36500, unit: 'pohon' },
      { id: 'ind_1_2', label: 'Hektar Garis Pantai Terproteksi', target: 25, current: 18, unit: 'hektar' },
      { id: 'ind_1_3', label: 'Keluarga Nelayan Terlatih Bibit & Tambak', target: 350, current: 280, unit: 'KK' }
    ],
    evidenceList: [
      { id: 'evi_001', title: 'Berita Acara Penanaman Tahap 1 (20.000 bibit)', date: '2026-02-10', category: 'berita_acara', url: '#', uploadedBy: 'Hendra Gunawan', verifiedDemo: true },
      { id: 'evi_002', title: 'Foto Udara Zona Restorasi Blok Cemara', date: '2026-03-04', category: 'foto_kegiatan', url: '#', uploadedBy: 'Hendra Gunawan', verifiedDemo: true },
      { id: 'evi_003', title: 'Daftar Presensi Pelatihan Pembibitan Nelayan', date: '2026-03-15', category: 'daftar_hadir', url: '#', uploadedBy: 'Hendra Gunawan', verifiedDemo: true }
    ],
    createdAt: '2026-01-10',
    updatedAt: '2026-03-25'
  },
  {
    id: 'prg_002',
    code: 'PRG-2026-002',
    title: 'Beasiswa Generasi Emas & Coding Camp Talenta Prasejahtera',
    summary: 'Pemberian dana beasiswa pendidikan tinggi dan pelatihan intensif software engineering untuk 150 pelajar berprestasi dari keluarga prasejahtera.',
    category: 'pendidikan',
    location: 'Semarang & Solo',
    province: 'Jawa Tengah',
    partnerId: 'ptr_002',
    funderId: 'fnd_002',
    proposedBudget: 900_000_000,
    approvedBudget: 850_000_000,
    committedAmount: 850_000_000,
    allocatedAmount: 850_000_000,
    disbursedAmount: 600_000_000,
    targetBeneficiaries: 150,
    reachedBeneficiaries: 150,
    startDate: '2026-02-01',
    endDate: '2026-11-30',
    status: 'active',
    progressPercent: 60,
    indicators: [
      { id: 'ind_2_1', label: 'Mahasiswa Penerima Biaya Kuliah & Laptop', target: 150, current: 150, unit: 'orang' },
      { id: 'ind_2_2', label: 'Kelulusan Modul Pemrograman Fullstack', target: 150, current: 110, unit: 'orang' },
      { id: 'ind_2_3', label: 'Proyek Portofolio Siap Kerja Selesai', target: 75, current: 45, unit: 'proyek' }
    ],
    evidenceList: [
      { id: 'evi_004', title: 'SK Penetapan Penerima Beasiswa Batch 2026', date: '2026-02-05', category: 'berita_acara', url: '#', uploadedBy: 'Nurul Hidayati', verifiedDemo: true },
      { id: 'evi_005', title: 'Dokumentasi Penyerahan Laptop Edukasi', date: '2026-02-18', category: 'foto_kegiatan', url: '#', uploadedBy: 'Nurul Hidayati', verifiedDemo: true }
    ],
    createdAt: '2026-01-20',
    updatedAt: '2026-03-20'
  },
  {
    id: 'prg_003',
    code: 'PRG-2026-003',
    title: 'Inkubasi & Digitalisasi 250 UMKM Kuliner Pesisir Pantura',
    summary: 'Pendampingan sertifikasi halal, standarisasi kemasan BPOM, dan pencatatan transaksi digital untuk meningkatkan omzet pengusaha mikro.',
    category: 'ekonomi_umkm',
    location: 'Tuban & Lamongan',
    province: 'Jawa Timur',
    partnerId: 'ptr_003',
    funderId: 'fnd_003',
    proposedBudget: 600_000_000,
    approvedBudget: 600_000_000,
    committedAmount: 600_000_000,
    allocatedAmount: 600_000_000,
    disbursedAmount: 350_000_000,
    targetBeneficiaries: 250,
    reachedBeneficiaries: 220,
    startDate: '2026-02-15',
    endDate: '2026-09-15',
    status: 'active',
    progressPercent: 55,
    indicators: [
      { id: 'ind_3_1', label: 'UMKM Menerima Bantuan Alat & Kemasan', target: 250, current: 220, unit: 'usaha' },
      { id: 'ind_3_2', label: 'Sertifikasi Halal Diterbitkan', target: 200, current: 95, unit: 'sertifikat' },
      { id: 'ind_3_3', label: 'Kenaikan Omzet Rata-rata Pelaku Usaha', target: 30, current: 18, unit: '%' }
    ],
    evidenceList: [
      { id: 'evi_006', title: 'Laporan Fasilitasi Audit Halal Tahap 1', date: '2026-03-01', category: 'laporan_keuangan', url: '#', uploadedBy: 'Siti Aminah', verifiedDemo: true }
    ],
    createdAt: '2026-02-01',
    updatedAt: '2026-03-18'
  },
  {
    id: 'prg_004',
    code: 'PRG-2026-004',
    title: 'Intervensi Terpadu Pengentasan Stunting & Gizi Balita Pesisir',
    summary: 'Pemberian Makanan Tambahan (PMT) lokal berprotein tinggi, pelatihan kader posyandu, dan pemantauan antropometri 600 balita indikasi stunting.',
    category: 'kesehatan',
    location: 'Timor Tengah Selatan',
    province: 'Nusa Tenggara Timur',
    partnerId: 'ptr_005',
    funderId: 'fnd_004',
    proposedBudget: 500_000_000,
    approvedBudget: 500_000_000,
    committedAmount: 500_000_000,
    allocatedAmount: 500_000_000,
    disbursedAmount: 250_000_000,
    targetBeneficiaries: 600,
    reachedBeneficiaries: 520,
    startDate: '2026-01-20',
    endDate: '2026-07-20',
    status: 'active',
    progressPercent: 50,
    indicators: [
      { id: 'ind_4_1', label: 'Balita Terpapar Paket Nutrisi Lengkap 90 Hari', target: 600, current: 520, unit: 'anak' },
      { id: 'ind_4_2', label: 'Kader Posyandu Tersertifikasi Konseling Gizi', target: 45, current: 42, unit: 'orang' },
      { id: 'ind_4_3', label: 'Penurunan Prevalensi Gizi Kurang', target: 40, current: 24, unit: '%' }
    ],
    evidenceList: [
      { id: 'evi_007', title: 'Hasil Skrining Awal Puskesmas Niki-Niki', date: '2026-02-12', category: 'laporan_keuangan', url: '#', uploadedBy: 'Farhan Malik', verifiedDemo: true }
    ],
    createdAt: '2026-01-18',
    updatedAt: '2026-03-10'
  },
  {
    id: 'prg_005',
    code: 'PRG-2026-005',
    title: 'Instalasi Pompa Tenaga Surya & Pipanisasi Air Bersih Desa Karst',
    summary: 'Penyediaan akses air minum layak konsumsi bagi 1.800 warga di 3 dusun rawan kekeringan dengan sistem tenaga surya hemat emisi.',
    category: 'infrastruktur',
    location: 'Tepus, Gunungkidul',
    province: 'DI Yogyakarta',
    partnerId: 'ptr_007',
    funderId: 'fnd_001',
    proposedBudget: 700_000_000,
    approvedBudget: 700_000_000,
    committedAmount: 700_000_000,
    allocatedAmount: 700_000_000,
    disbursedAmount: 550_000_000,
    targetBeneficiaries: 1800,
    reachedBeneficiaries: 1650,
    startDate: '2026-01-05',
    endDate: '2026-05-30',
    status: 'active',
    progressPercent: 82,
    indicators: [
      { id: 'ind_5_1', label: 'Meter Jaringan Pipa Air Terpasang', target: 4500, current: 3900, unit: 'meter' },
      { id: 'ind_5_2', label: 'Debit Air Tersalurkan per Hari', target: 75000, current: 68000, unit: 'liter' },
      { id: 'ind_5_3', label: 'Sambungan Rumah (SR) Mandiri Aktif', target: 360, current: 310, unit: 'rumah' }
    ],
    evidenceList: [
      { id: 'evi_008', title: 'Sertifikat Uji Kelayakan Kualitas Air Labkesda', date: '2026-03-02', category: 'berita_acara', url: '#', uploadedBy: 'Agus Wibowo', verifiedDemo: true }
    ],
    createdAt: '2026-01-02',
    updatedAt: '2026-03-24'
  },
  {
    id: 'prg_006',
    code: 'PRG-2026-006',
    title: 'Reboisasi 100 Hektar Hutan Gambut & Patroli Api Masyarakat',
    summary: 'Pemulihan vegetasi pohon endemik (jelutung, belangeran) di kawasan rawan karhutla serta pembentukan kelompok relawan Masyarakat Peduli Api.',
    category: 'lingkungan',
    location: 'Pelalawan',
    province: 'Riau',
    partnerId: 'ptr_004',
    funderId: 'fnd_005',
    proposedBudget: 750_000_000,
    approvedBudget: 750_000_000,
    committedAmount: 750_000_000,
    allocatedAmount: 750_000_000,
    disbursedAmount: 400_000_000,
    targetBeneficiaries: 800,
    reachedBeneficiaries: 600,
    startDate: '2026-02-10',
    endDate: '2026-10-31',
    status: 'active',
    progressPercent: 48,
    indicators: [
      { id: 'ind_6_1', label: 'Luas Lahan Gambut Ditanami Kembali', target: 100, current: 48, unit: 'hektar' },
      { id: 'ind_6_2', label: 'Seksi Sekat Kanal Air (Canal Blocking)', target: 20, current: 12, unit: 'unit' },
      { id: 'ind_6_3', label: 'Titik Hotspot Api Terdeteksi & Terkendali', target: 0, current: 0, unit: 'titik' }
    ],
    evidenceList: [
      { id: 'evi_009', title: 'MoU Kemitraan Restorasi dengan KPH Riau', date: '2026-02-14', category: 'berita_acara', url: '#', uploadedBy: 'Yohanes Ronald', verifiedDemo: true }
    ],
    createdAt: '2026-02-05',
    updatedAt: '2026-03-22'
  },
  {
    id: 'prg_007',
    code: 'PRG-2026-007',
    title: 'Pelatihan Vokasi & Penyaluran Kerja Inklusif Pemuda Disabilitas',
    summary: 'Pelatihan keahlian desain digital, administrasi data, dan magang berbayar di perusahaan mitra untuk membuka akses lapangan kerja mandiri.',
    category: 'pendidikan',
    location: 'Jakarta Barat & Tangerang',
    province: 'DKI Jakarta',
    partnerId: 'ptr_006',
    funderId: 'fnd_002',
    proposedBudget: 450_000_000,
    approvedBudget: 450_000_000,
    committedAmount: 450_000_000,
    allocatedAmount: 450_000_000,
    disbursedAmount: 450_000_000,
    targetBeneficiaries: 80,
    reachedBeneficiaries: 80,
    startDate: '2025-09-01',
    endDate: '2026-02-28',
    status: 'completed',
    progressPercent: 100,
    indicators: [
      { id: 'ind_7_1', label: 'Peserta Disabilitas Lulus Kurikulum', target: 80, current: 80, unit: 'orang' },
      { id: 'ind_7_2', label: 'Penerimaan Penempatan Kerja / Freelance', target: 60, current: 65, unit: 'orang' },
      { id: 'ind_7_3', label: 'Tingkat Kepuasan Mitra Perusahaan', target: 90, current: 94, unit: '%' }
    ],
    evidenceList: [
      { id: 'evi_010', title: 'Laporan Evaluasi Akhir & Daftar Penempatan Kerja', date: '2026-03-01', category: 'laporan_keuangan', url: '#', uploadedBy: 'Lestari Rahayu', verifiedDemo: true }
    ],
    createdAt: '2025-08-15',
    updatedAt: '2026-03-02'
  },
  {
    id: 'prg_008',
    code: 'PRG-2026-008',
    title: 'Penguatan Lumbung Pangan Mandiri & Pupuk Organik Petani Organik',
    summary: 'Pelatihan pembuatan bio-kompos limbah pertanian dan pembentukan lumbung bibit unggul untuk mengurangi ketergantungan pupuk kimia.',
    category: 'ekonomi_umkm',
    location: 'Magelang',
    province: 'Jawa Tengah',
    partnerId: 'ptr_003',
    funderId: 'fnd_005',
    proposedBudget: 400_000_000,
    approvedBudget: 400_000_000,
    committedAmount: 400_000_000,
    allocatedAmount: 400_000_000,
    disbursedAmount: 200_000_000,
    targetBeneficiaries: 400,
    reachedBeneficiaries: 310,
    startDate: '2026-03-01',
    endDate: '2026-10-31',
    status: 'active',
    progressPercent: 35,
    indicators: [
      { id: 'ind_8_1', label: 'Petani Terlatih Formulasi Kompos', target: 400, current: 310, unit: 'petani' },
      { id: 'ind_8_2', label: 'Tonase Pupuk Organik Diproduksi Mandiri', target: 50, current: 16, unit: 'ton' }
    ],
    evidenceList: [],
    createdAt: '2026-02-25',
    updatedAt: '2026-03-20'
  }
];

export const SEED_PROPOSALS: Proposal[] = [
  {
    id: 'prop_001',
    code: 'PROP-2026-001',
    partnerId: 'ptr_001',
    title: 'Ekspansi Konservasi Terumbu Karang & Ekowisata Bahari Kepulauan Seribu',
    category: 'lingkungan',
    location: 'Pulau Pari, Kepulauan Seribu',
    province: 'DKI Jakarta',
    problemStatement: 'Degradasi terumbu karang akibat sampah plastik dan peningkatan suhu permukaan laut yang mengancam mata pencaharian nelayan tradisional.',
    proposedActivities: 'Transplantasi 10.000 bibit karang menggunakan metode biorock, pelatihan pemandu selam lokal, dan pengolahan limbah plastik.',
    proposedBudget: 650_000_000,
    targetBeneficiaries: 450,
    estimatedDurationMonths: 8,
    indicators: [
      { label: 'Bibit Karang Hidup Tertransplantasi', target: 10000, unit: 'fragmen' },
      { label: 'Nelayan Tersertifikasi Ekowisata', target: 60, unit: 'orang' }
    ],
    status: 'under_review',
    reviewNotes: 'Proposal sangat relevan dengan prioritas konservasi laut. Menunggu konfirmasi ketersediaan alokasi dana dari Corporate Funder NEL.',
    reviewerId: 'usr_001',
    submittedAt: '2026-03-12',
    reviewedAt: '2026-03-18'
  },
  {
    id: 'prop_002',
    code: 'PROP-2026-002',
    partnerId: 'ptr_002',
    title: 'Mobil Pintar Literasi & Pojok Baca Digital Sekolah Pelosok Wonogiri',
    category: 'pendidikan',
    location: 'Wonogiri',
    province: 'Jawa Tengah',
    problemStatement: 'Keterbatasan akses buku bacaan berkualitas dan minimnya konektivitas internet bagi 15 sekolah dasar di wilayah pelosok perbukitan.',
    proposedActivities: 'Operasional 2 unit mobil pintar bertenaga surya dengan 3.000 buku fisik, 20 tablet offline edukasi, dan pendampingan membaca anak.',
    proposedBudget: 380_000_000,
    targetBeneficiaries: 1200,
    estimatedDurationMonths: 6,
    indicators: [
      { label: 'Sekolah Dasar Terjangkau Rute Rutin', target: 15, unit: 'sekolah' },
      { label: 'Siswa Aktif Membaca Buku Tiap Pekan', target: 1200, unit: 'siswa' }
    ],
    status: 'submitted',
    submittedAt: '2026-03-24'
  },
  {
    id: 'prop_003',
    code: 'PROP-2026-003',
    partnerId: 'ptr_005',
    title: 'Ambulans Apung & Pos Medis Pesisir Kepulauan Alor',
    category: 'kesehatan',
    location: 'Alor',
    province: 'Nusa Tenggara Timur',
    problemStatement: 'Sulitnya rujukan gawat darurat ibu melahirkan dari pulau-pulau kecil menuju RSUD daratan utama Alor karena ketiadaan perahu khusus medis.',
    proposedActivities: 'Pengadaan 1 unit kapal ambulans berstandar oksigen medik, pelatihan 20 bidan desa navigasi radio, dan posko telemedicine rujukan.',
    proposedBudget: 850_000_000,
    targetBeneficiaries: 2400,
    estimatedDurationMonths: 12,
    indicators: [
      { label: 'Pasien Gawat Darurat Tertangani Cepat', target: 300, unit: 'kasus' },
      { label: 'Kunjungan Pemeriksaan Ibu Hamil Terjadwal', target: 2100, unit: 'kunjungan' }
    ],
    status: 'approved',
    reviewNotes: 'Disetujui dalam rapat komite CSR Universa. Direkomendasikan untuk didanai oleh konsorsium PT Mineral Pasifik Raya.',
    reviewerId: 'usr_001',
    submittedAt: '2026-02-28',
    reviewedAt: '2026-03-15'
  },
  {
    id: 'prop_004',
    code: 'PROP-2026-004',
    partnerId: 'ptr_008',
    title: 'Pelatihan Mitigasi Bencana Gempa Sesar Cugenang untuk Warga Desa',
    category: 'tanggap_bencana',
    location: 'Cianjur',
    province: 'Jawa Barat',
    problemStatement: 'Tingginya kerentanan gempa dangkal di zona sesar aktif dan masih minimnya jalur evakuasi bertanda serta pelatihan kesiapsiagaan warga.',
    proposedActivities: 'Simulasi evakuasi mandiri berkala di 10 desa, instalasi sirine peringatan dini sederhana, dan penyediaan tas siaga bencana untuk keluarga.',
    proposedBudget: 290_000_000,
    targetBeneficiaries: 1500,
    estimatedDurationMonths: 4,
    indicators: [
      { label: 'Warga Mengikuti Simulasi Evakuasi', target: 1500, unit: 'warga' },
      { label: 'Papan Evakuasi & Jalur Aman Terpasang', target: 50, unit: 'titik' }
    ],
    status: 'draft',
    submittedAt: '2026-03-20'
  },
  {
    id: 'prop_005',
    code: 'PROP-2026-005',
    partnerId: 'ptr_007',
    title: 'Sumur Resapan Air Hujan & Filter Karbon Komunitas Pemukiman Padat',
    category: 'infrastruktur',
    location: 'Jakarta Utara',
    province: 'DKI Jakarta',
    problemStatement: 'Kebutuhan drainase ramah lingkungan untuk mencegah genangan air rob dan krisis kualitas air tanah pemukiman padat pesisir.',
    proposedActivities: 'Pembuatan 100 sumur resapan modular bio-pori dalam dan instalasi filter karbon aktif pada kran komunal.',
    proposedBudget: 350_000_000,
    targetBeneficiaries: 850,
    estimatedDurationMonths: 5,
    indicators: [
      { label: 'Sumur Resapan Bio-Pori Dalam Terbangun', target: 100, unit: 'titik' }
    ],
    status: 'rejected',
    reviewNotes: 'Studi kelayakan teknis tanah pesisir menunjukkan potensi intrusi air asin jika sumur dibuat terlalu dalam. Disarankan revisi desain bersama dinas terkait.',
    reviewerId: 'usr_001',
    submittedAt: '2026-01-25',
    reviewedAt: '2026-02-10'
  },
  {
    id: 'prop_006',
    code: 'PROP-2026-006',
    partnerId: 'ptr_003',
    title: 'Lumbung Pangan Mandiri & Pupuk Organik Petani Magelang',
    category: 'ekonomi_umkm',
    location: 'Magelang',
    province: 'Jawa Tengah',
    problemStatement: 'Ketergantungan pupuk kimia mahal menekan margin petani sayur lokal.',
    proposedActivities: 'Pelatihan formulasi kompos dan pembangunan lumbung bibit komunal.',
    proposedBudget: 400_000_000,
    targetBeneficiaries: 400,
    estimatedDurationMonths: 8,
    indicators: [
      { label: 'Petani Terlatih Formulasi Kompos', target: 400, unit: 'petani' }
    ],
    status: 'converted',
    reviewNotes: 'Proposal disetujui dan telah resmi dikonversi menjadi Program aktif PRG-2026-008.',
    reviewerId: 'usr_001',
    submittedAt: '2026-02-05',
    reviewedAt: '2026-02-20',
    convertedProgramId: 'prg_008'
  }
];

export const SEED_FUNDING_RECORDS: FundingRecord[] = [
  // Funder 1: PT Nusantara Energi Lestari (NEL) -> Commitment 4.5 M
  {
    id: 'fndrec_001',
    referenceNo: 'COM-2026-NEL-01',
    funderId: 'fnd_001',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Commitment',
    amount: 4_500_000_000,
    date: '2026-01-08',
    status: 'Approved (Demo)',
    notes: 'Komitmen Anggaran TJSL Tahunan 2026 untuk Pilar Lingkungan & Energi Bersih',
    createdBy: 'Rian Kurniawan (VP CSR)'
  },
  // Allocation from NEL to PRG-001 (750M) and PRG-005 (700M)
  {
    id: 'fndrec_002',
    referenceNo: 'ALC-2026-PRG001',
    funderId: 'fnd_001',
    programId: 'prg_001',
    partnerId: 'ptr_001',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Allocation',
    amount: 750_000_000,
    date: '2026-01-12',
    status: 'Approved (Demo)',
    notes: 'Alokasi dana disetujui untuk Program Mangrove Muara Gembong',
    createdBy: 'CSR Manager Universa'
  },
  {
    id: 'fndrec_003',
    referenceNo: 'DIS-2026-PRG001-T1',
    funderId: 'fnd_001',
    programId: 'prg_001',
    partnerId: 'ptr_001',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Distribution',
    amount: 500_000_000,
    date: '2026-01-20',
    status: 'Disbursed (Demo)',
    notes: 'Penyaluran Termin 1 (66%) untuk persiapan bibit dan pembuatan bedeng',
    createdBy: 'Finance Ops Universa'
  },
  {
    id: 'fndrec_004',
    referenceNo: 'ALC-2026-PRG005',
    funderId: 'fnd_001',
    programId: 'prg_005',
    partnerId: 'ptr_007',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Allocation',
    amount: 700_000_000,
    date: '2026-01-14',
    status: 'Approved (Demo)',
    notes: 'Alokasi dana untuk Pipanisasi Air Bersih Gunungkidul',
    createdBy: 'CSR Manager Universa'
  },
  {
    id: 'fndrec_005',
    referenceNo: 'DIS-2026-PRG005-T1',
    funderId: 'fnd_001',
    programId: 'prg_005',
    partnerId: 'ptr_007',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Distribution',
    amount: 550_000_000,
    date: '2026-01-28',
    status: 'Disbursed (Demo)',
    notes: 'Penyaluran Termin 1 & 2 untuk pengadaan panel surya & pipa HDPE',
    createdBy: 'Finance Ops Universa'
  },

  // Funder 2: PT Telko Digital Nusantara (TDN) -> Commitment 3.0 M
  {
    id: 'fndrec_006',
    referenceNo: 'COM-2026-TDN-01',
    funderId: 'fnd_002',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Commitment',
    amount: 3_000_000_000,
    date: '2026-01-15',
    status: 'Approved (Demo)',
    notes: 'Komitmen Dana CSR Digitalisasi Pendidikan & Inklusi Pemuda',
    createdBy: 'Sarah Amanda (CSR Director)'
  },
  {
    id: 'fndrec_007',
    referenceNo: 'ALC-2026-PRG002',
    funderId: 'fnd_002',
    programId: 'prg_002',
    partnerId: 'ptr_002',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Allocation',
    amount: 850_000_000,
    date: '2026-01-25',
    status: 'Approved (Demo)',
    notes: 'Alokasi dana Beasiswa Generasi Emas & Coding Camp',
    createdBy: 'CSR Manager Universa'
  },
  {
    id: 'fndrec_008',
    referenceNo: 'DIS-2026-PRG002-T1',
    funderId: 'fnd_002',
    programId: 'prg_002',
    partnerId: 'ptr_002',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Distribution',
    amount: 600_000_000,
    date: '2026-02-10',
    status: 'Disbursed (Demo)',
    notes: 'Penyaluran Uang Kuliah Tunggal semester genap dan pembelian laptop',
    createdBy: 'Finance Ops Universa'
  },
  {
    id: 'fndrec_009',
    referenceNo: 'ALC-2026-PRG007',
    funderId: 'fnd_002',
    programId: 'prg_007',
    partnerId: 'ptr_006',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Allocation',
    amount: 450_000_000,
    date: '2025-08-25',
    status: 'Approved (Demo)',
    notes: 'Alokasi Vokasi Pemuda Disabilitas',
    createdBy: 'CSR Manager Universa'
  },
  {
    id: 'fndrec_010',
    referenceNo: 'DIS-2026-PRG007-FINAL',
    funderId: 'fnd_002',
    programId: 'prg_007',
    partnerId: 'ptr_006',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Distribution',
    amount: 450_000_000,
    date: '2026-01-10',
    status: 'Disbursed (Demo)',
    notes: 'Penyaluran 100% tuntas untuk honor instruktur dan sertifikasi kompetensi',
    createdBy: 'Finance Ops Universa'
  },

  // Funder 3: Bank Mandiri Sejahtera (BMS) -> Commitment 2.5 M
  {
    id: 'fndrec_011',
    referenceNo: 'COM-2026-BMS-01',
    funderId: 'fnd_003',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Commitment',
    amount: 2_500_000_000,
    date: '2026-02-01',
    status: 'Approved (Demo)',
    notes: 'Komitmen CSR Pilar Pemberdayaan Ekonomi & Akses Keuangan UMKM',
    createdBy: 'Dedi Prasetyo'
  },
  {
    id: 'fndrec_012',
    referenceNo: 'ALC-2026-PRG003',
    funderId: 'fnd_003',
    programId: 'prg_003',
    partnerId: 'ptr_003',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Allocation',
    amount: 600_000_000,
    date: '2026-02-08',
    status: 'Approved (Demo)',
    notes: 'Alokasi Inkubasi & Halal UMKM Pesisir Pantura',
    createdBy: 'CSR Manager Universa'
  },
  {
    id: 'fndrec_013',
    referenceNo: 'DIS-2026-PRG003-T1',
    funderId: 'fnd_003',
    programId: 'prg_003',
    partnerId: 'ptr_003',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Distribution',
    amount: 350_000_000,
    date: '2026-02-25',
    status: 'Disbursed (Demo)',
    notes: 'Penyaluran Termin 1 untuk pengadaan sealer vakum & biaya sertifikasi halal',
    createdBy: 'Finance Ops Universa'
  },

  // Funder 4: PT Mineral Pasifik Raya (MPR) -> Commitment 2.0 M
  {
    id: 'fndrec_014',
    referenceNo: 'COM-2026-MPR-01',
    funderId: 'fnd_004',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Commitment',
    amount: 2_000_000_000,
    date: '2026-02-12',
    status: 'Approved (Demo)',
    notes: 'Komitmen TJSL Kesiapan Lingkungan & Gizi Sehat Terpencil',
    createdBy: 'Maya Indriani'
  },
  {
    id: 'fndrec_015',
    referenceNo: 'ALC-2026-PRG004',
    funderId: 'fnd_004',
    programId: 'prg_004',
    partnerId: 'ptr_005',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Allocation',
    amount: 500_000_000,
    date: '2026-02-16',
    status: 'Approved (Demo)',
    notes: 'Alokasi Intervensi Stunting Balita TTS NTT',
    createdBy: 'CSR Manager Universa'
  },
  {
    id: 'fndrec_016',
    referenceNo: 'DIS-2026-PRG004-T1',
    funderId: 'fnd_004',
    programId: 'prg_004',
    partnerId: 'ptr_005',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Distribution',
    amount: 250_000_000,
    date: '2026-02-28',
    status: 'Disbursed (Demo)',
    notes: 'Penyaluran Termin 1 pembelian telur, susu, dan bahan pangan lokal 3 bulan',
    createdBy: 'Finance Ops Universa'
  },

  // Funder 5: PT Agro Lestari Sentosa (ALS) -> Commitment 1.2 M
  {
    id: 'fndrec_017',
    referenceNo: 'COM-2026-ALS-01',
    funderId: 'fnd_005',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Commitment',
    amount: 1_200_000_000,
    date: '2026-02-20',
    status: 'Approved (Demo)',
    notes: 'Komitmen Restorasi Koridor Hutan Tropis & Pemberdayaan Petani Kompos',
    createdBy: 'Bambang Sudibyo'
  },
  {
    id: 'fndrec_018',
    referenceNo: 'ALC-2026-PRG006',
    funderId: 'fnd_005',
    programId: 'prg_006',
    partnerId: 'ptr_004',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Allocation',
    amount: 750_000_000,
    date: '2026-02-22',
    status: 'Approved (Demo)',
    notes: 'Alokasi Reboisasi Hutan Gambut Riau',
    createdBy: 'CSR Manager Universa'
  },
  {
    id: 'fndrec_019',
    referenceNo: 'DIS-2026-PRG006-T1',
    funderId: 'fnd_005',
    programId: 'prg_006',
    partnerId: 'ptr_004',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Distribution',
    amount: 400_000_000,
    date: '2026-03-05',
    status: 'Disbursed (Demo)',
    notes: 'Penyaluran Termin 1 bibit endemik dan sekat kanal',
    createdBy: 'Finance Ops Universa'
  },
  {
    id: 'fndrec_020',
    referenceNo: 'ALC-2026-PRG008',
    funderId: 'fnd_005',
    programId: 'prg_008',
    partnerId: 'ptr_003',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Allocation',
    amount: 400_000_000,
    date: '2026-03-01',
    status: 'Approved (Demo)',
    notes: 'Alokasi Lumbung Pangan Magelang',
    createdBy: 'CSR Manager Universa'
  },
  {
    id: 'fndrec_021',
    referenceNo: 'DIS-2026-PRG008-T1',
    funderId: 'fnd_005',
    programId: 'prg_008',
    partnerId: 'ptr_003',
    sourceType: 'CSR Korporat Tahunan',
    recordType: 'Distribution',
    amount: 200_000_000,
    date: '2026-03-15',
    status: 'Disbursed (Demo)',
    notes: 'Penyaluran Termin 1 tempat fermentasi kompos',
    createdBy: 'Finance Ops Universa'
  }
];

export const SEED_BENEFICIARIES: BeneficiaryAggregate[] = [
  {
    id: 'ben_001',
    programId: 'prg_001',
    programTitle: 'Penanaman 50.000 Mangrove & Restorasi Pesisir Muara Gembong',
    region: 'Kabupaten Bekasi',
    province: 'Jawa Barat',
    groupLabel: 'Kelompok Nelayan & Petani Tambak Pesisir',
    targetCount: 1200,
    reachedCount: 950,
    countingMethod: 'participation_event',
    notes: 'Diukur dari kehadiran sesi kerja bakti penanaman dan pemeliharaan bibit.',
    lastUpdated: '2026-03-20'
  },
  {
    id: 'ben_002',
    programId: 'prg_002',
    programTitle: 'Beasiswa Generasi Emas & Coding Camp Talenta Prasejahtera',
    region: 'Semarang & Solo Raya',
    province: 'Jawa Tengah',
    groupLabel: 'Pelajar & Mahasiswa Prasejahtera Terverifikasi',
    targetCount: 150,
    reachedCount: 150,
    countingMethod: 'unique_verified',
    notes: 'Daftar nama dan identitas unik telah diverifikasi bersama perguruan tinggi mitra.',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'ben_003',
    programId: 'prg_003',
    programTitle: 'Inkubasi & Digitalisasi 250 UMKM Kuliner Pesisir Pantura',
    region: 'Tuban & Lamongan',
    province: 'Jawa Timur',
    groupLabel: 'Pelaku Usaha Mikro & Perempuan Pengrajin Pesisir',
    targetCount: 250,
    reachedCount: 220,
    countingMethod: 'unique_verified',
    notes: 'Berdasarkan Nomor Induk Berusaha (NIB) pelaku usaha binaan.',
    lastUpdated: '2026-03-18'
  },
  {
    id: 'ben_004',
    programId: 'prg_004',
    programTitle: 'Intervensi Terpadu Pengentasan Stunting & Gizi Balita Pesisir',
    region: 'Timor Tengah Selatan',
    province: 'Nusa Tenggara Timur',
    groupLabel: 'Balita Indikasi Stunting & Ibu Menyusui',
    targetCount: 600,
    reachedCount: 520,
    countingMethod: 'unique_verified',
    notes: 'Berdasarkan buku KIA Posyandu desa sasaran yang dipantau setiap bulan.',
    lastUpdated: '2026-03-10'
  },
  {
    id: 'ben_005',
    programId: 'prg_005',
    programTitle: 'Instalasi Pompa Tenaga Surya & Pipanisasi Air Bersih Desa Karst',
    region: 'Gunungkidul',
    province: 'DI Yogyakarta',
    groupLabel: 'Warga Pedesaan Kawasan Kekeringan Karst',
    targetCount: 1800,
    reachedCount: 1650,
    countingMethod: 'household_estimate',
    notes: 'Estimasi 450 Kepala Keluarga dikalikan rata-rata 3.7 jiwa per keluarga.',
    lastUpdated: '2026-03-24'
  },
  {
    id: 'ben_006',
    programId: 'prg_006',
    programTitle: 'Reboisasi 100 Hektar Hutan Gambut & Patroli Api Masyarakat',
    region: 'Pelalawan',
    province: 'Riau',
    groupLabel: 'Masyarakat Peduli Api & Petani Sekitar Hutan',
    targetCount: 800,
    reachedCount: 600,
    countingMethod: 'participation_event',
    notes: 'Partisipasi warga dalam patroli pencegahan api dan pemeliharaan kanal gambut.',
    lastUpdated: '2026-03-22'
  },
  {
    id: 'ben_007',
    programId: 'prg_007',
    programTitle: 'Pelatihan Vokasi & Penyaluran Kerja Inklusif Pemuda Disabilitas',
    region: 'Jakarta Barat & Tangerang',
    province: 'DKI Jakarta',
    groupLabel: 'Pemuda Penyandang Disabilitas Lulusan Vokasi',
    targetCount: 80,
    reachedCount: 80,
    countingMethod: 'unique_verified',
    notes: 'Penerima manfaat unik tuntas 100% dengan portofolio kerja siap industri.',
    lastUpdated: '2026-03-02'
  },
  {
    id: 'ben_008',
    programId: 'prg_008',
    programTitle: 'Penguatan Lumbung Pangan Mandiri & Pupuk Organik Petani',
    region: 'Magelang',
    province: 'Jawa Tengah',
    groupLabel: 'Kelompok Tani Sayur Organik',
    targetCount: 400,
    reachedCount: 310,
    countingMethod: 'participation_event',
    notes: 'Partisipasi petani dalam workshop fermentasi kompos limbah pertanian.',
    lastUpdated: '2026-03-20'
  }
];

export const SEED_IMPACT_REPORTS: ImpactReport[] = [
  {
    id: 'rep_001',
    reportCode: 'RPT-2026-PRG007-FINAL',
    title: 'Laporan Evaluasi Akhir & Dampak Ketenagakerjaan Program Vokasi Disabilitas',
    reportType: 'Program Final Evaluation',
    scopeType: 'program',
    scopeId: 'prg_007',
    periodStart: '2025-09-01',
    periodEnd: '2026-02-28',
    summary: 'Program Vokasi Disabilitas bersama PT Telko Digital Nusantara berhasil melatih 80 pemuda dengan tingkat penempatan kerja 81.2%. Evaluasi menunjukkan peningkatan rata-rata pendapatan penerima manfaat sebesar 185% dibanding sebelum pelatihan.',
    outputMetrics: [
      { label: 'Total Pemuda Dilatih', value: '80 Orang' },
      { label: 'Terserap Magang / Kontrak Industri', value: '65 Orang (81.2%)' },
      { label: 'Modul Pelatihan Standar Industri', value: '4 Bidang Vokasi' }
    ],
    outcomeMetrics: [
      { label: 'Kenaikan Kemandirian Finansial', value: '+185% Pendapatan Rata-rata' },
      { label: 'Tingkat Kepuasan Mitra Perusahaan', value: '94% Sangat Puas' }
    ],
    budgetRealization: {
      allocated: 450_000_000,
      disbursed: 450_000_000,
      utilizationPercent: 100
    },
    challenges: 'Kebutuhan adaptasi perangkat khusus bagi penyandang disabilitas motorik berat pada awal modul.',
    mitigationNotes: 'Dukungan software assistive screen reader dan mouse alternatif disediakan oleh mitra pelaksana.',
    status: 'Published (Demo)',
    createdAt: '2026-03-05',
    approvedAt: '2026-03-10',
    author: 'Lestari Rahayu (YBMI)'
  },
  {
    id: 'rep_002',
    reportCode: 'RPT-2026-NEL-Q1',
    title: 'Laporan Triwulan I Kinerja Investasi Sosial PT Nusantara Energi Lestari',
    reportType: 'Quarterly Impact Review',
    scopeType: 'funder',
    scopeId: 'fnd_001',
    periodStart: '2026-01-01',
    periodEnd: '2026-03-31',
    summary: 'Konsolidasi kinerja program lingkungan dan air bersih di Muara Gembong dan Gunungkidul. Realisasi penyaluran dana mencapai Rp 1.050.000.000 dengan capaian 2.600 penerima manfaat.',
    outputMetrics: [
      { label: 'Bibit Mangrove Tertanam', value: '36.500 Pohon' },
      { label: 'Pipa Air Bersih Terpasang', value: '3.900 Meter' },
      { label: 'Penerima Manfaat Terjangkau', value: '2.600 Jiwa' }
    ],
    outcomeMetrics: [
      { label: 'Reduksi Abrasi Pesisir Terpantau', value: '18 Hektar Terlindung' },
      { label: 'Efisiensi Pengeluaran Air Warga', value: 'Hemat Rp 350.000/KK/Bulan' }
    ],
    budgetRealization: {
      allocated: 1_450_000_000,
      disbursed: 1_050_000_000,
      utilizationPercent: 72.4
    },
    challenges: 'Cuaca ekstrem gelombang tinggi di pesisir utara pada bulan Februari sempat menunda penanaman blok luar.',
    mitigationNotes: 'Jadwal kerja bakti disesuaikan dengan prakiraan pasang surut BMKG maritim.',
    status: 'Approved (Demo)',
    createdAt: '2026-03-22',
    approvedAt: '2026-03-24',
    author: 'CSR Manager Universa'
  },
  {
    id: 'rep_003',
    reportCode: 'RPT-2026-PROPER-DRAFT-01',
    title: 'Draf Dokumen Kesiapan Kriteria Penilaian PROPER KLHK (Aspek TJSL Hijau)',
    reportType: 'PROPER Kesiapan Lingkungan',
    scopeType: 'all',
    periodStart: '2026-01-01',
    periodEnd: '2026-06-30',
    summary: 'Format draft laporan formal pelaporan Tanggung Jawab Sosial dan Lingkungan Perseroan untuk keperluan evaluasi PROPER (Program Penilaian Peringkat Kinerja Perusahaan) Kementerian Lingkungan Hidup dan Kehutanan. Data mencakup baseline, metodologi, dan bukti geotagging.',
    outputMetrics: [
      { label: 'Total Hektar Kawasan Restorasi', value: '66 Hektar' },
      { label: 'Bibit Pohon Endemik Terdata', value: '52.000 Batang' },
      { label: 'Kelompok Masyarakat Binaan', value: '4 Lembaga Pesisir/Gambut' }
    ],
    outcomeMetrics: [
      { label: 'Estimasi Serapan Karbon (CO2e)', value: 'Draft Perhitungan Metodologi IPB' },
      { label: 'Indeks Keanekaragaman Hayati (H)', value: 'Baseline 1.82 -> Target 2.15' }
    ],
    budgetRealization: {
      allocated: 1_500_000_000,
      disbursed: 900_000_000,
      utilizationPercent: 60.0
    },
    challenges: 'Memerlukan verifikasi geotagging titik koordinat lapangan yang presisi sebelum diajukan ke dinas terkait.',
    mitigationNotes: 'Dokumen ini berstatus DRAF SIMULASI dan harus melalui penelaahan internal legal compliance sebelum diajukan secara resmi.',
    status: 'In Review',
    createdAt: '2026-03-20',
    author: 'Tim ESG & Governance Universa'
  },
  {
    id: 'rep_004',
    reportCode: 'RPT-2026-EDU-01',
    title: 'Laporan Perkembangan Triwulan Program Beasiswa & Coding Camp Pelajar',
    reportType: 'Quarterly Impact Review',
    scopeType: 'program',
    scopeId: 'prg_002',
    periodStart: '2026-02-01',
    periodEnd: '2026-04-30',
    summary: 'Evaluasi tengah semester program beasiswa pendidikan tinggi bagi 150 mahasiswa penerima manfaat di Solo & Semarang. Seluruh laptop edukasi telah diserahterimakan.',
    outputMetrics: [
      { label: 'Penerima Beasiswa Aktif Kuliah', value: '150 Mahasiswa' },
      { label: 'Laptop Edukasi Tersalurkan', value: '150 Unit' },
      { label: 'Rata-rata IPK Semester Berjalan', value: '3.62 / 4.00' }
    ],
    outcomeMetrics: [
      { label: 'Kelulusan Sertifikasi Coding Awal', value: '73.3% Peserta Lulus' }
    ],
    budgetRealization: {
      allocated: 850_000_000,
      disbursed: 600_000_000,
      utilizationPercent: 70.5
    },
    challenges: 'Sebagian mahasiswa membutuhkan tambahan pendampingan bahasa Inggris teknik pada dokumentasi kode.',
    mitigationNotes: 'Mitra Cendekia Bangsa menambahkan sesi coaching bahasa Inggris 2x sepekan.',
    status: 'Approved (Demo)',
    createdAt: '2026-03-18',
    approvedAt: '2026-03-21',
    author: 'Nurul Hidayati (LECB)'
  }
];

export const SEED_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act_001',
    timestamp: '2026-03-25T14:30:00Z',
    actorName: 'CSR Manager Universa',
    actorRole: 'manager',
    action: 'Update Progress',
    entityType: 'Program',
    entityId: 'prg_001',
    summary: 'Memperbarui progres Program Mangrove Muara Gembong menjadi 68% dengan 36.500 bibit tertanam.'
  },
  {
    id: 'act_002',
    timestamp: '2026-03-24T11:15:00Z',
    actorName: 'Agus Wibowo',
    actorRole: 'partner',
    action: 'Upload Evidence',
    entityType: 'Program',
    entityId: 'prg_005',
    summary: 'Mengunggah Berita Acara Uji Kelayakan Air Bersih Gunungkidul.'
  },
  {
    id: 'act_003',
    timestamp: '2026-03-24T09:45:00Z',
    actorName: 'Nurul Hidayati',
    actorRole: 'partner',
    action: 'Submit Proposal',
    entityType: 'Proposal',
    entityId: 'prop_002',
    summary: 'Mengajukan Proposal Baru: Mobil Pintar Literasi & Pojok Baca Digital Wonogiri.'
  },
  {
    id: 'act_004',
    timestamp: '2026-03-22T16:00:00Z',
    actorName: 'CSR Manager Universa',
    actorRole: 'manager',
    action: 'Create Report',
    entityType: 'Report',
    entityId: 'rep_002',
    summary: 'Menerbitkan draf Laporan Kinerja Investasi Sosial Q1 PT Nusantara Energi Lestari.'
  },
  {
    id: 'act_005',
    timestamp: '2026-03-18T13:20:00Z',
    actorName: 'CSR Manager Universa',
    actorRole: 'manager',
    action: 'Review Proposal',
    entityType: 'Proposal',
    entityId: 'prop_001',
    summary: 'Memberikan catatan peninjauan pada Proposal Konservasi Karang Kepulauan Seribu.'
  },
  {
    id: 'act_006',
    timestamp: '2026-03-15T10:00:00Z',
    actorName: 'Finance Ops Universa',
    actorRole: 'manager',
    action: 'Disburse Funding',
    entityType: 'Funding',
    entityId: 'fndrec_021',
    summary: 'Mencatat simulasi penyaluran dana Termin 1 Rp 200.000.000 untuk Program Lumbung Pangan Magelang.'
  },
  {
    id: 'act_007',
    timestamp: '2026-03-12T08:30:00Z',
    actorName: 'Hendra Gunawan',
    actorRole: 'partner',
    action: 'Submit Proposal',
    entityType: 'Proposal',
    entityId: 'prop_001',
    summary: 'Mengajukan Proposal Konservasi Terumbu Karang & Ekowisata Kepulauan Seribu.'
  },
  {
    id: 'act_008',
    timestamp: '2026-03-05T15:00:00Z',
    actorName: 'Sarah Amanda',
    actorRole: 'funder',
    action: 'Review Impact Report',
    entityType: 'Report',
    entityId: 'rep_001',
    summary: 'Menyetujui Laporan Evaluasi Akhir Program Vokasi Disabilitas.'
  }
];

export const SEED_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'notif_001',
    title: 'Proposal Baru Masuk',
    message: 'Mitra Cendekia Bangsa mengajukan proposal Mobil Pintar Literasi Wonogiri.',
    type: 'action_required',
    createdAt: '2026-03-24T09:45:00Z',
    read: false,
    linkTo: '/dashboard/proposals'
  },
  {
    id: 'notif_002',
    title: 'Bukti Kegiatan Diperbarui',
    message: 'Mitra Air Bersih Nusa mengunggah sertifikat uji kelayakan air bersih Gunungkidul.',
    type: 'info',
    createdAt: '2026-03-24T11:15:00Z',
    read: false,
    linkTo: '/dashboard/programs/prg_005'
  },
  {
    id: 'notif_003',
    title: 'Jadwal Monitoring Mendekati',
    message: 'Program Restorasi Mangrove Muara Gembong dijadwalkan verifikasi lapangan akhir bulan ini.',
    type: 'warning',
    createdAt: '2026-03-22T08:00:00Z',
    read: true,
    linkTo: '/dashboard/programs/prg_001'
  },
  {
    id: 'notif_004',
    title: 'Laporan Dampak Diterbitkan',
    message: 'Laporan Evaluasi Akhir Vokasi Disabilitas telah dipublikasikan (Demo).',
    type: 'success',
    createdAt: '2026-03-10T14:00:00Z',
    read: true,
    linkTo: '/dashboard/reports'
  }
];

export const SEED_ASPIRATIONS: CommunityAspiration[] = [
  {
    id: 'asp_001',
    ticketCode: 'ASP-DESA-2026-001',
    applicantName: 'H. Suryana, S.Sos.',
    applicantRole: 'Kepala Desa Sukajaya',
    contactPhone: '+62 813-8877-6655',
    email: 'kades.sukajaya@cianjurkab.demo',
    village: 'Desa Sukajaya',
    district: 'Kecamatan Cugenang',
    regency: 'Kabupaten Cianjur',
    province: 'Jawa Barat',
    title: 'Pembangunan 15 Sarana Sanitasi & MCK Komunal Pascagempa',
    category: 'infrastruktur',
    problemDescription: 'Warga di 3 RT masih menggunakan sarana sanitasi darurat setelah musibah gempa. Dibutuhkan MCK higienis permanen dan septic tank biofilter.',
    estimatedBeneficiaries: 450,
    estimatedBudget: 85_000_000,
    urgencyLevel: 'sangat_mendesak',
    status: 'masuk_buku_menu',
    submittedAt: '2026-02-10',
    verifiedBy: 'Tim Fasilitasi TJSL Bapperida Cianjur',
    notes: 'Telah lolos verifikasi lapangan, siap dipasangkan dengan Funder BUMN Konstruksi.'
  },
  {
    id: 'asp_002',
    ticketCode: 'ASP-DESA-2026-002',
    applicantName: 'M. Taufik Ismail',
    applicantRole: 'Ketua Karang Taruna Pesisir',
    contactPhone: '+62 856-7788-9900',
    village: 'Desa Ciparagejaya',
    district: 'Kecamatan Tempuran',
    regency: 'Kabupaten Karawang',
    province: 'Jawa Barat',
    title: 'Pelatihan Olahan Ikan Asin Higienis & Bantuan Rumah Pengering Higienis',
    category: 'ekonomi_umkm',
    problemDescription: 'Kelompok istri nelayan membutuhkan solar dryer dome (alat pengering higienis) agar tidak menjemur ikan asin di pinggir jalan yang berdebu.',
    estimatedBeneficiaries: 120,
    estimatedBudget: 65_000_000,
    urgencyLevel: 'tinggi',
    status: 'diverifikasi',
    submittedAt: '2026-02-18',
    verifiedBy: 'Bappeda Karawang Bidang Ekososbud',
    notes: 'Prioritas pemulihan ekonomi pesisir utara Karawang.'
  },
  {
    id: 'asp_003',
    ticketCode: 'ASP-DESA-2026-003',
    applicantName: 'Wayan Suwandi',
    applicantRole: 'Ketua Pengelola Air Dusun Karst',
    contactPhone: '+62 878-5544-3322',
    village: 'Desa Giricahyo',
    district: 'Kecamatan Purwosari',
    regency: 'Kabupaten Gunungkidul',
    province: 'DI Yogyakarta',
    title: 'Perluasan Jaringan Pipa Gravitasi & Tandon Penampung Air Hujan',
    category: 'infrastruktur',
    problemDescription: 'Menghubungkan sumber air bawah tanah ke 2 dusun terpencil langganan kekeringan ekstrem sepanjang musim kemarau.',
    estimatedBeneficiaries: 680,
    estimatedBudget: 110_000_000,
    urgencyLevel: 'tinggi',
    status: 'menunggu_telaah',
    submittedAt: '2026-03-01'
  },
  {
    id: 'asp_004',
    ticketCode: 'ASP-DESA-2026-004',
    applicantName: 'Maria Yohana Bria',
    applicantRole: 'Bidan Koordinator Puskesmas Pembantu',
    contactPhone: '+62 821-4433-2211',
    village: 'Desa Oenino',
    district: 'Kecamatan Oenino',
    regency: 'Kabupaten Timor Tengah Selatan',
    province: 'Nusa Tenggara Timur',
    title: 'Paket Timbangan Bayi Digital Antropometri & PMT Telur Balita',
    category: 'kesehatan',
    problemDescription: 'Timbangan gantung dacin di 5 posyandu sudah usang dan tidak akurat. Diperlukan timbangan digital standar Kemenkes dan asupan pangan lokal kaya protein telur.',
    estimatedBeneficiaries: 240,
    estimatedBudget: 45_000_000,
    urgencyLevel: 'sangat_mendesak',
    status: 'didukung_funder',
    submittedAt: '2026-01-28',
    verifiedBy: 'Dinas Kesehatan TTS',
    notes: 'Didukung oleh komitmen alokasi Kimia Farma (PRG-2026-004).'
  },
  {
    id: 'asp_005',
    ticketCode: 'ASP-DESA-2026-005',
    applicantName: 'Bambang Supriyanto',
    applicantRole: 'Ketua Forum Tani Lestari',
    contactPhone: '+62 812-9988-7766',
    village: 'Desa Sambak',
    district: 'Kecamatan Kajoran',
    regency: 'Kabupaten Magelang',
    province: 'Jawa Tengah',
    title: 'Mesin Pencacah Limbah Jerami untuk Sentra Kompos Pupuk Organik',
    category: 'lingkungan',
    problemDescription: 'Petani kekurangan mesin perajang jerami dan kotoran ternak sehingga pembakaran jerami masih sering terjadi.',
    estimatedBeneficiaries: 180,
    estimatedBudget: 55_000_000,
    urgencyLevel: 'sedang',
    status: 'menunggu_telaah',
    submittedAt: '2026-03-15'
  }
];
