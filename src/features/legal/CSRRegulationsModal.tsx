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
  X,
  ShieldCheck,
  Info,
  Calendar,
  Building2,
  BookmarkCheck,
  Layers
} from 'lucide-react';

interface CSRRegulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegulationDoc {
  id: string;
  category: 'uu' | 'pp' | 'perda' | 'permen';
  categoryLabel: string;
  number: string;
  title: string;
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
    number: 'Perda Jabar No. 2 Tahun 2013',
    title: 'Peraturan Daerah Provinsi Jawa Barat tentang Pedoman Pengelolaan TJSLP & PKBL',
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
    number: 'Pergub Jabar No. 30 Tahun 2018',
    title: 'Petunjuk Pelaksanaan Pengelolaan Tanggung Jawab Sosial dan Lingkungan Perusahaan',
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
    number: 'Permen BUMN No. PER-05/MBU/04/2021',
    title: 'Program Tanggung Jawab Sosial dan Lingkungan Badan Usaha Milik Negara',
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
    number: 'Permen LHK No. 1 Tahun 2021',
    title: 'Program Penilaian Peringkat Kinerja Perusahaan dalam Pengelolaan Lingkungan Hidup (PROPER)',
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
    title: 'Sumbangan Penanggulangan Bencana, Litbang, Fasilitas Pendidikan, & Pembinaan Olahraga yang Dapat Dikurangkan dari Penghasilan Bruto (Tax Deduction)',
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

export const CSRRegulationsModal: React.FC<CSRRegulationsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'uu' | 'pp' | 'perda' | 'permen'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocId, setSelectedDocId] = useState<string>('reg_03');
  const [copiedArticle, setCopiedArticle] = useState<string | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

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

  const activeDoc = REGULATIONS_DATA.find((d) => d.id === selectedDocId) || filteredDocs[0] || REGULATIONS_DATA[0];

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 font-sans">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0B2518] via-[#0E3D2A] to-[#176B4D] text-white p-6 sm:p-7 relative overflow-hidden flex-shrink-0">
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4F63D] text-xs font-bold border border-white/15">
                <Scale className="w-3.5 h-3.5 text-[#D4F63D]" />
                <span>Pusat Regulasi &amp; Dasar Hukum TJSLP / CSR Nasional &amp; Daerah</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Repositori Hukum Kemitraan CSR
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Kompilasi lengkap Undang-Undang PT, Peraturan Pemerintah, Perda Tim Fasilitasi, Permen BUMN, dan Kriteria PROPER KLHK sebagai payung kepatuhan hukum dan insentif pajak (tax deduction).
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice Banner */}
          {downloadSuccessToast && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-xs text-white font-medium flex items-center gap-2 animate-fadeIn">
              <BookmarkCheck className="w-4 h-4 text-[#D4F63D]" />
              <span>{downloadSuccessToast}</span>
            </div>
          )}
        </div>

        {/* Search & Category Filter */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
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
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#176B4D] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-200/80 text-slate-600 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nomor pasal / topik hukum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#176B4D]"
            />
          </div>
        </div>

        {/* 2-Column Split: Document List (Left) & Deep Dive Reader (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Doc List (5 cols) */}
          <div className="lg:col-span-5 border-r border-slate-200/80 overflow-y-auto p-4 space-y-2.5 bg-slate-50/50">
            {filteredDocs.map((doc) => {
              const isSelected = activeDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                    isSelected
                      ? 'bg-white border-[#176B4D] shadow-md ring-2 ring-[#176B4D]/10'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        doc.category === 'uu'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : doc.category === 'pp'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : doc.category === 'perda'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {doc.categoryLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">
                      Tahun {doc.year}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {doc.number}: {doc.title}
                  </h3>

                  <div className="text-[11px] text-slate-500 line-clamp-1">
                    {doc.promulgatedBy}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                    <span className="text-[#176B4D] font-semibold">
                      {doc.keyArticles.length} Pasal Pokok
                    </span>
                    <span className="text-slate-400">{doc.fileSize} PDF</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Reader (7 cols) */}
          <div className="lg:col-span-7 overflow-y-auto p-6 space-y-5 bg-white">
            {activeDoc && (
              <>
                {/* Document Title Strip */}
                <div className="space-y-2 border-b border-slate-100 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-extrabold text-[#176B4D] px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100">
                      {activeDoc.number}
                    </span>
                    <button
                      onClick={() => handleDownload(activeDoc)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Berkas Resmi (PDF)</span>
                    </button>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {activeDoc.title}
                  </h2>
                  <div className="text-xs text-slate-500">
                    Diterbitkan oleh: <span className="font-semibold text-slate-700">{activeDoc.promulgatedBy}</span>
                  </div>
                </div>

                {/* Compliance / Tax Implication Box */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Implikasi Kepatuhan &amp; Akuntansi Perseroan:</span>
                  </div>
                  <p className="text-amber-800/90 leading-relaxed pl-5">
                    {activeDoc.taxOrComplianceImplication}
                  </p>
                </div>

                {/* Key Articles Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Kutipan Pasal Kunci &amp; Petunjuk Teknis:
                  </h4>

                  {activeDoc.keyArticles.map((art, idx) => {
                    const copyKey = `${activeDoc.id}_${idx}`;
                    const isCopied = copiedArticle === copyKey;
                    const citationPayload = `[Dasar Hukum CSR] ${activeDoc.number} - ${art.article}: "${art.excerpt}"`;

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <BookmarkCheck className="w-4 h-4 text-[#176B4D]" />
                            <span>{art.article}: {art.headline}</span>
                          </span>

                          <button
                            onClick={() => handleCopyCitation(citationPayload, copyKey)}
                            title="Salin kutipan legal untuk proposal ke Direksi"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#176B4D] hover:text-[#0E4D36] bg-white px-2 py-1 rounded-lg border border-slate-200 cursor-pointer"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700">Tersalin!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Salin Kutipan</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Article Excerpt Quote */}
                        <div className="pl-3 border-l-2 border-[#176B4D] italic text-xs text-slate-700 bg-white/60 p-2.5 rounded-r-xl">
                          &ldquo;{art.excerpt}&rdquo;
                        </div>

                        {/* Practical Action Note */}
                        <div className="text-[11px] text-slate-600 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
                          <Info className="w-3.5 h-3.5 text-[#176B4D] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-[#176B4D]">Penerapan Lapangan:</strong> {art.practicalAdvice}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Dokumen hukum terverifikasi resmi oleh Biro Hukum &amp; Tim Fasilitasi CSR.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
          >
            Tutup Repositori
          </button>
        </div>
      </div>
    </div>
  );
};
