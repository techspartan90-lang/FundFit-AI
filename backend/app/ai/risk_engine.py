class RiskEngine:
    @staticmethod
    def calculate_risk_score(loss_aversion: float, risk_appetite: float, overconfidence: float) -> dict:
        """Calculates 0-100 composite risk score and category."""
        composite_score = (risk_appetite * 0.5) + ((100.0 - loss_aversion) * 0.3) + (overconfidence * 0.2)
        composite_score = round(max(0.0, min(100.0, composite_score)), 1)

        if composite_score > 75.0:
            category = "Aggressive"
        elif composite_score > 55.0:
            category = "Moderate Aggressive"
        elif composite_score > 40.0:
            category = "Moderate"
        else:
            category = "Conservative"

        return {
            "overall_risk_score": composite_score,
            "risk_category": category,
            "max_drawdown_tolerance": round(composite_score * 0.35, 1)
        }
