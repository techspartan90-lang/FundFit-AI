from typing import Dict, Any, List
import numpy as np

class InvestorProfilerEngine:
    """
    Production-grade Investor Profiling Engine.
    Processes demographic, financial statement, goal, risk, and behavioral metrics
    to compute Investor Type, Risk Capacity, Risk Appetite, Investment Style,
    and Recommended Asset Allocation Vector.
    """

    @staticmethod
    def calculate_risk_capacity(
        age: int,
        monthly_income: float,
        monthly_expenses: float,
        assets: float,
        liabilities: float,
        dependents: int
    ) -> float:
        """
        Calculates Risk Capacity (0-100) based on objective financial ability to take risk.
        Higher age & dependents lower capacity; higher net worth & savings ratio increase capacity.
        """
        # 1. Savings Ratio Factor (0 - 35 pts)
        savings = max(0.0, monthly_income - monthly_expenses)
        savings_ratio = (savings / monthly_income) if monthly_income > 0 else 0.0
        savings_score = min(35.0, savings_ratio * 70.0)

        # 2. Net Worth & Solvency Factor (0 - 35 pts)
        net_worth = assets - liabilities
        net_worth_to_income = (net_worth / (monthly_income * 12)) if monthly_income > 0 else 0.0
        solvency_score = min(35.0, max(0.0, net_worth_to_income * 5.0))

        # 3. Age Horizon Factor (0 - 20 pts)
        # Younger investors have longer recovery horizons
        age_score = max(0.0, min(20.0, (70 - age) * 0.4))

        # 4. Dependents Burden Factor (-15 to 10 pts)
        dependent_penalty = dependents * 3.0
        dependent_score = max(-15.0, 10.0 - dependent_penalty)

        total_capacity = savings_score + solvency_score + age_score + dependent_score
        return float(np.clip(total_capacity, 5.0, 100.0))

    @classmethod
    def profile_investor(
        self,
        age: int,
        salary: float,
        monthly_income: float,
        monthly_expenses: float,
        assets: float,
        liabilities: float,
        dependents: int,
        risk_preference_score: float, # 0-100 from risk engine
        behavior_loss_aversion: float, # 0-100 from behavior engine
        time_horizon_years: float = 7.0
    ) -> Dict[str, Any]:
        
        risk_capacity = self.calculate_risk_capacity(
            age=age,
            monthly_income=monthly_income,
            monthly_expenses=monthly_expenses,
            assets=assets,
            liabilities=liabilities,
            dependents=dependents
        )

        # Risk Appetite is weighted blend of risk preference and inverse loss aversion
        risk_appetite = 0.6 * risk_preference_score + 0.4 * (100.0 - behavior_loss_aversion)

        # Overall composite profile score (50% Capacity, 50% Appetite)
        composite_score = 0.5 * risk_capacity + 0.5 * risk_appetite

        # Determine Investor Type & Investment Style
        if composite_score >= 80.0:
            investor_type = "Aggressive Wealth Maximizer"
            investment_style = "High Growth / High Alpha"
            equity_pct = 80.0
            debt_pct = 10.0
            gold_pct = 5.0
            cash_pct = 5.0
        elif composite_score >= 65.0:
            investor_type = "Growth-Oriented Wealth Accumulator"
            investment_style = "Core & Explore Growth"
            equity_pct = 65.0
            debt_pct = 25.0
            gold_pct = 5.0
            cash_pct = 5.0
        elif composite_score >= 45.0:
            investor_type = "Balanced Capital Preserver"
            investment_style = "Multi-Asset Balanced"
            equity_pct = 50.0
            debt_pct = 40.0
            gold_pct = 5.0
            cash_pct = 5.0
        elif composite_score >= 30.0:
            investor_type = "Cautious Yield Seeker"
            investment_style = "Fixed Income & Conservative Hybrid"
            equity_pct = 30.0
            debt_pct = 60.0
            gold_pct = 5.0
            cash_pct = 5.0
        else:
            investor_type = "Defensive Capital Guardian"
            investment_style = "Ultra-Short Debt & Capital Preservation"
            equity_pct = 15.0
            debt_pct = 70.0
            gold_pct = 5.0
            cash_pct = 10.0

        # Adjust allocation dynamically based on Time Horizon
        if time_horizon_years < 3.0:
            # Shift 20% from equity to cash/short debt for short horizons
            shift = min(equity_pct, 20.0)
            equity_pct -= shift
            debt_pct += shift

        return {
            "investor_type": investor_type,
            "risk_capacity_score": round(risk_capacity, 2),
            "risk_appetite_score": round(risk_appetite, 2),
            "composite_score": round(composite_score, 2),
            "investment_style": investment_style,
            "recommended_allocation": {
                "equity_percentage": round(equity_pct, 2),
                "debt_percentage": round(debt_pct, 2),
                "gold_percentage": round(gold_pct, 2),
                "cash_percentage": round(cash_pct, 2)
            }
        }
