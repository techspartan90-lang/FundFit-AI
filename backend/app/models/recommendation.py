from sqlalchemy import String, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin

class Recommendation(Base, TimestampMixin):
    __tablename__ = "recommendations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    fund_id: Mapped[int] = mapped_column(ForeignKey("mutual_funds.id"), nullable=False)
    action_signal: Mapped[str] = mapped_column(String(50), nullable=False) # Strong Buy, Hold, Switch, Exit, Increase SIP
    confidence_score: Mapped[float] = mapped_column(Float, default=95.0)
    ai_reasoning: Mapped[str] = mapped_column(String(1000), nullable=False)
    is_dismissed: Mapped[bool] = mapped_column(Boolean, default=False)

class Alert(Base, TimestampMixin):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    alert_type: Mapped[str] = mapped_column(String(50), nullable=False) # Fund Mismatch, Portfolio Drift, High Risk
    message: Mapped[str] = mapped_column(String(500), nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)

class Report(Base, TimestampMixin):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    report_type: Mapped[str] = mapped_column(String(50), nullable=False) # Tax, Audit, Goal, CAS
    file_path: Mapped[str] = mapped_column(String(512), nullable=False)

class Notification(Base, TimestampMixin):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(String(1000), nullable=False)
    channel: Mapped[str] = mapped_column(String(50), default="In-App") # In-App, Email, Push
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
