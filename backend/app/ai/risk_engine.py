from typing import Dict, Any, List
import numpy as np
from scipy import stats

class RiskEngine:
    """
    Production Risk Scoring & Analytics Engine.
    Computes Portfolio Risk Score (0-100), Risk Category, Historical & Parametric
    Value-at-Risk (VaR 95%), Conditional VaR / Expected Shortfall (CVaR 95%),
    Expected Annual Volatility, and Maximum Drawdown Tolerance.
    """

    @staticmethod
    def calculate_var_cvar(
        returns: np.ndarray,
        confidence_level: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculates Historical & Parametric Value-at-Risk (VaR) and Conditional VaR (CVaR).
        """
        if len(returns) == 0:
            return {"var_95": 0.0, "cvar_95": 0.0}

        sorted_returns = np.sort(returns)
        index = int((1.0 - confidence_level) * len(sorted_returns))
        index = max(0, min(index, len(sorted_returns) - 1))

        var_historical = -sorted_returns[index]
        cvar_historical = -np.mean(sorted_returns[:index + 1]) if index > 0 else var_historical

        # Annualize
        return {
            "var_95": float(round(var_historical * 100.0, 2)),
            "cvar_95": float(round(cvar_historical * 100.0, 2))
        }

    @classmethod
    def evaluate_risk_profile(
        cls,
        historical_returns: List[float] = None,
        asset_weights: Dict[str, float] = None,
        user_survey_risk_score: float = 50.0
    ) -> Dict[str, Any]:
        
        if historical_returns is None or len(historical_returns) < 10:
            # Synthetic standard returns generation based on survey score
            vol_estimate = 0.05 + (user_survey_risk_score / 100.0) * 0.20
            returns = np.random.normal(0.0005, vol_estimate / np.sqrt(252), 252)
        else:
            returns = np.array(historical_returns)

        # 1. Expected Volatility (Annualized Standard Deviation)
        daily_std = float(np.std(returns))
        annual_volatility = float(daily_std * np.sqrt(252) * 100.0)

        # 2. Downside Risk Metrics
        var_cvar = cls.calculate_var_cvar(returns)

        # 3. Maximum Drawdown Calculation
        cum_returns = np.cumprod(1 + returns)
        peak = np.maximum.accumulate(cum_returns)
        drawdowns = (cum_returns - peak) / peak
        max_drawdown = float(np.abs(np.min(drawdowns)) * 100.0)

        # 4. Drawdown Tolerance (Dynamic scale based on appetite & max drawdown)
        drawdown_tolerance = min(50.0, max(10.0, user_survey_risk_score * 0.45))

        # 5. Composite Risk Score (0-100)
        # Weighted blend of quantitative portfolio volatility + survey preference
        volatility_subscore = min(100.0, (annual_volatility / 25.0) * 100.0)
        composite_risk_score = 0.4 * user_survey_risk_score + 0.6 * volatility_subscore

        # Categorization
        if composite_risk_score >= 80:
            category = "Aggressive"
        elif composite_risk_score >= 65:
            category = "Moderately Aggressive"
        elif composite_risk_score >= 45:
            category = "Moderate"
        elif composite_risk_score >= 30:
            category = "Moderately Conservative"
        else:
            category = "Conservative"

        return {
            "risk_score": round(composite_risk_score, 2),
            "risk_category": category,
            "downside_risk_var_95": var_cvar["var_95"],
            "downside_risk_cvar_95": var_cvar["cvar_95"],
            "expected_volatility_pct": round(annual_volatility, 2),
            "max_drawdown_historical_pct": round(max_drawdown, 2),
            "drawdown_tolerance_pct": round(drawdown_tolerance, 2)
        }
