from pydantic import BaseModel

class MarketDataResponse(BaseModel):
    id: int
    index_name: str
    value: float
    change_percent: float
    market_regime: str
    inflation_rate: float
    interest_rate: float

    class Config:
        from_attributes = True

class BenchmarkResponse(BaseModel):
    id: int
    name: str
    cagr_1y: float
    cagr_3y: float
    cagr_5y: float

    class Config:
        from_attributes = True
