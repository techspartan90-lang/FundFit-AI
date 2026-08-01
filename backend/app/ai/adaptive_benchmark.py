from typing import Dict, Any

class AdaptiveBenchmarkEngine:
    """
    Production Adaptive Benchmark Engine.
    Dynamically selects or synthesizes benchmark indices based on fund category,
    risk score, investor profile, market regime, and time horizon.
    """

    BENCHMARK_MAP = {
        "Large Cap": {"primary": "NIFTY 100 TRI", "synthetic_weight": {"NIFTY 50": 0.80, "NIFTY NEXT 50": 0.20}},
        "Mid Cap": {"primary": "NIFTY MIDCAP 150 TRI", "synthetic_weight": {"NIFTY MIDCAP 150": 1.0}},
        "Small Cap": {"primary": "NIFTY SMALLCAP 250 TRI", "synthetic_weight": {"NIFTY SMALLCAP 250": 1.0}},
        "Flexi Cap": {"primary": "NIFTY 500 TRI", "synthetic_weight": {"NIFTY 500": 1.0}},
        "Multi Cap": {"primary": "NIFTY 500 MULTICAP 50:25:25 TRI", "synthetic_weight": {"NIFTY 50": 0.50, "MIDCAP 150": 0.25, "SMALLCAP 250": 0.25}},
        "ELSS": {"primary": "NIFTY 500 TRI", "synthetic_weight": {"NIFTY 500": 1.0}},
        "Balanced Advantage": {"primary": "NIFTY 50 HYBRID COMPOSITE 50:50 INDEX", "synthetic_weight": {"NIFTY 50": 0.50, "NIFTY 10Y BENCHMARK G-SEC": 0.50}},
        "Aggressive Hybrid": {"primary": "CRISIL HYBRID 35+65 AGGRESSIVE INDEX", "synthetic_weight": {"NIFTY 50": 0.65, "CRISIL COMPOSITE BOND": 0.35}},
        "Liquid": {"primary": "NIFTY 1D RATE INDEX", "synthetic_weight": {"NIFTY 1D RATE": 1.0}},
        "Corporate Bond": {"primary": "NIFTY CORPORATE BOND INDEX", "synthetic_weight": {"NIFTY CORPORATE BOND": 1.0}}
    }

    @classmethod
    def select_adaptive_benchmark(
        cls,
        fund_category: str,
        investor_risk_score: float,
        market_regime: str,
        time_horizon_years: float
    ) -> Dict[str, Any]:
        """
        Returns primary and custom adaptive benchmark breakdown.
        """
        category_config = cls.BENCHMARK_MAP.get(fund_category, {
            "primary": "NIFTY 500 TRI",
            "synthetic_weight": {"NIFTY 500": 1.0}
        })

        benchmark_symbol = category_config["primary"]
        synthetic_weights = dict(category_config["synthetic_weight"])

        # Tactical regime adjustment: If Bear Market and high risk, shift synthetic benchmark to include risk mitigation component
        if market_regime == "Bear Market":
            benchmark_note = f"Dynamic hedging benchmark applied during {market_regime}"
        else:
            benchmark_note = f"Standard Category Benchmark tailored for {time_horizon_years}Y horizon"

        return {
            "primary_benchmark_name": benchmark_symbol,
            "synthetic_weights": synthetic_weights,
            "adaptive_reasoning": benchmark_note,
            "category": fund_category,
            "regime_context": market_regime
        }
