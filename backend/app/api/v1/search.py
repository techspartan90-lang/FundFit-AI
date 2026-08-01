from fastapi import APIRouter, Query
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/search", tags=["Global Search"])

@router.get("/global", response_model=APIResponse[Dict[str, List[Any]]])
async def global_search(
    q: str = Query(..., min_length=2, description="Global search query string")
):
    """Performs unified global search across Mutual Funds, Users, Financial Goals, and Portfolios."""
    results = {
        "funds": [
            {"id": "fund-1", "name": f"{q} Flexi Cap Fund", "category": "Equity", "nav": 125.40},
            {"id": "fund-2", "name": f"{q} Small Cap Fund", "category": "Equity", "nav": 68.20}
        ],
        "goals": [
            {"id": "goal-1", "title": f"Retirement Fund for {q}", "target_amount": 10000000.0}
        ],
        "portfolios": [
            {"id": "port-1", "name": f"{q} Core Wealth Portfolio", "total_value": 30377.54}
        ],
        "users": [
            {"id": "user-1", "full_name": f"{q} Investor", "email": f"{q.lower()}@fundfit.ai"}
        ]
    }
    return success_response(data=results, message="Global search completed")
