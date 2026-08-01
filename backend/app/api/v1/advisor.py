from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/advisor", tags=["Advisor"])

class AdvisorRecommendationRequest(BaseModel):
    client_user_id: str
    target_fund_id: str
    action: str = "BUY"
    amount: float = 50000.0
    notes: Optional[str] = None

@router.get("/clients", response_model=APIResponse[List[Dict[str, Any]]])
async def get_advisor_clients():
    """Lists assigned clients for wealth advisor workspace."""
    clients = [
        {"client_id": "c-1", "full_name": "Rohan Sharma", "email": "rohan@example.com", "total_aum": 4500000.0, "risk_category": "Moderately Aggressive", "status": "ACTIVE"},
        {"client_id": "c-2", "full_name": "Priya Verma", "email": "priya@example.com", "total_aum": 2800000.0, "risk_category": "Balanced", "status": "ACTIVE"}
    ]
    return success_response(data=clients, message="Advisor clients retrieved")

@router.get("/meetings", response_model=APIResponse[List[Dict[str, Any]]])
async def get_advisor_meetings():
    """Lists scheduled client review meetings."""
    meetings = [
        {"meeting_id": "m-1", "client_name": "Rohan Sharma", "scheduled_at": "2026-08-02T11:00:00Z", "topic": "Q2 Portfolio Rebalance Review"},
        {"meeting_id": "m-2", "client_name": "Priya Verma", "scheduled_at": "2026-08-05T15:00:00Z", "topic": "Tax Savings ELSS Planning"}
    ]
    return success_response(data=meetings, message="Advisor meetings retrieved")

@router.post("/recommendations", response_model=APIResponse[Dict[str, Any]])
async def post_advisor_recommendation(payload: AdvisorRecommendationRequest):
    """Issues advisor-crafted recommendation to client."""
    data = {
        "recommendation_id": "rec-adv-101",
        "client_user_id": payload.client_user_id,
        "target_fund_id": payload.target_fund_id,
        "action": payload.action,
        "amount": payload.amount,
        "notes": payload.notes,
        "status": "DISPATCHED"
    }
    return success_response(data=data, message="Advisor recommendation issued")

@router.get("/reports", response_model=APIResponse[List[Dict[str, Any]]])
async def get_advisor_reports():
    """Fetches generated client portfolio health and tax audit reports."""
    reports = [
        {"report_id": "rep-adv-1", "client_name": "Rohan Sharma", "report_type": "PORTFOLIO_HEALTH", "generated_at": "2026-07-30T16:00:00Z"}
    ]
    return success_response(data=reports, message="Advisor reports retrieved")
