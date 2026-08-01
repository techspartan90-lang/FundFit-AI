from typing import Dict, Any, List
import numpy as np

class BehaviorAnalysisEngine:
    """
    Production Behavior Analysis Engine.
    Quantifies psychological biases from psychometric response arrays & trading histories:
    Loss Aversion, Overconfidence, Anchoring Bias, Recency Bias, Herd Mentality,
    Emotional Investing, Patience, Decision Style, and Confidence Level.
    """

    @classmethod
    def evaluate_behavioral_profile(
        cls,
        questionnaire_scores: Dict[str, float],
        transaction_history: List[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Evaluates psychological bias metrics on 0-100 scale.
        """
        # Base extraction with intelligent defaults
        loss_aversion = float(questionnaire_scores.get("loss_aversion", 50.0))
        overconfidence = float(questionnaire_scores.get("overconfidence", 40.0))
        anchoring_bias = float(questionnaire_scores.get("anchoring_bias", 45.0))
        recency_bias = float(questionnaire_scores.get("recency_bias", 50.0))
        herd_mentality = float(questionnaire_scores.get("herd_mentality", 35.0))
        emotional_investing = float(questionnaire_scores.get("emotional_investing", 40.0))
        patience = float(questionnaire_scores.get("patience", 65.0))
        confidence_level = float(questionnaire_scores.get("confidence_level", 60.0))

        # Refine biases based on historical transaction activity if available
        if transaction_history and len(transaction_history) > 3:
            panic_sales = sum(1 for tx in transaction_history if tx.get("transaction_type") == "SELL" and tx.get("market_state") == "CRASH")
            if panic_sales > 0:
                emotional_investing = min(100.0, emotional_investing + panic_sales * 15.0)
                loss_aversion = min(100.0, loss_aversion + panic_sales * 10.0)

            chasing_returns = sum(1 for tx in transaction_history if tx.get("transaction_type") == "BUY" and tx.get("fund_return_1y", 0) > 35.0)
            if chasing_returns > 0:
                recency_bias = min(100.0, recency_bias + chasing_returns * 12.0)
                herd_mentality = min(100.0, herd_mentality + chasing_returns * 10.0)

        # Categorize Decision Style
        if overconfidence > 70 and emotional_investing > 60:
            decision_style = "Reactive Impulse"
        elif herd_mentality > 65 and recency_bias > 60:
            decision_style = "Trend Follower"
        elif patience > 70 and loss_aversion < 50:
            decision_style = "Disciplined Systematic"
        elif anchoring_bias > 65:
            decision_style = "Anchor Dependent"
        else:
            decision_style = "Analytical Balanced"

        # Calculate Behavioral Vulnerability Index (0-100, higher means more susceptible to behavioral traps)
        vulnerability_index = (
            0.25 * loss_aversion +
            0.20 * emotional_investing +
            0.20 * recency_bias +
            0.15 * herd_mentality +
            0.10 * anchoring_bias +
            0.10 * (100.0 - patience)
        )

        return {
            "loss_aversion": round(loss_aversion, 2),
            "overconfidence": round(overconfidence, 2),
            "anchoring_bias": round(anchoring_bias, 2),
            "recency_bias": round(recency_bias, 2),
            "herd_mentality": round(herd_mentality, 2),
            "emotional_investing": round(emotional_investing, 2),
            "patience": round(patience, 2),
            "decision_style": decision_style,
            "confidence_level": round(confidence_level, 2),
            "behavioral_vulnerability_index": round(vulnerability_index, 2),
            "recommendation_modifier": "SYSTEMATIC_SIP" if vulnerability_index > 50 else "FLEXIBLE"
        }
