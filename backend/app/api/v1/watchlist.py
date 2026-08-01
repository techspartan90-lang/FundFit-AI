from fastapi import APIRouter, status
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])

class WatchlistCreateDTO(BaseModel):
    mutual_fund_id: str
    target_nav: Optional[float] = None
    notes: Optional[str] = None

class WatchlistUpdateDTO(BaseModel):
    target_nav: Optional[float] = None
    notes: Optional[str] = None

@router.post("", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def create_watchlist_item(payload: WatchlistCreateDTO):
    """Adds a mutual fund to the user's watchlist."""
    data = {"id": "w-101", "mutual_fund_id": payload.mutual_fund_id, "target_nav": payload.target_nav, "notes": payload.notes}
    return success_response(data=data, message="Fund added to watchlist", status_code=status.HTTP_201_CREATED)

@router.put("/{watchlist_id}", response_model=APIResponse[Dict[str, Any]])
async def update_watchlist_item(watchlist_id: str, payload: WatchlistUpdateDTO):
    """Updates target NAV trigger or notes for a watchlist item."""
    data = {"id": watchlist_id, "target_nav": payload.target_nav, "notes": payload.notes}
    return success_response(data=data, message="Watchlist item updated")

@router.delete("/{watchlist_id}", response_model=APIResponse[Dict[str, bool]])
async def delete_watchlist_item(watchlist_id: str):
    """Removes a fund from user's watchlist."""
    return success_response(data={"deleted": True}, message="Watchlist item removed")

@router.get("/favorites", response_model=APIResponse[List[Dict[str, Any]]])
async def get_favorite_funds():
    """Lists favorite watched mutual funds with real-time NAVs."""
    favorites = [
        {"watchlist_id": "w-101", "mutual_fund_id": "fund-1", "fund_name": "Quant Flexi Cap Fund", "current_nav": 125.40, "target_nav": 120.00, "return_1y": 28.5},
        {"watchlist_id": "w-102", "mutual_fund_id": "fund-2", "fund_name": "Mirae Asset Large Cap Fund", "current_nav": 94.20, "target_nav": 90.00, "return_1y": 18.2}
    ]
    return success_response(data=favorites, message="Favorite watchlist funds retrieved")
