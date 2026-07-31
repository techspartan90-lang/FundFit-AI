from fastapi import APIRouter, Depends
from typing import List
from app.core.dependencies import get_current_user_payload
from app.schemas.recommendation import AlertResponse

router = APIRouter(prefix="/alerts", tags=["Alerts & Risk Center"])

@router.get("", response_model=List[AlertResponse])
async def get_alerts(payload: dict = Depends(get_current_user_payload)):
    user_id = int(payload["sub"])
    return [
        {
            "id": 1,
            "user_id": user_id,
            "alert_type": "Fund Mismatch Alert",
            "message": "Quant Small Cap allocation exceeds target risk profile threshold by 4%.",
            "is_read": False
        },
        {
            "id": 2,
            "user_id": user_id,
            "alert_type": "SIP Auto-Debit Executed",
            "message": "Monthly SIP of ₹25,000 executed for Parag Parikh Flexi Cap.",
            "is_read": True
        }
    ]
