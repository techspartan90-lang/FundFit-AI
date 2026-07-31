from sqlalchemy import String, Float, Integer, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import TimestampMixin

class InvestorProfile(Base, TimestampMixin):
    __tablename__ = "investor_profiles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=True)
    occupation: Mapped[str] = mapped_column(String(100), nullable=True)
    annual_income: Mapped[float] = mapped_column(Float, default=0.0)
    annual_expenses: Mapped[float] = mapped_column(Float, default=0.0)
    total_assets: Mapped[float] = mapped_column(Float, default=0.0)
    total_liabilities: Mapped[float] = mapped_column(Float, default=0.0)
    emergency_fund_value: Mapped[float] = mapped_column(Float, default=0.0)
    dependents_count: Mapped[int] = mapped_column(Integer, default=0)
    tax_bracket_percent: Mapped[float] = mapped_column(Float, default=30.0)
    liquidity_needs: Mapped[str] = mapped_column(String(100), default="Moderate")
    behavioral_archetype: Mapped[str] = mapped_column(String(100), default="Balanced Growth")

    user = relationship("User", back_populates="profile")

class RiskAssessment(Base, TimestampMixin):
    __tablename__ = "risk_assessments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    loss_aversion_score: Mapped[float] = mapped_column(Float, default=50.0)
    risk_appetite_score: Mapped[float] = mapped_column(Float, default=60.0)
    overconfidence_score: Mapped[float] = mapped_column(Float, default=30.0)
    overall_risk_score: Mapped[float] = mapped_column(Float, default=65.0)
    risk_category: Mapped[str] = mapped_column(String(50), default="Moderate Aggressive")
    assessment_answers: Mapped[dict] = mapped_column(JSON, nullable=True)
