from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.goal import Goal

class GoalRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_user_goals(self, user_id: int) -> List[Goal]:
        result = await self.session.execute(select(Goal).where(Goal.user_id == user_id))
        return list(result.scalars().all())

    async def create(self, goal: Goal) -> Goal:
        self.session.add(goal)
        await self.session.flush()
        return goal
