from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user_payload

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])

@router.get("")
async def get_watchlist(payload: dict = Depends(get_current_user_payload)):
    return [
        {"id": 1, "fund_id": 101, "name": "Parag Parikh Flexi Cap Fund", "nav": 74.85},
        {"id": 2, "fund_id": 103, "name": "Quant Small Cap Fund", "nav": 240.15}
    ]
