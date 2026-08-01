from app.ai.risk_engine import RiskEngine
from app.ai.market_regime import MarketRegimeEngine
from app.ai.goal_probability import GoalProbabilityEngine

def test_risk_engine_calculation():
    res = RiskEngine.evaluate_risk_profile(user_survey_risk_score=75.0)
    assert res["risk_score"] > 50.0
    assert "risk_category" in res

def test_market_regime_detection():
    res = MarketRegimeEngine.detect_regime(india_vix=14.25)
    assert "regime_type" in res

def test_goal_probability_engine():
    res = GoalProbabilityEngine.simulate_goal_probability(5000000.0, 1000000.0, 30000.0, 7.0, simulations=100)
    assert res["goal_achievement_percent"] >= 0.0
