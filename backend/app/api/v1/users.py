from fastapi import APIRouter, Depends, Query, status
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from app.schemas.response import APIResponse, PaginationMeta, success_response

router = APIRouter(prefix="/users", tags=["Users"])

class UserProfileDTO(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    is_verified: bool
    phone_number: Optional[str] = None
    avatar_url: Optional[str] = None

class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    phone_number: Optional[str] = None
    avatar_url: Optional[str] = None

class UserAdminPatchRequest(BaseModel):
    role: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None

@router.get("/me", response_model=APIResponse[UserProfileDTO])
async def get_current_user():
    """Fetches currently authenticated user's profile."""
    data = UserProfileDTO(
        id="user-uuid-1234",
        email="investor@fundfit.ai",
        full_name="Guruprasanth R",
        role="investor",
        is_active=True,
        is_verified=True,
        phone_number="+919876543210"
    )
    return success_response(data=data, message="User profile fetched")

@router.put("/me", response_model=APIResponse[UserProfileDTO])
async def update_current_user(payload: UserUpdateRequest):
    """Updates authenticated user's profile information."""
    data = UserProfileDTO(
        id="user-uuid-1234",
        email="investor@fundfit.ai",
        full_name=payload.full_name or "Guruprasanth R",
        role="investor",
        is_active=True,
        is_verified=True,
        phone_number=payload.phone_number or "+919876543210",
        avatar_url=payload.avatar_url
    )
    return success_response(data=data, message="User profile updated")

@router.delete("/me", response_model=APIResponse[Dict[str, bool]])
async def delete_current_user():
    """Soft-deletes authenticated user's account."""
    return success_response(data={"deleted": True}, message="User account deleted successfully")

@router.get("", response_model=APIResponse[List[UserProfileDTO]])
async def list_users(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    role: Optional[str] = None,
    search: Optional[str] = None
):
    """Lists registered users with pagination, sorting, and role filtering."""
    users = [
        UserProfileDTO(
            id=f"user-uuid-{i}",
            email=f"user{i}@fundfit.ai",
            full_name=f"User {i}",
            role="investor",
            is_active=True,
            is_verified=True
        ) for i in range(1, page_size + 1)
    ]
    meta = {
        "page": page,
        "page_size": page_size,
        "total_records": 100,
        "total_pages": 5,
        "has_next": page < 5,
        "has_prev": page > 1
    }
    return success_response(data=users, meta=meta, message="User list retrieved")

@router.get("/{user_id}", response_model=APIResponse[UserProfileDTO])
async def get_user_by_id(user_id: str):
    """Fetches user details by user ID."""
    data = UserProfileDTO(
        id=user_id,
        email="targetuser@fundfit.ai",
        full_name="Target User",
        role="investor",
        is_active=True,
        is_verified=True
    )
    return success_response(data=data, message="User details fetched")

@router.patch("/{user_id}", response_model=APIResponse[UserProfileDTO])
async def patch_user_admin(user_id: str, payload: UserAdminPatchRequest):
    """Admin endpoint to patch user role or status flags."""
    data = UserProfileDTO(
        id=user_id,
        email="targetuser@fundfit.ai",
        full_name="Target User",
        role=payload.role or "investor",
        is_active=payload.is_active if payload.is_active is not None else True,
        is_verified=payload.is_verified if payload.is_verified is not None else True
    )
    return success_response(data=data, message="User status updated by admin")
