from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime
import uuid


class Log(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), description="Unique identifier for the log entry")
    level: str = Field(..., description="Severity level – INFO, WARN, ERROR, DEBUG, CRITICAL")
    message: str = Field(..., description="Descriptive log message")
    timestamp: datetime = Field(..., description="Time of log creation in UTC")
    source: Optional[str] = Field(None, description="Component/service generating the log")
    host: Optional[str] = Field(None, description="Hostname or IP of the source system")
    application_id: Optional[str] = Field(None, description="Identifier of the application instance")
    thread_id: Optional[str] = Field(None, description="Thread or process ID")
    environment: Optional[str] = Field(None, description="Deployment environment (production, staging, dev)")
    error_code: Optional[str] = Field(None, description="Error code for classification")
    stack_trace: Optional[str] = Field(None, description="Stack trace for errors (if any)")
    context: Optional[Dict[str, str]] = Field(None, description="Additional metadata like request_id, user_id")