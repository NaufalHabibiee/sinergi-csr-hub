import React, { useState } from 'react';
import {
  Scale,
  BookOpen,
  FileText,
  Download,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Info,
  Calendar,
  Building2,
  BookmarkCheck,
  Layers,
  ArrowRight
} from 'lucide-react';

interface RegulationDoc {
  id: string;
  category: 'uu' | 'pp' | 'perda' | 'permen';
  categoryLabel: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  scope: string;
  year: number;
  promulgatedBy: string;
  keyArticles: {
    article: string;
    headline: string;
    excerpt: string;
    practicalAdvice: string;
  }[];
  taxOrComplianceImplication: string;
  fileSize: string;
}

const REGULATIONS_DATA: RegulationDoc[] = [
  {
    id: 'reg_01',
    category: 'uu',
    categoryLabel: 'Undang-Undang',
    number: 'UU No. 40 Tahun 2007',
    title: 'Undang-Undang Republik Indonesia tentang Perseroan Terbatas (Pasal 74 TJSL)',
    shortTitle: 'Mandat Wajib TJSL & Kepatutan Beban Perseroan',
    tagline: 'Beban Biaya Sah & Kepatuhan Audit RUPS',
    scope: 'Nasional • Perseroan SDA',
    year: 2007,
    promulgatedBy: 'Presiden Republik Indonesia & DPR RI',
    keyArticles: [
      {
        article: 'Pasal 74 Ayat (1)',
        headline: 'Mandat Wajib TJSL bagi Perseroan Berbasis SDA',
        excerpt: 'Perseroan yang menjalankan kegiatan usahanya di bidang dan/atau berkaitan dengan sumber daya alam wajib melaksanakan Tanggung Jawab Sosial dan Lingkungan.',
        practicalAdvice: 'Wajib mengalokasikan program bina lingkungan dan konservasi secara berkala dalam RKAP tahunan.'
      },
      {
        article: 'Pasal 74 Ayat (2)',
        headline: 'Anggaran TJSL Diperhitungkan sebagai Biaya Perseroan',
        excerpt: 'Tanggung Jawab Sosial dan Lingkungan sebagaimana dimaksud pada ayat (1) merupakan kewajiban Perseroan yang dianggarkan dan diperhitungkan sebagai biaya Perseroan yang pelaksanaannya dilakukan dengan memperhatikan kepatutan dan kewajaran.',
        practicalAdvice: 'Alokasi dana CSR sah dicatat dalam pos beban operasional perseroan yang wajar dan dapat diaudit.'
      }
    ],
    taxOrComplianceImplication: 'Wajib dicantumkan dalam Laporan Tahunan Direksi kepada RUPS dan kepatuhan audit akuntan publik.',
    fileSize: '1.4 MB'
  },
  {
    id: 'reg_02',
    category: 'pp',
    categoryLabel: 'Peraturan Pemerintah',
    number: 'PP No. 47 Tahun 2012',
    title: 'Peraturan Pemerintah tentang Tanggung Jawab Sosial dan Lingkungan Perseroan Terbatas',
    shortTitle: 'Rencana Kerja Tahunan & Apresiasi Pemerintah',
    tagline: 'ESG Governance & Dasar Hukum CSR Award',
    scope: 'Pemerintah RI • Perseroan Terbatas',
    year: 2012,
    promulgatedBy: 'Pemerintah Republik Indonesia',
    keyArticles: [
      {
        article: 'Pasal 3 & 4',
        headline: 'Penyusunan Rencana Kerja & Kepatutan Anggaran',
        excerpt: 'TJSL dilaksanakan oleh Direksi berdasarkan rencana kerja tahunan Perseroan setelah mendapat persetujuan Dewan Komisaris atau RUPS. Rencana kerja memuat rencana kegiatan dan anggaran yang dibutuhkan.',
        practicalAdvice: 'Menjamin kepastian legalitas bagi Dewan Direksi sebelum mencairkan dana kemitraan kepada mitra pelaksana.'
      },
      {
        article: 'Pasal 6',
        headline: 'Laporan Pelaksanaan & Hak Apresiasi Pemerintah',
        excerpt: 'Pelaksanaan TJSL dimuat dalam laporan tahunan Perseroan dan dipertanggungjawabkan kepada RUPS. Perseroan yang berperan serta dapat diberikan penghargaan oleh instansi yang berwenang.',
        practicalAdvice: 'Dasar hukum penganugerahan CSR Award dan sertifikat apresiasi resmi kepala daerah.'
      }
    ],
    taxOrComplianceImplication: 'Memenuhi syarat transparansi pelaporan non-keuangan (ESG Governance Pillar).',
    fileSize: '820 KB'
  },
  {
    id: 'reg_03',
    category: 'perda',
    categoryLabel: 'Peraturan Daerah (Perda)',
    number: 'Perda Jabar No. 2/2013',
    title: 'Peraturan Daerah Provinsi Jawa Barat tentang Pedoman Pengelolaan TJSLP & PKBL',
    shortTitle: 'Tim Fasilitasi Kemitraan CSR & Sinkronisasi Daerah',
    tagline: 'Bebas Pungutan Liar & Selaras Musrenbang',
    scope: 'Pemerintah Daerah • Bebas Overlap',
    year: 2013,
    promulgatedBy: 'Gubernur & DPRD Provinsi Jawa Barat',
    keyArticles: [
      {
        article: 'Pasal 8 & 9',
        headline: 'Pembentukan Tim Fasilitasi CSR Kemitraan Daerah',
        excerpt: 'Pemerintah Daerah membentuk Tim Fasilitasi Kemitraan CSR untuk menyelaraskan prioritas pembangunan daerah dengan program tanggung jawab sosial korporasi tanpa membebani perusahaan dengan pungutan liar.',
        practicalAdvice: 'Platform SinergiCSR bertindak sebagai hub sinkronisasi antara Buku Menu Daerah dan komitmen korporasi.'
      },
      {
        article: 'Pasal 14',
        headline: 'Sinergi Musrenbang Desa & Daerah',
        excerpt: 'Program kemitraan diarahkan untuk menjawab aspirasi kebutuhan riil masyarakat yang dihimpun dari musyawarah perencanaan pembangunan (Musrenbang).',
        practicalAdvice: 'Menjamin program yang didanai korporasi tepat sasaran dan tidak tumpang-tindih (zero overlap) dengan APBD.'
      }
    ],
    taxOrComplianceImplication: 'Mendapat perlindungan regulasi daerah dan prioritas rekomendasi penghargaan gubernur.',
    fileSize: '2.1 MB'
  },
  {
    id: 'reg_04',
    category: 'perda',
    categoryLabel: 'Peraturan Gubernur (Pergub)',
    number: 'Pergub Jabar No. 30/2018',
    title: 'Petunjuk Pelaksanaan Pengelolaan Tanggung Jawab Sosial dan Lingkungan Perusahaan',
    shortTitle: 'Tata Kelola Berita Acara Serah Terima (BAST)',
    tagline: 'Syarat Mutlak Validasi Bebas Sengketa',
    scope: 'Dokumen Kunci Penutupan Proyek',
    year: 2018,
    promulgatedBy: 'Gubernur Jawa Barat',
    keyArticles: [
      {
        article: 'Pasal 12 & 15',
        headline: 'Penerbitan Berita Acara Serah Terima (BAST)',
        excerpt: 'Setiap penyelesaian program fisik maupun non-fisik wajib dituangkan dalam Berita Acara Serah Terima (BAST) antara perusahaan, mitra pelaksana, dan kelompok penerima manfaat yang diketahui Tim Fasilitasi.',
        practicalAdvice: 'BAST resmi adalah dokumen pertanggungjawaban final yang wajib diunggah pada platform pelaporan.'
      }
    ],
    taxOrComplianceImplication: 'BAST menjadi prasyarat validasi bebas sengketa dan penerbitan piagam kemitraan resmi.',
    fileSize: '950 KB'
  },
  {
    id: 'reg_05',
    category: 'permen',
    categoryLabel: 'Peraturan Menteri',
    number: 'Permen BUMN No. 05/2021',
    title: 'Program Tanggung Jawab Sosial dan Lingkungan Badan Usaha Milik Negara',
    shortTitle: 'Prioritas 3 Pilar TJSL & Pengukuran Dampak SROI',
    tagline: 'Fokus Pendidikan, Lingkungan & UMKM',
    scope: 'Badan Usaha Milik Negara',
    year: 2021,
    promulgatedBy: 'Menteri Badan Usaha Milik Negara RI',
    keyArticles: [
      {
        article: 'Pasal 4',
        headline: '3 Pilar Utama Sasaran TJSL BUMN',
        excerpt: 'Program TJSL BUMN wajib memprioritaskan 3 pilar: (1) Pendidikan berkualitas, (2) Lingkungan hidup berkelanjutan, dan (3) Pengembangan Usaha Mikro dan Kecil (UMKM).',
        practicalAdvice: 'Sangat cocok dengan program Beasiswa Vokasi, Restorasi Mangrove, dan Sentra UMKM SinergiCSR.'
      },
      {
        article: 'Pasal 18',
        headline: 'Pengukuran Dampak Berbasis SROI & SDGs',
        excerpt: 'Pelaksanaan program TJSL BUMN dinilai berdasarkan indikator pencapaian Tujuan Pembangunan Berkelanjutan (TPB/SDGs) dan rasio pengembalian sosial atas investasi (Social Return on Investment).',
        practicalAdvice: 'Metrik SROI platform ini telah memenuhi pedoman kementerian BUMN.'
      }
    ],
    taxOrComplianceImplication: 'Standar audit BPK & Kementerian BUMN atas pengelolaan dana TJSL BUMN.',
    fileSize: '1.8 MB'
  },
  {
    id: 'reg_06',
    category: 'permen',
    categoryLabel: 'Peraturan Menteri',
    number: 'Permen LHK No. 1/2021',
    title: 'Program Penilaian Peringkat Kinerja Perusahaan dalam Pengelolaan Lingkungan Hidup (PROPER)',
    shortTitle: 'Inovasi Sosial Peringkat PROPER Emas & Hijau',
    tagline: 'Kepatuhan Audit Lingkungan Hidup Tertinggi',
    scope: 'Kementerian Lingkungan Hidup',
    year: 2021,
    promulgatedBy: 'Menteri Lingkungan Hidup dan Kehutanan RI',
    keyArticles: [
      {
        article: 'Lampiran V',
        headline: 'Kriteria Inovasi Sosial Penilaian PROPER Hijau & Emas',
        excerpt: 'Peringkat Emas diberikan kepada perusahaan yang melakukan pemberdayaan masyarakat melalui program inovasi sosial yang menjawab akar masalah kemiskinan dan kelestarian ekosistem lokal.',
        practicalAdvice: 'Program Gambut Pelalawan dan Mangrove Muara Gembong dirancang memenuhi standar dokumen ringkasan kinerja (DRK) PROPER.'
      }
    ],
    taxOrComplianceImplication: 'Memperoleh predikat PROPER Hijau / Emas dari Kementerian LHK RI.',
    fileSize: '3.2 MB'
  },
  {
    id: 'reg_07',
    category: 'pp',
    categoryLabel: 'Peraturan Pemerintah (Pajak)',
    number: 'PP No. 93 Tahun 2010',
    title: 'Sumbangan Fasilitas Pendidikan, Bencana & Litbang yang Dapat Dikurangkan dari Penghasilan Bruto (Tax Deduction)',
    shortTitle: 'Insentif Pemotongan Pajak Bruto (Tax Deduction)',
    tagline: 'Pengurang Penghasilan Bruto Maksimal 5%',
    scope: 'Kementerian Keuangan RI',
    year: 2010,
    promulgatedBy: 'Presiden Republik Indonesia',
    keyArticles: [
      {
        article: 'Pasal 1 & 2',
        headline: 'Pengurang Penghasilan Bruto (Gross Income Tax Deduction)',
        excerpt: 'Sumbangan fasilitas pendidikan dan penelitian yang disalurkan melalui lembaga berbadan hukum sah dapat dikurangkan dari penghasilan bruto perseroan maksimal 5% dari penghasilan neto tahun sebelumnya.',
        practicalAdvice: 'SinergiCSR menyediakan bukti potong dan rekapitulasi BAST terverifikasi untuk pelaporan SPT Badan.'
      }
    ],
    taxOrComplianceImplication: 'Insentif pengurang beban pajak penghasilan badan resmi (PPh Badan).',
    fileSize: '740 KB'
  }
];

export const CSRRegulationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'uu' | 'pp' | 'perda' | 'permen'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedArticle, setCopiedArticle] = useState<string | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const filteredDocs = REGULATIONS_DATA.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      doc.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.keyArticles.some(
        (a) =>
          a.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedArticle(id);
    setTimeout(() => setCopiedArticle(null), 2500);
  };

  const handleDownload = (doc: RegulationDoc) => {
    setDownloadSuccessToast(`Mengunduh salinan resmi ${doc.number}... Dokumen PDF siap dibuka.`);
    setTimeout(() => setDownloadSuccessToast(null), 4000);
  };

  return (
    <section id="regulasi" className="scroll-mt-20 py-20 lg:py-28 bg-white border-t border-slate-150/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F6F0] text-[#176B4D] text-xs font-bold uppercase tracking-wider">
              <Scale className="w-4 h-4 text-[#176B4D]" />
              <span>Dasar Hukum &amp; Kepatuhan Audit PROPER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2518] tracking-tight leading-tight">
              Pusat Regulasi Kemitraan CSR &amp; <span className="text-[#176B4D]">Tax Deduction</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Landasan legalitas formal Undang-Undang PT, Peraturan Pemerintah, Perda Tim Fasilitasi, Permen BUMN, dan Kriteria PROPER KLHK sebagai payung hukum sah dan insentif pemotongan pajak (tax deduction).
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Total Payung Hukum:</span>
              <span className="font-extrabold text-[#176B4D] text-sm">7 Regulasi Utama</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Insentif Pajak:</span>
              <span className="font-extrabold text-amber-700 text-sm">Max 5% Tax Cut</span>
            </div>
          </div>
        </div>

        {/* Download Toast Notification */}
        {downloadSuccessToast && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center gap-2.5 animate-fadeIn">
            <BookmarkCheck className="w-4 h-4 text-[#176B4D]" />
            <span>{downloadSuccessToast}</span>
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            {[
              { id: 'all', label: 'Semua Regulasi' },
              { id: 'uu', label: 'Undang-Undang' },
              { id: 'pp', label: 'PP & Tax Deduction' },
              { id: 'perda', label: 'Perda & Pergub' },
              { id: 'permen', label: 'Permen BUMN / KLHK' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B2518] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari regulasi atau topik hukum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#176B4D] transition-colors"
            />
          </div>
        </div>

        {/* Regulations Grid Directly on Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => {
            const isCopied = copiedArticle === doc.id;
            const citationText = `[Regulasi] ${doc.number} - ${doc.shortTitle || doc.title}`;

            return (
              <div
                key={doc.id}
                className="bg-[#F8FAF9] hover:bg-white hover:shadow-xl rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-3.5">
                  {/* Category Pill & Year */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        doc.category === 'uu'
                          ? 'bg-rose-100/80 text-rose-800'
                          : doc.category === 'pp'
                          ? 'bg-blue-100/80 text-blue-800'
                          : doc.category === 'perda'
                          ? 'bg-amber-100/80 text-amber-800'
                          : 'bg-purple-100/80 text-purple-800'
                      }`}
                    >
                      {doc.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Tahun {doc.year}
                    </span>
                  </div>

                  {/* Regulation Number, Short Title & Scope */}
                  <div className="space-y-1">
                    <div className="text-xs font-mono font-bold text-[#176B4D]">
                      {doc.number}
                    </div>
                    <h3 className="font-extrabold text-base text-[#0B2518] group-hover:text-[#176B4D] transition-colors leading-snug">
                      {doc.shortTitle || doc.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {doc.scope || doc.promulgatedBy}
                    </p>
                  </div>

                  {/* Single Punchy Takeaway Chip (No Long Paragraphs!) */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#176B4D] text-xs font-bold shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#176B4D] shrink-0" />
                    <span>{doc.tagline || doc.taxOrComplianceImplication}</span>
                  </div>
                </div>

                {/* Bottom Action Row (Zero Internal Borders!) */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyCitation(citationText, doc.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Salin rujukan hukum"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B2518] hover:bg-[#176B4D] text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4F63D]" />
                    <span>Unduh PDF</span>
                    <span className="text-[10px] text-white/50 font-normal">({doc.fileSize})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
