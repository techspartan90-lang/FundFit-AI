import uuid
from datetime import date
from typing import Optional, List, Dict, Any
from sqlalchemy import String, Date, ForeignKey, JSON, Numeric, UniqueConstraint, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin

class Benchmark(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "benchmarks"

    symbol: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    index_type: Mapped[str] = mapped_column(String(50), default="Equity")

    history: Mapped[List["BenchmarkHistory"]] = relationship("BenchmarkHistory", back_populates="benchmark", cascade="all, delete-orphan")
    funds: Mapped[List["MutualFund"]] = relationship("MutualFund", back_populates="benchmark")

class BenchmarkHistory(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "benchmark_history"
    __table_args__ = (UniqueConstraint("benchmark_id", "record_date", name="uq_benchmark_history"),)

    benchmark_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("benchmarks.id", ondelete="CASCADE"), nullable=False, index=True)
    record_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    close_value: Mapped[float] = mapped_column(Numeric(12, 4), nullable=False)
    return_1d: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    return_1y: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    volatility_30d: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)

    benchmark = relationship("Benchmark", back_populates="history")

class MarketData(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "market_data"

    record_date: Mapped[date] = mapped_column(Date, unique=True, index=True, nullable=False)
    nifty: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    sensex: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    bank_nifty: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    midcap: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    smallcap: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    india_vix: Mapped[float] = mapped_column(Numeric(6, 2), nullable=False)
    gold: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    silver: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    usdinr: Mapped[float] = mapped_column(Numeric(6, 2), nullable=False)
    repo_rate: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    inflation: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    gdp: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    cpi: Mapped[float] = mapped_column(Numeric(6, 2), nullable=False)
    bond_yield: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    sector_index: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)
    market_sentiment: Mapped[str] = mapped_column(String(50), default="Neutral")

class EconomicIndicator(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "economic_indicators"
    __table_args__ = (UniqueConstraint("indicator_name", "record_date", name="uq_economic_indicator"),)

    record_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    indicator_name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    indicator_value: Mapped[float] = mapped_column(Numeric(12, 4), nullable=False)
    frequency: Mapped[str] = mapped_column(String(50), default="Monthly")
    unit: Mapped[str] = mapped_column(String(50), default="%")
    impact_level: Mapped[str] = mapped_column(String(50), default="Medium")

class MarketRegime(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "market_regimes"

    record_date: Mapped[date] = mapped_column(Date, unique=True, index=True, nullable=False)
    regime_type: Mapped[str] = mapped_column(String(50), nullable=False) # Bull Market, Bear Market, Recovery, Correction, Sideways
    confidence_score: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    volatility_regime: Mapped[str] = mapped_column(String(50), default="Normal")
    trend_strength: Mapped[float] = mapped_column(Numeric(5, 2), default=50.0)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
