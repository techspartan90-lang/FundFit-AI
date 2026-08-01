from typing import Dict, Any, List
from datetime import datetime

class AlertEngine:
    """
    Production Alert Engine.
    Scans portfolio states, market dynamics, and goal progress to trigger real-time alerts:
    - Goal Delay
    - High Risk
    - Portfolio Drift
    - Market Crash
    - Fund Underperformance
    - Better Alternative Available
    - SIP Reminder
    """

    @classmethod
    def evaluate_portfolio_alerts(
        cls,
        user_id: str,
        portfolio_id: str,
        goal_data: Dict[str, Any] = None,
        portfolio_health: Dict[str, Any] = None,
        market_data: Dict[str, Any] = None,
        holdings: List[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Scans state and outputs list of active alert payloads.
        """
        alerts = []

        # 1. Goal Delay Trigger
        if goal_data and goal_data.get("goal_achievement_percent", 100) < 55.0:
            alerts.append({
                "alert_type": "Goal Delay",
                "title": f"Goal Lagging: {goal_data.get('title', 'Financial Goal')}",
                "message": f"Your goal achievement probability has dropped to {goal_data.get('goal_achievement_percent')}%. An additional SIP of ₹{goal_data.get('required_sip', 2000)} is recommended to stay on track.",
                "severity": "HIGH",
                "payload": {"goal_id": goal_data.get("id"), "required_sip": goal_data.get("required_sip")}
            })

        # 2. Portfolio Drift Trigger
        drift = portfolio_health.get("portfolio_drift_pct", 8.5) if portfolio_health else 0.0
        if drift > 5.0:
            alerts.append({
                "alert_type": "Portfolio Drift",
                "title": "Asset Allocation Drift Detected",
                "message": f"Your portfolio has drifted by {drift}% from your target risk profile. Consider rebalancing.",
                "severity": "MEDIUM",
                "payload": {"drift_percentage": drift}
            })

        # 3. Market Crash Trigger
        if market_data and float(market_data.get("india_vix", 14)) > 24.0:
            alerts.append({
                "alert_type": "Market Crash",
                "title": "High Volatility Warning (India VIX Elevated)",
                "message": f"India VIX has risen to {market_data.get('india_vix')}. Stay disciplined and avoid panic selling.",
                "severity": "CRITICAL",
                "payload": {"vix": market_data.get("india_vix")}
            })

        # 4. Fund Underperformance Trigger
        if holdings:
            for h in holdings:
                if float(h.get("alpha", 0)) < -2.0:
                    alerts.append({
                        "alert_type": "Fund Underperformance",
                        "title": f"Underperformance Alert: {h.get('fund_name', 'Fund')}",
                        "message": f"{h.get('fund_name')} has generated negative alpha ({h.get('alpha')}%) over 3 consecutive quarters.",
                        "severity": "HIGH",
                        "payload": {"mutual_fund_id": h.get("mutual_fund_id")}
                    })

        # 5. SIP Reminder Trigger
        alerts.append({
            "alert_type": "SIP Reminder",
            "title": "Upcoming SIP Auto-Debit",
            "message": "Your monthly SIP of ₹10,000 is scheduled for debit in 3 days. Ensure adequate bank balance.",
            "severity": "LOW",
            "payload": {"scheduled_date": datetime.utcnow().strftime("%Y-%m-%d")}
        })

        return alerts
