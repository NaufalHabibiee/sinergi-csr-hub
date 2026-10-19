import { describe, it, expect } from 'vitest';
import {
  calculatePlatformFunding,
  calculateFunderFunding,
  calculateProgramFinancials,
  calculateBeneficiariesMetrics,
  calculateReportingCompletionRate
} from '../lib/calculations';
import { FundingRecord, Program, ImpactReport, BeneficiaryAggregate } from '../types/csr';

describe('CSR Hub Business Calculations', () => {
  const dummyFundingRecords: FundingRecord[] = [
    {
      id: '1',
      referenceNo: 'COM-01',
      funderId: 'fnd_1',
      sourceType: 'CSR Korporat Tahunan',
      recordType: 'Commitment',
      amount: 1_000_000_000,
      date: '2026-01-01',
      status: 'Approved (Demo)',
      notes: '',
      createdBy: ''
    },
    {
      id: '2',
      referenceNo: 'ALC-01',
      funderId: 'fnd_1',
      programId: 'prg_1',
      sourceType: 'CSR Korporat Tahunan',
      recordType: 'Allocation',
      amount: 400_000_000,
      date: '2026-01-05',
      status: 'Approved (Demo)',
      notes: '',
      createdBy: ''
    },
    {
      id: '3',
      referenceNo: 'DIS-01',
      funderId: 'fnd_1',
      programId: 'prg_1',
      sourceType: 'CSR Korporat Tahunan',
      recordType: 'Distribution',
      amount: 250_000_000,
      date: '2026-01-10',
      status: 'Disbursed (Demo)',
      notes: '',
      createdBy: ''
    }
  ];

  it('calculates platform committed, allocated, and disbursed correctly', () => {
    const metrics = calculatePlatformFunding(dummyFundingRecords);
    expect(metrics.totalCommitted).toBe(1_000_000_000);
    expect(metrics.totalAllocated).toBe(400_000_000);
    expect(metrics.totalDisbursed).toBe(250_000_000);
    expect(metrics.availableUnallocatedBalance).toBe(600_000_000);
    expect(metrics.undisbursedAllocationBalance).toBe(150_000_000);
  });

  it('calculates funder-specific available balance accurately', () => {
    const funderMetrics = calculateFunderFunding('fnd_1', dummyFundingRecords);
    expect(funderMetrics.committed).toBe(1_000_000_000);
    expect(funderMetrics.allocated).toBe(400_000_000);
    expect(funderMetrics.availableBalance).toBe(600_000_000);
  });

  it('calculates program remaining disbursement balance', () => {
    const progFinancials = calculateProgramFinancials('prg_1', dummyFundingRecords);
    expect(progFinancials.allocated).toBe(400_000_000);
    expect(progFinancials.disbursed).toBe(250_000_000);
    expect(progFinancials.remainingDisbursement).toBe(150_000_000);
  });

  it('separates unique verified and participation beneficiary counting methods', () => {
    const aggregates: BeneficiaryAggregate[] = [
      {
        id: 'b1',
        programId: 'prg_1',
        programTitle: 'Pendidikan',
        region: 'Jawa Tengah',
        province: 'Jawa Tengah',
        groupLabel: 'Siswa Beasiswa',
        targetCount: 100,
        reachedCount: 90,
        countingMethod: 'unique_verified',
        notes: '',
        lastUpdated: ''
      },
      {
        id: 'b2',
        programId: 'prg_2',
        programTitle: 'Mangrove',
        region: 'Bekasi',
        province: 'Jawa Barat',
        groupLabel: 'Relawan Tanam',
        targetCount: 500,
        reachedCount: 400,
        countingMethod: 'participation_event',
        notes: '',
        lastUpdated: ''
      }
    ];

    const metrics = calculateBeneficiariesMetrics(aggregates);
    expect(metrics.uniqueVerified).toBe(90);
    expect(metrics.participationEvents).toBe(400);
    expect(metrics.totalReached).toBe(490);
    expect(metrics.totalTarget).toBe(600);
  });

  it('calculates reporting completion rate percentage safely', () => {
    const programs: Program[] = [
      { id: 'prg_1', status: 'active' } as any,
      { id: 'prg_2', status: 'completed' } as any,
    ];
    const reports: ImpactReport[] = [
      { scopeType: 'program', scopeId: 'prg_1', status: 'Approved (Demo)' } as any
    ];

    const rate = calculateReportingCompletionRate(programs, reports);
    expect(rate).toBe(50);
  });
});
