from sqlalchemy import String, Float, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import TimestampMixin

class Goal(Base, TimestampMixin):
    __tablename__ = "goals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False) # Retirement, Education, House, Emergency
    category: Mapped[str] = mapped_column(String(50), default="Wealth")
    target_amount: Mapped[float] = mapped_column(Float, nullable=False)
    current_amount: Mapped[float] = mapped_column(Float, default=0.0)
    target_year: Mapped[int] = mapped_column(Integer, nullable=False)
    current_monthly_sip: Mapped[float] = mapped_column(Float, default=0.0)
    completion_probability: Mapped[float] = mapped_column(Float, default=90.0)
    priority: Mapped[str] = mapped_column(String(20), default="High")

    user = relationship("User", back_populates="goals")
