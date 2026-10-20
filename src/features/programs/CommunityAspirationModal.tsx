import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  CheckCircle2,
  User,
  Phone,
  Mail,
  AlertTriangle,
  FileText,
  Printer,
  Sparkles,
  ShieldCheck,
  Send,
  Users,
  Coins
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { useCSRStore } from '../../context/CSRStoreContext';
import { ProgramCategory } from '../../types/csr';
import { formatIDR, formatCompactIDR, formatDateID, CATEGORY_LABELS } from '../../lib/formatters';

interface CommunityAspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CommunityAspirationModal: React.FC<CommunityAspirationModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { createAspiration } = useCSRStore();

  // Form states
  const [applicantName, setApplicantName] = useState('H. Dedi Suhendar');
  const [applicantRole, setApplicantRole] = useState('Kepala Desa');
  const [contactPhone, setContactPhone] = useState('+62 812-3456-7890');
  const [email, setEmail] = useState('kades.sukamaju@cianjurkab.demo');

  const [village, setVillage] = useState('Desa Sukamaju');
  const [district, setDistrict] = useState('Kecamatan Cugenang');
  const [regency, setRegency] = useState('Kabupaten Cianjur');
  const [province, setProvince] = useState('Jawa Barat');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProgramCategory>('infrastruktur');
  const [problemDescription, setProblemDescription] = useState('');
  const [estimatedBeneficiaries, setEstimatedBeneficiaries] = useState(350);
  const [estimatedBudgetStr, setEstimatedBudgetStr] = useState('75000000');
  const [urgencyLevel, setUrgencyLevel] = useState<'sangat_mendesak' | 'tinggi' | 'sedang'>('sangat_mendesak');

  // Success view state
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketCode: string;
    title: string;
    applicant: string;
    location: string;
    budget: number;
    beneficiaries: number;
    submittedAt: string;
  } | null>(null);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setEstimatedBudgetStr(raw);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBudget = parseInt(estimatedBudgetStr, 10) || 50_000_000;

    const newAsp = createAspiration({
      applicantName,
      applicantRole,
      contactPhone,
      email,
      village,
      district,
      regency,
      province,
      title: title || 'Pembangunan Sarana Kebutuhan Warga Desa',
      category,
      problemDescription,
      estimatedBeneficiaries,
      estimatedBudget: finalBudget,
      urgencyLevel
    });

    setSubmittedTicket({
      ticketCode: newAsp.ticketCode,
      title: newAsp.title,
      applicant: `${applicantName} (${applicantRole})`,
      location: `${village}, ${district}, ${regency}`,
      budget: finalBudget,
      beneficiaries: estimatedBeneficiaries,
      submittedAt: new Date().toISOString().split('T')[0]
    });

    if (onSuccess) onSuccess();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetAndClose = () => {
    setSubmittedTicket(null);
    setTitle('');
    setProblemDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={submittedTicket ? 'Tanda Terima Usulan Aspirasi Desa' : 'Kanal Aspirasi Kebutuhan Desa (Musrenbang CSR)'}
      subtitle={
        submittedTicket
          ? 'Bukti registrasi usulan pembangunan masyarakat ke Tim Fasilitasi CSR'
          : 'Formulir resmi pengajuan kebutuhan bantuan mendesak desa / komunitas lokal'
      }
      maxWidth="2xl"
    >
      {submittedTicket ? (
        /* SUCCESS RECEIPT SLIP */
        <div className="space-y-6 text-left py-2 font-sans">
          <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-600/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full inline-block mb-2">
              Usulan Berhasil Didaftarkan
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Aspirasi Kebutuhan Desa Telah Tercatat
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
              Usulan pembangunan dari <strong className="text-slate-800">{submittedTicket.location}</strong> telah masuk ke antrian telaah teknis Bappeda dan Tim Fasilitasi CSR.
            </p>
          </div>

          {/* Official Tracking Ticket Card */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs space-y-4 text-xs text-slate-700">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Nomor Registrasi Aspirasi</span>
                <span className="font-mono text-sm font-bold text-[#176B4D]">{submittedTicket.ticketCode}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Tanggal Pengajuan</span>
                <span className="font-semibold text-slate-800">{formatDateID(submittedTicket.submittedAt)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <span className="text-[10px] text-slate-400 font-medium block">Judul Kebutuhan Pembangunan:</span>
                <span className="font-bold text-slate-900 text-sm leading-snug">{submittedTicket.title}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Pengusul:</span>
                <span className="font-semibold text-slate-800">{submittedTicket.applicant}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Wilayah Sasaran:</span>
                <span className="font-semibold text-slate-800">{submittedTicket.location}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Estimasi Anggaran Dibutuhkan:</span>
                <span className="text-base font-extrabold text-[#176B4D]">{formatIDR(submittedTicket.budget)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Target Manfaat Warga:</span>
                <span className="font-semibold text-slate-800">{submittedTicket.beneficiaries.toLocaleString('id-ID')} Jiwa</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Setelah diverifikasi kelayakannya oleh Bappeda, usulan ini akan dimasukkan ke dalam **Buku Menu Kemitraan CSR** untuk dipilih oleh Perusahaan Pendana (Funder).</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Cetak / Unduh Bukti Tiket</span>
            </button>
            <button
              onClick={handleResetAndClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold cursor-pointer transition-colors shadow-sm shadow-[#176B4D]/20"
            >
              <span>Selesai &amp; Tutup</span>
            </button>
          </div>
        </div>
      ) : (
        /* FORM VIEW */
        <form onSubmit={handleSubmit} className="space-y-4 text-left py-1 text-xs">
          {/* Header notice */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-2.5 text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Kanal ini memfasilitasi Pemerintah Desa, BPD, dan kelompok masyarakat untuk mengusulkan proyek pembangunan yang mendesak namun belum terbiayai oleh APBD / Dana Desa, agar dapat dikerjasamakan dengan program CSR dunia usaha.
            </p>
          </div>

          {/* Section 1: Data Pengusul */}
          <div className="space-y-2.5 bg-slate-50/80 border border-slate-200/70 p-4 rounded-2xl">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#176B4D]" />
              <span>1. Identitas Pengusul Desa / Komunitas</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Lengkap Pengusul *</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Contoh: H. Dedi Suhendar"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Jabatan / Peran Pengusul *</label>
                <select
                  value={applicantRole}
                  onChange={(e) => setApplicantRole(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                >
                  <option value="Kepala Desa">Kepala Desa / Lurah</option>
                  <option value="Ketua BPD">Ketua BPD (Badan Permusyawaratan Desa)</option>
                  <option value="Ketua Karang Taruna">Ketua Karang Taruna Desa</option>
                  <option value="Bidan / Kader Posyandu">Bidan / Kader Posyandu</option>
                  <option value="Ketua Kelompok Tani / Nelayan">Ketua Kelompok Tani / Nelayan</option>
                  <option value="Tokoh Masyarakat">Tokoh Masyarakat / Komunitas Warga</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">No. WhatsApp / Telepon Aktif *</label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+62 812-xxxx-xxxx"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Email Resmi (Opsional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="desa@domain.id"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Lokasi Wilayah */}
          <div className="space-y-2.5 bg-slate-50/80 border border-slate-200/70 p-4 rounded-2xl">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#176B4D]" />
              <span>2. Wilayah Lokasi Kebutuhan</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Desa / Kelurahan *</label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Kecamatan *</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Kabupaten / Kota *</label>
                <input
                  type="text"
                  required
                  value={regency}
                  onChange={(e) => setRegency(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Provinsi *</label>
                <input
                  type="text"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Rincian Usulan */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Judul Kebutuhan Program Pembangunan *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Pembangunan 15 Unit MCK Komunal & Septic Tank Biofilter Warga"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D] bg-white font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Pilar Bidang CSR *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                >
                  <option value="infrastruktur">Infrastruktur &amp; Sanitasi</option>
                  <option value="kesehatan">Kesehatan &amp; Stunting</option>
                  <option value="lingkungan">Lingkungan &amp; Kebersihan</option>
                  <option value="ekonomi_umkm">Ekonomi UMKM &amp; Pertanian</option>
                  <option value="pendidikan">Pendidikan &amp; Balai Belajar</option>
                  <option value="tanggap_bencana">Tanggap Darurat Bencana</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Tingkat Urgensi *</label>
                <select
                  value={urgencyLevel}
                  onChange={(e) => setUrgencyLevel(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                >
                  <option value="sangat_mendesak">Sangat Mendesak (Darurat)</option>
                  <option value="tinggi">Tinggi (Prioritas Tahun Ini)</option>
                  <option value="sedang">Sedang (Rencana Bertahap)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Target Manfaat (Warga) *</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={estimatedBeneficiaries}
                  onChange={(e) => setEstimatedBeneficiaries(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-medium text-slate-600">
                  Estimasi Kebutuhan Biaya (Rupiah) *
                </label>
                <span className="text-[11px] font-bold text-[#176B4D]">
                  {formatIDR(parseInt(estimatedBudgetStr, 10) || 0)}
                </span>
              </div>
              <input
                type="text"
                required
                value={estimatedBudgetStr}
                onChange={handleBudgetChange}
                placeholder="Contoh: 85000000"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Deskripsi Masalah Lapangan &amp; Solusi yang Diharapkan *
              </label>
              <textarea
                rows={3}
                required
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Jelaskan kondisi riil di lapangan, kendala warga, dan bentuk bantuan yang paling tepat..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#176B4D] resize-none bg-white"
              />
            </div>
          </div>

          {/* Submit & Cancel */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-150">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#0E4D36] text-white text-xs font-bold shadow-md shadow-[#176B4D]/25 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Usulan Kebutuhan Desa</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
