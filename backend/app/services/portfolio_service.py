from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.portfolio_repository import PortfolioRepository
from app.models.portfolio import Portfolio, PortfolioHolding
from app.ai.portfolio_health import PortfolioHealthEngine

class PortfolioService:
    def __init__(self, session: AsyncSession):
        self.portfolio_repo = PortfolioRepository(session)

    async def get_or_create_portfolio(self, user_id: int) -> Portfolio:
        portfolio = await self.portfolio_repo.get_by_user_id(user_id)
        if not portfolio:
            portfolio = Portfolio(
                user_id=user_id,
                name="Primary Wealth Portfolio",
                total_invested=2000000.0,
                current_value=2485453.0,
                total_returns_inr=485453.0,
                xirr_percent=18.4,
                cagr_percent=16.2,
                health_score=92
            )
            portfolio = await self.portfolio_repo.create_portfolio(portfolio)
        return portfolio

    async def add_holding(self, portfolio_id: int, fund_id: int, units: float, avg_nav: float, sip_amount: float) -> PortfolioHolding:
        invested = units * avg_nav
        current = units * (avg_nav * 1.2) # Mock 20% gain
        returns = current - invested

        holding = PortfolioHolding(
            portfolio_id=portfolio_id,
            fund_id=fund_id,
            units_owned=units,
            average_nav=avg_nav,
            invested_value=invested,
            current_value=current,
            returns_inr=returns,
            xirr_percent=18.4,
            monthly_sip_amount=sip_amount,
            fund_fit_score=95
        )
        return await self.portfolio_repo.add_holding(holding)
