from fastapi import APIRouter, Depends
from typing import List
from app.core.dependencies import require_roles
from app.schemas.advisor import ClientResponse

router = APIRouter(prefix="/advisor", tags=["Advisor Portal"])

@router.get("/clients", response_model=List[ClientResponse])
async def get_advisor_clients(payload: dict = Depends(require_roles(["advisor", "admin", "super_admin"]))):
    return [
        {
            "id": 1,
            "advisor_id": 10,
            "investor_user_id": 1,
            "status": "Healthy",
            "notes": "Portfolio pacing at 18.4% XIRR. Next annual review scheduled."
        },
        {
            "id": 2,
            "advisor_id": 10,
            "investor_user_id": 2,
            "status": "Action Required",
            "notes": "Rebalancing memo sent for high small-cap weight."
        }
    ]
