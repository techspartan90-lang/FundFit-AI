from pydantic import BaseModel

class RecommendationResponse(BaseModel):
    id: int
    user_id: int
    fund_id: int
    action_signal: str
    confidence_score: float
    ai_reasoning: str

    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: int
    user_id: int
    alert_type: str
    message: str
    is_read: bool

    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    body: str
    channel: str
    is_read: bool

    class Config:
        from_attributes = True
