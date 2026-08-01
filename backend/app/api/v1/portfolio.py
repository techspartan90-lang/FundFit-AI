from fastapi import APIRouter, status
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/portfolio", tags=["Portfolios"])

class PortfolioCreateDTO(BaseModel):
    name: str
    description: Optional[str] = None
    is_default: bool = True

class PortfolioHoldingDTO(BaseModel):
    id: str
    mutual_fund_id: str
    fund_name: str
    scheme_code: str
    units: float
    avg_buy_nav: float
    current_nav: float
    current_value: float
    total_invested: float
    gain_loss: float
    gain_loss_percent: float
    allocation_percent: float

@router.post("", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def create_portfolio(payload: PortfolioCreateDTO):
    """Creates a new user wealth portfolio."""
    data = {
        "id": "port-uuid-9999",
        "name": payload.name,
        "description": payload.description,
        "is_default": payload.is_default,
        "total_value": 0.0,
        "total_invested": 0.0,
        "total_gain_loss": 0.0
    }
    return success_response(data=data, message="Portfolio created successfully", status_code=status.HTTP_201_CREATED)

@router.put("/{portfolio_id}", response_model=APIResponse[Dict[str, Any]])
async def update_portfolio(portfolio_id: str, payload: PortfolioCreateDTO):
    """Updates portfolio metadata."""
    data = {
        "id": portfolio_id,
        "name": payload.name,
        "description": payload.description,
        "is_default": payload.is_default
    }
    return success_response(data=data, message="Portfolio updated successfully")

@router.delete("/{portfolio_id}", response_model=APIResponse[Dict[str, bool]])
async def delete_portfolio(portfolio_id: str):
    """Deletes target portfolio and holdings."""
    return success_response(data={"deleted": True}, message="Portfolio deleted successfully")

@router.get("/{portfolio_id}/holdings", response_model=APIResponse[List[PortfolioHoldingDTO]])
async def get_portfolio_holdings(portfolio_id: str):
    """Fetches holdings breakdown for portfolio."""
    holdings = [
        PortfolioHoldingDTO(
            id="h-1",
            mutual_fund_id="fund-uuid-1",
            fund_name="Quant Flexi Cap Fund Direct-Growth",
            scheme_code="120503",
            units=145.23,
            avg_buy_nav=98.50,
            current_nav=125.40,
            current_value=18211.84,
            total_invested=14305.15,
            gain_loss=3906.69,
            gain_loss_percent=27.31,
            allocation_percent=60.0
        ),
        PortfolioHoldingDTO(
            id="h-2",
            mutual_fund_id="fund-uuid-2",
            fund_name="Parag Parikh Flexi Cap Fund Direct-Growth",
            scheme_code="122639",
            units=180.50,
            avg_buy_nav=55.20,
            current_nav=67.40,
            current_value=12165.70,
            total_invested=9963.60,
            gain_loss=2202.10,
            gain_loss_percent=22.10,
            allocation_percent=40.0
        )
    ]
    return success_response(data=holdings, message="Portfolio holdings retrieved")

@router.get("/{portfolio_id}/summary", response_model=APIResponse[Dict[str, Any]])
async def get_portfolio_summary(portfolio_id: str):
    """Fetches high-level wealth summary metrics."""
    data = {
        "portfolio_id": portfolio_id,
        "total_value": 30377.54,
        "total_invested": 24268.75,
        "total_gain_loss": 6108.79,
        "gain_loss_percent": 25.17,
        "cagr_3y": 18.5,
        "xirr": 22.4,
        "today_gain_loss": 340.50
    }
    return success_response(data=data, message="Portfolio summary retrieved")

@router.get("/{portfolio_id}/allocation", response_model=APIResponse[Dict[str, Any]])
async def get_portfolio_allocation(portfolio_id: str):
    """Fetches asset class, AMC, and sector allocation breakdown."""
    data = {
        "asset_allocation": {"Equity": 75.0, "Debt": 20.0, "Gold": 5.0},
        "amc_allocation": {"Quant Mutual Fund": 60.0, "PPFAS Mutual Fund": 40.0},
        "sector_allocation": {"Financial Services": 32.5, "Technology": 24.0, "Healthcare": 18.5, "Capital Goods": 15.0, "Others": 10.0}
    }
    return success_response(data=data, message="Portfolio allocation retrieved")

@router.get("/{portfolio_id}/performance", response_model=APIResponse[Dict[str, Any]])
async def get_portfolio_performance(portfolio_id: str):
    """Fetches benchmark relative performance and risk-adjusted metrics."""
    data = {
        "alpha": 3.8,
        "beta": 0.94,
        "sharpe_ratio": 1.42,
        "sortino_ratio": 1.95,
        "cagr_1y": 24.5,
        "cagr_3y": 18.5,
        "benchmark_cagr_3y": 14.2
    }
    return success_response(data=data, message="Portfolio performance retrieved")

@router.get("/{portfolio_id}/history", response_model=APIResponse[List[Dict[str, Any]]])
async def get_portfolio_history(portfolio_id: str):
    """Fetches NAV timeline history of portfolio value."""
    history = [
        {"date": "2026-01-01", "total_value": 25000.0, "invested": 22000.0},
        {"date": "2026-04-01", "total_value": 28000.0, "invested": 23500.0},
        {"date": "2026-07-31", "total_value": 30377.54, "invested": 24268.75}
    ]
    return success_response(data=history, message="Portfolio historical timeline retrieved")
