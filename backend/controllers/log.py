

from fastapi import APIRouter

from models import InsightList, Log
from services.log import LogService


log_router = APIRouter(prefix="/logs", tags=["Logs"])
FILE_PATH = "./sample_logs_updated.xlsx"
SHEET_NAME = "Sheet1"


log_service = LogService(FILE_PATH, SHEET_NAME)

@log_router.get("/", response_model=list[Log])
def get_logs():
    """Retrieve logs with optional filtering.
    Filters can match any Log attribute.
    """
    return log_service.read()

@log_router.get("/insights", response_model=InsightList)
async def get_insights():
    """Retrieve insights about the logs."""
    return await log_service.insights()
