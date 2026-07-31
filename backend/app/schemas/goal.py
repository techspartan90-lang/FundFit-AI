from pydantic import BaseModel
from typing import Optional

class GoalCreateRequest(BaseModel):
    name: str
    category: str = "Wealth"
    target_amount: float
    current_amount: Optional[float] = 0.0
    target_year: int
    current_monthly_sip: Optional[float] = 0.0
    priority: Optional[str] = "High"

class GoalResponse(GoalCreateRequest):
    id: int
    user_id: int
    completion_probability: float

    class Config:
        from_attributes = True
