import uuid
from datetime import date
from typing import Optional, List, Dict, Any
from sqlalchemy import String, Date, ForeignKey, JSON, Numeric, Boolean, Text, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin

class AMC(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "amc"

    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    logo_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    total_aum: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    ceo_name: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    website: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    funds: Mapped[List["MutualFund"]] = relationship("MutualFund", back_populates="amc")

class FundCategory(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "fund_categories"

    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    asset_class: Mapped[str] = mapped_column(String(50), nullable=False)
    sub_category: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    risk_rating: Mapped[str] = mapped_column(String(50), default="Moderate")

    funds: Mapped[List["MutualFund"]] = relationship("MutualFund", back_populates="category")

class MutualFund(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "mutual_funds"

    scheme_code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    fund_name: Mapped[str] = mapped_column(String(255), nullable=False)
    amc_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("amc.id", ondelete="RESTRICT"), nullable=True, index=True)
    category_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("fund_categories.id", ondelete="RESTRICT"), nullable=True, index=True)
    benchmark_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("benchmarks.id", ondelete="SET NULL"), nullable=True)
    sub_category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    nav: Mapped[float] = mapped_column(Numeric(12, 4), nullable=False, default=0.0)
    expense_ratio: Mapped[float] = mapped_column(Numeric(5, 2), default=0.50)
    aum: Mapped[float] = mapped_column(Numeric(15, 2), default=0.0)
    risk_level: Mapped[str] = mapped_column(String(50), default="Very High Risk")

    return_1d: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    return_1m: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    return_3m: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    return_6m: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    return_1y: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    return_3y: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    return_5y: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    return_10y: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)

    sharpe_ratio: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    sortino_ratio: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    treynor_ratio: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    alpha: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    beta: Mapped[float] = mapped_column(Numeric(8, 2), default=1.0)
    standard_deviation: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)
    tracking_error: Mapped[float] = mapped_column(Numeric(8, 2), default=0.0)

    top_holdings: Mapped[Optional[List[Dict[str, Any]]]] = mapped_column(JSON, nullable=True)
    sector_allocation: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)
    exit_load: Mapped[Optional[str]] = mapped_column(String(255), default="1% within 1 yr")
    fund_manager: Mapped[Optional[str]] = mapped_column(String(255), default="Not Disclosed")
    launch_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # Relationships
    amc = relationship("AMC", back_populates="funds")
    category = relationship("FundCategory", back_populates="funds")
    benchmark = relationship("Benchmark", back_populates="funds")
    documents: Mapped[List["Document"]] = relationship("Document", back_populates="mutual_fund", cascade="all, delete-orphan")
    holdings: Mapped[List["PortfolioHolding"]] = relationship("PortfolioHolding", back_populates="mutual_fund")

class Document(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "documents"

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    document_type: Mapped[str] = mapped_column(String(50), nullable=False)
    mutual_fund_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("mutual_funds.id", ondelete="CASCADE"), nullable=True, index=True)
    file_path: Mapped[str] = mapped_column(String(512), nullable=False)
    mime_type: Mapped[str] = mapped_column(String(100), default="application/pdf")
    file_size_bytes: Mapped[int] = mapped_column(Integer, default=0)

    mutual_fund = relationship("MutualFund", back_populates="documents")
