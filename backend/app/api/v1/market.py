from fastapi import APIRouter
from typing import List
from app.schemas.market import MarketDataResponse
from app.ai.market_regime import MarketRegimeEngine

router = APIRouter(prefix="/market", tags=["Market Data & Regimes"])

@router.get("", response_model=List[MarketDataResponse])
async def get_market_data():
    regime = MarketRegimeEngine.detect_market_regime(0.59, 14.25, 5.1)
    return [
        {
            "id": 1,
            "index_name": "NIFTY 50",
            "value": 24180.50,
            "change_percent": 0.59,
            "market_regime": regime["market_regime"],
            "inflation_rate": 5.1,
            "interest_rate": 6.5
        },
        {
            "id": 2,
            "index_name": "SENSEX",
            "value": 79450.20,
            "change_percent": 0.61,
            "market_regime": regime["market_regime"],
            "inflation_rate": 5.1,
            "interest_rate": 6.5
        },
        {
            "id": 3,
            "index_name": "INDIA VIX",
            "value": 14.25,
            "change_percent": -5.63,
            "market_regime": regime["market_regime"],
            "inflation_rate": 5.1,
            "interest_rate": 6.5
        }
    ]
