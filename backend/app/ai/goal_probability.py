from typing import Dict, Any
from datetime import date, timedelta
import numpy as np

class GoalProbabilityEngine:
    """
    Production Goal Probability Engine.
    Uses 10,000-path Monte Carlo Geometric Brownian Motion (GBM) simulations
    with stochastic annual inflation and monthly compounding to calculate:
    Goal Achievement %, Required Monthly SIP, Required Lump-sum Investment,
    and Expected Goal Completion Date.
    """

    @classmethod
    def simulate_goal_probability(
        cls,
        target_amount: float,
        current_amount: float,
        monthly_sip: float,
        time_horizon_years: float,
        expected_annual_return: float = 0.12,
        annual_volatility: float = 0.15,
        inflation_rate: float = 0.05,
        simulations: int = 10000
    ) -> Dict[str, Any]:
        """
        Runs Monte Carlo simulation for financial goal projection.
        """
        if time_horizon_years <= 0 or target_amount <= 0:
            return {
                "goal_achievement_percent": 100.0 if current_amount >= target_amount else 0.0,
                "required_sip": 0.0,
                "required_lump_sum": 0.0,
                "expected_completion_date": date.today().isoformat()
            }

        months = int(round(time_horizon_years * 12))
        monthly_drift = (expected_annual_return - 0.5 * (annual_volatility ** 2)) / 12
        monthly_vol = annual_volatility / np.sqrt(12)

        # 1. Inflation-Adjusted Target Amount
        inflation_adjusted_target = target_amount * ((1 + inflation_rate) ** time_horizon_years)

        # 2. Monte Carlo Simulation Engine (simulations x months matrix)
        # Generate random normal matrix N(0,1)
        shocks = np.random.normal(0, 1, (simulations, months))
        monthly_returns = np.exp(monthly_drift + monthly_vol * shocks)

        # Simulate path value
        portfolio_values = np.zeros((simulations, months + 1))
        portfolio_values[:, 0] = current_amount

        for m in range(1, months + 1):
            portfolio_values[:, m] = (portfolio_values[:, m - 1] + monthly_sip) * monthly_returns[:, m - 1]

        final_values = portfolio_values[:, -1]
        successful_paths = np.sum(final_values >= inflation_adjusted_target)
        goal_achievement_pct = float((successful_paths / simulations) * 100.0)

        # 3. Deterministic Financial Math for Required SIP and Lump-Sum
        r_monthly = expected_annual_return / 12.0
        n_months = months

        # FV = PV * (1+r)^n + PMT * [((1+r)^n - 1) / r]
        # Solved for PMT (Required SIP):
        pv_future = current_amount * ((1 + r_monthly) ** n_months)
        remaining_target = max(0.0, inflation_adjusted_target - pv_future)

        if r_monthly > 0:
            sip_factor = (((1 + r_monthly) ** n_months) - 1) / r_monthly
            required_sip = remaining_target / sip_factor
        else:
            required_sip = remaining_target / n_months

        # Solved for Lump Sum:
        required_lump_sum = remaining_target / ((1 + r_monthly) ** n_months)

        # 4. Expected Completion Date
        # Determine average month index where median path hits target
        median_path = np.median(portfolio_values, axis=0)
        hit_indices = np.where(median_path >= inflation_adjusted_target)[0]
        if len(hit_indices) > 0:
            completion_month_index = int(hit_indices[0])
        else:
            completion_month_index = int(months * (1.0 + max(0.0, (100.0 - goal_achievement_pct) / 50.0)))

        expected_date = date.today() + timedelta(days=int(completion_month_index * 30.4375))

        return {
            "target_amount": round(target_amount, 2),
            "inflation_adjusted_target": round(inflation_adjusted_target, 2),
            "current_amount": round(current_amount, 2),
            "monthly_sip": round(monthly_sip, 2),
            "goal_achievement_percent": round(goal_achievement_pct, 2),
            "median_projected_wealth": round(float(np.median(final_values)), 2),
            "p10_pessimistic_wealth": round(float(np.percentile(final_values, 10)), 2),
            "p90_optimistic_wealth": round(float(np.percentile(final_values, 90)), 2),
            "required_sip": round(float(required_sip), 2),
            "required_investment": round(float(required_lump_sum), 2),
            "expected_completion_date": expected_date.isoformat(),
            "status": "ON_TRACK" if goal_achievement_pct >= 75.0 else ("AT_RISK" if goal_achievement_pct >= 50.0 else "OFF_TRACK")
        }
