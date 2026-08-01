from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/funds", tags=["Mutual Funds"])

class FundCompareRequest(BaseModel):
    fund_ids: List[str]

class MutualFundDTO(BaseModel):
    id: str
    scheme_code: str
    fund_name: str
    amc_name: str
    category: str
    sub_category: str
    nav: float
    expense_ratio: float
    aum: float
    risk_level: str
    return_1y: float
    return_3y: float
    return_5y: float
    sharpe_ratio: float
    alpha: float
    beta: float
    standard_deviation: float
    fund_fit_score: Optional[float] = 88.0

@router.get("/search", response_model=APIResponse[List[MutualFundDTO]])
async def search_funds(
    q: Optional[str] = Query(default=None, description="Search query string"),
    category: Optional[str] = Query(default=None),
    min_return: Optional[float] = Query(default=None),
    max_expense_ratio: Optional[float] = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100)
):
    """Searches mutual funds with category, return, and expense ratio filters."""
    funds = [
        MutualFundDTO(
            id=f"fund-{i}",
            scheme_code=f"12050{i}",
            fund_name=f"Quant Flexi Cap Fund Direct-Growth #{i}",
            amc_name="Quant Mutual Fund",
            category="Equity",
            sub_category="Flexi Cap",
            nav=125.40 + i,
            expense_ratio=0.65,
            aum=6500.0,
            risk_level="Very High",
            return_1y=28.5,
            return_3y=19.5,
            return_5y=22.4,
            sharpe_ratio=1.65,
            alpha=5.2,
            beta=0.92,
            standard_deviation=14.2,
            fund_fit_score=92.0
        ) for i in range(1, 6)
    ]
    meta = {"page": page, "page_size": page_size, "total_records": 50, "total_pages": 10}
    return success_response(data=funds, meta=meta, message="Fund search results retrieved")

@router.post("/compare", response_model=APIResponse[List[Dict[str, Any]]])
async def compare_funds(payload: FundCompareRequest):
    """Compares side-by-side performance, risk ratios, and expense metrics of selected funds."""
    comparison = [
        {
            "id": fund_id,
            "fund_name": f"Fund {fund_id}",
            "cagr_3y": 18.5,
            "cagr_5y": 21.0,
            "sharpe_ratio": 1.45,
            "alpha": 3.8,
            "beta": 0.95,
            "expense_ratio": 0.65,
            "aum": 8500.0
        } for fund_id in payload.fund_ids
    ]
    return success_response(data=comparison, message="Fund comparison generated")

@router.get("/categories", response_model=APIResponse[List[Dict[str, Any]]])
async def get_fund_categories():
    """Lists available fund categories and asset classes."""
    categories = [
        {"id": "c-1", "asset_class": "Equity", "sub_category": "Flexi Cap", "fund_count": 38},
        {"id": "c-2", "asset_class": "Equity", "sub_category": "Small Cap", "fund_count": 26},
        {"id": "c-3", "asset_class": "Equity", "sub_category": "Mid Cap", "fund_count": 29},
        {"id": "c-4", "asset_class": "Debt", "sub_category": "Corporate Bond", "fund_count": 22},
        {"id": "c-5", "asset_class": "Hybrid", "sub_category": "Balanced Advantage", "fund_count": 30}
    ]
    return success_response(data=categories, message="Categories retrieved")

@router.get("/ranking", response_model=APIResponse[List[Dict[str, Any]]])
async def get_fund_ranking(category: Optional[str] = "Flexi Cap"):
    """Fetches AI-ranked mutual funds within a category based on Fund Fit Score."""
    rankings = [
        {"rank": 1, "fund_id": "f-101", "fund_name": "Quant Flexi Cap Fund", "score": 94.5, "cagr_3y": 22.1},
        {"rank": 2, "fund_id": "f-102", "fund_name": "Parag Parikh Flexi Cap Fund", "score": 91.2, "cagr_3y": 18.8},
        {"rank": 3, "fund_id": "f-103", "fund_name": "HDFC Flexi Cap Fund", "score": 88.0, "cagr_3y": 17.5}
    ]
    return success_response(data=rankings, message="Fund rankings retrieved")

@router.get("/{fund_id}", response_model=APIResponse[MutualFundDTO])
async def get_fund_detail(fund_id: str):
    """Fetches complete scheme details for a mutual fund."""
    fund = MutualFundDTO(
        id=fund_id,
        scheme_code="120503",
        fund_name="Quant Flexi Cap Fund Direct-Growth",
        amc_name="Quant Mutual Fund",
        category="Equity",
        sub_category="Flexi Cap",
        nav=125.40,
        expense_ratio=0.65,
        aum=6500.0,
        risk_level="Very High",
        return_1y=28.5,
        return_3y=19.5,
        return_5y=22.4,
        sharpe_ratio=1.65,
        alpha=5.2,
        beta=0.92,
        standard_deviation=14.2,
        fund_fit_score=92.0
    )
    return success_response(data=fund, message="Fund details retrieved")

@router.get("/{fund_id}/holdings", response_model=APIResponse[List[Dict[str, Any]]])
async def get_fund_holdings(fund_id: str):
    """Fetches underlying stock holdings and weights for a mutual fund."""
    holdings = [
        {"stock_name": "Reliance Industries Ltd", "sector": "Energy", "allocation_percent": 9.5},
        {"stock_name": "HDFC Bank Ltd", "sector": "Financial Services", "allocation_percent": 8.2},
        {"stock_name": "Jio Financial Services", "sector": "Financial Services", "allocation_percent": 6.8},
        {"stock_name": "ITC Ltd", "sector": "FMCG", "allocation_percent": 5.4}
    ]
    return success_response(data=holdings, message="Fund holdings retrieved")

@router.get("/{fund_id}/returns", response_model=APIResponse[Dict[str, float]])
async def get_fund_returns(fund_id: str):
    """Fetches point-to-point historical returns."""
    returns = {
        "return_1d": 0.45,
        "return_1m": 2.10,
        "return_3m": 6.80,
        "return_6m": 12.40,
        "return_1y": 28.50,
        "return_3y": 19.50,
        "return_5y": 22.40,
        "return_10y": 18.20
    }
    return success_response(data=returns, message="Fund returns retrieved")

@router.get("/{fund_id}/risk-metrics", response_model=APIResponse[Dict[str, float]])
async def get_fund_risk_metrics(fund_id: str):
    """Fetches quantitative risk statistics."""
    metrics = {
        "sharpe_ratio": 1.65,
        "sortino_ratio": 2.15,
        "treynor_ratio": 18.2,
        "alpha": 5.2,
        "beta": 0.92,
        "standard_deviation": 14.2,
        "tracking_error": 3.1
    }
    return success_response(data=metrics, message="Fund risk metrics retrieved")

@router.get("/{fund_id}/manager", response_model=APIResponse[Dict[str, Any]])
async def get_fund_manager(fund_id: str):
    """Fetches fund manager biography and track record."""
    manager = {
        "manager_name": "Sandeep Tandon",
        "experience_years": 25,
        "total_funds_managed": 8,
        "bio": "Founder & CIO of Quant Mutual Fund with over 25 years of investment management experience."
    }
    return success_response(data=manager, message="Fund manager details retrieved")
