from sqlalchemy import String, Float, Integer, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import TimestampMixin

class Portfolio(Base, TimestampMixin):
    __tablename__ = "portfolios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), default="Primary Mutual Fund Portfolio")
    total_invested: Mapped[float] = mapped_column(Float, default=0.0)
    current_value: Mapped[float] = mapped_column(Float, default=0.0)
    total_returns_inr: Mapped[float] = mapped_column(Float, default=0.0)
    xirr_percent: Mapped[float] = mapped_column(Float, default=0.0)
    cagr_percent: Mapped[float] = mapped_column(Float, default=0.0)
    health_score: Mapped[int] = mapped_column(Integer, default=90)

    user = relationship("User", back_populates="portfolios")
    holdings = relationship("PortfolioHolding", back_populates="portfolio")

class PortfolioHolding(Base, TimestampMixin):
    __tablename__ = "portfolio_holdings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    portfolio_id: Mapped[int] = mapped_column(ForeignKey("portfolios.id"), nullable=False)
    fund_id: Mapped[int] = mapped_column(ForeignKey("mutual_funds.id"), nullable=False)
    units_owned: Mapped[float] = mapped_column(Float, default=0.0)
    average_nav: Mapped[float] = mapped_column(Float, default=0.0)
    invested_value: Mapped[float] = mapped_column(Float, default=0.0)
    current_value: Mapped[float] = mapped_column(Float, default=0.0)
    returns_inr: Mapped[float] = mapped_column(Float, default=0.0)
    xirr_percent: Mapped[float] = mapped_column(Float, default=0.0)
    monthly_sip_amount: Mapped[float] = mapped_column(Float, default=0.0)
    fund_fit_score: Mapped[int] = mapped_column(Integer, default=95)

    portfolio = relationship("Portfolio", back_populates="holdings")
    fund = relationship("MutualFund")

class Transaction(Base, TimestampMixin):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    portfolio_id: Mapped[int] = mapped_column(ForeignKey("portfolios.id"), nullable=False)
    fund_id: Mapped[int] = mapped_column(ForeignKey("mutual_funds.id"), nullable=False)
    transaction_type: Mapped[str] = mapped_column(String(50), nullable=False) # BUY, SELL, SIP, REDEEM
    units: Mapped[float] = mapped_column(Float, nullable=False)
    nav: Mapped[float] = mapped_column(Float, nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Completed")

class Watchlist(Base, TimestampMixin):
    __tablename__ = "watchlists"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    fund_id: Mapped[int] = mapped_column(ForeignKey("mutual_funds.id"), nullable=False)
