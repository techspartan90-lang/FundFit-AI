from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.portfolio import Portfolio, PortfolioHolding, Transaction

class PortfolioRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_user_id(self, user_id: int) -> Optional[Portfolio]:
        result = await self.session.execute(select(Portfolio).where(Portfolio.user_id == user_id))
        return result.scalars().first()

    async def create_portfolio(self, portfolio: Portfolio) -> Portfolio:
        self.session.add(portfolio)
        await self.session.flush()
        return portfolio

    async def add_holding(self, holding: PortfolioHolding) -> PortfolioHolding:
        self.session.add(holding)
        await self.session.flush()
        return holding

    async def get_holdings(self, portfolio_id: int) -> List[PortfolioHolding]:
        result = await self.session.execute(select(PortfolioHolding).where(PortfolioHolding.portfolio_id == portfolio_id))
        return list(result.scalars().all())
