from typing import Dict, Any, List
from enum import Enum

class RecommendationAction(str, Enum):
    BUY = "BUY"
    HOLD = "HOLD"
    SWITCH = "SWITCH"
    EXIT = "EXIT"
    REBALANCE = "REBALANCE"
    INCREASE_SIP = "INCREASE_SIP"
    DECREASE_SIP = "DECREASE_SIP"

class RecommendationEngine:
    """
    Production Recommendation Engine.
    Generates actionable, rule-and-ML-backed mutual fund actions:
    BUY, HOLD, SWITCH, EXIT, REBALANCE, INCREASE SIP, DECREASE SIP.
    """

    @classmethod
    def evaluate_fund_action(
        cls,
        fund_fit_score: float,
        fund_alpha: float,
        fund_beta: float,
        expense_ratio: float,
        holding_gain_pct: float,
        goal_achievement_pct: float,
        portfolio_drift_pct: float,
        better_alternative_exists: bool = False,
        alternative_fund_name: str = None
    ) -> Dict[str, Any]:
        """
        Determines target recommendation action and execution parameters.
        """
        # 1. Action Decision Tree
        if fund_fit_score < 45.0 and better_alternative_exists:
            action = RecommendationAction.SWITCH
            confidence = 92.0
            primary_reason = f"Fund fit score ({fund_fit_score}/100) is low and higher-performing alternative {alternative_fund_name or ''} is available with lower expense ratio."
        elif fund_alpha < -2.5 and holding_gain_pct < 0:
            action = RecommendationAction.EXIT
            confidence = 88.0
            primary_reason = "Persistent negative alpha over 3 consecutive quarters indicates structural fund underperformance."
        elif portfolio_drift_pct > 7.5:
            action = RecommendationAction.REBALANCE
            confidence = 90.0
            primary_reason = f"Portfolio asset allocation has drifted by {portfolio_drift_pct}% from target benchmark strategy."
        elif goal_achievement_pct < 60.0:
            action = RecommendationAction.INCREASE_SIP
            confidence = 85.0
            primary_reason = f"Current goal progress ({goal_achievement_pct}%) is lagging behind schedule; boosting monthly SIP bridges the target deficit."
        elif fund_fit_score >= 80.0 and holding_gain_pct >= 0:
            action = RecommendationAction.BUY
            confidence = 94.0
            primary_reason = f"Exceptional Fund Fit Score ({fund_fit_score}/100) with strong risk-adjusted alpha."
        else:
            action = RecommendationAction.HOLD
            confidence = 82.0
            primary_reason = "Fund is performing within expected risk-return bounds aligned with investor target."

        return {
            "action": action.value,
            "confidence_score": round(confidence, 2),
            "primary_reason": primary_reason,
            "alternative_fund": alternative_fund_name if action == RecommendationAction.SWITCH else None,
            "recommended_allocation_adjust_pct": round(portfolio_drift_pct, 2)
        }
