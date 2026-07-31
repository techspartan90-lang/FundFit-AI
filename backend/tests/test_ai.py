from app.ai.risk_engine import RiskEngine
from app.ai.market_regime import MarketRegimeEngine
from app.ai.goal_probability import GoalProbabilityEngine

def test_risk_engine_calculation():
    res = RiskEngine.calculate_risk_score(40.0, 75.0, 30.0)
    assert res["overall_risk_score"] > 50.0
    assert "risk_category" in res

def test_market_regime_detection():
    res = MarketRegimeEngine.detect_market_regime(0.59, 14.25, 5.1)
    assert res["market_regime"] == "Bullish Expansion"

def test_goal_probability_engine():
    res = GoalProbabilityEngine.calculate_goal_completion(50000000.0, 2485453.0, 60000.0, 2042)
    assert res["completion_probability"] > 80.0
