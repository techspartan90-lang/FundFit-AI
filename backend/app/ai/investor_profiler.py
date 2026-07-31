class InvestorProfilerEngine:
    @staticmethod
    def classify_investor_profile(age: int, annual_income: float, net_worth: float, dependents: int) -> dict:
        """Classifies investor behavioral profile into wealth categories."""
        if age < 35 and annual_income > 2000000:
            archetype = "Aggressive Wealth Maximizer"
            recommended_equity_percent = 80.0
        elif age < 50 and dependents > 0:
            archetype = "Balanced Capital Growth"
            recommended_equity_percent = 65.0
        else:
            archetype = "Defensive Wealth Preservation"
            recommended_equity_percent = 40.0

        return {
            "behavioral_archetype": archetype,
            "recommended_equity_percent": recommended_equity_percent,
            "recommended_debt_percent": 100.0 - recommended_equity_percent,
            "emergency_fund_months": 6 if dependents > 0 else 3
        }
