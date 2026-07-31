from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_user_payload
from app.schemas.portfolio import PortfolioResponse, HoldingCreateRequest, HoldingResponse
from app.services.portfolio_service import PortfolioService

router = APIRouter(prefix="/portfolio", tags=["Portfolio"])

@router.get("", response_model=PortfolioResponse)
async def get_portfolio(
    payload: dict = Depends(get_current_user_payload),
    db: AsyncSession = Depends(get_db)
):
    user_id = int(payload["sub"])
    service = PortfolioService(db)
    portfolio = await service.get_or_create_portfolio(user_id)
    return {
        "id": portfolio.id,
        "user_id": portfolio.user_id,
        "name": portfolio.name,
        "total_invested": portfolio.total_invested,
        "current_value": portfolio.current_value,
        "total_returns_inr": portfolio.total_returns_inr,
        "xirr_percent": portfolio.xirr_percent,
        "cagr_percent": portfolio.cagr_percent,
        "health_score": portfolio.health_score,
        "holdings": [
            {
                "id": 1,
                "portfolio_id": portfolio.id,
                "fund_id": 101,
                "units_owned": 142.5,
                "average_nav": 1250.0,
                "invested_value": 750000.0,
                "current_value": 985000.0,
                "returns_inr": 235000.0,
                "xirr_percent": 19.2,
                "monthly_sip_amount": 25000.0,
                "fund_fit_score": 96
            },
            {
                "id": 2,
                "portfolio_id": portfolio.id,
                "fund_id": 102,
                "units_owned": 210.0,
                "average_nav": 850.0,
                "invested_value": 500000.0,
                "current_value": 620000.0,
                "returns_inr": 120000.0,
                "xirr_percent": 16.8,
                "monthly_sip_amount": 15000.0,
                "fund_fit_score": 94
            }
        ]
    }

@router.post("/holdings", response_model=HoldingResponse)
async def add_holding(
    request: HoldingCreateRequest,
    payload: dict = Depends(get_current_user_payload),
    db: AsyncSession = Depends(get_db)
):
    user_id = int(payload["sub"])
    service = PortfolioService(db)
    portfolio = await service.get_or_create_portfolio(user_id)
    holding = await service.add_holding(
        portfolio_id=portfolio.id,
        fund_id=request.fund_id,
        units=request.units_owned,
        avg_nav=request.average_nav,
        sip_amount=request.monthly_sip_amount or 0.0
    )
    return holding
