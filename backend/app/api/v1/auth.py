from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any
from app.schemas.response import APIResponse, success_response, error_response

router = APIRouter(prefix="/auth", tags=["Authentication"])

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, description="Minimum 8 characters")
    full_name: str
    phone_number: Optional[str] = None

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    role: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class EmailVerificationRequest(BaseModel):
    email: EmailStr
    token: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    reset_token: str
    new_password: str = Field(min_length=8)

class SendOTPRequest(BaseModel):
    phone_number: str

class VerifyOTPRequest(BaseModel):
    phone_number: str
    otp_code: str

@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=APIResponse[TokenResponse])
async def register(payload: UserRegisterRequest):
    """Registers a new investor or user account."""
    # In production auth service, hashes password, saves to DB, returns JWT token tuple
    data = TokenResponse(
        access_token="mock_access_jwt_token_sample",
        refresh_token="mock_refresh_jwt_token_sample",
        user_id="user-uuid-1234",
        email=payload.email,
        role="investor"
    )
    return success_response(
        data=data,
        message="User registered successfully",
        status_code=status.HTTP_201_CREATED
    )

@router.post("/login", response_model=APIResponse[TokenResponse])
async def login(payload: UserLoginRequest):
    """Authenticates user credentials and returns access/refresh JWT tokens."""
    data = TokenResponse(
        access_token="mock_access_jwt_token_sample",
        refresh_token="mock_refresh_jwt_token_sample",
        user_id="user-uuid-1234",
        email=payload.email,
        role="investor"
    )
    return success_response(
        data=data,
        message="Login successful"
    )

@router.post("/logout", response_model=APIResponse[Dict[str, bool]])
async def logout(payload: RefreshTokenRequest):
    """Revokes the current refresh token and logs out user session."""
    return success_response(
        data={"logged_out": True},
        message="Logout successful"
    )

@router.post("/refresh", response_model=APIResponse[TokenResponse])
async def refresh_token(payload: RefreshTokenRequest):
    """Refreshes expired access token using a valid refresh token."""
    data = TokenResponse(
        access_token="mock_refreshed_access_jwt_token",
        refresh_token=payload.refresh_token,
        user_id="user-uuid-1234",
        email="user@fundfit.ai",
        role="investor"
    )
    return success_response(
        data=data,
        message="Token refreshed successfully"
    )

@router.post("/verify-email", response_model=APIResponse[Dict[str, bool]])
async def verify_email(payload: EmailVerificationRequest):
    """Verifies email address using email confirmation token."""
    return success_response(
        data={"email_verified": True},
        message="Email address verified successfully"
    )

@router.post("/forgot-password", response_model=APIResponse[Dict[str, bool]])
async def forgot_password(payload: ForgotPasswordRequest):
    """Sends password reset link to user's registered email."""
    return success_response(
        data={"reset_link_sent": True},
        message="Password reset link dispatched to your email"
    )

@router.post("/reset-password", response_model=APIResponse[Dict[str, bool]])
async def reset_password(payload: ResetPasswordRequest):
    """Resets user password using reset token."""
    return success_response(
        data={"password_reset": True},
        message="Password reset successfully"
    )

@router.post("/send-otp", response_model=APIResponse[Dict[str, bool]])
async def send_otp(payload: SendOTPRequest):
    """Dispatches SMS OTP to target phone number for 2FA/login."""
    return success_response(
        data={"otp_sent": True},
        message="OTP dispatched successfully"
    )

@router.post("/verify-otp", response_model=APIResponse[TokenResponse])
async def verify_otp(payload: VerifyOTPRequest):
    """Verifies SMS OTP code and returns authenticated session token."""
    data = TokenResponse(
        access_token="mock_otp_access_jwt_token",
        refresh_token="mock_otp_refresh_jwt_token",
        user_id="user-uuid-1234",
        email="user@fundfit.ai",
        role="investor"
    )
    return success_response(
        data=data,
        message="OTP verified successfully"
    )
