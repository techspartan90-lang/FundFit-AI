import uuid
from typing import Optional, Dict, Any
from sqlalchemy import String, Float, Integer, ForeignKey, JSON, Numeric, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin

class InvestorProfile(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "investor_profiles"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    age: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    occupation: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    salary: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    monthly_income: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    monthly_expenses: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    assets: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    liabilities: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    net_worth: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    emergency_fund: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    investment_experience: Mapped[str] = mapped_column(String(50), default="Beginner")
    financial_knowledge: Mapped[str] = mapped_column(String(50), default="Basic")
    tax_bracket: Mapped[str] = mapped_column(String(50), default="30%")
    liquidity_need: Mapped[str] = mapped_column(String(50), default="Moderate")
    dependents: Mapped[int] = mapped_column(Integer, default=0)
    risk_preference: Mapped[str] = mapped_column(String(50), default="Moderate")
    behavior_profile: Mapped[str] = mapped_column(String(50), default="Balanced")
    investment_goals: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    time_horizon: Mapped[str] = mapped_column(String(50), default="5-10 Years")

    # Relationship
    user = relationship("User", back_populates="profile")

class RiskAssessment(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "risk_assessments"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    risk_score: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    risk_category: Mapped[str] = mapped_column(String(50), nullable=False)
    downside_risk: Mapped[float] = mapped_column(Numeric(5, 2), default=0.0)
    expected_volatility: Mapped[float] = mapped_column(Numeric(5, 2), default=0.0)
    drawdown_tolerance: Mapped[float] = mapped_column(Numeric(5, 2), default=0.0)
    assessment_answers: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)

    user = relationship("User", back_populates="risk_assessments")

class BehaviorProfile(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "behavior_profiles"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    loss_aversion: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)
    overconfidence: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)
    anchoring_bias: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)
    recency_bias: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)
    herd_mentality: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)
    emotional_investing: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)
    patience: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)
    decision_style: Mapped[str] = mapped_column(String(50), default="Analytical")
    confidence_level: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)

    user = relationship("User", back_populates="behavior_profile")
