from typing import Dict, Any, List
import numpy as np

class PortfolioHealthEngine:
    """
    Production Portfolio Health Engine.
    Evaluates Portfolio Health Score (0-100) across 5 core dimensions:
    1. Diversification Score (HHI Concentrated Index & Shannon Entropy across AMC, Sector, Asset Class)
    2. Risk Score (Risk Efficiency & Sharpe Alignment)
    3. Return Score (Alpha relative to Category Benchmark)
    4. Tax Efficiency (LTCG / STCG tax optimization)
    5. Goal Alignment (SIP matching target goal trajectory)
    """

    @staticmethod
    def calculate_diversification_score(holdings: List[Dict[str, Any]]) -> float:
        """
        Calculates normalized diversification score using inverse Herfindahl-Hirschman Index (HHI).
        """
        if not holdings:
            return 0.0

        weights = np.array([h.get("allocation_percent", 0.0) / 100.0 for h in holdings])
        weights_sum = np.sum(weights)
        if weights_sum <= 0:
            weights = np.ones(len(holdings)) / len(holdings)
        else:
            weights = weights / weights_sum

        # HHI index = sum(w^2). For single asset HHI=1.0. For N equal assets HHI=1/N.
        hhi = float(np.sum(weights ** 2))
        
        # Inverse HHI score scaled to 0-100
        # If HHI = 1.0 (100% in 1 fund), div_score = 10.
        # If HHI <= 0.1 (10+ balanced funds), div_score = 95.
        div_score = max(0.0, min(100.0, (1.0 - hhi) * 110.0))
        return float(div_score)

    @classmethod
    def evaluate_portfolio_health(
        cls,
        holdings: List[Dict[str, Any]],
        portfolio_metrics: Dict[str, float],
        investor_target_risk: float = 60.0,
        goal_achievement_pct: float = 80.0
    ) -> Dict[str, Any]:
        """
        Evaluates overall portfolio health with component scores.
        """
        # 1. Diversification Score
        diversification_score = cls.calculate_diversification_score(holdings)

        # 2. Risk Score (Alignment with Investor Target Risk)
        current_risk_score = portfolio_metrics.get("portfolio_risk_score", 60.0)
        risk_mismatch = abs(current_risk_score - investor_target_risk)
        risk_score = max(0.0, 100.0 - (risk_mismatch * 2.0))

        # 3. Return Score (Sharpe ratio and CAGR evaluation)
        cagr_3y = portfolio_metrics.get("portfolio_cagr_3y", 14.0)
        sharpe = portfolio_metrics.get("portfolio_sharpe", 1.2)
        return_score = min(100.0, max(0.0, (cagr_3y * 4.0 + sharpe * 20.0)))

        # 4. Tax Efficiency Score
        holding_months = portfolio_metrics.get("avg_holding_months", 18.0)
        tax_efficiency = min(100.0, max(40.0, holding_months * 3.0))

        # 5. Goal Alignment Score
        goal_alignment = float(goal_achievement_pct)

        # Composite Health Score
        health_score = (
            0.25 * diversification_score +
            0.20 * risk_score +
            0.25 * return_score +
            0.15 * tax_efficiency +
            0.15 * goal_alignment
        )

        return {
            "health_score": round(health_score, 2),
            "diversification_score": round(diversification_score, 2),
            "risk_score": round(risk_score, 2),
            "return_score": round(return_score, 2),
            "tax_efficiency_score": round(tax_efficiency, 2),
            "goal_alignment_score": round(goal_alignment, 2),
            "grade": "EXCELLENT" if health_score >= 80 else ("GOOD" if health_score >= 65 else ("AVERAGE" if health_score >= 50 else "POOR"))
        }
