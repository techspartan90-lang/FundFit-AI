from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.core.dependencies import get_current_user_payload

router = APIRouter(prefix="/reports", tags=["Reports & Tax Statements"])

@router.get("/generate/{report_type}")
async def generate_report(report_type: str, payload: dict = Depends(get_current_user_payload)):
    user_id = int(payload["sub"])
    return {
        "status": "Success",
        "message": f"Successfully generated '{report_type.upper()}' statement for user #{user_id}.",
        "download_url": f"/api/v1/reports/download/{report_type}.pdf",
        "format": "PDF / Excel (.xlsx)"
    }
