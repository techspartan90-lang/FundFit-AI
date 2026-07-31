from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_user_payload
from app.schemas.profile import ProfileCreateOrUpdate, ProfileResponse, RiskAssessmentRequest, RiskAssessmentResponse
from app.ai.investor_profiler import InvestorProfilerEngine
from app.ai.risk_engine import RiskEngine

router = APIRouter(prefix="/profile", tags=["Investor Profile"])

@router.get("", response_model=ProfileResponse)
async def get_profile(payload: dict = Depends(get_current_user_payload)):
    user_id = int(payload["sub"])
    profiler = InvestorProfilerEngine.classify_investor_profile(32, 3600000.0, 5000000.0, 2)
    return {
        "id": 1,
        "user_id": user_id,
        "age": 32,
        "occupation": "Software Architect",
        "annual_income": 3600000.0,
        "annual_expenses": 1200000.0,
        "total_assets": 5000000.0,
        "total_liabilities": 500000.0,
        "emergency_fund_value": 600000.0,
        "dependents_count": 2,
        "tax_bracket_percent": 30.0,
        "liquidity_needs": "Moderate",
        "behavioral_archetype": profiler["behavioral_archetype"]
    }

@router.post("/risk-assessment", response_model=RiskAssessmentResponse)
async def run_risk_assessment(
    request: RiskAssessmentRequest,
    payload: dict = Depends(get_current_user_payload)
):
    user_id = int(payload["sub"])
    result = RiskEngine.calculate_risk_score(
        loss_aversion=request.loss_aversion_score,
        risk_appetite=request.risk_appetite_score,
        overconfidence=request.overconfidence_score
    )
    return {
        "id": 1,
        "user_id": user_id,
        "overall_risk_score": result["overall_risk_score"],
        "risk_category": result["risk_category"],
        "loss_aversion_score": request.loss_aversion_score,
        "risk_appetite_score": request.risk_appetite_score
    }
