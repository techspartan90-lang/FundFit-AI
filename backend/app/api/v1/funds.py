from fastapi import APIRouter, Query
from typing import List, Optional
from app.schemas.fund import MutualFundResponse

router = APIRouter(prefix="/funds", tags=["Mutual Funds"])

MOCK_FUNDS = [
    {
        "id": 101,
        "scheme_code": "PPFAS-FC-DIR",
        "name": "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
        "amc_name": "Parag Parikh Financial Advisory Services AMC",
        "category": "Flexi Cap",
        "risk_level": "Very High Risk",
        "current_nav": 74.85,
        "aum_in_crores": 68450.0,
        "expense_ratio": 0.58,
        "fund_manager": "Rajeev Thakkar",
        "cagr_1y": 24.2,
        "cagr_3y": 21.8,
        "cagr_5y": 22.4,
        "sharpe_ratio": 1.85,
        "alpha": 5.4,
        "beta": 0.78,
        "fund_fit_score": 96,
        "top_holdings": [{"company": "Alphabet Inc", "weight": 7.8}, {"company": "HDFC Bank Ltd", "weight": 7.4}]
    },
    {
        "id": 102,
        "scheme_code": "HDFC-TOP100-DIR",
        "name": "HDFC Top 100 Fund - Direct Plan - Growth",
        "amc_name": "HDFC Asset Management Company",
        "category": "Large Cap",
        "risk_level": "Very High Risk",
        "current_nav": 105.40,
        "aum_in_crores": 34200.0,
        "expense_ratio": 0.95,
        "fund_manager": "Rahul Baijal",
        "cagr_1y": 18.5,
        "cagr_3y": 17.2,
        "cagr_5y": 16.1,
        "sharpe_ratio": 1.45,
        "alpha": 2.8,
        "beta": 0.92,
        "fund_fit_score": 94,
        "top_holdings": [{"company": "ICICI Bank Ltd", "weight": 9.2}, {"company": "Reliance Industries", "weight": 8.5}]
    },
    {
        "id": 103,
        "scheme_code": "QUANT-SMALLCAP-DIR",
        "name": "Quant Small Cap Fund - Direct Plan - Growth",
        "amc_name": "Quant Mutual Fund",
        "category": "Small Cap",
        "risk_level": "Very High Risk",
        "current_nav": 240.15,
        "aum_in_crores": 21500.0,
        "expense_ratio": 0.64,
        "fund_manager": "Sandeep Tandon",
        "cagr_1y": 32.4,
        "cagr_3y": 28.6,
        "cagr_5y": 34.2,
        "sharpe_ratio": 2.10,
        "alpha": 8.2,
        "beta": 1.12,
        "fund_fit_score": 91,
        "top_holdings": [{"company": "Reliance Industries", "weight": 6.4}, {"company": "Jio Financial Services", "weight": 5.8}]
    }
]

@router.get("", response_model=List[MutualFundResponse])
async def list_funds(
    category: Optional[str] = Query(None, description="Filter by fund category"),
    search: Optional[str] = Query(None, description="Search by name or AMC")
):
    funds = MOCK_FUNDS
    if category:
        funds = [f for f in funds if f["category"].lower() == category.lower()]
    if search:
        funds = [f for f in funds if search.lower() in f["name"].lower() or search.lower() in f["amc_name"].lower()]
    return funds

@router.get("/{fund_id}", response_model=MutualFundResponse)
async def get_fund_detail(fund_id: int):
    for fund in MOCK_FUNDS:
        if fund["id"] == fund_id:
            return fund
    return MOCK_FUNDS[0]
