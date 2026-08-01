import pytest
from app.ai.pipeline import FundFitAIPipeline
from app.ai.investor_profiler import InvestorProfilerEngine
from app.ai.behavior_analysis import BehaviorAnalysisEngine
from app.ai.risk_engine import RiskEngine
from app.ai.goal_probability import GoalProbabilityEngine
from app.ai.portfolio_health import PortfolioHealthEngine
from app.ai.market_regime import MarketRegimeEngine
from app.ai.fund_fit_score import FundFitScoreEngine

def test_investor_profiler():
    res = InvestorProfilerEngine.profile_investor(
        age=30,
        salary=2000000.0,
        monthly_income=160000.0,
        monthly_expenses=60000.0,
        assets=4000000.0,
        liabilities=200000.0,
        dependents=1,
        risk_preference_score=75.0,
        behavior_loss_aversion=30.0
    )
    assert "investor_type" in res
    assert "recommended_allocation" in res
    assert res["recommended_allocation"]["equity_percentage"] > 50

def test_goal_probability_monte_carlo():
    res = GoalProbabilityEngine.simulate_goal_probability(
        target_amount=10000000.0,
        current_amount=2000000.0,
        monthly_sip=50000.0,
        time_horizon_years=7.0,
        simulations=500
    )
    assert "goal_achievement_percent" in res
    assert res["goal_achievement_percent"] >= 0.0 and res["goal_achievement_percent"] <= 100.0
    assert "required_sip" in res

def test_full_pipeline_orchestration():
    output = FundFitAIPipeline.run_full_intelligence_pipeline(
        user_raw_data={"age": 32, "salary": 2500000.0, "monthly_income": 200000.0, "monthly_expenses": 80000.0, "assets": 5000000.0, "liabilities": 1000000.0, "dependents": 1},
        behavioral_answers={"loss_aversion": 40.0, "overconfidence": 60.0, "patience": 75.0},
        goal_input={"target_amount": 15000000.0, "current_amount": 3000000.0, "monthly_sip": 60000.0, "time_horizon_years": 8.0},
        portfolio_holdings=[{"allocation_percent": 60.0, "mutual_fund_id": "fund-1"}, {"allocation_percent": 40.0, "mutual_fund_id": "fund-2"}],
        target_fund_data={"fund_name": "Quant Flexi Cap Fund", "category": "Flexi Cap", "nav": 125.40, "expense_ratio": 0.65, "return_3y": 19.5, "alpha": 4.2, "beta": 0.92, "standard_deviation": 14.5},
        macro_market_input={"india_vix": 14.2, "bond_yield": 7.05, "usdinr": 83.2}
    )

    assert "investor_profile" in output
    assert "fund_fit_score" in output
    assert "explainable_ai" in output
    assert output["fund_fit_score"]["fund_fit_score"] > 0
