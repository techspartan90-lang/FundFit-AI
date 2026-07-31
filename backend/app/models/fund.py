from sqlalchemy import String, Float, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin

class MutualFund(Base, TimestampMixin):
    __tablename__ = "mutual_funds"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    scheme_code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    amc_name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False) # Flexi Cap, Small Cap, Large Cap, Mid Cap
    risk_level: Mapped[str] = mapped_column(String(50), default="Very High Risk")
    current_nav: Mapped[float] = mapped_column(Float, nullable=False)
    aum_in_crores: Mapped[float] = mapped_column(Float, default=0.0)
    expense_ratio: Mapped[float] = mapped_column(Float, default=0.5)
    fund_manager: Mapped[str] = mapped_column(String(100), default="Not Disclosed")
    cagr_1y: Mapped[float] = mapped_column(Float, default=0.0)
    cagr_3y: Mapped[float] = mapped_column(Float, default=0.0)
    cagr_5y: Mapped[float] = mapped_column(Float, default=0.0)
    sharpe_ratio: Mapped[float] = mapped_column(Float, default=1.5)
    alpha: Mapped[float] = mapped_column(Float, default=3.5)
    beta: Mapped[float] = mapped_column(Float, default=0.95)
    fund_fit_score: Mapped[int] = mapped_column(Integer, default=90)
    top_holdings: Mapped[list] = mapped_column(JSON, nullable=True)

class Document(Base, TimestampMixin):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    document_type: Mapped[str] = mapped_column(String(50), nullable=False) # KIM, SID, Factsheet
    file_path: Mapped[str] = mapped_column(String(512), nullable=False)
