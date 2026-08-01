from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/notifications", tags=["Notifications"])

class NotificationDTO(BaseModel):
    id: str
    title: str
    body: str
    channel: str
    is_sent: bool
    created_at: str

@router.get("", response_model=APIResponse[List[NotificationDTO]])
async def get_notifications():
    """Lists user notifications across in-app, email, and push channels."""
    notifications = [
        NotificationDTO(
            id="n-1",
            title="Portfolio Rebalance Alert",
            body="Your equity allocation has drifted by 6.2%. Rebalancing recommended.",
            channel="IN_APP",
            is_sent=True,
            created_at="2026-07-31T10:00:00Z"
        ),
        NotificationDTO(
            id="n-2",
            title="SIP Debit Reminder",
            body="Monthly SIP of ₹25,000 scheduled for debit in 3 days.",
            channel="EMAIL",
            is_sent=True,
            created_at="2026-07-30T15:30:00Z"
        )
    ]
    return success_response(data=notifications, message="Notifications retrieved")
