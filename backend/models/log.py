import uuid

from datetime import datetime

from pydantic import BaseModel, Field


class Log(BaseModel):
    """Log Model."""
    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        description="Unique identifier for the log entry"
    )
    level: str = Field(
        ...,
        description="Severity level – INFO, WARN, ERROR, DEBUG, CRITICAL"  # noqa: RUF001
    )
    message: str = Field(
        ...,
        description="Descriptive log message"
    )
    timestamp: datetime = Field(
        ...,
        description="Time of log creation in UTC"
    )
    source: str | None = Field(
        None,
        description="Component/service generating the log"
    )
    host: str | None = Field(
        None,
        description="Hostname or IP of the source system"
    )
    application_id: str | None = Field(
        None,
        description="Identifier of the application instance"
    )
    thread_id: str | None = Field(
        None,
        description="Thread or process ID"
    )
    environment: str | None = Field(
        None,
        description="Deployment environment (production, staging, dev)"
    )
    error_code: str | None = Field(
        None,
        description="Error code for classification"
    )
    stack_trace: str | None = Field(
        None,
        description="Stack trace for errors (if any)"
    )
    context: dict[str, str] | None = Field(
        None,
        description="Additional metadata like request_id, user_id"
    )
