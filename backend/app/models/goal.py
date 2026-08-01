import uuid
from datetime import date
from typing import Optional, List
from sqlalchemy import String, Date, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin

class Goal(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "goals"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    target_amount: Mapped[float] = mapped_column(Numeric(15, 2), nullable=False)
    current_amount: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    target_date: Mapped[date] = mapped_column(Date, nullable=False)
    priority: Mapped[str] = mapped_column(String(20), default="Medium")
    status: Mapped[str] = mapped_column(String(50), default="In Progress")

    user = relationship("User", back_populates="goals")
    progress_history: Mapped[List["GoalProgress"]] = relationship("GoalProgress", back_populates="goal", cascade="all, delete-orphan")

class GoalProgress(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "goal_progress"

    goal_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("goals.id", ondelete="CASCADE"), nullable=False, index=True)
    snapshot_date: Mapped[date] = mapped_column(Date, default=date.today, nullable=False)
    achieved_amount: Mapped[float] = mapped_column(Numeric(15, 2), nullable=False)
    achievement_percentage: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    required_sip: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    required_investment: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    expected_completion_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    goal = relationship("Goal", back_populates="progress_history")
