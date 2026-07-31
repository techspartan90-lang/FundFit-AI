from sqlalchemy import String, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin

class MarketData(Base, TimestampMixin):
    __tablename__ = "market_data"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    index_name: Mapped[str] = mapped_column(String(50), nullable=False) # NIFTY 50, SENSEX, INDIA VIX
    value: Mapped[float] = mapped_column(Float, nullable=False)
    change_percent: Mapped[float] = mapped_column(Float, default=0.0)
    market_regime: Mapped[str] = mapped_column(String(50), default="Bullish Expansion")
    inflation_rate: Mapped[float] = mapped_column(Float, default=5.1)
    interest_rate: Mapped[float] = mapped_column(Float, default=6.5)

class Benchmark(Base, TimestampMixin):
    __tablename__ = "benchmarks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False) # NIFTY 50 TRI, NIFTY 500 TRI
    cagr_1y: Mapped[float] = mapped_column(Float, default=0.0)
    cagr_3y: Mapped[float] = mapped_column(Float, default=0.0)
    cagr_5y: Mapped[float] = mapped_column(Float, default=0.0)
