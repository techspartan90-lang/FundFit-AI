import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, DateTime, ForeignKey, Numeric, Boolean, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin

class Portfolio(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "portfolios"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), default="My Wealth Portfolio", nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_default: Mapped[bool] = mapped_column(Boolean, default=True)

    total_value: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    total_invested: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    total_gain_loss: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    gain_loss_percent: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)

    # Relationships
    user = relationship("User", back_populates="portfolios")
    holdings: Mapped[List["PortfolioHolding"]] = relationship("PortfolioHolding", back_populates="portfolio", cascade="all, delete-orphan")
    transactions: Mapped[List["Transaction"]] = relationship("Transaction", back_populates="portfolio", cascade="all, delete-orphan")

class PortfolioHolding(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "portfolio_holdings"

    portfolio_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("portfolios.id", ondelete="CASCADE"), nullable=False, index=True)
    mutual_fund_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("mutual_funds.id", ondelete="RESTRICT"), nullable=False, index=True)

    units: Mapped[float] = mapped_column(Numeric(15, 4), default=0.0)
    avg_buy_nav: Mapped[float] = mapped_column(Numeric(12, 4), default=0.0)
    current_nav: Mapped[float] = mapped_column(Numeric(12, 4), default=0.0)
    current_value: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    total_invested: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    gain_loss: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    asset_type: Mapped[str] = mapped_column(String(50), default="Equity")
    allocation_percent: Mapped[float] = mapped_column(Numeric(5, 2), default=0.0)

    portfolio = relationship("Portfolio", back_populates="holdings")
    mutual_fund = relationship("MutualFund", back_populates="holdings")

class Transaction(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "transactions"

    portfolio_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("portfolios.id", ondelete="CASCADE"), nullable=False, index=True)
    mutual_fund_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("mutual_funds.id", ondelete="RESTRICT"), nullable=False, index=True)

    transaction_type: Mapped[str] = mapped_column(String(20), nullable=False) # BUY, SELL, SIP, SWITCH
    units: Mapped[float] = mapped_column(Numeric(15, 4), nullable=False)
    nav: Mapped[float] = mapped_column(Numeric(12, 4), nullable=False)
    amount: Mapped[float] = mapped_column(Numeric(15, 2), nullable=False)
    transaction_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(50), default="COMPLETED")
    reference_no: Mapped[Optional[str]] = mapped_column(String(100), unique=True, nullable=True)

    portfolio = relationship("Portfolio", back_populates="transactions")

class Watchlist(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "watchlists"
    __table_args__ = (UniqueConstraint("user_id", "mutual_fund_id", name="uq_user_watchlist_fund"),)

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    mutual_fund_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("mutual_funds.id", ondelete="CASCADE"), nullable=False)
    target_nav: Mapped[Optional[float]] = mapped_column(Numeric(12, 4), nullable=True)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    user = relationship("User", back_populates="watchlists")
