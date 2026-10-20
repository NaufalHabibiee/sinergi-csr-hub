import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Program,
  Proposal,
  Organization,
  FundingRecord,
  BeneficiaryAggregate,
  ImpactReport,
  ActivityEvent,
  InAppNotification,
  ProgramStatus,
  ProposalStatus,
  FundingRecordStatus,
  ReportStatus,
  CommunityAspiration,
  AspirationStatus
} from '../types/csr';
import {
  INITIAL_USER,
  SEED_FUNDERS,
  SEED_PARTNERS,
  SEED_PROGRAMS,
  SEED_PROPOSALS,
  SEED_FUNDING_RECORDS,
  SEED_BENEFICIARIES,
  SEED_IMPACT_REPORTS,
  SEED_ACTIVITIES,
  SEED_NOTIFICATIONS,
  SEED_ASPIRATIONS
} from '../data/seedData';

const LOCAL_STORAGE_KEY = 'universa_csr_hub_state_v4';

interface CSRStoreContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string, name?: string, org?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  periodFilter: string;
  setPeriodFilter: (p: string) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;

  programs: Program[];
  proposals: Proposal[];
  organizations: Organization[];
  fundingRecords: FundingRecord[];
  beneficiaries: BeneficiaryAggregate[];
  reports: ImpactReport[];
  activities: ActivityEvent[];
  notifications: InAppNotification[];
  aspirations: CommunityAspiration[];

  funders: Organization[];
  partners: Organization[];

  // CRUD & Workflows
  createProgram: (data: Omit<Program, 'id' | 'code' | 'committedAmount' | 'allocatedAmount' | 'disbursedAmount' | 'progressPercent' | 'indicators' | 'evidenceList' | 'createdAt' | 'updatedAt'> & { indicators?: { label: string; target: number; unit: string }[] }) => Program;
  updateProgram: (id: string, updates: Partial<Program>) => void;
  updateProgramProgress: (id: string, progress: number, indicators?: { id: string; current: number }[]) => void;
  addProgramEvidence: (programId: string, evidence: { title: string; category: any; url?: string }) => void;
  
  createProposal: (data: Omit<Proposal, 'id' | 'code' | 'status' | 'submittedAt'>) => Proposal;
  reviewProposal: (id: string, status: 'approved' | 'rejected', notes: string) => void;
  convertProposalToProgram: (proposalId: string, funderId: string, approvedBudget: number) => Program | null;

  createAspiration: (data: Omit<CommunityAspiration, 'id' | 'ticketCode' | 'status' | 'submittedAt'>) => CommunityAspiration;
  updateAspirationStatus: (id: string, status: AspirationStatus, notes?: string) => void;

  createFundingRecord: (data: Omit<FundingRecord, 'id' | 'referenceNo' | 'createdBy'>) => FundingRecord;
  updateFundingStatus: (id: string, status: FundingRecordStatus) => void;

  createOrganization: (data: Omit<Organization, 'id' | 'code' | 'activeProgramsCount' | 'totalFundingOrReceived' | 'createdAt'>) => Organization;
  updateOrganization: (id: string, updates: Partial<Organization>) => void;

  createBeneficiaryAggregate: (data: Omit<BeneficiaryAggregate, 'id' | 'lastUpdated'>) => BeneficiaryAggregate;

  createImpactReport: (data: Omit<ImpactReport, 'id' | 'reportCode' | 'createdAt' | 'author'>) => ImpactReport;
  updateReportStatus: (id: string, status: ReportStatus) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  resetDemoData: () => void;
}

const CSRStoreContext = createContext<CSRStoreContextType | null>(null);

export const CSRStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`${LOCAL_STORAGE_KEY}_isAuthenticated`) === 'true';
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const savedAuth = localStorage.getItem(`${LOCAL_STORAGE_KEY}_isAuthenticated`) === 'true';
      const savedUser = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
      if (savedAuth && savedUser) {
        return JSON.parse(savedUser);
      }
      return INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });
  const [periodFilter, setPeriodFilter] = useState<string>('all');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  const [programs, setPrograms] = useState<Program[]>(() => {
    try {
      // Clear legacy cache keys
      localStorage.removeItem('universa_csr_hub_state_v1_programs');
      localStorage.removeItem('universa_csr_hub_state_v2_programs');
      localStorage.removeItem('universa_csr_hub_state_v3_programs');

      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_programs`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SEED_PROGRAMS.length) {
          return parsed;
        }
      }
      return SEED_PROGRAMS;
    } catch {
      return SEED_PROGRAMS;
    }
  });

  const [proposals, setProposals] = useState<Proposal[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_proposals`);
      return saved ? JSON.parse(saved) : SEED_PROPOSALS;
    } catch {
      return SEED_PROPOSALS;
    }
  });

  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_organizations`);
      return saved ? JSON.parse(saved) : [...SEED_FUNDERS, ...SEED_PARTNERS];
    } catch {
      return [...SEED_FUNDERS, ...SEED_PARTNERS];
    }
  });

  const [fundingRecords, setFundingRecords] = useState<FundingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_fundingRecords`);
      return saved ? JSON.parse(saved) : SEED_FUNDING_RECORDS;
    } catch {
      return SEED_FUNDING_RECORDS;
    }
  });

  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryAggregate[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_beneficiaries`);
      return saved ? JSON.parse(saved) : SEED_BENEFICIARIES;
    } catch {
      return SEED_BENEFICIARIES;
    }
  });

  const [reports, setReports] = useState<ImpactReport[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_reports`);
      return saved ? JSON.parse(saved) : SEED_IMPACT_REPORTS;
    } catch {
      return SEED_IMPACT_REPORTS;
    }
  });

  const [activities, setActivities] = useState<ActivityEvent[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_activities`);
      return saved ? JSON.parse(saved) : SEED_ACTIVITIES;
    } catch {
      return SEED_ACTIVITIES;
    }
  });

  const [notifications, setNotifications] = useState<InAppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
      return saved ? JSON.parse(saved) : SEED_NOTIFICATIONS;
    } catch {
      return SEED_NOTIFICATIONS;
    }
  });

  const [aspirations, setAspirations] = useState<CommunityAspiration[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_aspirations`);
      return saved ? JSON.parse(saved) : SEED_ASPIRATIONS;
    } catch {
      return SEED_ASPIRATIONS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_programs`, JSON.stringify(programs));
    } catch {}
  }, [programs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_proposals`, JSON.stringify(proposals));
    } catch {}
  }, [proposals]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_organizations`, JSON.stringify(organizations));
    } catch {}
  }, [organizations]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_fundingRecords`, JSON.stringify(fundingRecords));
    } catch {}
  }, [fundingRecords]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_beneficiaries`, JSON.stringify(beneficiaries));
    } catch {}
  }, [beneficiaries]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_reports`, JSON.stringify(reports));
    } catch {}
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_activities`, JSON.stringify(activities));
    } catch {}
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_aspirations`, JSON.stringify(aspirations));
    } catch {}
  }, [aspirations]);

  const logActivity = (action: string, entityType: ActivityEvent['entityType'], entityId: string, summary: string) => {
    const newAct: ActivityEvent = {
      id: `act_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorName: user.displayName,
      actorRole: user.role,
      action,
      entityType,
      entityId,
      summary,
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const addNotification = (title: string, message: string, type: InAppNotification['type'], linkTo?: string) => {
    const newNotif: InAppNotification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false,
      linkTo
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const login = (role: UserRole, email?: string, name?: string, org?: string) => {
    let orgName = org;
    let displayName = name;
    let userEmail = email || `${role}@sinergicsr.id`;

    if (!orgName) {
      if (role === 'admin') orgName = 'SinergiCSR Platform Admin';
      else if (role === 'funder') orgName = 'PT Telkom Indonesia (Persero) Tbk';
      else if (role === 'partner') orgName = 'Yayasan Mangrove Lestari';
      else if (role === 'viewer') orgName = 'Inspektorat / BPK RI';
      else orgName = 'SinergiCSR Operator';
    }

    if (!displayName) {
      if (role === 'admin') displayName = 'Habibie Platform Admin';
      else if (role === 'funder') displayName = 'Rian Kurniawan (VP TJSL)';
      else if (role === 'partner') displayName = 'Hendra Gunawan (Direktur)';
      else if (role === 'viewer') displayName = 'Dimas Anggoro (Auditor ESG)';
      else displayName = 'Habibie CSR Lead';
    }

    const newUser: UserProfile = {
      id: `usr_${role}`,
      displayName,
      role,
      organizationName: orgName,
      emailDemo: userEmail,
    };

    setUser(newUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_isAuthenticated`, 'true');
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(newUser));
    } catch {}

    addNotification('Login Berhasil', `Selamat datang kembali, ${displayName} (${orgName})`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_isAuthenticated`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_user`);
    } catch {}
    addNotification('Logout Berhasil', 'Sesi login telah ditutup.', 'info');
  };

  const switchRole = (role: UserRole) => {
    let orgName = 'SinergiCSR Operator';
    let name = 'Habibie CSR Lead';
    if (role === 'admin') {
      orgName = 'SinergiCSR Platform Admin';
      name = 'Habibie Platform Admin';
    } else if (role === 'funder') {
      orgName = 'PT Nusantara Energi Lestari';
      name = 'Rian Kurniawan (VP CSR)';
    } else if (role === 'partner') {
      orgName = 'Yayasan Mangrove Lestari';
      name = 'Hendra Gunawan (Direktur)';
    } else if (role === 'viewer') {
      orgName = 'Kantor Akuntan Publik / Auditor';
      name = 'Dimas Anggoro (Auditor ESG)';
    }
    const updatedUser: UserProfile = {
      id: `usr_${role}`,
      displayName: name,
      role,
      organizationName: orgName,
      emailDemo: `${role}@universa.demo`,
    };
    setUser(updatedUser);
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(updatedUser));
    } catch {}
    addNotification('Role Diganti (Demo)', `Anda sekarang beralih ke sudut pandang peran: ${role.toUpperCase()}`, 'info');
  };

  const funders = organizations.filter(o => o.type === 'funder');
  const partners = organizations.filter(o => o.type === 'partner');

  // Program operations
  const createProgram = (data: any): Program => {
    const nextNum = programs.length + 1;
    const code = `PRG-2026-${String(nextNum).padStart(3, '0')}`;
    const id = `prg_${Date.now()}`;
    const newProgram: Program = {
      ...data,
      id,
      code,
      committedAmount: data.approvedBudget,
      allocatedAmount: 0,
      disbursedAmount: 0,
      progressPercent: 0,
      indicators: data.indicators ? data.indicators.map((ind: any, idx: number) => ({
        id: `ind_${id}_${idx}`,
        label: ind.label,
        target: ind.target,
        current: 0,
        unit: ind.unit
      })) : [],
      evidenceList: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setPrograms(prev => [newProgram, ...prev]);
    logActivity('Create Program', 'Program', id, `Membuat program baru: "${newProgram.title}" (${code})`);
    addNotification('Program Baru Dibuat', `Program ${code} berhasil didaftarkan ke sistem CSR Hub.`, 'success', `/dashboard/programs/${id}`);

    // Update active count for partner and funder
    setOrganizations(prev => prev.map(o => {
      if (o.id === data.partnerId || o.id === data.funderId) {
        return { ...o, activeProgramsCount: o.activeProgramsCount + 1 };
      }
      return o;
    }));

    return newProgram;
  };

  const updateProgram = (id: string, updates: Partial<Program>) => {
    setPrograms(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
        return updated;
      }
      return p;
    }));
    logActivity('Update Program', 'Program', id, `Memperbarui data program.`);
  };

  const updateProgramProgress = (id: string, progress: number, indicatorUpdates?: { id: string; current: number }[]) => {
    setPrograms(prev => prev.map(p => {
      if (p.id === id) {
        let updatedIndicators = p.indicators;
        if (indicatorUpdates && indicatorUpdates.length > 0) {
          updatedIndicators = p.indicators.map(ind => {
            const found = indicatorUpdates.find(u => u.id === ind.id);
            return found ? { ...ind, current: found.current } : ind;
          });
        }
        return {
          ...p,
          progressPercent: Math.min(100, Math.max(0, progress)),
          indicators: updatedIndicators,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
    logActivity('Update Progress', 'Program', id, `Memperbarui progres program menjadi ${progress}%.`);
    addNotification('Progres Program Diperbarui', `Progres program kini mencapai ${progress}%.`, 'info', `/dashboard/programs/${id}`);
  };

  const addProgramEvidence = (programId: string, evidence: { title: string; category: any; url?: string }) => {
    const newEvidence = {
      id: `evi_${Date.now()}`,
      title: evidence.title,
      date: new Date().toISOString().split('T')[0],
      category: evidence.category,
      url: evidence.url || '#',
      uploadedBy: user.displayName,
      verifiedDemo: true
    };
    setPrograms(prev => prev.map(p => {
      if (p.id === programId) {
        return {
          ...p,
          evidenceList: [newEvidence, ...p.evidenceList],
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
    logActivity('Upload Evidence', 'Program', programId, `Mengunggah dokumen bukti kegiatan: ${evidence.title}`);
    addNotification('Bukti Kegiatan Baru', `Dokumen "${evidence.title}" berhasil diunggah.`, 'success', `/dashboard/programs/${programId}`);
  };

  // Proposal operations
  const createProposal = (data: any): Proposal => {
    const nextNum = proposals.length + 1;
    const code = `PROP-2026-${String(nextNum).padStart(3, '0')}`;
    const id = `prop_${Date.now()}`;
    const newProposal: Proposal = {
      ...data,
      id,
      code,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setProposals(prev => [newProposal, ...prev]);
    logActivity('Submit Proposal', 'Proposal', id, `Mengajukan proposal: "${newProposal.title}" (${code})`);
    addNotification('Proposal Baru Masuk', `Proposal "${newProposal.title}" menunggu review kurasi.`, 'action_required', '/dashboard/proposals');
    return newProposal;
  };

  const reviewProposal = (id: string, status: 'approved' | 'rejected', notes: string) => {
    setProposals(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status,
          reviewNotes: notes,
          reviewerId: user.id,
          reviewedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
    logActivity('Review Proposal', 'Proposal', id, `${status === 'approved' ? 'Menyetujui' : 'Menolak'} proposal dengan catatan.`);
    addNotification(`Proposal ${status === 'approved' ? 'Disetujui' : 'Ditolak'}`, `Proposal telah ditinjau dengan status ${status.toUpperCase()} (Demo).`, status === 'approved' ? 'success' : 'warning', '/dashboard/proposals');
  };

  const convertProposalToProgram = (proposalId: string, funderId: string, approvedBudget: number): Program | null => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return null;

    const newProg = createProgram({
      title: prop.title,
      summary: prop.problemStatement,
      category: prop.category,
      location: prop.location,
      province: prop.province,
      partnerId: prop.partnerId,
      funderId: funderId,
      proposedBudget: prop.proposedBudget,
      approvedBudget: approvedBudget,
      targetBeneficiaries: prop.targetBeneficiaries,
      reachedBeneficiaries: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + prop.estimatedDurationMonths * 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'approved',
      sourceProposalId: prop.id,
      indicators: prop.indicators
    });

    // Mark proposal as converted
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          status: 'converted',
          convertedProgramId: newProg.id,
          reviewedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));

    logActivity('Convert Proposal', 'Proposal', proposalId, `Mengonversi proposal "${prop.title}" menjadi program aktif ${newProg.code}`);
    return newProg;
  };

  // Community Aspirations (Musrenbang CSR / Desa)
  const createAspiration = (data: Omit<CommunityAspiration, 'id' | 'ticketCode' | 'status' | 'submittedAt'>): CommunityAspiration => {
    const id = `asp_${Date.now()}`;
    const nextNum = aspirations.length + 1;
    const ticketCode = `ASP-DESA-2026-${String(nextNum).padStart(3, '0')}`;
    const newAspiration: CommunityAspiration = {
      ...data,
      id,
      ticketCode,
      status: 'menunggu_telaah',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setAspirations(prev => [newAspiration, ...prev]);
    logActivity('Submit Aspiration', 'Proposal', id, `Mengajukan aspirasi desa: "${newAspiration.title}" (${ticketCode})`);
    addNotification('Aspirasi Desa Baru Masuk', `Aspirasi "${newAspiration.title}" dari ${newAspiration.village} menunggu telaah kurasi.`, 'action_required', '/dashboard/proposals');
    return newAspiration;
  };

  const updateAspirationStatus = (id: string, status: AspirationStatus, notes?: string) => {
    setAspirations(prev => prev.map(a => (a.id === id ? { ...a, status, notes: notes || a.notes, verifiedBy: user.displayName } : a)));
    logActivity('Review Aspiration', 'Proposal', id, `Mengubah status aspirasi ${id} menjadi ${status}`);
    addNotification('Status Aspirasi Diperbarui', `Aspirasi ${id} kini berstatus: ${status.toUpperCase()} (Demo).`, 'info', '/dashboard/proposals');
  };

  // Funding records
  const createFundingRecord = (data: any): FundingRecord => {
    const id = `fndrec_${Date.now()}`;
    const prefix = data.recordType === 'Commitment' ? 'COM' : data.recordType === 'Allocation' ? 'ALC' : 'DIS';
    const referenceNo = `${prefix}-2026-${String(fundingRecords.length + 1).padStart(3, '0')}`;
    const newRecord: FundingRecord = {
      ...data,
      id,
      referenceNo,
      createdBy: user.displayName,
    };

    setFundingRecords(prev => [newRecord, ...prev]);

    // If allocation or distribution, update program numbers
    if (data.programId) {
      setPrograms(prev => prev.map(p => {
        if (p.id === data.programId) {
          if (data.recordType === 'Allocation' && data.status === 'Approved (Demo)') {
            return { ...p, allocatedAmount: p.allocatedAmount + data.amount };
          } else if (data.recordType === 'Distribution' && data.status === 'Disbursed (Demo)') {
            return { ...p, disbursedAmount: p.disbursedAmount + data.amount };
          }
        }
        return p;
      }));
    }

    logActivity('Record Funding', 'Funding', id, `Mencatat ${data.recordType} sebesar Rp ${new Intl.NumberFormat('id-ID').format(data.amount)} (${referenceNo})`);
    addNotification('Transaksi Pendanaan Tercatat', `Transaksi ${data.recordType} ${referenceNo} berhasil disimpan (Demo).`, 'success', '/dashboard/funding');
    return newRecord;
  };

  const updateFundingStatus = (id: string, status: FundingRecordStatus) => {
    setFundingRecords(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
    logActivity('Update Funding Status', 'Funding', id, `Mengubah status transaksi menjadi ${status}`);
  };

  // Organizations
  const createOrganization = (data: any): Organization => {
    const id = `${data.type === 'funder' ? 'fnd' : 'ptr'}_${Date.now()}`;
    const newOrg: Organization = {
      ...data,
      id,
      code: data.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 4),
      activeProgramsCount: 0,
      totalFundingOrReceived: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOrganizations(prev => [...prev, newOrg]);
    logActivity('Create Organization', data.type === 'funder' ? 'Funder' : 'Partner', id, `Menambahkan organisasi ${newOrg.name}`);
    return newOrg;
  };

  const updateOrganization = (id: string, updates: Partial<Organization>) => {
    setOrganizations(prev => prev.map(o => (o.id === id ? { ...o, ...updates } : o)));
    logActivity('Update Organization', 'Partner', id, `Memperbarui data profil organisasi.`);
  };

  // Beneficiaries
  const createBeneficiaryAggregate = (data: any): BeneficiaryAggregate => {
    const id = `ben_${Date.now()}`;
    const newBen: BeneficiaryAggregate = {
      ...data,
      id,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setBeneficiaries(prev => [newBen, ...prev]);

    // Update program reached beneficiaries
    if (data.programId) {
      setPrograms(prev => prev.map(p => {
        if (p.id === data.programId) {
          return { ...p, reachedBeneficiaries: p.reachedBeneficiaries + data.reachedCount };
        }
        return p;
      }));
    }

    logActivity('Add Beneficiaries', 'Program', data.programId, `Mencatat capaian penerima manfaat: +${data.reachedCount} orang (${data.groupLabel})`);
    return newBen;
  };

  // Reports
  const createImpactReport = (data: any): ImpactReport => {
    const id = `rep_${Date.now()}`;
    const reportCode = `RPT-2026-${String(reports.length + 1).padStart(3, '0')}`;
    const newReport: ImpactReport = {
      ...data,
      id,
      reportCode,
      createdAt: new Date().toISOString().split('T')[0],
      author: user.displayName,
    };
    setReports(prev => [newReport, ...prev]);
    logActivity('Create Report', 'Report', id, `Menyusun ${newReport.reportType}: "${newReport.title}"`);
    addNotification('Laporan Dampak Baru', `Laporan ${reportCode} berhasil disusun dan siap ditinjau.`, 'info', '/dashboard/reports');
    return newReport;
  };

  const updateReportStatus = (id: string, status: ReportStatus) => {
    setReports(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          approvedAt: status === 'Approved (Demo)' || status === 'Published (Demo)' ? new Date().toISOString().split('T')[0] : r.approvedAt
        };
      }
      return r;
    }));
    logActivity('Update Report Status', 'Report', id, `Status laporan diubah menjadi ${status}`);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Reset
  const resetDemoData = () => {
    setPrograms(SEED_PROGRAMS);
    setProposals(SEED_PROPOSALS);
    setOrganizations([...SEED_FUNDERS, ...SEED_PARTNERS]);
    setFundingRecords(SEED_FUNDING_RECORDS);
    setBeneficiaries(SEED_BENEFICIARIES);
    setReports(SEED_IMPACT_REPORTS);
    setActivities(SEED_ACTIVITIES);
    setNotifications(SEED_NOTIFICATIONS);
    setAspirations(SEED_ASPIRATIONS);
    setUser(INITIAL_USER);

    try {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_programs`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_proposals`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_organizations`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_fundingRecords`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_beneficiaries`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_reports`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_activities`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_notifications`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_aspirations`);
    } catch {}

    addNotification('Data Demo Direset', 'Semua data simulasi telah dikembalikan ke kondisi awal.', 'warning');
  };

  return (
    <CSRStoreContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        switchRole,
        periodFilter,
        setPeriodFilter,
        globalSearchQuery,
        setGlobalSearchQuery,

        programs,
        proposals,
        organizations,
        fundingRecords,
        beneficiaries,
        reports,
        activities,
        notifications,
        aspirations,

        funders,
        partners,

        createProgram,
        updateProgram,
        updateProgramProgress,
        addProgramEvidence,

        createProposal,
        reviewProposal,
        convertProposalToProgram,

        createAspiration,
        updateAspirationStatus,

        createFundingRecord,
        updateFundingStatus,

        createOrganization,
        updateOrganization,

        createBeneficiaryAggregate,

        createImpactReport,
        updateReportStatus,

        markNotificationRead,
        markAllNotificationsRead,

        resetDemoData
      }}
    >
      {children}
    </CSRStoreContext.Provider>
  );
};

export const useCSRStore = () => {
  const context = useContext(CSRStoreContext);
  if (!context) {
    throw new Error('useCSRStore must be used within a CSRStoreProvider');
  }
  return context;
};
