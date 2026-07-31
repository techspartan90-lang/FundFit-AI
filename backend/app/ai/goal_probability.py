class GoalProbabilityEngine:
    @staticmethod
    def calculate_goal_completion(target_amount: float, current_amount: float, monthly_sip: float, target_year: int) -> dict:
        """Calculates SIP target corpus completion probability."""
        current_year = 2026
        years_remaining = max(1, target_year - current_year)
        months = years_remaining * 12
        r = 0.14 / 12 # 14% annual expected returns

        future_value_existing = current_amount * ((1 + 0.14) ** years_remaining)
        future_value_sip = monthly_sip * (((1 + r) ** months - 1) / r) * (1 + r)
        projected_corpus = future_value_existing + future_value_sip

        probability = round(min(99.0, (projected_corpus / target_amount) * 92.0), 1)

        required_sip = round((target_amount - future_value_existing) / ((((1 + r) ** months - 1) / r) * (1 + r)), 0)

        return {
            "projected_corpus": round(projected_corpus, 2),
            "completion_probability": max(10.0, probability),
            "years_remaining": years_remaining,
            "recommended_monthly_sip": max(1000.0, required_sip)
        }
