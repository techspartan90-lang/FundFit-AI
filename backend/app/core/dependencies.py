from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.jwt import decode_token
from app.core.exceptions import CredentialsException, PermissionDeniedException

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

async def get_current_user_payload(token: str = Depends(oauth2_scheme)) -> dict:
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise CredentialsException()
    return payload

def require_roles(allowed_roles: list[str]):
    async def role_checker(payload: dict = Depends(get_current_user_payload)):
        user_role = payload.get("role", "investor")
        if user_role not in allowed_roles:
            raise PermissionDeniedException(f"Role '{user_role}' is not authorized to access this endpoint.")
        return payload
    return role_checker
