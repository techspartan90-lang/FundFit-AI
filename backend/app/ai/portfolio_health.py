class PortfolioHealthEngine:
    @staticmethod
    def calculate_health_score(holdings_count: int, xirr: float, top_amc_weight: float) -> dict:
        """Calculates 0-100 portfolio health index."""
        score = 90
        alerts = []

        if top_amc_weight > 40.0:
            score -= 10
            alerts.append(f"AMC Concentration: Top AMC represents {top_amc_weight}% of portfolio.")

        if holdings_count < 3:
            score -= 10
            alerts.append("Under-diversified: Portfolio contains fewer than 3 funds.")

        if xirr > 15.0:
            score += 5

        score = max(30, min(100, score))

        return {
            "health_score": score,
            "status": "Healthy" if score >= 80 else "Action Required",
            "alerts": alerts
        }
