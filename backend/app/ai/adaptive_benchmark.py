class AdaptiveBenchmarkEngine:
    @staticmethod
    def compute_custom_benchmark(equity_weight: float, debt_weight: float) -> dict:
        """Calculates blended benchmark weights (NIFTY 50 TRI + CRISIL Composite Debt)."""
        nifty50_cagr3y = 16.5
        crisil_debt_cagr3y = 7.2

        blended_cagr = (nifty50_cagr3y * (equity_weight / 100.0)) + (crisil_debt_cagr3y * (debt_weight / 100.0))

        return {
            "blended_benchmark_name": f"Custom {int(equity_weight)}:{int(debt_weight)} Equity:Debt Index",
            "blended_3y_cagr": round(blended_cagr, 2),
            "equity_weight": equity_weight,
            "debt_weight": debt_weight
        }
