from fastapi import APIRouter, status
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/profile", tags=["Profile"])

class ProfileCreateOrUpdateDTO(BaseModel):
    age: int
    occupation: str
    salary: float
    monthly_income: float
    monthly_expenses: float
    assets: float
    liabilities: float
    emergency_fund: float
    investment_experience: str = "Intermediate"
    financial_knowledge: str = "Medium"
    tax_bracket: str = "30%"
    liquidity_need: str = "Moderate"
    dependents: int = 1
    risk_preference: str = "Moderate"
    behavior_profile: str = "Balanced"
    investment_goals: str = "Wealth Creation & Retirement"
    time_horizon: str = "5-10 Years"

@router.post("", status_code=status.HTTP_201_CREATED, response_model=APIResponse[ProfileCreateOrUpdateDTO])
async def create_profile(payload: ProfileCreateOrUpdateDTO):
    """Creates a new comprehensive investor financial profile."""
    return success_response(data=payload, message="Investor profile created successfully", status_code=status.HTTP_201_CREATED)

@router.put("", response_model=APIResponse[ProfileCreateOrUpdateDTO])
async def update_profile(payload: ProfileCreateOrUpdateDTO):
    """Updates existing investor financial profile."""
    return success_response(data=payload, message="Investor profile updated successfully")

@router.get("/risk", response_model=APIResponse[Dict[str, Any]])
async def get_risk_profile():
    """Fetches calculated risk assessment profile."""
    data = {
        "risk_score": 68.5,
        "risk_category": "Moderately Aggressive",
        "downside_risk_var_95": 14.2,
        "expected_volatility": 15.8,
        "drawdown_tolerance": 25.0
    }
    return success_response(data=data, message="Risk profile retrieved")

@router.get("/behavior", response_model=APIResponse[Dict[str, Any]])
async def get_behavior_profile():
    """Fetches psychological behavioral bias evaluation."""
    data = {
        "loss_aversion": 42.0,
        "overconfidence": 55.0,
        "anchoring_bias": 38.0,
        "recency_bias": 45.0,
        "herd_mentality": 30.0,
        "emotional_investing": 35.0,
        "patience": 78.0,
        "decision_style": "Analytical Balanced",
        "confidence_level": 70.0
    }
    return success_response(data=data, message="Behavior profile retrieved")

@router.get("/investment", response_model=APIResponse[Dict[str, Any]])
async def get_investment_profile():
    """Fetches investment goals, time horizon, and target asset allocation."""
    data = {
        "investment_style": "Core & Explore Growth",
        "time_horizon": "7 Years",
        "recommended_allocation": {
            "equity_percentage": 65.0,
            "debt_percentage": 25.0,
            "gold_percentage": 5.0,
            "cash_percentage": 5.0
        }
    }
    return success_response(data=data, message="Investment profile retrieved")

@router.get("/financials", response_model=APIResponse[Dict[str, Any]])
async def get_financial_details():
    """Fetches net worth, assets, liabilities, and income/expense metrics."""
    data = {
        "net_worth": 3000000.0,
        "assets": 3500000.0,
        "liabilities": 500000.0,
        "monthly_income": 125000.0,
        "monthly_expenses": 65000.0,
        "emergency_fund": 400000.0,
        "savings_ratio": 48.0
    }
    return success_response(data=data, message="Financial details retrieved")
