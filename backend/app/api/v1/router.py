from fastapi import APIRouter
from app.api.v1 import (
    auth,
    users,
    profile,
    portfolio,
    funds,
    market,
    ai_routes,
    reports,
    notifications,
    alerts,
    watchlist,
    admin,
    advisor,
    search,
    uploads,
    websocket
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(profile.router)
api_router.include_router(portfolio.router)
api_router.include_router(funds.router)
api_router.include_router(market.router)
api_router.include_router(ai_routes.router)
api_router.include_router(reports.router)
api_router.include_router(notifications.router)
api_router.include_router(alerts.router)
api_router.include_router(watchlist.router)
api_router.include_router(admin.router)
api_router.include_router(advisor.router)
api_router.include_router(search.router)
api_router.include_router(uploads.router)
api_router.include_router(websocket.router)
