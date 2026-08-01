from fastapi import APIRouter, Response, status
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/reports", tags=["Reports"])

class GenerateReportRequest(BaseModel):
    portfolio_id: Optional[str] = None
    report_type: str = "PORTFOLIO_HEALTH" # PORTFOLIO_HEALTH, GOAL_PROGRESS, RISK_AUDIT, TAX_STATEMENT
    title: str = "Portfolio Intelligence Report"

@router.post("/portfolio", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def generate_portfolio_report(payload: GenerateReportRequest):
    """Generates portfolio health report."""
    data = {"report_id": "rep-uuid-101", "title": payload.title, "report_type": "PORTFOLIO_HEALTH", "download_url": "/api/v1/reports/rep-uuid-101/pdf"}
    return success_response(data=data, message="Portfolio report generated", status_code=status.HTTP_201_CREATED)

@router.post("/goal", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def generate_goal_report(payload: GenerateReportRequest):
    """Generates financial goal probability report."""
    data = {"report_id": "rep-uuid-102", "title": "Goal Progress Audit", "report_type": "GOAL_PROGRESS", "download_url": "/api/v1/reports/rep-uuid-102/pdf"}
    return success_response(data=data, message="Goal report generated", status_code=status.HTTP_201_CREATED)

@router.post("/risk", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def generate_risk_report(payload: GenerateReportRequest):
    """Generates risk assessment and VaR audit report."""
    data = {"report_id": "rep-uuid-103", "title": "Risk & Volatility Audit", "report_type": "RISK_AUDIT", "download_url": "/api/v1/reports/rep-uuid-103/pdf"}
    return success_response(data=data, message="Risk report generated", status_code=status.HTTP_201_CREATED)

@router.post("/tax", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def generate_tax_report(payload: GenerateReportRequest):
    """Generates LTCG/STCG tax statement report."""
    data = {"report_id": "rep-uuid-104", "title": "Capital Gains Tax Statement", "report_type": "TAX_STATEMENT", "download_url": "/api/v1/reports/rep-uuid-104/pdf"}
    return success_response(data=data, message="Tax report generated", status_code=status.HTTP_201_CREATED)

@router.get("/{report_id}/pdf")
async def download_pdf_report(report_id: str):
    """Downloads report as PDF binary file stream."""
    pdf_content = b"%PDF-1.4 Mock PDF Content for FUND FIT AI Report " + report_id.encode()
    return Response(
        content=pdf_content,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=fundfit_report_{report_id}.pdf"}
    )

@router.get("/{report_id}/excel")
async def download_excel_report(report_id: str):
    """Downloads report as Excel spreadsheet binary stream."""
    excel_content = b"Mock Excel binary content for report " + report_id.encode()
    return Response(
        content=excel_content,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename=fundfit_report_{report_id}.xlsx"}
    )

@router.get("/{report_id}/csv")
async def download_csv_report(report_id: str):
    """Downloads report as raw CSV text stream."""
    csv_content = f"Report ID,Type,Date\n{report_id},PORTFOLIO_HEALTH,2026-07-31\n"
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=fundfit_report_{report_id}.csv"}
    )
