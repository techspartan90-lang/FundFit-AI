export interface MutualFund {
  id: string;
  name: string;
  amc: string;
  category: 'Flexi Cap' | 'Small Cap' | 'Large Cap' | 'Mid Cap' | 'ELSS Tax Saver' | 'Debt' | 'Hybrid';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  nav: number; // in INR
  change1D: number; // percentage
  cagr1Y: number;
  cagr3Y: number;
  cagr5Y: number;
  aumInCr: number; // AUM in ₹ Crores
  expenseRatio: number; // percentage
  fundManager: string;
  fundFitScore: number; // 0 - 100
  aiSignal: 'Strong Buy' | 'Buy' | 'Hold' | 'Switch' | 'Exit';
  aiReasoning: string;
  topHoldings: { company: string; sector: string; weight: number }[];
  sectorAllocation: { sector: string; weight: number }[];
}

export interface PortfolioHolding {
  fundId: string;
  fundName: string;
  amc: string;
  category: string;
  units: number;
  investedValue: number; // in INR
  currentValue: number;
  returnsINR: number;
  cagr: number;
  xirr: number;
  sipAmount: number;
  sipFrequency: 'Monthly' | 'Quarterly';
  fitScore: number;
  mismatchAlert?: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  category: 'Retirement' | 'House' | 'Education' | 'Vacation' | 'Emergency';
  targetAmount: number; // in INR
  currentAmount: number;
  targetYear: number;
  monthlyContributionNeeded: number;
  currentMonthlySIP: number;
  completionProbability: number; // 0 - 100
  aiSuggestion: string;
}

export interface AdvisorClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalAUM: number; // in INR
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  fundFitScore: number;
  lastReviewDate: string;
  status: 'Healthy' | 'Action Required' | 'Review Pending';
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  status: 'Success' | 'Warning' | 'Failed';
}

// Global Market Indices
export const MARKET_INDICES = [
  { name: 'NIFTY 50', value: 24180.50, change: 142.30, changePercent: 0.59, trend: 'up' },
  { name: 'SENSEX', value: 79450.20, change: 480.10, changePercent: 0.61, trend: 'up' },
  { name: 'BANK NIFTY', value: 51220.80, change: -110.40, changePercent: -0.21, trend: 'down' },
  { name: 'INDIA VIX', value: 14.25, change: -0.85, changePercent: -5.63, trend: 'down' },
  { name: '10Y G-SEC YIELD', value: 6.82, change: -0.04, changePercent: -0.58, trend: 'down' },
];

// Master Mutual Fund Registry
export const MUTUAL_FUNDS_REGISTRY: MutualFund[] = [
  {
    id: 'mf-1',
    name: 'Parag Parikh Flexi Cap Fund Direct-Growth',
    amc: 'PPFAS Mutual Fund',
    category: 'Flexi Cap',
    riskRating: 'Very High',
    nav: 78.45,
    change1D: 0.85,
    cagr1Y: 24.5,
    cagr3Y: 21.2,
    cagr5Y: 22.8,
    aumInCr: 68500,
    expenseRatio: 0.58,
    fundManager: 'Rajeev Thakkar & Raunak Onkar',
    fundFitScore: 96,
    aiSignal: 'Strong Buy',
    aiReasoning: 'Consistent alpha creation through global diversification (Alphabet, Meta) combined with top-tier Indian banking resilience.',
    topHoldings: [
      { company: 'HDFC Bank Ltd', sector: 'Financials', weight: 8.2 },
      { company: 'Alphabet Inc (Google)', sector: 'Technology', weight: 6.5 },
      { company: 'ICICI Bank Ltd', sector: 'Financials', weight: 5.8 },
      { company: 'ITC Ltd', sector: 'Consumer Goods', weight: 5.1 },
      { company: 'Coal India Ltd', sector: 'Energy', weight: 4.4 }
    ],
    sectorAllocation: [
      { sector: 'Financials', weight: 32.4 },
      { sector: 'Technology', weight: 22.1 },
      { sector: 'Consumer Goods', weight: 14.8 },
      { sector: 'Energy & Utilities', weight: 11.2 },
      { sector: 'Cash & Equivalents', weight: 19.5 }
    ]
  },
  {
    id: 'mf-2',
    name: 'HDFC Top 100 Fund Direct-Growth',
    amc: 'HDFC Mutual Fund',
    category: 'Large Cap',
    riskRating: 'Very High',
    nav: 112.30,
    change1D: 0.42,
    cagr1Y: 22.1,
    cagr3Y: 18.5,
    cagr5Y: 16.9,
    aumInCr: 34200,
    expenseRatio: 0.65,
    fundManager: 'Rahul Baijal',
    fundFitScore: 91,
    aiSignal: 'Buy',
    aiReasoning: 'Strong exposure to market leaders with robust balance sheets during current macro market expansion.',
    topHoldings: [
      { company: 'Reliance Industries Ltd', sector: 'Energy', weight: 9.4 },
      { company: 'ICICI Bank Ltd', sector: 'Financials', weight: 8.1 },
      { company: 'Infosys Ltd', sector: 'Technology', weight: 6.7 },
      { company: 'Larsen & Toubro Ltd', sector: 'Capital Goods', weight: 5.3 }
    ],
    sectorAllocation: [
      { sector: 'Financials', weight: 38.1 },
      { sector: 'Energy', weight: 15.4 },
      { sector: 'Technology', weight: 14.2 },
      { sector: 'Capital Goods', weight: 11.8 }
    ]
  },
  {
    id: 'mf-3',
    name: 'Quant Small Cap Fund Direct-Growth',
    amc: 'Quant Mutual Fund',
    category: 'Small Cap',
    riskRating: 'Very High',
    nav: 245.80,
    change1D: 1.45,
    cagr1Y: 38.6,
    cagr3Y: 32.4,
    cagr5Y: 34.1,
    aumInCr: 22100,
    expenseRatio: 0.72,
    fundManager: 'Sandeep Tandon & Ankit Pande',
    fundFitScore: 89,
    aiSignal: 'Hold',
    aiReasoning: 'VLRT algorithmic momentum framework delivering high beta returns; recommend maintaining SIP while keeping trailing stop-loss.',
    topHoldings: [
      { company: 'Reliance Industries Ltd', sector: 'Energy', weight: 7.2 },
      { company: 'Jio Financial Services', sector: 'Financials', weight: 5.9 },
      { company: 'Bikaji Foods International', sector: 'Consumer', weight: 4.8 }
    ],
    sectorAllocation: [
      { sector: 'Energy & Power', weight: 24.5 },
      { sector: 'Financials', weight: 21.3 },
      { sector: 'Capital Goods', weight: 18.9 }
    ]
  },
  {
    id: 'mf-4',
    name: 'SBI Small Cap Fund Direct-Growth',
    amc: 'SBI Mutual Fund',
    category: 'Small Cap',
    riskRating: 'Very High',
    nav: 168.10,
    change1D: 0.65,
    cagr1Y: 26.4,
    cagr3Y: 23.8,
    cagr5Y: 25.2,
    aumInCr: 28900,
    expenseRatio: 0.68,
    fundManager: 'R. Srinivasan',
    fundFitScore: 94,
    aiSignal: 'Buy',
    aiReasoning: 'Prudent risk management with disciplined liquidity buffer and high quality bottom-up stock picking.',
    topHoldings: [
      { company: 'Blue Star Ltd', sector: 'Consumer Durables', weight: 4.2 },
      { company: 'Kalpataru Projects', sector: 'Construction', weight: 3.8 }
    ],
    sectorAllocation: [
      { sector: 'Capital Goods', weight: 26.2 },
      { sector: 'Consumer Durables', weight: 18.4 }
    ]
  },
  {
    id: 'mf-5',
    name: 'ICICI Prudential Bluechip Fund Direct-Growth',
    amc: 'ICICI Prudential Mutual Fund',
    category: 'Large Cap',
    riskRating: 'High',
    nav: 104.20,
    change1D: 0.38,
    cagr1Y: 21.4,
    cagr3Y: 17.9,
    cagr5Y: 17.5,
    aumInCr: 54100,
    expenseRatio: 0.88,
    fundManager: 'Anish Tawakley',
    fundFitScore: 88,
    aiSignal: 'Hold',
    aiReasoning: 'Stable anchor large-cap fund providing steady downside protection during volatility.',
    topHoldings: [
      { company: 'ICICI Bank Ltd', sector: 'Financials', weight: 9.8 },
      { company: 'Larsen & Toubro Ltd', sector: 'Capital Goods', weight: 7.2 }
    ],
    sectorAllocation: [
      { sector: 'Financials', weight: 36.5 },
      { sector: 'Technology', weight: 14.1 }
    ]
  },
  {
    id: 'mf-6',
    name: 'Mirae Asset Large & Midcap Fund Direct-Growth',
    amc: 'Mirae Asset Mutual Fund',
    category: 'Mid Cap',
    riskRating: 'Very High',
    nav: 142.50,
    change1D: 0.78,
    cagr1Y: 25.8,
    cagr3Y: 20.1,
    cagr5Y: 21.4,
    aumInCr: 38700,
    expenseRatio: 0.62,
    fundManager: 'Neelesh Surana',
    fundFitScore: 93,
    aiSignal: 'Strong Buy',
    aiReasoning: 'Optimal 50:50 allocation between stability (Large Cap) and explosive earnings growth (Mid Cap).',
    topHoldings: [
      { company: 'HDFC Bank Ltd', sector: 'Financials', weight: 6.4 },
      { company: 'Axis Bank Ltd', sector: 'Financials', weight: 5.1 }
    ],
    sectorAllocation: [
      { sector: 'Financials', weight: 30.2 },
      { sector: 'Healthcare', weight: 12.8 }
    ]
  }
];

// Current User Investor Portfolio
export const USER_PORTFOLIO: PortfolioHolding[] = [
  {
    fundId: 'mf-1',
    fundName: 'Parag Parikh Flexi Cap Fund Direct-Growth',
    amc: 'PPFAS Mutual Fund',
    category: 'Flexi Cap',
    units: 11450.25,
    investedValue: 700000,
    currentValue: 898272,
    returnsINR: 198272,
    cagr: 22.8,
    xirr: 24.2,
    sipAmount: 25000,
    sipFrequency: 'Monthly',
    fitScore: 96
  },
  {
    fundId: 'mf-2',
    fundName: 'HDFC Top 100 Fund Direct-Growth',
    amc: 'HDFC Mutual Fund',
    category: 'Large Cap',
    units: 5420.80,
    investedValue: 500000,
    currentValue: 608755,
    returnsINR: 108755,
    cagr: 16.9,
    xirr: 18.1,
    sipAmount: 15000,
    sipFrequency: 'Monthly',
    fitScore: 91
  },
  {
    fundId: 'mf-3',
    fundName: 'Quant Small Cap Fund Direct-Growth',
    amc: 'Quant Mutual Fund',
    category: 'Small Cap',
    units: 2150.10,
    investedValue: 350000,
    currentValue: 528494,
    returnsINR: 178494,
    cagr: 34.1,
    xirr: 36.8,
    sipAmount: 10000,
    sipFrequency: 'Monthly',
    fitScore: 89,
    mismatchAlert: 'High small-cap weightage relative to conservative risk tolerance.'
  },
  {
    fundId: 'mf-6',
    fundName: 'Mirae Asset Large & Midcap Fund Direct-Growth',
    amc: 'Mirae Asset Mutual Fund',
    category: 'Mid Cap',
    units: 3150.40,
    investedValue: 350000,
    currentValue: 448932,
    returnsINR: 98932,
    cagr: 21.4,
    xirr: 22.6,
    sipAmount: 10000,
    sipFrequency: 'Monthly',
    fitScore: 93
  }
];

// Financial Goals
export const USER_GOALS: FinancialGoal[] = [
  {
    id: 'goal-1',
    name: 'Wealth Building for Retirement (Age 55)',
    category: 'Retirement',
    targetAmount: 50000000, // ₹5 Crores
    currentAmount: 2485453,
    targetYear: 2042,
    monthlyContributionNeeded: 48500,
    currentMonthlySIP: 60000,
    completionProbability: 96,
    aiSuggestion: 'On track to exceed target corpus by ₹42 Lakhs based on current 18.4% XIRR trajectory.'
  },
  {
    id: 'goal-2',
    name: 'Dream Luxury Villa Purchase',
    category: 'House',
    targetAmount: 15000000, // ₹1.5 Crores
    currentAmount: 850000,
    targetYear: 2030,
    monthlyContributionNeeded: 32000,
    currentMonthlySIP: 20000,
    completionProbability: 78,
    aiSuggestion: 'Increase monthly SIP by ₹12,000 in Flexi Cap funds to reach 95% target assurance.'
  },
  {
    id: 'goal-3',
    name: 'Child Higher Education Fund',
    category: 'Education',
    targetAmount: 5000000, // ₹50 Lakhs
    currentAmount: 420000,
    targetYear: 2035,
    monthlyContributionNeeded: 12500,
    currentMonthlySIP: 15000,
    completionProbability: 92,
    aiSuggestion: 'Well-aligned asset allocation between Large & Midcap funds.'
  }
];

// Advisor Portal Client Directory
export const ADVISOR_CLIENTS: AdvisorClient[] = [
  {
    id: 'cli-1',
    name: 'Vikramaditya Sharma',
    email: 'vikram.sharma@techcorp.in',
    phone: '+91 98765 43210',
    totalAUM: 18500000, // ₹1.85 Cr
    riskProfile: 'Aggressive',
    fundFitScore: 94,
    lastReviewDate: 'Yesterday',
    status: 'Healthy'
  },
  {
    id: 'cli-2',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@finconsult.com',
    phone: '+91 98123 45678',
    totalAUM: 34200000, // ₹3.42 Cr
    riskProfile: 'Moderate',
    fundFitScore: 82,
    lastReviewDate: '3 days ago',
    status: 'Action Required'
  },
  {
    id: 'cli-3',
    name: 'Dr. Rajesh Nair',
    email: 'rajesh.nair@apollo.org',
    phone: '+91 97654 32109',
    totalAUM: 89500000, // ₹8.95 Cr
    riskProfile: 'Conservative',
    fundFitScore: 96,
    lastReviewDate: '1 week ago',
    status: 'Healthy'
  }
];

// System Admin Audit Logs
export const ADMIN_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-1',
    timestamp: 'Today 18:42:10',
    user: 'system.cron@fundfit.ai',
    action: 'AMFI Daily NAV Sync Completed (25,410 Funds)',
    module: 'Market Data Feed',
    status: 'Success'
  },
  {
    id: 'log-2',
    timestamp: 'Today 17:15:02',
    user: 'advisor.sharma@fundfit.ai',
    action: 'Generated Client Portfolio Rebalancing Report',
    module: 'Advisor Portal',
    status: 'Success'
  },
  {
    id: 'log-3',
    timestamp: 'Yesterday 22:05:44',
    user: 'sec.gateway@fundfit.ai',
    action: 'Blocked 3 Failed MFA Login Attempts (IP 182.74.12.9)',
    module: 'Security Engine',
    status: 'Warning'
  }
];
