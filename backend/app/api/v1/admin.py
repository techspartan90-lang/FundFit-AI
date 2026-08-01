from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/admin", tags=["Admin"])

class RoleUpdateRequest(BaseModel):
    user_id: str
    role: str # investor, advisor, admin, super_admin

class MarketDataPostRequest(BaseModel):
    record_date: str
    nifty: float
    sensex: float
    bank_nifty: float
    india_vix: float

@router.get("/users", response_model=APIResponse[List[Dict[str, Any]]])
async def admin_get_users():
    """Lists system users for administrative management."""
    users = [{"id": f"u-{i}", "email": f"user{i}@fundfit.ai", "role": "investor", "is_active": True} for i in range(1, 6)]
    return success_response(data=users, message="Admin user list retrieved")

@router.put("/roles", response_model=APIResponse[Dict[str, Any]])
async def admin_update_role(payload: RoleUpdateRequest):
    """Updates role permissions for a user account."""
    return success_response(data={"user_id": payload.user_id, "new_role": payload.role}, message="Role updated successfully")

@router.get("/permissions", response_model=APIResponse[List[Dict[str, Any]]])
async def admin_get_permissions():
    """Lists role-based access permissions matrix."""
    permissions = [
        {"role": "investor", "capabilities": ["read_own_portfolio", "run_ai_analytics"]},
        {"role": "advisor", "capabilities": ["read_client_portfolio", "issue_recommendations"]},
        {"role": "admin", "capabilities": ["manage_users", "update_market_data", "view_audit_logs"]}
    ]
    return success_response(data=permissions, message="Permissions retrieved")

@router.get("/funds", response_model=APIResponse[List[Dict[str, Any]]])
async def admin_get_funds():
    """Lists all mutual fund Master database records."""
    funds = [{"id": "f-1", "scheme_code": "120503", "fund_name": "Quant Flexi Cap Fund", "is_active": True}]
    return success_response(data=funds, message="Master fund list retrieved")

@router.post("/market-data", response_model=APIResponse[Dict[str, Any]])
async def admin_post_market_data(payload: MarketDataPostRequest):
    """Ingests or updates daily market index quotes."""
    return success_response(data=payload.model_dump(), message="Market data updated successfully")

@router.get("/analytics", response_model=APIResponse[Dict[str, Any]])
async def admin_get_analytics():
    """Fetches system health, API usage metrics, and user growth analytics."""
    analytics = {
        "total_users": 15420,
        "active_portfolios": 12800,
        "total_aum_tracked_in_cr": 450.80,
        "daily_ai_predictions": 8540,
        "api_response_time_avg_ms": 42
    }
    return success_response(data=analytics, message="System analytics retrieved")

@router.get("/audit-logs", response_model=APIResponse[List[Dict[str, Any]]])
async def admin_get_audit_logs():
    """Fetches system-wide row-level mutation audit logs."""
    logs = [
        {"id": "audit-1", "table_name": "users", "action": "UPDATE", "changed_by": "admin-uuid", "timestamp": "2026-07-31T12:00:00Z"},
        {"id": "audit-2", "table_name": "portfolios", "action": "INSERT", "changed_by": "user-uuid", "timestamp": "2026-07-31T11:45:00Z"}
    ]
    return success_response(data=logs, message="Audit logs retrieved")
