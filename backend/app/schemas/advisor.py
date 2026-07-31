from pydantic import BaseModel
from typing import Optional

class AdvisorResponse(BaseModel):
    id: int
    user_id: int
    arn_number: str
    firm_name: Optional[str] = None
    total_client_aum: float

    class Config:
        from_attributes = True

class ClientResponse(BaseModel):
    id: int
    advisor_id: int
    investor_user_id: int
    status: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True
