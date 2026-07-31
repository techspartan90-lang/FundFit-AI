class BehaviorAnalysisEngine:
    @staticmethod
    def analyze_behavior(redemption_count: int, sip_cancellation_count: int) -> dict:
        """Analyzes behavioral finance biases (panic selling, overconfidence)."""
        if redemption_count > 2:
            bias = "Panic Selling Sensitivity"
            advice = "High frequency of redemptions detected during market dips. Automate SIPs to avoid emotional timing errors."
        elif sip_cancellation_count > 1:
            bias = "Inconsistent SIP Discipline"
            advice = "Setting up auto-debit triggers ensures uninterrupted compound growth."
        else:
            bias = "Disciplined Investor"
            advice = "Excellent portfolio discipline. Maintain long-term asset allocation."

        return {
            "behavioral_bias": bias,
            "coaching_advice": advice
        }
