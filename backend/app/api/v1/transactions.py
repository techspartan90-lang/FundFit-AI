from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user_payload

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.get("")
async def get_transactions(payload: dict = Depends(get_current_user_payload)):
    return [
        {
            "id": 1,
            "portfolio_id": 1,
            "fund_id": 101,
            "transaction_type": "SIP BUY",
            "units": 334.0,
            "nav": 74.85,
            "amount": 25000.0,
            "status": "Completed"
        }
    ]
