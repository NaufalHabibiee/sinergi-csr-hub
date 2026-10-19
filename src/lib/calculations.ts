import { FundingRecord, Program, ImpactReport, BeneficiaryAggregate } from '../types/csr';

export interface PlatformFundingMetrics {
  totalCommitted: number;
  totalAllocated: number;
  totalDisbursed: number;
  availableUnallocatedBalance: number;
  undisbursedAllocationBalance: number;
}

export function calculatePlatformFunding(records: FundingRecord[]): PlatformFundingMetrics {
  let totalCommitted = 0;
  let totalAllocated = 0;
  let totalDisbursed = 0;

  for (const r of records) {
    if (r.recordType === 'Commitment' && r.status === 'Approved (Demo)') {
      totalCommitted += r.amount;
    } else if (r.recordType === 'Allocation' && r.status === 'Approved (Demo)') {
      totalAllocated += r.amount;
    } else if (r.recordType === 'Distribution' && r.status === 'Disbursed (Demo)') {
      totalDisbursed += r.amount;
    }
  }

  const availableUnallocatedBalance = Math.max(0, totalCommitted - totalAllocated);
  const undisbursedAllocationBalance = Math.max(0, totalAllocated - totalDisbursed);

  return {
    totalCommitted,
    totalAllocated,
    totalDisbursed,
    availableUnallocatedBalance,
    undisbursedAllocationBalance,
  };
}

export interface FunderMetrics {
  committed: number;
  allocated: number;
  disbursed: number;
  availableBalance: number;
}

export function calculateFunderFunding(funderId: string, records: FundingRecord[]): FunderMetrics {
  let committed = 0;
  let allocated = 0;
  let disbursed = 0;

  for (const r of records) {
    if (r.funderId === funderId) {
      if (r.recordType === 'Commitment' && r.status === 'Approved (Demo)') {
        committed += r.amount;
      } else if (r.recordType === 'Allocation' && r.status === 'Approved (Demo)') {
        allocated += r.amount;
      } else if (r.recordType === 'Distribution' && r.status === 'Disbursed (Demo)') {
        disbursed += r.amount;
      }
    }
  }

  return {
    committed,
    allocated,
    disbursed,
    availableBalance: Math.max(0, committed - allocated),
  };
}

export function calculateProgramFinancials(programId: string, records: FundingRecord[]) {
  let allocated = 0;
  let disbursed = 0;

  for (const r of records) {
    if (r.programId === programId) {
      if (r.recordType === 'Allocation' && r.status === 'Approved (Demo)') {
        allocated += r.amount;
      } else if (r.recordType === 'Distribution' && r.status === 'Disbursed (Demo)') {
        disbursed += r.amount;
      }
    }
  }

  return {
    allocated,
    disbursed,
    remainingDisbursement: Math.max(0, allocated - disbursed),
  };
}

export function calculateBeneficiariesMetrics(aggregates: BeneficiaryAggregate[]) {
  let uniqueVerified = 0;
  let participationEvents = 0;
  let householdEstimates = 0;
  let totalReached = 0;
  let totalTarget = 0;

  for (const b of aggregates) {
    totalTarget += b.targetCount;
    totalReached += b.reachedCount;
    if (b.countingMethod === 'unique_verified') {
      uniqueVerified += b.reachedCount;
    } else if (b.countingMethod === 'participation_event') {
      participationEvents += b.reachedCount;
    } else {
      householdEstimates += b.reachedCount;
    }
  }

  return {
    uniqueVerified,
    participationEvents,
    householdEstimates,
    totalReached,
    totalTarget,
    reachPercent: totalTarget > 0 ? (totalReached / totalTarget) * 100 : 0,
  };
}

export function calculateReportingCompletionRate(programs: Program[], reports: ImpactReport[]) {
  const activeOrCompleted = programs.filter(p => p.status === 'active' || p.status === 'completed');
  if (activeOrCompleted.length === 0) return 100;

  let reportedCount = 0;
  for (const p of activeOrCompleted) {
    const hasApprovedReport = reports.some(
      r => (r.scopeType === 'program' && r.scopeId === p.id && (r.status === 'Approved (Demo)' || r.status === 'Published (Demo)'))
    );
    if (hasApprovedReport) {
      reportedCount++;
    }
  }

  return Math.round((reportedCount / activeOrCompleted.length) * 100);
}
