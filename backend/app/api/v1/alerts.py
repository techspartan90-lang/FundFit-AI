from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/alerts", tags=["Alerts"])

class AlertDTO(BaseModel):
    id: str
    alert_type: str
    title: str
    message: str
    severity: str
    is_read: bool
    triggered_at: str

@router.get("", response_model=APIResponse[List[AlertDTO]])
async def get_alerts():
    """Lists all active system and financial intelligence alerts."""
    alerts = [
        AlertDTO(
            id="a-1",
            alert_type="Goal Delay",
            title="Retirement Goal Lagging",
            message="Goal achievement probability is at 52%. Consider boosting SIP by ₹3,500.",
            severity="HIGH",
            is_read=False,
            triggered_at="2026-07-31T08:00:00Z"
        ),
        AlertDTO(
            id="a-2",
            alert_type="Fund Underperformance",
            title="Underperformance Warning",
            message="Holding Axis Small Cap Fund generated negative alpha (-3.1%).",
            severity="MEDIUM",
            is_read=True,
            triggered_at="2026-07-29T12:00:00Z"
        )
    ]
    return success_response(data=alerts, message="Alerts retrieved")

@router.get("/unread", response_model=APIResponse[List[AlertDTO]])
async def get_unread_alerts():
    """Fetches unread alerts for real-time notification badges."""
    alerts = [
        AlertDTO(
            id="a-1",
            alert_type="Goal Delay",
            title="Retirement Goal Lagging",
            message="Goal achievement probability is at 52%. Consider boosting SIP by ₹3,500.",
            severity="HIGH",
            is_read=False,
            triggered_at="2026-07-31T08:00:00Z"
        )
    ]
    return success_response(data=alerts, message="Unread alerts retrieved")

@router.patch("/{alert_id}/read", response_model=APIResponse[Dict[str, bool]])
async def mark_alert_read(alert_id: str):
    """Marks specified alert as read."""
    return success_response(data={"is_read": True}, message="Alert marked as read")

@router.delete("/{alert_id}", response_model=APIResponse[Dict[str, bool]])
async def delete_alert(alert_id: str):
    """Deletes or dismisses an alert."""
    return success_response(data={"deleted": True}, message="Alert deleted successfully")
