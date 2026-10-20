import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { useCSRStore } from '../../context/CSRStoreContext';
import { UserRole } from '../../types/csr';

interface AuthPageProps {
  defaultMode?: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ defaultMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useCSRStore();

  const [mode, setMode] = useState<'login' | 'signup'>(
    location.pathname === '/signup' ? 'signup' : defaultMode
  );
  const [selectedRole, setSelectedRole] = useState<UserRole>('funder');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const redirectPath = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(selectedRole, email, fullName, orgName);
      setIsLoading(false);
      navigate(redirectPath, { replace: true });
    }, 350);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setIsLoading(true);
    setSelectedRole(role);
    setTimeout(() => {
      login(role);
      setIsLoading(false);
      navigate(redirectPath, { replace: true });
    }, 250);
  };

  return (
    <div className="h-screen w-screen max-w-full max-h-screen overflow-hidden bg-white select-none selection:bg-[#D4F63D] selection:text-black">
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-12 m-0 p-0">
        
        {/* LEFT COLUMN: Full Bleed Brand & Mission Showcase (Reaches all 4 edges: top, bottom, left) */}
        <div className="hidden lg:flex lg:col-span-5 h-full relative overflow-hidden bg-[#072418] text-white p-8 xl:p-12 flex-col justify-between">
          {/* Background Photographic Image with Deep Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/images/hero_sinergi_farming_golden.jpg"
              alt="SinergiCSR Impact"
              className="w-full h-full object-cover object-[center_35%] scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#072418] via-[#072418]/70 to-[#072418]/40" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#072418]/90" />
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <img
                src="/brand/sinergicsr-logo-white.png"
                alt="SinergiCSR"
                className="h-8 object-contain"
              />
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D4F63D] text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4F63D]" />
              <span>Enterprise Impact Hub</span>
            </div>
          </div>

          {/* Middle Value Proposition & Proven Impact */}
          <div className="relative z-10 space-y-5 my-auto max-w-lg">
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4F63D] block">
                Sistem Tata Kelola TJSL &amp; ESG
              </span>
              <h2 className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Kelola CSR dengan Transparansi &amp; Integritas Penuh.
              </h2>
              <p className="text-xs xl:text-sm text-emerald-100/80 leading-relaxed font-normal">
                Satu infrastruktur digital yang menyatukan alokasi korporasi, verifikasi termin BAST bergeotagging, dan pelaporan siap audit PROPER KLHK.
              </p>
            </div>

            {/* 3 Verified Trust Highlights */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#D4F63D] shrink-0" />
                <span>100% Bebas Klaim Ganda NIK / NIB</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#D4F63D] shrink-0" />
                <span>Audit Trail Otomatis Termin Milestone BAST</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#D4F63D] shrink-0" />
                <span>Sinkronisasi Kriteria PROPER &amp; 17 SDGs Bappenas</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Compliance Footer */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D4F63D]" />
              <span>Kepatuhan UU PT No. 40/2007</span>
            </span>
            <span className="font-semibold text-white/90">Audit Trail Terverifikasi</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Full Bleed Clean Form Panel (Reaches all 4 edges, no border, no scroll) */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between p-6 sm:p-10 xl:p-14 bg-white relative overflow-y-auto lg:overflow-hidden">
          
          {/* Top Bar inside Form Panel */}
          <div className="flex items-center justify-between w-full">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#176B4D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>

            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Bantuan:{' '}
              <a
                href="mailto:support@sinergicsr.id"
                className="text-[#176B4D] font-bold hover:underline"
              >
                support@sinergicsr.id
              </a>
            </span>
          </div>

          {/* Center Login Form Content Container */}
          <div className="w-full max-w-md mx-auto my-auto space-y-5">
            {/* If user is already authenticated, show friendly notice */}
            {isAuthenticated && (
              <div className="p-3.5 rounded-2xl bg-[#E8F6F0] border border-emerald-300 text-xs text-[#0B2518] flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="font-bold block">Sesi login aktif:</span>
                  <span className="text-slate-600 truncate">{user.displayName} ({user.organizationName})</span>
                </div>
                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 rounded-full bg-[#176B4D] text-white text-[11px] font-bold shrink-0 hover:bg-[#0E4D36] transition-colors"
                >
                  Ke Dashboard &rarr;
                </Link>
              </div>
            )}

            {/* Mode Switcher Tabs (Masuk vs Daftar) */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-full">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-[#0B2518] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Masuk ke Akun
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-[#0B2518] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Daftar Akun Baru
              </button>
            </div>

            {/* Heading & Subtitle */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2518] tracking-tight">
                {mode === 'login' ? 'Selamat Datang Kembali 👋' : 'Bergabung dengan SinergiCSR 🌱'}
              </h1>
              <p className="text-xs text-slate-500">
                {mode === 'login'
                  ? 'Masuk ke portal orkestrasi dampak dan laporan keberlanjutan Anda.'
                  : 'Daftarkan instansi atau lembaga Anda untuk memulai kolaborasi dampak.'}
              </p>
            </div>

            {/* Role Selection (Funder, Mitra, Auditor) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Pilih Peran Akun Anda:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('funder')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    selectedRole === 'funder'
                      ? 'border-[#176B4D] bg-[#E8F6F0] text-[#0B2518] ring-1 ring-[#176B4D]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${selectedRole === 'funder' ? 'text-[#176B4D]' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold leading-tight">Funder</div>
                    <div className="text-[10px] text-slate-500">Korporasi</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('partner')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    selectedRole === 'partner'
                      ? 'border-[#176B4D] bg-[#E8F6F0] text-[#0B2518] ring-1 ring-[#176B4D]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Users className={`w-4 h-4 ${selectedRole === 'partner' ? 'text-[#176B4D]' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold leading-tight">Mitra</div>
                    <div className="text-[10px] text-slate-500">Yayasan / NGO</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('viewer')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    selectedRole === 'viewer'
                      ? 'border-[#176B4D] bg-[#E8F6F0] text-[#0B2518] ring-1 ring-[#176B4D]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 ${selectedRole === 'viewer' ? 'text-[#176B4D]' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold leading-tight">Auditor</div>
                    <div className="text-[10px] text-slate-500">Regulator / BPK</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raden Arya Wijaya"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#176B4D] focus:ring-1 focus:ring-[#176B4D] text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Nama Perusahaan / Lembaga
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PT Telkom Indonesia / Yayasan Lestari"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#176B4D] focus:ring-1 focus:ring-[#176B4D] text-xs sm:text-sm"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Perusahaan / Lembaga
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="nama@organisasi.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#176B4D] focus:ring-1 focus:ring-[#176B4D] text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#176B4D] focus:ring-1 focus:ring-[#176B4D] text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-[#176B4D] focus:ring-[#176B4D]"
                    />
                    <span>Ingat saya</span>
                  </label>

                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Untuk mode demo, Anda dapat langsung mengklik salah satu tombol "Uji Coba Instan" di bawah.');
                    }}
                    className="text-[#176B4D] font-semibold hover:underline"
                  >
                    Lupa kata sandi?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-full bg-[#D4F63D] hover:bg-[#C2E82E] text-black font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-98 disabled:opacity-70 mt-1"
              >
                <span>{isLoading ? 'Memvalidasi Sesi...' : mode === 'login' ? 'Masuk ke Dashboard' : 'Daftar Akun Baru'}</span>
                <span className="w-6 h-6 rounded-full bg-black text-[#D4F63D] flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </form>

            {/* Quick Demo Access (1-Click Login) */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Uji Coba Instan (Akses Cepat Demo)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F6F0] text-[#176B4D]">
                  1-Klik Masuk
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('funder')}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#176B4D] hover:bg-[#F4F9F5] text-left transition-all text-xs cursor-pointer group"
                >
                  <div className="font-bold text-[#0B2518] group-hover:text-[#176B4D] text-xs">🏢 Telkom Funder</div>
                  <div className="text-[10px] text-slate-400">Pagu &amp; BAST</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('partner')}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#176B4D] hover:bg-[#F4F9F5] text-left transition-all text-xs cursor-pointer group"
                >
                  <div className="font-bold text-[#0B2518] group-hover:text-[#176B4D] text-xs">🤝 Yayasan Mitra</div>
                  <div className="text-[10px] text-slate-400">Proposal &amp; Salur</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('viewer')}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#176B4D] hover:bg-[#F4F9F5] text-left transition-all text-xs cursor-pointer group"
                >
                  <div className="font-bold text-[#0B2518] group-hover:text-[#176B4D] text-xs">⚖️ Auditor KLHK</div>
                  <div className="text-[10px] text-slate-400">Evaluasi PROPER</div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="w-full text-center text-[11px] text-slate-400 pt-2">
            &copy; {new Date().getFullYear()} SinergiCSR &bull; 256-Bit SSL Encrypted Enterprise ESG Platform.
          </div>
        </div>
      </div>
    </div>
  );
};
