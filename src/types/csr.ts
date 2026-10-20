export type UserRole = 'admin' | 'manager' | 'funder' | 'partner' | 'viewer';

export interface UserProfile {
  id: string;
  displayName: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
  emailDemo: string;
  avatarUrl?: string;
}

export type ProgramCategory = 
  | 'pendidikan'       // Beasiswa, Pelatihan Vokasi, Literasi Digital
  | 'lingkungan'       // Reboisasi Mangrove, Konservasi Hutan, Pengelolaan Sampah
  | 'ekonomi_umkm'     // Modal Usaha UMKM, Digitalisasi Pasar, Koperasi
  | 'kesehatan'        // Intervensi Stunting, Posyandu, Pelayanan Medis
  | 'infrastruktur'    // Akses Air Bersih, Sanitasi, Listrik Desa
  | 'tanggap_bencana'  // Bantuan Kedaruratan & Pemulihan Pasca Bencana
  | 'lainnya';

export type ProgramStatus = 'draft' | 'under_review' | 'approved' | 'active' | 'completed' | 'cancelled';

export interface ProgramIndicator {
  id: string;
  label: string;
  target: number;
  current: number;
  unit: string;
}

export interface ProgramEvidence {
  id: string;
  title: string;
  date: string;
  category: 'foto_kegiatan' | 'berita_acara' | 'daftar_hadir' | 'laporan_keuangan' | 'liputan_media';
  url: string;
  uploadedBy: string;
  verifiedDemo: boolean;
}

export interface Program {
  id: string;
  code: string;
  title: string;
  summary: string;
  category: ProgramCategory;
  location: string;
  province: string;
  partnerId: string;
  funderId: string;
  proposedBudget: number;
  approvedBudget: number;
  committedAmount: number;
  allocatedAmount: number;
  disbursedAmount: number;
  targetBeneficiaries: number;
  reachedBeneficiaries: number;
  startDate: string;
  endDate: string;
  status: ProgramStatus;
  progressPercent: number;
  indicators: ProgramIndicator[];
  evidenceList: ProgramEvidence[];
  sourceProposalId?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProposalStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'converted';

export type AspirationStatus = 'menunggu_telaah' | 'diverifikasi' | 'masuk_buku_menu' | 'didukung_funder' | 'ditolak';

export interface CommunityAspiration {
  id: string;
  ticketCode: string;
  applicantName: string;
  applicantRole: string;
  contactPhone: string;
  email?: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  title: string;
  category: ProgramCategory;
  problemDescription: string;
  estimatedBeneficiaries: number;
  estimatedBudget: number;
  urgencyLevel: 'sangat_mendesak' | 'tinggi' | 'sedang';
  status: AspirationStatus;
  submittedAt: string;
  verifiedBy?: string;
  notes?: string;
}

export interface Proposal {
  id: string;
  code: string;
  partnerId: string;
  title: string;
  category: ProgramCategory;
  location: string;
  province: string;
  problemStatement: string;
  proposedActivities: string;
  proposedBudget: number;
  targetBeneficiaries: number;
  estimatedDurationMonths: number;
  indicators: { label: string; target: number; unit: string }[];
  status: ProposalStatus;
  reviewNotes?: string;
  reviewerId?: string;
  submittedAt: string;
  reviewedAt?: string;
  convertedProgramId?: string;
}

export type OrganizationType = 'funder' | 'partner';

export interface Organization {
  id: string;
  name: string;
  code: string;
  type: OrganizationType;
  subType: string; // e.g. "BUMN", "Swasta Nasional", "Yayasan Sosial", "Lembaga Konservasi"
  description: string;
  region: string;
  focusAreas: ProgramCategory[];
  contactPerson: {
    name: string;
    emailDemo: string;
    phoneDemo: string;
  };
  verifiedDemo: boolean;
  verificationBadge: 'Verified (Demo)' | 'Pending Review' | 'Needs Update' | 'Suspended';
  activeProgramsCount: number;
  totalFundingOrReceived: number;
  logoPlaceholder?: string;
  createdAt: string;
}

export type FundingSourceType = 'CSR Korporat Tahunan' | 'Hibah Khusus / Grant' | 'Konsorsium Multi-Funder';

export type FundingRecordType = 'Commitment' | 'Allocation' | 'Distribution' | 'Adjustment';

export type FundingRecordStatus = 'Draft' | 'Pending Approval' | 'Approved (Demo)' | 'Disbursed (Demo)' | 'Cancelled';

export interface FundingRecord {
  id: string;
  referenceNo: string;
  funderId: string;
  programId?: string; // Optional for general commitment
  partnerId?: string; // For direct distribution
  sourceType: FundingSourceType;
  recordType: FundingRecordType;
  amount: number;
  date: string;
  status: FundingRecordStatus;
  notes: string;
  evidenceRef?: string;
  createdBy: string;
}

export type BeneficiaryCountingMethod = 'unique_verified' | 'participation_event' | 'household_estimate';

export interface BeneficiaryAggregate {
  id: string;
  programId: string;
  programTitle: string;
  region: string;
  province: string;
  groupLabel: string; // e.g. "Pelajar Penerima Beasiswa", "Nelayan & Petani Mangrove", "Pelaku UMKM Kuliner"
  targetCount: number;
  reachedCount: number;
  countingMethod: BeneficiaryCountingMethod;
  notes: string;
  lastUpdated: string;
}

export type ReportScopeType = 'all' | 'program' | 'funder' | 'partner' | 'category';

export type ReportStatus = 'Draft' | 'In Review' | 'Approved (Demo)' | 'Published (Demo)';

export interface ImpactReport {
  id: string;
  reportCode: string;
  title: string;
  reportType: 'CSR Annual Report' | 'Program Final Evaluation' | 'Quarterly Impact Review' | 'PROPER Kesiapan Lingkungan';
  scopeType: ReportScopeType;
  scopeId?: string;
  periodStart: string;
  periodEnd: string;
  summary: string;
  outputMetrics: { label: string; value: string | number }[];
  outcomeMetrics: { label: string; value: string | number }[];
  budgetRealization: {
    allocated: number;
    disbursed: number;
    utilizationPercent: number;
  };
  challenges: string;
  mitigationNotes: string;
  status: ReportStatus;
  createdAt: string;
  approvedAt?: string;
  author: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: 'Program' | 'Proposal' | 'Funding' | 'Partner' | 'Funder' | 'Report' | 'Settings';
  entityId: string;
  summary: string;
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'action_required';
  createdAt: string;
  read: boolean;
  linkTo?: string;
}
