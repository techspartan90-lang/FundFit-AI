from fastapi import APIRouter
from typing import Dict, Any, List
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/market", tags=["Market Data"])

@router.get("/overview", response_model=APIResponse[Dict[str, Any]])
async def get_market_overview():
    """Fetches high-level macro market snapshot across indices, VIX, commodities, and FX."""
    overview = {
        "nifty_50": {"close": 24850.20, "change": 142.50, "pct_change": 0.58},
        "sensex": {"close": 81450.60, "change": 420.10, "pct_change": 0.52},
        "bank_nifty": {"close": 52100.40, "change": 210.30, "pct_change": 0.40},
        "india_vix": {"close": 14.25, "change": -0.65, "pct_change": -4.36},
        "gold": {"close": 74500.0, "change": 150.0, "pct_change": 0.20},
        "usdinr": {"close": 83.52, "change": 0.05, "pct_change": 0.06},
        "market_sentiment": "Bullish Momentum"
    }
    return success_response(data=overview, message="Market overview retrieved")

@router.get("/nifty", response_model=APIResponse[Dict[str, Any]])
async def get_nifty_data():
    """Fetches detailed NIFTY 50 index quote and 52-week statistics."""
    data = {"symbol": "NIFTY 50", "close": 24850.20, "day_high": 24910.0, "day_low": 24780.0, "52w_high": 25300.0, "52w_low": 19200.0}
    return success_response(data=data, message="NIFTY data retrieved")

@router.get("/sensex", response_model=APIResponse[Dict[str, Any]])
async def get_sensex_data():
    """Fetches BSE SENSEX index quote."""
    data = {"symbol": "SENSEX", "close": 81450.60, "day_high": 81600.0, "day_low": 81200.0, "52w_high": 83000.0, "52w_low": 64000.0}
    return success_response(data=data, message="SENSEX data retrieved")

@router.get("/banknifty", response_model=APIResponse[Dict[str, Any]])
async def get_banknifty_data():
    """Fetches BANK NIFTY index quote."""
    data = {"symbol": "BANK NIFTY", "close": 52100.40, "day_high": 52300.0, "day_low": 51900.0, "52w_high": 54000.0, "52w_low": 43000.0}
    return success_response(data=data, message="BANK NIFTY data retrieved")

@router.get("/vix", response_model=APIResponse[Dict[str, Any]])
async def get_vix_data():
    """Fetches India VIX volatility index level and risk interpretation."""
    data = {"symbol": "India VIX", "level": 14.25, "regime": "Normal Volatility", "risk_level": "Moderate Risk"}
    return success_response(data=data, message="VIX data retrieved")

@router.get("/sectors", response_model=APIResponse[List[Dict[str, Any]]])
async def get_sector_performance():
    """Fetches sectoral index performance (IT, Banking, Auto, Pharma, FMCG)."""
    sectors = [
        {"sector": "NIFTY IT", "pct_change_1d": 1.25, "pct_change_1m": 4.80},
        {"sector": "NIFTY BANK", "pct_change_1d": 0.40, "pct_change_1m": 1.50},
        {"sector": "NIFTY AUTO", "pct_change_1d": 0.85, "pct_change_1m": 3.20},
        {"sector": "NIFTY PHARMA", "pct_change_1d": -0.15, "pct_change_1m": 2.10},
        {"sector": "NIFTY FMCG", "pct_change_1d": 0.10, "pct_change_1m": 0.90}
    ]
    return success_response(data=sectors, message="Sector performance retrieved")

@router.get("/economic-indicators", response_model=APIResponse[List[Dict[str, Any]]])
async def get_economic_indicators():
    """Fetches macro indicators (Repo Rate, Inflation, GDP Growth, CPI, Bond Yields)."""
    indicators = [
        {"indicator": "Repo Rate", "value": 6.50, "unit": "%", "frequency": "Bi-Monthly"},
        {"indicator": "CPI Inflation", "value": 4.85, "unit": "%", "frequency": "Monthly"},
        {"indicator": "GDP Growth", "value": 7.20, "unit": "%", "frequency": "Quarterly"},
        {"indicator": "10Y G-Sec Bond Yield", "value": 7.08, "unit": "%", "frequency": "Daily"}
    ]
    return success_response(data=indicators, message="Economic indicators retrieved")

@router.get("/regime", response_model=APIResponse[Dict[str, Any]])
async def get_market_regime():
    """Fetches current AI-detected macroeconomic regime."""
    data = {
        "regime_type": "Bull Market",
        "confidence_score": 88.5,
        "volatility_regime": "Normal",
        "trend_strength": 75.0,
        "description": "Sustained upward equity momentum supported by strong corporate earnings and moderate VIX."
    }
    return success_response(data=data, message="Market regime retrieved")
