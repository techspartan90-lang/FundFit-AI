from pydantic import BaseModel
from typing import Optional, Dict, Any

class ProfileCreateOrUpdate(BaseModel):
    age: Optional[int] = 32
    occupation: Optional[str] = "Software Architect"
    annual_income: Optional[float] = 3600000.0
    annual_expenses: Optional[float] = 1200000.0
    total_assets: Optional[float] = 5000000.0
    total_liabilities: Optional[float] = 500000.0
    emergency_fund_value: Optional[float] = 600000.0
    dependents_count: Optional[int] = 2
    tax_bracket_percent: Optional[float] = 30.0
    liquidity_needs: Optional[str] = "Moderate"

class RiskAssessmentRequest(BaseModel):
    loss_aversion_score: float = 40.0
    risk_appetite_score: float = 75.0
    overconfidence_score: float = 30.0
    answers: Optional[Dict[str, Any]] = None

class ProfileResponse(ProfileCreateOrUpdate):
    id: int
    user_id: int
    behavioral_archetype: str

    class Config:
        from_attributes = True

class RiskAssessmentResponse(BaseModel):
    id: int
    user_id: int
    overall_risk_score: float
    risk_category: str
    loss_aversion_score: float
    risk_appetite_score: float

    class Config:
        from_attributes = True
