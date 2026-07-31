from pydantic import BaseModel
from typing import Optional, List, Any

class MutualFundCreateRequest(BaseModel):
    scheme_code: str
    name: str
    amc_name: str
    category: str
    risk_level: Optional[str] = "Very High Risk"
    current_nav: float
    aum_in_crores: Optional[float] = 1000.0
    expense_ratio: Optional[float] = 0.5
    fund_manager: Optional[str] = "Fund Manager"
    cagr_1y: Optional[float] = 15.0
    cagr_3y: Optional[float] = 20.0
    cagr_5y: Optional[float] = 18.0
    top_holdings: Optional[List[Any]] = None

class MutualFundResponse(MutualFundCreateRequest):
    id: int
    sharpe_ratio: float
    alpha: float
    beta: float
    fund_fit_score: int

    class Config:
        from_attributes = True
