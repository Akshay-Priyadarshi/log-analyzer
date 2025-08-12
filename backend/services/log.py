import ast

import pandas as pd

from models import Log
from models.insight import InsightList
from services.excel import ExcelService


class LogService:
    """Service for logs stored in Excel."""

    def __init__(self, file_path: str, sheet_name: str, id_column: str = None):
        from agents.log_insight_agent import (  # noqa: PLC0415
            LogInsightsAgentExecutor,
        )
        id_column = "id" if id_column is None else id_column
        self.excel_service = ExcelService(
            file_path=file_path,
            sheet_name=sheet_name,
            id_column=id_column
        )
        self.log_insight_agent_executor = LogInsightsAgentExecutor(
            initial_state={"logs": self.read()}
        )

    def create(self, log: Log):
        """Create a new log entry."""
        row = log.dict()
        self.excel_service.create_row(row)

    def read(self, filters: dict | None = None) -> list[Log]:
        """Read logs from Excel, applying optional filters."""
        rows = self.excel_service.read_rows()
        df = pd.DataFrame(rows)

        if df.empty:
            return []

        # Apply filters if provided
        if filters:
            for key, value in filters.items():
                if key in df.columns:
                    df = df[df[key] == value]

        # Ensure timestamp column is datetime
        if "timestamp" in df.columns:
            df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")

        # Convert thread_id to string if numeric
        if "thread_id" in df.columns:
            df["thread_id"] = df["thread_id"].apply(
                lambda x: str(int(x)) if pd.notna(x) else None
            )

        # Convert DataFrame rows to Log objects
        logs = []
        for _, row in df.iterrows():
            log_data = {}
            for field in Log.__fields__:
                value = row.get(field)

                # Convert NaN to None
                if pd.isna(value):
                    value = None

                # Parse context if string
                if field == "context" and isinstance(value, str):
                    try:
                        value = ast.literal_eval(value)
                    except Exception:
                        value = None

                log_data[field] = value

            logs.append(Log(**log_data))

        return logs

    def update(self, id_value: str, log: Log):
        """Update an existing log entry."""
        self.excel_service.update_row(id_value, log.dict())

    def delete(self, id_value: str):
        """Delete a log entry by ID."""
        self.excel_service.delete_row(id_value)

    async def insights(self) -> InsightList:
        insights = await self.log_insight_agent_executor.run(
            f"please give all the insights after analyzing these logs\n {
                self.read()
            }"
        )
        if not insights:
            return "No insights found"
        return insights



