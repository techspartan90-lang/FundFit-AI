from fastapi import APIRouter
from app.api.v1 import (
    auth, users, profile, portfolio, funds, goals, market,
    benchmark, recommendations, alerts, reports, transactions,
    watchlist, notifications, advisor, admin
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(profile.router)
api_router.include_router(portfolio.router)
api_router.include_router(funds.router)
api_router.include_router(goals.router)
api_router.include_router(market.router)
api_router.include_router(benchmark.router)
api_router.include_router(recommendations.router)
api_router.include_router(alerts.router)
api_router.include_router(reports.router)
api_router.include_router(transactions.router)
api_router.include_router(watchlist.router)
api_router.include_router(notifications.router)
api_router.include_router(advisor.router)
api_router.include_router(admin.router)
