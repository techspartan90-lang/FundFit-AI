from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response
from app.ai.pipeline import FundFitAIPipeline
from app.ai.risk_engine import RiskEngine
from app.ai.investor_profiler import InvestorProfilerEngine
from app.ai.fund_fit_score import FundFitScoreEngine
from app.ai.recommendation_engine import RecommendationEngine
from app.ai.portfolio_health import PortfolioHealthEngine
from app.ai.goal_probability import GoalProbabilityEngine
from app.ai.adaptive_benchmark import AdaptiveBenchmarkEngine
from app.ai.explainable_ai import ExplainableAIEngine

router = APIRouter(prefix="/ai", tags=["AI Engine"])

class RiskAnalysisRequest(BaseModel):
    survey_risk_score: float = 65.0
    historical_returns: Optional[List[float]] = None

class InvestorProfilingRequest(BaseModel):
    age: int = 35
    salary: float = 1800000.0
    monthly_income: float = 150000.0
    monthly_expenses: float = 70000.0
    assets: float = 4000000.0
    liabilities: float = 500000.0
    dependents: int = 1
    risk_preference_score: float = 70.0

class FundFitScoreRequest(BaseModel):
    fund_data: Dict[str, Any]
    investor_profile: Dict[str, Any]
    market_regime: Dict[str, Any]

class RecommendationRequest(BaseModel):
    fund_fit_score: float
    fund_alpha: float = 3.5
    fund_beta: float = 0.95
    expense_ratio: float = 0.65
    holding_gain_pct: float = 15.0
    goal_achievement_pct: float = 80.0
    portfolio_drift_pct: float = 3.5

class GoalProbabilityRequest(BaseModel):
    target_amount: float = 10000000.0
    current_amount: float = 2500000.0
    monthly_sip: float = 35000.0
    time_horizon_years: float = 7.0

class ExplainRecommendationRequest(BaseModel):
    action: str = "BUY"
    fund_data: Dict[str, Any]
    investor_profile: Dict[str, Any]
    fit_score_breakdown: Dict[str, Any]

@router.post("/risk-analysis", response_model=APIResponse[Dict[str, Any]])
async def analyze_risk(payload: RiskAnalysisRequest):
    """Executes quantitative risk scoring, VaR 95%, CVaR, and expected volatility calculations."""
    res = RiskEngine.evaluate_risk_profile(
        historical_returns=payload.historical_returns,
        user_survey_risk_score=payload.survey_risk_score
    )
    return success_response(data=res, message="Risk analysis completed")

@router.post("/investor-profiling", response_model=APIResponse[Dict[str, Any]])
async def profile_investor(payload: InvestorProfilingRequest):
    """Computes investor type classification, capacity, appetite, and asset allocation vectors."""
    res = InvestorProfilerEngine.profile_investor(
        age=payload.age,
        salary=payload.salary,
        monthly_income=payload.monthly_income,
        monthly_expenses=payload.monthly_expenses,
        assets=payload.assets,
        liabilities=payload.liabilities,
        dependents=payload.dependents,
        risk_preference_score=payload.risk_preference_score,
        behavior_loss_aversion=40.0
    )
    return success_response(data=res, message="Investor profiling completed")

@router.post("/fund-fit-score", response_model=APIResponse[Dict[str, Any]])
async def compute_fund_fit_score(payload: FundFitScoreRequest):
    """Generates 0-100 Fund Fit Score evaluating 9 distinct dimensions."""
    res = FundFitScoreEngine.calculate_fund_fit_score(
        fund_data=payload.fund_data,
        investor_profile=payload.investor_profile,
        market_regime=payload.market_regime
    )
    return success_response(data=res, message="Fund Fit Score calculated")

@router.post("/recommendations", response_model=APIResponse[Dict[str, Any]])
async def generate_recommendations(payload: RecommendationRequest):
    """Determines actionable mutual fund recommendation (BUY/HOLD/SWITCH/EXIT/SIP)."""
    res = RecommendationEngine.evaluate_fund_action(
        fund_fit_score=payload.fund_fit_score,
        fund_alpha=payload.fund_alpha,
        fund_beta=payload.fund_beta,
        expense_ratio=payload.expense_ratio,
        holding_gain_pct=payload.holding_gain_pct,
        goal_achievement_pct=payload.goal_achievement_pct,
        portfolio_drift_pct=payload.portfolio_drift_pct
    )
    return success_response(data=res, message="Recommendation generated")

@router.post("/portfolio-health", response_model=APIResponse[Dict[str, Any]])
async def evaluate_portfolio_health(payload: Dict[str, Any]):
    """Evaluates portfolio diversification, return, risk, tax efficiency, and composite health."""
    holdings = payload.get("holdings", [])
    metrics = payload.get("portfolio_metrics", {"portfolio_risk_score": 65.0})
    res = PortfolioHealthEngine.evaluate_portfolio_health(holdings=holdings, portfolio_metrics=metrics)
    return success_response(data=res, message="Portfolio health evaluated")

@router.post("/goal-probability", response_model=APIResponse[Dict[str, Any]])
async def run_goal_probability_simulation(payload: GoalProbabilityRequest):
    """Executes 10,000 Monte Carlo simulations for financial goal progress."""
    res = GoalProbabilityEngine.simulate_goal_probability(
        target_amount=payload.target_amount,
        current_amount=payload.current_amount,
        monthly_sip=payload.monthly_sip,
        time_horizon_years=payload.time_horizon_years
    )
    return success_response(data=res, message="Monte Carlo goal simulation completed")

@router.post("/adaptive-benchmark", response_model=APIResponse[Dict[str, Any]])
async def select_adaptive_benchmark(payload: Dict[str, Any]):
    """Selects dynamic custom benchmark based on category, risk, and regime."""
    res = AdaptiveBenchmarkEngine.select_adaptive_benchmark(
        fund_category=payload.get("category", "Flexi Cap"),
        investor_risk_score=payload.get("risk_score", 70.0),
        market_regime=payload.get("market_regime", "Bull Market"),
        time_horizon_years=payload.get("time_horizon_years", 5.0)
    )
    return success_response(data=res, message="Adaptive benchmark selected")

@router.post("/explain-recommendation", response_model=APIResponse[Dict[str, Any]])
async def explain_recommendation(payload: ExplainRecommendationRequest):
    """Generates transparent, feature-attribution Explainable AI (XAI) output card."""
    res = ExplainableAIEngine.generate_explanation(
        action=payload.action,
        fund_data=payload.fund_data,
        investor_profile=payload.investor_profile,
        fit_score_breakdown=payload.fit_score_breakdown
    )
    return success_response(data=res, message="XAI explanation generated")
