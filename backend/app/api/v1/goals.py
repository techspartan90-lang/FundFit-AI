from fastapi import APIRouter, Depends
from typing import List
from app.core.dependencies import get_current_user_payload
from app.schemas.goal import GoalCreateRequest, GoalResponse
from app.ai.goal_probability import GoalProbabilityEngine

router = APIRouter(prefix="/goals", tags=["Goal Planner"])

MOCK_GOALS = [
    {
        "id": 1,
        "user_id": 1,
        "name": "Retirement Corpus (₹5 Crore)",
        "category": "Retirement",
        "target_amount": 50000000.0,
        "current_amount": 2485453.0,
        "target_year": 2042,
        "current_monthly_sip": 60000.0,
        "priority": "High",
        "completion_probability": 96.0
    },
    {
        "id": 2,
        "user_id": 1,
        "name": "Dream House Purchase",
        "category": "Real Estate",
        "target_amount": 15000000.0,
        "current_amount": 1200000.0,
        "target_year": 2030,
        "current_monthly_sip": 25000.0,
        "priority": "High",
        "completion_probability": 88.5
    }
]

@router.get("", response_model=List[GoalResponse])
async def get_goals(payload: dict = Depends(get_current_user_payload)):
    user_id = int(payload["sub"])
    return [g for g in MOCK_GOALS if g["user_id"] == user_id] or MOCK_GOALS

@router.post("", response_model=GoalResponse)
async def create_goal(
    request: GoalCreateRequest,
    payload: dict = Depends(get_current_user_payload)
):
    user_id = int(payload["sub"])
    prob = GoalProbabilityEngine.calculate_goal_completion(
        target_amount=request.target_amount,
        current_amount=request.current_amount or 0.0,
        monthly_sip=request.current_monthly_sip or 0.0,
        target_year=request.target_year
    )
    return {
        "id": len(MOCK_GOALS) + 1,
        "user_id": user_id,
        "name": request.name,
        "category": request.category,
        "target_amount": request.target_amount,
        "current_amount": request.current_amount or 0.0,
        "target_year": request.target_year,
        "current_monthly_sip": request.current_monthly_sip or 0.0,
        "priority": request.priority or "High",
        "completion_probability": prob["completion_probability"]
    }
