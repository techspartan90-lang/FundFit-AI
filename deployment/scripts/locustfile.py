import random
from locust import HttpUser, task, between

class FundFitLoadTestUser(HttpUser):
    """
    Locust Performance & Load Testing Suite for FUND FIT AI.
    Simulates 100, 1,000, and 10,000 concurrent user sessions.
    Target SLA: P95 API Latency < 200ms with zero errors.
    """
    wait_time = between(1, 3)

    def on_start(self):
        """User session initialization & authentication."""
        response = self.client.post("/api/v1/auth/login", json={
            "email": "investor@fundfit.ai",
            "password": "Password123!"
        })
        if response.status_code == 200:
            token = response.json().get("data", {}).get("access_token")
            self.client.headers.update({"Authorization": f"Bearer {token}"})

    @task(4)
    def fetch_market_overview(self):
        self.client.get("/api/v1/market/overview")

    @task(3)
    def search_funds(self):
        query = random.choice(["Quant", "Parag", "HDFC", "SBI", "Axis"])
        self.client.get(f"/api/v1/funds/search?q={query}")

    @task(2)
    def fetch_portfolio_summary(self):
        self.client.get("/api/v1/portfolio/default/summary")

    @task(1)
    def run_ai_goal_simulation(self):
        self.client.post("/api/v1/ai/goal-probability", json={
            "target_amount": 10000000.0,
            "current_amount": 2500000.0,
            "monthly_sip": 35000.0,
            "time_horizon_years": 7.0
        })
