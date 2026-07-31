class MarketRegimeEngine:
    @staticmethod
    def detect_market_regime(nifty_change: float, vix_value: float, inflation_rate: float) -> dict:
        """Detects current macroeconomic market regime."""
        if vix_value < 16.0 and nifty_change >= 0.0:
            regime = "Bullish Expansion"
            tactical_stance = "Overweight Equity (Small/Midcap Focus)"
        elif vix_value >= 22.0:
            regime = "High Volatility Stress"
            tactical_stance = "Defensive Allocation (Large Cap / Liquid Funds)"
        elif inflation_rate > 6.0:
            regime = "Inflationary Pressure"
            tactical_stance = "Focus on Value & Flexi Cap Schemes"
        else:
            regime = "Neutral Consolidation"
            tactical_stance = "Maintain Core Asset Allocation"

        return {
            "market_regime": regime,
            "tactical_stance": tactical_stance,
            "vix_status": "Low" if vix_value < 16.0 else "High"
        }
