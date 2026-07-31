from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.fund import MutualFund

class FundRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_all(self, category: Optional[str] = None) -> List[MutualFund]:
        query = select(MutualFund)
        if category:
            query = query.where(MutualFund.category == category)
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_by_id(self, fund_id: int) -> Optional[MutualFund]:
        result = await self.session.execute(select(MutualFund).where(MutualFund.id == fund_id))
        return result.scalars().first()

    async def create(self, fund: MutualFund) -> MutualFund:
        self.session.add(fund)
        await self.session.flush()
        return fund
