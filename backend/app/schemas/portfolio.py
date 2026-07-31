from pydantic import BaseModel
from typing import List, Optional

class HoldingCreateRequest(BaseModel):
    fund_id: int
    units_owned: float
    average_nav: float
    monthly_sip_amount: Optional[float] = 0.0

class HoldingResponse(BaseModel):
    id: int
    portfolio_id: int
    fund_id: int
    units_owned: float
    average_nav: float
    invested_value: float
    current_value: float
    returns_inr: float
    xirr_percent: float
    monthly_sip_amount: float
    fund_fit_score: int

    class Config:
        from_attributes = True

class PortfolioResponse(BaseModel):
    id: int
    user_id: int
    name: str
    total_invested: float
    current_value: float
    total_returns_inr: float
    xirr_percent: float
    cagr_percent: float
    health_score: int
    holdings: List[HoldingResponse] = []

    class Config:
        from_attributes = True

class TransactionCreateRequest(BaseModel):
    portfolio_id: int
    fund_id: int
    transaction_type: str
    units: float
    nav: float
    amount: float

class TransactionResponse(TransactionCreateRequest):
    id: int
    status: str

    class Config:
        from_attributes = True
