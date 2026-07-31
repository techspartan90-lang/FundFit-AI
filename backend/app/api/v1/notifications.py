from fastapi import APIRouter, Depends
from typing import List
from app.core.dependencies import get_current_user_payload
from app.schemas.recommendation import NotificationResponse

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("", response_model=List[NotificationResponse])
async def get_notifications(payload: dict = Depends(get_current_user_payload)):
    user_id = int(payload["sub"])
    return [
        {
            "id": 1,
            "user_id": user_id,
            "title": "SIP Auto-Debit Confirmation",
            "body": "Your monthly SIP of ₹25,000 was successfully processed for PPFAS Flexi Cap.",
            "channel": "In-App",
            "is_read": False
        }
    ]
