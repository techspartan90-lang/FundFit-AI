from fastapi import APIRouter
from app.ai.adaptive_benchmark import AdaptiveBenchmarkEngine

router = APIRouter(prefix="/benchmark", tags=["Adaptive Benchmarks"])

@router.get("/custom")
async def get_adaptive_benchmark(equity_weight: float = 70.0, debt_weight: float = 30.0):
    result = AdaptiveBenchmarkEngine.compute_custom_benchmark(equity_weight, debt_weight)
    return result
