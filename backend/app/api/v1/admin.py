from fastapi import APIRouter, Depends
from typing import List
from app.core.dependencies import require_roles
from app.schemas.admin import AuditLogResponse

router = APIRouter(prefix="/admin", tags=["Admin Portal"])

@router.get("/audit-logs", response_model=List[AuditLogResponse])
async def get_system_audit_logs(payload: dict = Depends(require_roles(["admin", "super_admin"]))):
    return [
        {
            "id": 1,
            "user_id": 1,
            "action": "AMFI Master NAV Sync Executed",
            "module": "NAV Data Pipeline",
            "status": "Success",
            "created_at": "2026-07-31T18:00:00Z"
        },
        {
            "id": 2,
            "user_id": 1,
            "action": "2FA MFA Verification",
            "module": "Security Auth Engine",
            "status": "Success",
            "created_at": "2026-07-31T17:30:00Z"
        }
    ]
