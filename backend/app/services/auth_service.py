from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.user_repository import UserRepository
from app.models.user import User, UserRole
from app.core.security import get_password_hash, verify_password
from app.core.jwt import create_access_token, create_refresh_token
from app.core.exceptions import BadRequestException, CredentialsException

class AuthService:
    def __init__(self, session: AsyncSession):
        self.user_repo = UserRepository(session)

    async def register_user(self, email: str, password: str, full_name: str, role: str = "investor") -> User:
        existing = await self.user_repo.get_by_email(email)
        if existing:
            raise BadRequestException("User with this email already exists")

        hashed_pwd = get_password_hash(password)
        role_enum = UserRole(role.lower()) if role.lower() in [r.value for r in UserRole] else UserRole.INVESTOR

        user = User(
            email=email,
            hashed_password=hashed_pwd,
            full_name=full_name,
            role=role_enum
        )
        return await self.user_repo.create(user)

    async def login_user(self, email: str, password: str) -> dict:
        user = await self.user_repo.get_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            raise CredentialsException("Invalid email or password")

        access_token = create_access_token({"sub": str(user.id), "email": user.email, "role": user.role.value})
        refresh_token = create_refresh_token({"sub": str(user.id)})

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "expires_in": 3600,
            "user_id": user.id,
            "email": user.email,
            "role": user.role.value
        }
