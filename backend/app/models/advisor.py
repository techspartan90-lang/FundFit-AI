from sqlalchemy import String, Float, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin

class Advisor(Base, TimestampMixin):
    __tablename__ = "advisors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    arn_number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    firm_name: Mapped[str] = mapped_column(String(255), nullable=True)
    total_client_aum: Mapped[float] = mapped_column(Float, default=0.0)

class Client(Base, TimestampMixin):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    advisor_id: Mapped[int] = mapped_column(ForeignKey("advisors.id"), nullable=False)
    investor_user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Healthy")
    notes: Mapped[str] = mapped_column(String(1000), nullable=True)
