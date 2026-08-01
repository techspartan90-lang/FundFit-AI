from typing import Dict, Any, List
from app.ai.investor_profiler import InvestorProfilerEngine
from app.ai.behavior_analysis import BehaviorAnalysisEngine
from app.ai.risk_engine import RiskEngine
from app.ai.goal_probability import GoalProbabilityEngine
from app.ai.portfolio_health import PortfolioHealthEngine
from app.ai.market_regime import MarketRegimeEngine
from app.ai.adaptive_benchmark import AdaptiveBenchmarkEngine
from app.ai.fund_fit_score import FundFitScoreEngine
from app.ai.recommendation_engine import RecommendationEngine
from app.ai.explainable_ai import ExplainableAIEngine
from app.ai.alert_engine import AlertEngine

class FundFitAIPipeline:
    """
    Master Production Pipeline Orchestrator for FUND FIT AI.
    Executes complete end-to-end data processing and prediction workflow:
    User Data -> Behavioral Profiling -> Risk Evaluation -> Goal Monte Carlo ->
    Market Regime -> Adaptive Benchmark -> Portfolio Health -> Fund Fit Scoring ->
    Recommendation Generation -> Explainable AI -> Real-Time Alert Triggering.
    """

    @classmethod
    def run_full_intelligence_pipeline(
        cls,
        user_raw_data: Dict[str, Any],
        behavioral_answers: Dict[str, float],
        goal_input: Dict[str, Any],
        portfolio_holdings: List[Dict[str, Any]],
        target_fund_data: Dict[str, Any],
        macro_market_input: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Executes end-to-end multi-engine intelligence pipeline.
        """
        # 1. Behavior Analysis Engine
        behavior_profile = BehaviorAnalysisEngine.evaluate_behavioral_profile(
            questionnaire_scores=behavioral_answers
        )

        # 2. Risk Engine
        risk_profile = RiskEngine.evaluate_risk_profile(
            user_survey_risk_score=float(user_raw_data.get("risk_preference_score", 60.0))
        )

        # 3. Investor Profiling Engine
        investor_profile = InvestorProfilerEngine.profile_investor(
            age=int(user_raw_data.get("age", 35)),
            salary=float(user_raw_data.get("salary", 1500000.0)),
            monthly_income=float(user_raw_data.get("monthly_income", 125000.0)),
            monthly_expenses=float(user_raw_data.get("monthly_expenses", 65000.0)),
            assets=float(user_raw_data.get("assets", 3500000.0)),
            liabilities=float(user_raw_data.get("liabilities", 500000.0)),
            dependents=int(user_raw_data.get("dependents", 1)),
            risk_preference_score=risk_profile["risk_score"],
            behavior_loss_aversion=behavior_profile["loss_aversion"]
        )

        # 4. Market Regime Engine
        market_regime = MarketRegimeEngine.detect_regime(
            india_vix=float(macro_market_input.get("india_vix", 14.5)),
            bond_yield_10y=float(macro_market_input.get("bond_yield", 7.1)),
            usd_inr=float(macro_market_input.get("usdinr", 83.5))
        )

        # 5. Adaptive Benchmark Engine
        benchmark_config = AdaptiveBenchmarkEngine.select_adaptive_benchmark(
            fund_category=target_fund_data.get("category", "Flexi Cap"),
            investor_risk_score=investor_profile["composite_score"],
            market_regime=market_regime["regime_type"],
            time_horizon_years=float(goal_input.get("time_horizon_years", 5.0))
        )

        # 6. Goal Probability Engine (Monte Carlo)
        goal_projection = GoalProbabilityEngine.simulate_goal_probability(
            target_amount=float(goal_input.get("target_amount", 5000000.0)),
            current_amount=float(goal_input.get("current_amount", 1200000.0)),
            monthly_sip=float(goal_input.get("monthly_sip", 25000.0)),
            time_horizon_years=float(goal_input.get("time_horizon_years", 5.0))
        )

        # 7. Portfolio Health Engine
        portfolio_health = PortfolioHealthEngine.evaluate_portfolio_health(
            holdings=portfolio_holdings,
            portfolio_metrics={
                "portfolio_risk_score": risk_profile["risk_score"],
                "portfolio_cagr_3y": 15.5,
                "portfolio_sharpe": 1.35
            },
            investor_target_risk=investor_profile["composite_score"],
            goal_achievement_pct=goal_projection["goal_achievement_percent"]
        )

        # 8. Fund Fit Score Engine
        fit_score_results = FundFitScoreEngine.calculate_fund_fit_score(
            fund_data=target_fund_data,
            investor_profile=investor_profile,
            market_regime=market_regime,
            goal_data=goal_projection
        )

        # 9. Recommendation Engine
        recommendation_decision = RecommendationEngine.evaluate_fund_action(
            fund_fit_score=fit_score_results["fund_fit_score"],
            fund_alpha=float(target_fund_data.get("alpha", 3.2)),
            fund_beta=float(target_fund_data.get("beta", 0.95)),
            expense_ratio=float(target_fund_data.get("expense_ratio", 0.55)),
            holding_gain_pct=12.5,
            goal_achievement_pct=goal_projection["goal_achievement_percent"],
            portfolio_drift_pct=4.2
        )

        # 10. Explainable AI Engine
        xai_output = ExplainableAIEngine.generate_explanation(
            action=recommendation_decision["action"],
            fund_data=target_fund_data,
            investor_profile=investor_profile,
            fit_score_breakdown=fit_score_results,
            confidence_score=recommendation_decision["confidence_score"]
        )

        # 11. Alert Engine
        active_alerts = AlertEngine.evaluate_portfolio_alerts(
            user_id=user_raw_data.get("user_id", "user-uuid"),
            portfolio_id=portfolio_holdings[0].get("portfolio_id") if portfolio_holdings else "port-uuid",
            goal_data=goal_projection,
            portfolio_health=portfolio_health,
            market_data=macro_market_input,
            holdings=portfolio_holdings
        )

        return {
            "investor_profile": investor_profile,
            "behavior_profile": behavior_profile,
            "risk_profile": risk_profile,
            "market_regime": market_regime,
            "adaptive_benchmark": benchmark_config,
            "goal_projection": goal_projection,
            "portfolio_health": portfolio_health,
            "fund_fit_score": fit_score_results,
            "recommendation": recommendation_decision,
            "explainable_ai": xai_output,
            "alerts": active_alerts
        }
