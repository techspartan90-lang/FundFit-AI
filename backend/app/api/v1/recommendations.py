from fastapi import APIRouter, Depends
from typing import List
from app.core.dependencies import get_current_user_payload
from app.schemas.recommendation import RecommendationResponse, AlertResponse
from app.ai.recommendation_engine import RecommendationEngine

router = APIRouter(prefix="/recommendations", tags=["AI Recommendations"])

@router.get("", response_model=List[RecommendationResponse])
async def get_ai_recommendations(payload: dict = Depends(get_current_user_payload)):
    user_id = int(payload["sub"])
    rec1 = RecommendationEngine.generate_recommendation("Parag Parikh Flexi Cap", 21.8, 0.58, "Flexi Cap")
    rec2 = RecommendationEngine.generate_recommendation("HDFC Top 100", 17.2, 0.95, "Large Cap")

    return [
        {
            "id": 1,
            "user_id": user_id,
            "fund_id": 101,
            "action_signal": rec1["action_signal"],
            "confidence_score": rec1["confidence_score"],
            "ai_reasoning": rec1["ai_reasoning"]
        },
        {
            "id": 2,
            "user_id": user_id,
            "fund_id": 102,
            "action_signal": rec2["action_signal"],
            "confidence_score": rec2["confidence_score"],
            "ai_reasoning": rec2["ai_reasoning"]
        }
    ]
