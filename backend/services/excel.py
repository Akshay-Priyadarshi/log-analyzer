from typing import Any

import pandas as pd


class ExcelService:
    """Excel Service for basic CRUD operations on an Excel sheet."""

    def __init__(self, file_path: str, sheet_name: str, id_column: str):
        self.file_path = file_path
        self.sheet_name = sheet_name
        self.id_column = id_column

    def _load_df(self) -> pd.DataFrame:
        try:
            return pd.read_excel(self.file_path, sheet_name=self.sheet_name, dtype=str)
        except FileNotFoundError:
            return pd.DataFrame(columns=[self.id_column])  # create empty if not exists

    def _save_df(self, df: pd.DataFrame):
        with pd.ExcelWriter(self.file_path, mode="w", engine="openpyxl") as writer:
            df.to_excel(writer, index=False, sheet_name=self.sheet_name)

    def create_row(self, row: dict[str, Any]):
        df = self._load_df()
        if str(row[self.id_column]) in df[self.id_column].astype(str).values:
            raise ValueError(f"Row with {self.id_column}={row[self.id_column]} already exists.")
        df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)
        self._save_df(df)

    def delete_row(self, id_value: str):
        df = self._load_df()
        df = df[df[self.id_column].astype(str) != str(id_value)]
        self._save_df(df)

    def update_row(self, id_value: str, row: dict[str, Any]):
        df = self._load_df()
        mask = df[self.id_column].astype(str) == str(id_value)
        if not mask.any():
            raise ValueError(f"No row found with {self.id_column}={id_value}")
        for k, v in row.items():
            df.loc[mask, k] = v
        self._save_df(df)

    def read_row(self, id_value: str) -> dict[str, Any] | None:
        df = self._load_df()
        row = df[df[self.id_column].astype(str) == str(id_value)]
        return row.to_dict(orient="records")[0] if not row.empty else None

    def read_rows(self) -> list[dict[str, Any]]:
        df = self._load_df()
        return df.to_dict(orient="records")
