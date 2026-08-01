// =============================================================================
// FUND FIT AI - ENTERPRISE TYPESCRIPT API SPECIFICATIONS
// Matches OpenAPI 3.1 Backend Data Contracts and Response Envelopes
// =============================================================================

export interface PaginationMeta {
  page: number;
  page_size: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
  next_cursor?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta | Record<string, any>;
  errors: string[] | Record<string, any>[];
}

// -----------------------------------------------------------------------------
// Auth Domain
// -----------------------------------------------------------------------------
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: string;
  email: string;
  role: string;
}

export interface UserProfileDTO {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  phone_number?: string;
  avatar_url?: string;
}

// -----------------------------------------------------------------------------
// Investor Profile & Behavioral Domain
// -----------------------------------------------------------------------------
export interface ProfileCreateOrUpdateDTO {
  age: number;
  occupation: string;
  salary: number;
  monthly_income: number;
  monthly_expenses: number;
  assets: number;
  liabilities: number;
  emergency_fund: number;
  investment_experience?: string;
  financial_knowledge?: string;
  tax_bracket?: string;
  liquidity_need?: string;
  dependents?: number;
  risk_preference?: string;
  behavior_profile?: string;
  investment_goals?: string;
  time_horizon?: string;
}

export interface RiskProfileDTO {
  risk_score: number;
  risk_category: string;
  downside_risk_var_95: number;
  expected_volatility: number;
  drawdown_tolerance: number;
}

export interface BehaviorProfileDTO {
  loss_aversion: number;
  overconfidence: number;
  anchoring_bias: number;
  recency_bias: number;
  herd_mentality: number;
  emotional_investing: number;
  patience: number;
  decision_style: string;
  confidence_level: number;
}

// -----------------------------------------------------------------------------
// Portfolio Domain
// -----------------------------------------------------------------------------
export interface PortfolioHoldingDTO {
  id: string;
  mutual_fund_id: string;
  fund_name: string;
  scheme_code: string;
  units: number;
  avg_buy_nav: number;
  current_nav: number;
  current_value: number;
  total_invested: number;
  gain_loss: number;
  gain_loss_percent: number;
  allocation_percent: number;
}

export interface PortfolioSummaryDTO {
  portfolio_id: string;
  total_value: number;
  total_invested: number;
  total_gain_loss: number;
  gain_loss_percent: number;
  cagr_3y: number;
  xirr: number;
  today_gain_loss: number;
}

// -----------------------------------------------------------------------------
// Mutual Funds Domain
// -----------------------------------------------------------------------------
export interface MutualFundDTO {
  id: string;
  scheme_code: string;
  fund_name: string;
  amc_name: string;
  category: string;
  sub_category: string;
  nav: number;
  expense_ratio: number;
  aum: number;
  risk_level: string;
  return_1y: number;
  return_3y: number;
  return_5y: number;
  sharpe_ratio: number;
  alpha: number;
  beta: number;
  standard_deviation: number;
  fund_fit_score?: number;
}

// -----------------------------------------------------------------------------
// Market Data Domain
// -----------------------------------------------------------------------------
export interface MarketOverviewDTO {
  nifty_50: { close: number; change: number; pct_change: number };
  sensex: { close: number; change: number; pct_change: number };
  bank_nifty: { close: number; change: number; pct_change: number };
  india_vix: { close: number; change: number; pct_change: number };
  gold: { close: number; change: number; pct_change: number };
  usdinr: { close: number; change: number; pct_change: number };
  market_sentiment: string;
}

// -----------------------------------------------------------------------------
// AI Engine Domain
// -----------------------------------------------------------------------------
export interface FundFitScoreResult {
  fund_fit_score: number;
  dimension_breakdown: Record<string, number>;
  fit_badge: string;
}

export interface RecommendationResult {
  action: 'BUY' | 'HOLD' | 'SWITCH' | 'EXIT' | 'REBALANCE' | 'INCREASE_SIP' | 'DECREASE_SIP';
  confidence_score: number;
  primary_reason: string;
  alternative_fund?: string;
  recommended_allocation_adjust_pct: number;
}

export interface ExplainableAIResult {
  why_explanation: string;
  supporting_metrics: Record<string, any>;
  risk_factors: string[];
  expected_outcome: Record<string, any>;
  confidence_score: number;
}
