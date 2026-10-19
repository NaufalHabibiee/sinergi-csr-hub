export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateProgramInput(data: {
  title: string;
  summary: string;
  category: string;
  location: string;
  province: string;
  partnerId: string;
  funderId: string;
  proposedBudget: number;
  targetBeneficiaries: number;
  startDate: string;
  endDate: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Nama program minimal 5 karakter.';
  }
  if (!data.summary || data.summary.trim().length < 15) {
    errors.summary = 'Ringkasan program minimal 15 karakter.';
  }
  if (!data.category) {
    errors.category = 'Pilih kategori program.';
  }
  if (!data.location || !data.location.trim()) {
    errors.location = 'Lokasi/Kabupaten wajib diisi.';
  }
  if (!data.province || !data.province.trim()) {
    errors.province = 'Provinsi wajib diisi.';
  }
  if (!data.partnerId) {
    errors.partnerId = 'Pilih mitra pelaksana yang terdaftar.';
  }
  if (!data.funderId) {
    errors.funderId = 'Pilih perusahaan penyedia dana CSR.';
  }
  if (isNaN(data.proposedBudget) || data.proposedBudget <= 0) {
    errors.proposedBudget = 'Anggaran yang diajukan harus bernilai positif.';
  }
  if (isNaN(data.targetBeneficiaries) || data.targetBeneficiaries <= 0) {
    errors.targetBeneficiaries = 'Target penerima manfaat harus lebih dari 0.';
  }
  if (!data.startDate) {
    errors.startDate = 'Tanggal mulai wajib diisi.';
  }
  if (!data.endDate) {
    errors.endDate = 'Tanggal selesai wajib diisi.';
  } else if (data.startDate && new Date(data.endDate) < new Date(data.startDate)) {
    errors.endDate = 'Tanggal selesai tidak boleh sebelum tanggal mulai.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateProposalInput(data: {
  title: string;
  partnerId: string;
  category: string;
  location: string;
  province: string;
  problemStatement: string;
  proposedActivities: string;
  proposedBudget: number;
  targetBeneficiaries: number;
  estimatedDurationMonths: number;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Judul proposal minimal 5 karakter.';
  }
  if (!data.partnerId) {
    errors.partnerId = 'Pilih mitra pengaju proposal.';
  }
  if (!data.category) {
    errors.category = 'Pilih kategori program.';
  }
  if (!data.problemStatement || data.problemStatement.trim().length < 20) {
    errors.problemStatement = 'Penjelasan latar belakang/masalah minimal 20 karakter.';
  }
  if (!data.proposedActivities || data.proposedActivities.trim().length < 20) {
    errors.proposedActivities = 'Rencana kegiatan minimal 20 karakter.';
  }
  if (isNaN(data.proposedBudget) || data.proposedBudget <= 0) {
    errors.proposedBudget = 'Rencana anggaran harus bernilai positif.';
  }
  if (isNaN(data.targetBeneficiaries) || data.targetBeneficiaries <= 0) {
    errors.targetBeneficiaries = 'Target penerima manfaat harus lebih dari 0.';
  }
  if (isNaN(data.estimatedDurationMonths) || data.estimatedDurationMonths <= 0) {
    errors.estimatedDurationMonths = 'Durasi pelaksanaan minimal 1 bulan.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateFundingInput(data: {
  recordType: string;
  funderId: string;
  programId?: string;
  amount: number;
  date: string;
  notes: string;
  availableFunderBalance?: number;
  remainingProgramAllocation?: number;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.funderId) {
    errors.funderId = 'Pilih perusahaan funder.';
  }
  if (isNaN(data.amount) || data.amount <= 0) {
    errors.amount = 'Nominal harus bernilai positif.';
  }
  if (!data.date) {
    errors.date = 'Tanggal transaksi wajib diisi.';
  }
  if (!data.notes || data.notes.trim().length < 5) {
    errors.notes = 'Catatan atau referensi minimal 5 karakter.';
  }

  if (data.recordType === 'Allocation') {
    if (!data.programId) {
      errors.programId = 'Pilih program tujuan alokasi dana.';
    }
    if (data.availableFunderBalance !== undefined && data.amount > data.availableFunderBalance) {
      errors.amount = `Nominal melebihi saldo komitmen funder yang belum teralokasi (Maksimal: Rp ${new Intl.NumberFormat('id-ID').format(data.availableFunderBalance)}).`;
    }
  }

  if (data.recordType === 'Distribution') {
    if (!data.programId) {
      errors.programId = 'Pilih program yang menerima distribusi dana.';
    }
    if (data.remainingProgramAllocation !== undefined && data.amount > data.remainingProgramAllocation) {
      errors.amount = `Nominal melebihi sisa dana program yang telah dialokasikan (Maksimal: Rp ${new Intl.NumberFormat('id-ID').format(data.remainingProgramAllocation)}).`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
