import uuid
from datetime import datetime
from typing import Optional, Dict, Any
from sqlalchemy import String, DateTime, ForeignKey, JSON, Numeric, Boolean, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin

class Recommendation(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "recommendations"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    portfolio_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("portfolios.id", ondelete="SET NULL"), nullable=True)
    target_fund_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("mutual_funds.id", ondelete="SET NULL"), nullable=True)
    current_fund_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("mutual_funds.id", ondelete="SET NULL"), nullable=True)

    action: Mapped[str] = mapped_column(String(50), nullable=False) # BUY, HOLD, SWITCH, EXIT, REBALANCE, INCREASE_SIP, DECREASE_SIP
    recommended_amount: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    recommended_sip_amount: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    confidence_score: Mapped[float] = mapped_column(Numeric(5, 2), default=85.0)
    status: Mapped[str] = mapped_column(String(50), default="ACTIVE") # ACTIVE, EXECUTED, DISMISSED, EXPIRED

    why_explanation: Mapped[str] = mapped_column(Text, nullable=False)
    supporting_metrics: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)
    risk_factors: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)
    expected_outcome: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)

    user = relationship("User", back_populates="recommendations")

class RecommendationHistory(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "recommendation_history"

    recommendation_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("recommendations.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    action_taken: Mapped[str] = mapped_column(String(50), nullable=False)
    executed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    performance_impact: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)

class Alert(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "alerts"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    alert_type: Mapped[str] = mapped_column(String(50), nullable=False) # Goal Delay, High Risk, Portfolio Drift, Market Crash, Fund Underperformance, Better Alternative Available, SIP Reminder
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[str] = mapped_column(String(20), default="MEDIUM")
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    triggered_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    payload: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)

    user = relationship("User", back_populates="alerts")

class Notification(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "notifications"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    channel: Mapped[str] = mapped_column(String(50), default="IN_APP")
    is_sent: Mapped[bool] = mapped_column(Boolean, default=False)
    sent_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="notifications")

class Report(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "reports"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    portfolio_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("portfolios.id", ondelete="SET NULL"), nullable=True)
    report_type: Mapped[str] = mapped_column(String(50), nullable=False) # PORTFOLIO_HEALTH, TAX_STATEMENT, PERFORMANCE_SUMMARY, RISK_AUDIT
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    file_url: Mapped[str] = mapped_column(String(512), nullable=False)
    format: Mapped[str] = mapped_column(String(20), default="PDF")
