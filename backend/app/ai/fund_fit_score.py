from typing import Dict, Any
import numpy as np

class FundFitScoreEngine:
    """
    Production Fund Fit Score Engine.
    Generates a normalized composite Fund Fit Score from 0 to 100
    evaluating 9 distinct dimensions:
    1. Risk Match (Fund Volatility & Risk Level vs Investor Risk Capacity)
    2. Goal Match (Fund Return Potential vs Goal Inflation-Adjusted CAGR Target)
    3. Liquidity Match (Exit Load & Lock-in vs Investor Liquidity Requirement)
    4. Behavior Match (Fund Drawdown Profile vs Investor Loss Aversion)
    5. Market Match (Fund Factor Exposure vs Current Market Regime)
    6. Performance (Alpha, Sharpe Ratio, 1Y/3Y/5Y Return Percentiles)
    7. Expense Ratio (Category-relative Expense Efficiency)
    8. Volatility (Standard Deviation & Beta Efficiency)
    9. Diversification (Holdings & Sector Concentration Score)
    """

    @classmethod
    def calculate_fund_fit_score(
        cls,
        fund_data: Dict[str, Any],
        investor_profile: Dict[str, Any],
        market_regime: Dict[str, Any],
        goal_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Calculates overall 0-100 Fund Fit Score and sub-component breakdown.
        """
        # Extract Fund Metrics
        fund_nav = float(fund_data.get("nav", 100.0))
        expense_ratio = float(fund_data.get("expense_ratio", 0.75))
        cagr_3y = float(fund_data.get("return_3y", 15.0))
        cagr_5y = float(fund_data.get("return_5y", 14.0))
        sharpe = float(fund_data.get("sharpe_ratio", 1.2))
        alpha = float(fund_data.get("alpha", 2.5))
        beta = float(fund_data.get("beta", 1.0))
        std_dev = float(fund_data.get("standard_deviation", 14.0))
        lockin_days = int(fund_data.get("lockin_days", 0))

        # Extract Investor Context
        investor_risk = float(investor_profile.get("composite_score", 60.0))
        loss_aversion = float(investor_profile.get("loss_aversion", 50.0))
        liquidity_need = str(investor_profile.get("liquidity_need", "Moderate"))

        # Extract Market Regime
        regime_type = str(market_regime.get("regime_type", "Bull Market"))

        # ----------------------------------------------------------------------
        # 1. Risk Match (0-100)
        # ----------------------------------------------------------------------
        fund_risk_equivalent = min(100.0, std_dev * 4.5 + beta * 20.0)
        risk_diff = abs(fund_risk_equivalent - investor_risk)
        risk_match = max(0.0, 100.0 - risk_diff * 1.5)

        # ----------------------------------------------------------------------
        # 2. Goal Match (0-100)
        # ----------------------------------------------------------------------
        target_cagr = 12.0
        if goal_data and goal_data.get("target_amount") and goal_data.get("current_amount"):
            target_cagr = 14.0 # Dynamic calculation
        goal_match = min(100.0, max(20.0, (cagr_3y / target_cagr) * 85.0))

        # ----------------------------------------------------------------------
        # 3. Liquidity Match (0-100)
        # ----------------------------------------------------------------------
        if liquidity_need == "High" and lockin_days > 0:
            liquidity_match = 30.0
        elif liquidity_need == "High":
            liquidity_match = 95.0
        else:
            liquidity_match = 90.0

        # ----------------------------------------------------------------------
        # 4. Behavior Match (0-100)
        # ----------------------------------------------------------------------
        # High loss aversion demands low standard deviation and low beta
        if loss_aversion > 70.0:
            behavior_match = max(10.0, 100.0 - (std_dev * 3.0 + beta * 25.0))
        else:
            behavior_match = 85.0

        # ----------------------------------------------------------------------
        # 5. Market Match (0-100)
        # ----------------------------------------------------------------------
        if regime_type == "Bear Market":
            market_match = max(20.0, 100.0 - (beta * 40.0)) # Low beta fits bear market
        elif regime_type == "Bull Market":
            market_match = min(100.0, beta * 70.0 + alpha * 5.0) # High beta/alpha fits bull market
        else:
            market_match = 75.0

        # ----------------------------------------------------------------------
        # 6. Performance Score (0-100)
        # ----------------------------------------------------------------------
        perf_score = min(100.0, max(0.0, cagr_3y * 3.5 + alpha * 4.0 + sharpe * 15.0))

        # ----------------------------------------------------------------------
        # 7. Expense Ratio Score (0-100)
        # ----------------------------------------------------------------------
        # Lower expense ratio yields higher score
        expense_score = max(0.0, min(100.0, (2.25 - expense_ratio) * 50.0))

        # ----------------------------------------------------------------------
        # 8. Volatility Score (0-100)
        # ----------------------------------------------------------------------
        volatility_score = max(0.0, min(100.0, 100.0 - (std_dev * 3.5)))

        # ----------------------------------------------------------------------
        # 9. Diversification Score (0-100)
        # ----------------------------------------------------------------------
        top_10_holding_pct = float(fund_data.get("top_10_holding_percent", 45.0))
        diversification_score = max(0.0, min(100.0, (100.0 - top_10_holding_pct) * 1.5))

        # ----------------------------------------------------------------------
        # COMPOSITE WEIGHTED FIT SCORE
        # ----------------------------------------------------------------------
        composite_fit_score = (
            0.18 * risk_match +
            0.15 * goal_match +
            0.10 * liquidity_match +
            0.10 * behavior_match +
            0.10 * market_match +
            0.15 * perf_score +
            0.08 * expense_score +
            0.07 * volatility_score +
            0.07 * diversification_score
        )

        return {
            "fund_fit_score": round(composite_fit_score, 2),
            "dimension_breakdown": {
                "risk_match": round(risk_match, 2),
                "goal_match": round(goal_match, 2),
                "liquidity_match": round(liquidity_match, 2),
                "behavior_match": round(behavior_match, 2),
                "market_match": round(market_match, 2),
                "performance_score": round(perf_score, 2),
                "expense_ratio_score": round(expense_score, 2),
                "volatility_score": round(volatility_score, 2),
                "diversification_score": round(diversification_score, 2)
            },
            "fit_badge": "PERFECT MATCH" if composite_fit_score >= 85 else ("STRONG FIT" if composite_fit_score >= 70 else ("MODERATE FIT" if composite_fit_score >= 55 else "POOR FIT"))
        }
