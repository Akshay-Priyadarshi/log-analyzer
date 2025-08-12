import uuid

from datetime import datetime

from pydantic import BaseModel, Field


class Insight(BaseModel):
    """Insight model."""
    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        description="Unique identifier for the insight"
    )
    observation: str = Field(
        ...,
        description="Human-readable AI observation"
    )
    severity: str | None = Field(
        None,
        description="Severity: low, medium, high, critical"
    )
    category: str | None = Field(
        None,
        description="Category: performance, security, availability, anomaly"
    )
    related_logs: list[str] | None = Field(
        None,
        description="List of log IDs that led to this insight"
    )
    timestamp: datetime = Field(
        default_factory=datetime.utcnow,
        description="Insight creation time"
    )
    recommendation: str | None = Field(
        None,
        description="Suggested action"
    )
    confidence: float | None = Field(
        None,
        description="AI confidence score (0–1)"  # noqa: RUF001
    )
    tags: list[str] | None = Field(
        None,
        description="List of tags for categorization"
    )


class InsightList(BaseModel):
    """Insight List Model."""
    insights: list[Insight]
