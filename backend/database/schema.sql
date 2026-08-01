-- =============================================================================
-- FUND FIT AI - ENTERPRISE POSTGRESQL SCHEMA DDL
-- Production-Ready, 3NF Normalized, UUID PKs, Soft-Deletes & Audit Logging
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- -----------------------------------------------------------------------------
-- 1. USERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'investor',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    phone_number VARCHAR(20),
    avatar_url VARCHAR(512),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role) WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- 2. INVESTOR PROFILES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS investor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    age INT CHECK (age >= 18 AND age <= 120),
    occupation VARCHAR(100),
    salary NUMERIC(15, 2) DEFAULT 0.00,
    monthly_income NUMERIC(15, 2) DEFAULT 0.00,
    monthly_expenses NUMERIC(15, 2) DEFAULT 0.00,
    assets NUMERIC(15, 2) DEFAULT 0.00,
    liabilities NUMERIC(15, 2) DEFAULT 0.00,
    net_worth NUMERIC(15, 2) DEFAULT 0.00,
    emergency_fund NUMERIC(15, 2) DEFAULT 0.00,
    investment_experience VARCHAR(50) DEFAULT 'Beginner', -- Beginner, Intermediate, Advanced, Expert
    financial_knowledge VARCHAR(50) DEFAULT 'Basic', -- Low, Basic, Medium, Advanced
    tax_bracket VARCHAR(50) DEFAULT '30%',
    liquidity_need VARCHAR(50) DEFAULT 'Moderate', -- High, Moderate, Low
    dependents INT DEFAULT 0 CHECK (dependents >= 0),
    risk_preference VARCHAR(50) DEFAULT 'Moderate',
    behavior_profile VARCHAR(50) DEFAULT 'Balanced',
    investment_goals TEXT,
    time_horizon VARCHAR(50) DEFAULT '5-10 Years',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_investor_profiles_user_id ON investor_profiles(user_id);

-- -----------------------------------------------------------------------------
-- 3. RISK ASSESSMENTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS risk_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    risk_score NUMERIC(5, 2) NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    risk_category VARCHAR(50) NOT NULL, -- Conservative, Moderately Conservative, Moderate, Moderately Aggressive, Aggressive
    downside_risk NUMERIC(5, 2) DEFAULT 0.00, -- Value at Risk (VaR)
    expected_volatility NUMERIC(5, 2) DEFAULT 0.00,
    drawdown_tolerance NUMERIC(5, 2) DEFAULT 0.00,
    assessment_answers JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_risk_assessments_user ON risk_assessments(user_id);

-- -----------------------------------------------------------------------------
-- 4. BEHAVIOR PROFILES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS behavior_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    loss_aversion NUMERIC(5, 2) DEFAULT 50.00, -- Score 0 to 100
    overconfidence NUMERIC(5, 2) DEFAULT 50.00,
    anchoring_bias NUMERIC(5, 2) DEFAULT 50.00,
    recency_bias NUMERIC(5, 2) DEFAULT 50.00,
    herd_mentality NUMERIC(5, 2) DEFAULT 50.00,
    emotional_investing NUMERIC(5, 2) DEFAULT 50.00,
    patience NUMERIC(5, 2) DEFAULT 50.00,
    decision_style VARCHAR(50) DEFAULT 'Analytical', -- Analytical, Intuitive, Passive, Reactive
    confidence_level NUMERIC(5, 2) DEFAULT 50.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_behavior_profiles_user ON behavior_profiles(user_id);

-- -----------------------------------------------------------------------------
-- 5. GOALS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Retirement, Wealth Creation, Child Education, House, Emergency, Medical
    target_amount NUMERIC(15, 2) NOT NULL,
    current_amount NUMERIC(15, 2) DEFAULT 0.00,
    target_date DATE NOT NULL,
    priority VARCHAR(20) DEFAULT 'Medium', -- Low, Medium, High, Critical
    status VARCHAR(50) DEFAULT 'In Progress', -- In Progress, Achieved, On Track, Off Track, Paused
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_goals_user ON goals(user_id) WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- 6. GOAL PROGRESS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS goal_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
    achieved_amount NUMERIC(15, 2) NOT NULL,
    achievement_percentage NUMERIC(5, 2) NOT NULL,
    required_sip NUMERIC(15, 2) DEFAULT 0.00,
    required_investment NUMERIC(15, 2) DEFAULT 0.00,
    expected_completion_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_goal_progress_goal_date ON goal_progress(goal_id, snapshot_date);

-- -----------------------------------------------------------------------------
-- 7. AMC TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS amc (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(512),
    total_aum NUMERIC(15, 2) DEFAULT 0.00,
    ceo_name VARCHAR(150),
    website VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_amc_code ON amc(code);

-- -----------------------------------------------------------------------------
-- 8. FUND CATEGORIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fund_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    asset_class VARCHAR(50) NOT NULL, -- Equity, Debt, Hybrid, Solution Oriented, Others
    sub_category VARCHAR(100) NOT NULL, -- Flexi Cap, Small Cap, Mid Cap, Large Cap, Liquid, Dynamic Bond
    description TEXT,
    risk_rating VARCHAR(50) DEFAULT 'Moderate',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_fund_categories_asset_sub ON fund_categories(asset_class, sub_category);

-- -----------------------------------------------------------------------------
-- 9. BENCHMARKS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS benchmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    index_type VARCHAR(50) NOT NULL DEFAULT 'Equity',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_benchmarks_symbol ON benchmarks(symbol);

-- -----------------------------------------------------------------------------
-- 10. MUTUAL FUNDS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mutual_funds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_code VARCHAR(50) NOT NULL UNIQUE,
    fund_name VARCHAR(255) NOT NULL,
    amc_id UUID REFERENCES amc(id) ON DELETE RESTRICT,
    category_id UUID REFERENCES fund_categories(id) ON DELETE RESTRICT,
    benchmark_id UUID REFERENCES benchmarks(id) ON DELETE SET NULL,
    sub_category VARCHAR(100),
    nav NUMERIC(12, 4) NOT NULL DEFAULT 0.0000,
    expense_ratio NUMERIC(5, 2) NOT NULL DEFAULT 0.50,
    aum NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    risk_level VARCHAR(50) NOT NULL DEFAULT 'Very High Risk',
    return_1d NUMERIC(8, 2) DEFAULT 0.00,
    return_1m NUMERIC(8, 2) DEFAULT 0.00,
    return_3m NUMERIC(8, 2) DEFAULT 0.00,
    return_6m NUMERIC(8, 2) DEFAULT 0.00,
    return_1y NUMERIC(8, 2) DEFAULT 0.00,
    return_3y NUMERIC(8, 2) DEFAULT 0.00,
    return_5y NUMERIC(8, 2) DEFAULT 0.00,
    return_10y NUMERIC(8, 2) DEFAULT 0.00,
    sharpe_ratio NUMERIC(8, 2) DEFAULT 0.00,
    sortino_ratio NUMERIC(8, 2) DEFAULT 0.00,
    treynor_ratio NUMERIC(8, 2) DEFAULT 0.00,
    alpha NUMERIC(8, 2) DEFAULT 0.00,
    beta NUMERIC(8, 2) DEFAULT 1.00,
    standard_deviation NUMERIC(8, 2) DEFAULT 0.00,
    tracking_error NUMERIC(8, 2) DEFAULT 0.00,
    top_holdings JSONB,
    sector_allocation JSONB,
    exit_load VARCHAR(255) DEFAULT '1% if redeemed within 1 year',
    fund_manager VARCHAR(255) DEFAULT 'Not Disclosed',
    launch_date DATE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_mutual_funds_scheme_code ON mutual_funds(scheme_code);
CREATE INDEX idx_mutual_funds_amc ON mutual_funds(amc_id);
CREATE INDEX idx_mutual_funds_category ON mutual_funds(category_id);
CREATE INDEX idx_mutual_funds_nav ON mutual_funds(nav);

-- -----------------------------------------------------------------------------
-- 11. BENCHMARK HISTORY TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS benchmark_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    benchmark_id UUID NOT NULL REFERENCES benchmarks(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    close_value NUMERIC(12, 4) NOT NULL,
    return_1d NUMERIC(8, 2) DEFAULT 0.00,
    return_1y NUMERIC(8, 2) DEFAULT 0.00,
    volatility_30d NUMERIC(8, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT uq_benchmark_history UNIQUE (benchmark_id, record_date)
);

CREATE INDEX idx_benchmark_history_date ON benchmark_history(benchmark_id, record_date DESC);

-- -----------------------------------------------------------------------------
-- 12. PORTFOLIOS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL DEFAULT 'My Wealth Portfolio',
    description TEXT,
    is_default BOOLEAN DEFAULT TRUE,
    total_value NUMERIC(15, 2) DEFAULT 0.00,
    total_invested NUMERIC(15, 2) DEFAULT 0.00,
    total_gain_loss NUMERIC(15, 2) DEFAULT 0.00,
    gain_loss_percent NUMERIC(8, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_portfolios_user ON portfolios(user_id) WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- 13. PORTFOLIO HOLDINGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    mutual_fund_id UUID NOT NULL REFERENCES mutual_funds(id) ON DELETE RESTRICT,
    units NUMERIC(15, 4) NOT NULL DEFAULT 0.0000,
    avg_buy_nav NUMERIC(12, 4) NOT NULL DEFAULT 0.0000,
    current_nav NUMERIC(12, 4) NOT NULL DEFAULT 0.0000,
    current_value NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    total_invested NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    gain_loss NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    asset_type VARCHAR(50) DEFAULT 'Equity',
    allocation_percent NUMERIC(5, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_portfolio_holdings_portfolio ON portfolio_holdings(portfolio_id);
CREATE INDEX idx_portfolio_holdings_fund ON portfolio_holdings(mutual_fund_id);

-- -----------------------------------------------------------------------------
-- 14. TRANSACTIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    mutual_fund_id UUID NOT NULL REFERENCES mutual_funds(id) ON DELETE RESTRICT,
    transaction_type VARCHAR(20) NOT NULL, -- BUY, SELL, SIP, SWITCH_IN, SWITCH_OUT
    units NUMERIC(15, 4) NOT NULL,
    nav NUMERIC(12, 4) NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    transaction_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'COMPLETED', -- PENDING, COMPLETED, FAILED, CANCELLED
    reference_no VARCHAR(100) UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_transactions_portfolio ON transactions(portfolio_id, transaction_date DESC);
CREATE INDEX idx_transactions_fund ON transactions(mutual_fund_id);

-- -----------------------------------------------------------------------------
-- 15. MARKET DATA TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS market_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    record_date DATE NOT NULL UNIQUE,
    nifty NUMERIC(12, 2) NOT NULL,
    sensex NUMERIC(12, 2) NOT NULL,
    bank_nifty NUMERIC(12, 2) NOT NULL,
    midcap NUMERIC(12, 2) NOT NULL,
    smallcap NUMERIC(12, 2) NOT NULL,
    india_vix NUMERIC(6, 2) NOT NULL,
    gold NUMERIC(12, 2) NOT NULL,
    silver NUMERIC(12, 2) NOT NULL,
    usdinr NUMERIC(6, 2) NOT NULL,
    repo_rate NUMERIC(5, 2) NOT NULL,
    inflation NUMERIC(5, 2) NOT NULL,
    gdp NUMERIC(5, 2) NOT NULL,
    cpi NUMERIC(6, 2) NOT NULL,
    bond_yield NUMERIC(5, 2) NOT NULL,
    sector_index JSONB,
    market_sentiment VARCHAR(50) DEFAULT 'Neutral',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_market_data_date ON market_data(record_date DESC);

-- -----------------------------------------------------------------------------
-- 16. ECONOMIC INDICATORS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS economic_indicators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    record_date DATE NOT NULL,
    indicator_name VARCHAR(100) NOT NULL,
    indicator_value NUMERIC(12, 4) NOT NULL,
    frequency VARCHAR(50) DEFAULT 'Monthly', -- Daily, Weekly, Monthly, Quarterly, Yearly
    unit VARCHAR(50) DEFAULT '%',
    impact_level VARCHAR(50) DEFAULT 'Medium', -- Low, Medium, High, Critical
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT uq_economic_indicator UNIQUE (indicator_name, record_date)
);

CREATE INDEX idx_economic_indicators_name_date ON economic_indicators(indicator_name, record_date DESC);

-- -----------------------------------------------------------------------------
-- 17. MARKET REGIMES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS market_regimes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    record_date DATE NOT NULL UNIQUE,
    regime_type VARCHAR(50) NOT NULL, -- Bull Market, Bear Market, Recovery, Correction, Sideways
    confidence_score NUMERIC(5, 2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
    volatility_regime VARCHAR(50) DEFAULT 'Normal', -- Low, Normal, Elevated, High Volatility
    trend_strength NUMERIC(5, 2) DEFAULT 50.00,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_market_regimes_date ON market_regimes(record_date DESC);

-- -----------------------------------------------------------------------------
-- 18. RECOMMENDATIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
    target_fund_id UUID REFERENCES mutual_funds(id) ON DELETE SET NULL,
    current_fund_id UUID REFERENCES mutual_funds(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL, -- BUY, HOLD, SWITCH, EXIT, REBALANCE, INCREASE_SIP, DECREASE_SIP
    recommended_amount NUMERIC(15, 2) DEFAULT 0.00,
    recommended_sip_amount NUMERIC(15, 2) DEFAULT 0.00,
    confidence_score NUMERIC(5, 2) NOT NULL DEFAULT 85.00,
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, EXECUTED, DISMISSED, EXPIRED
    why_explanation TEXT NOT NULL,
    supporting_metrics JSONB,
    risk_factors JSONB,
    expected_outcome JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_recommendations_user_status ON recommendations(user_id, status) WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- 19. RECOMMENDATION HISTORY TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS recommendation_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recommendation_id UUID NOT NULL REFERENCES recommendations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action_taken VARCHAR(50) NOT NULL,
    executed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    performance_impact NUMERIC(8, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_recommendation_history_user ON recommendation_history(user_id);

-- -----------------------------------------------------------------------------
-- 20. WATCHLISTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS watchlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mutual_fund_id UUID NOT NULL REFERENCES mutual_funds(id) ON DELETE CASCADE,
    target_nav NUMERIC(12, 4),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT uq_user_watchlist_fund UNIQUE (user_id, mutual_fund_id)
);

CREATE INDEX idx_watchlists_user ON watchlists(user_id);

-- -----------------------------------------------------------------------------
-- 21. ALERTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL, -- Goal Delay, High Risk, Portfolio Drift, Market Crash, Fund Underperformance, Better Alternative Available, SIP Reminder
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
    is_read BOOLEAN DEFAULT FALSE,
    triggered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_alerts_user_read ON alerts(user_id, is_read) WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- 22. NOTIFICATIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    channel VARCHAR(50) DEFAULT 'IN_APP', -- IN_APP, EMAIL, SMS, PUSH
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_notifications_user_sent ON notifications(user_id, is_sent);

-- -----------------------------------------------------------------------------
-- 23. REPORTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
    report_type VARCHAR(50) NOT NULL, -- PORTFOLIO_HEALTH, TAX_STATEMENT, PERFORMANCE_SUMMARY, RISK_AUDIT
    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(512) NOT NULL,
    format VARCHAR(20) DEFAULT 'PDF',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_reports_user ON reports(user_id);

-- -----------------------------------------------------------------------------
-- 24. ADVISOR CLIENTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS advisor_clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    advisor_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    client_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    relationship_status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, PENDING, TERMINATED
    assigned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT uq_advisor_client UNIQUE (advisor_user_id, client_user_id)
);

CREATE INDEX idx_advisor_clients_advisor ON advisor_clients(advisor_user_id);
CREATE INDEX idx_advisor_clients_client ON advisor_clients(client_user_id);

-- -----------------------------------------------------------------------------
-- 25. ADMIN LOGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_admin_logs_admin ON admin_logs(admin_user_id);

-- -----------------------------------------------------------------------------
-- 26. AUDIT LOGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
    changed_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);

-- -----------------------------------------------------------------------------
-- 27. USER SESSIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(512) NOT NULL UNIQUE,
    user_agent VARCHAR(255),
    ip_address VARCHAR(45),
    expires_at TIMESTAMPTZ NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_user_sessions_token ON user_sessions(refresh_token);
CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);

-- -----------------------------------------------------------------------------
-- 28. DOCUMENTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(50) NOT NULL, -- KIM, SID, Factsheet, Tax_Doc
    mutual_fund_id UUID REFERENCES mutual_funds(id) ON DELETE CASCADE,
    file_path VARCHAR(512) NOT NULL,
    mime_type VARCHAR(100) DEFAULT 'application/pdf',
    file_size_bytes BIGINT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_documents_fund ON documents(mutual_fund_id);

-- -----------------------------------------------------------------------------
-- 29. SETTINGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    value JSONB NOT NULL,
    category VARCHAR(50) DEFAULT 'GENERAL',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    CONSTRAINT uq_user_setting_key UNIQUE (user_id, key)
);

CREATE INDEX idx_settings_user_key ON settings(user_id, key);

-- =============================================================================
-- AUDIT LOG TRIGGER FUNCTION
-- =============================================================================
CREATE OR REPLACE FUNCTION fn_audit_logging()
RETURNS TRIGGER AS $$
DECLARE
    v_old JSONB := NULL;
    v_new JSONB := NULL;
BEGIN
    IF TG_OP = 'DELETE' THEN
        v_old := to_jsonb(OLD);
        INSERT INTO audit_logs(table_name, record_id, action, old_values, timestamp)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', v_old, CURRENT_TIMESTAMP);
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        v_old := to_jsonb(OLD);
        v_new := to_jsonb(NEW);
        INSERT INTO audit_logs(table_name, record_id, action, old_values, new_values, timestamp)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', v_old, v_new, CURRENT_TIMESTAMP);
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        v_new := to_jsonb(NEW);
        INSERT INTO audit_logs(table_name, record_id, action, new_values, timestamp)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', v_new, CURRENT_TIMESTAMP);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to critical tables
CREATE OR REPLACE TRIGGER trg_audit_users AFTER INSERT OR UPDATE OR DELETE ON users FOR EACH ROW EXECUTE FUNCTION fn_audit_logging();
CREATE OR REPLACE TRIGGER trg_audit_portfolios AFTER INSERT OR UPDATE OR DELETE ON portfolios FOR EACH ROW EXECUTE FUNCTION fn_audit_logging();
CREATE OR REPLACE TRIGGER trg_audit_transactions AFTER INSERT OR UPDATE OR DELETE ON transactions FOR EACH ROW EXECUTE FUNCTION fn_audit_logging();
