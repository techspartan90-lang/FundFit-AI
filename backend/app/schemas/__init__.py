from app.schemas.auth import UserRegisterRequest, UserLoginRequest, TokenResponse, RefreshTokenRequest
from app.schemas.user import UserResponse, UserUpdateRequest
from app.schemas.profile import ProfileCreateOrUpdate, ProfileResponse, RiskAssessmentRequest, RiskAssessmentResponse
from app.schemas.portfolio import HoldingCreateRequest, HoldingResponse, PortfolioResponse, TransactionCreateRequest, TransactionResponse
from app.schemas.fund import MutualFundCreateRequest, MutualFundResponse
from app.schemas.goal import GoalCreateRequest, GoalResponse
from app.schemas.market import MarketDataResponse, BenchmarkResponse
from app.schemas.recommendation import RecommendationResponse, AlertResponse, NotificationResponse
from app.schemas.advisor import AdvisorResponse, ClientResponse
from app.schemas.admin import AuditLogResponse

__all__ = [
    "UserRegisterRequest", "UserLoginRequest", "TokenResponse", "RefreshTokenRequest",
    "UserResponse", "UserUpdateRequest",
    "ProfileCreateOrUpdate", "ProfileResponse", "RiskAssessmentRequest", "RiskAssessmentResponse",
    "HoldingCreateRequest", "HoldingResponse", "PortfolioResponse", "TransactionCreateRequest", "TransactionResponse",
    "MutualFundCreateRequest", "MutualFundResponse",
    "GoalCreateRequest", "GoalResponse",
    "MarketDataResponse", "BenchmarkResponse",
    "RecommendationResponse", "AlertResponse", "NotificationResponse",
    "AdvisorResponse", "ClientResponse",
    "AuditLogResponse"
]
