from typing import Generic, TypeVar, Optional, Dict, Any, List
from pydantic import BaseModel, Field

DataType = TypeVar("DataType")

class PaginationMeta(BaseModel):
    page: int = Field(default=1, description="Current page number")
    page_size: int = Field(default=20, description="Number of items per page")
    total_records: int = Field(default=0, description="Total number of records matching query")
    total_pages: int = Field(default=1, description="Total number of pages")
    has_next: bool = Field(default=False, description="Whether a next page exists")
    has_prev: bool = Field(default=False, description="Whether a previous page exists")
    next_cursor: Optional[str] = Field(default=None, description="Cursor for next page if cursor pagination is used")

class APIResponse(BaseModel, Generic[DataType]):
    success: bool = Field(default=True, description="Indicates request success status")
    message: str = Field(default="Operation completed successfully", description="Human-readable status message")
    data: Optional[DataType] = Field(default=None, description="Response payload object or array")
    meta: Optional[Dict[str, Any]] = Field(default=None, description="Pagination or auxiliary metadata")
    errors: List[Any] = Field(default_factory=list, description="List of error messages or validation issues")

class APIErrorResponse(BaseModel):
    success: bool = Field(default=False, description="Always false for error responses")
    message: str = Field(default="An error occurred", description="Error summary message")
    data: Optional[Any] = Field(default=None, description="Null for errors")
    meta: Optional[Dict[str, Any]] = Field(default=None, description="Auxiliary error metadata")
    errors: List[Any] = Field(default_factory=list, description="List of detailed error objects or validation failures")

def success_response(
    data: Any = None,
    message: str = "Operation completed successfully",
    meta: Optional[Dict[str, Any]] = None,
    status_code: int = 200
) -> APIResponse:
    """Helper to return standardized success API response object."""
    return APIResponse(
        success=True,
        message=message,
        data=data,
        meta=meta,
        errors=[]
    )

def error_response(
    message: str = "An error occurred",
    errors: Optional[List[Any]] = None,
    meta: Optional[Dict[str, Any]] = None
) -> APIErrorResponse:
    """Helper to return standardized error API response object."""
    return APIErrorResponse(
        success=False,
        message=message,
        data=None,
        meta=meta,
        errors=errors or []
    )
