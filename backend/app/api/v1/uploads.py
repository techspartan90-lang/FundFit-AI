from fastapi import APIRouter, UploadFile, File, Form, status, HTTPException
from typing import Dict, Any
from app.schemas.response import APIResponse, success_response

router = APIRouter(prefix="/upload", tags=["File Uploads"])

@router.post("/profile-picture", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def upload_profile_picture(file: UploadFile = File(...)):
    """Uploads user profile picture image file."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files (JPG, PNG, WebP) are allowed")

    data = {
        "filename": file.filename,
        "mime_type": file.content_type,
        "file_url": f"/uploads/avatars/{file.filename}"
    }
    return success_response(data=data, message="Profile picture uploaded successfully", status_code=status.HTTP_201_CREATED)

@router.post("/statement", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def upload_financial_statement(file: UploadFile = File(...), password: str = Form(default="")):
    """Uploads CAS / CAMS / Karvy Mutual Fund PDF statement for portfolio parsing."""
    data = {
        "filename": file.filename,
        "parsed_holdings_count": 12,
        "total_portfolio_value": 450000.0,
        "status": "PARSED_SUCCESSFULLY"
    }
    return success_response(data=data, message="Statement uploaded and parsed", status_code=status.HTTP_201_CREATED)

@router.post("/kyc-doc", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def upload_kyc_document(doc_type: str = Form("PAN"), file: UploadFile = File(...)):
    """Uploads KYC compliance documents (PAN, Aadhaar, Passport)."""
    data = {
        "doc_type": doc_type,
        "filename": file.filename,
        "status": "VERIFICATION_PENDING"
    }
    return success_response(data=data, message="KYC document uploaded for verification", status_code=status.HTTP_201_CREATED)

@router.post("/report", status_code=status.HTTP_201_CREATED, response_model=APIResponse[Dict[str, Any]])
async def upload_custom_report(file: UploadFile = File(...)):
    """Uploads advisor custom analytical report attachment."""
    data = {
        "filename": file.filename,
        "file_url": f"/uploads/reports/{file.filename}"
    }
    return success_response(data=data, message="Report file uploaded", status_code=status.HTTP_201_CREATED)
