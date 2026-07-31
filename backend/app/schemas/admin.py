from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AuditLogResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    action: str
    module: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
