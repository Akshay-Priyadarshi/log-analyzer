from typing import Any

from google.adk.agents import Agent, BaseAgent

from models import BaseAdkAgent, Insight, InsightList, Log
from utils import FileUtils, StringUtils


class LogInsightsAssistant(BaseAdkAgent):
    """The LogInsightsAssistant is an ADK agent designed to help users
    manage their personal finances. It provides capabilities such as expense
    tracking, budgeting, financial analysis, and personalized advice. The
    agent leverages sub-agents and tools to assist users in understanding
    and improving their financial well-being.
    """

    def __init__(self, initial_state: dict[str, Any] = None):
        super().__init__(initial_state)

    def _build_agent(self) -> BaseAgent:

        return Agent(
            model='gemini-2.0-flash',
            name='log_insights_agent',
            description="""
You are a log insight assistant that helps users find insights
about the application logs.
            """,
            instruction=self._build_instruction(),
            output_schema=InsightList,
            output_key="insights",
            before_agent_callback=self.before_agent_callback,
            disallow_transfer_to_parent=True,
            disallow_transfer_to_peers=True
        )

    def _build_instruction(self) -> str:
        string_utils = StringUtils()
        file_utils = FileUtils()
        return string_utils.populate_variables(
            template_text=file_utils.read_file_relative(
                __file__, 'instruction.md'
            ),
            variables={
                "log_json_schema": Log.model_json_schema(),
                "insight_json_schema": Insight.model_json_schema(),
                "insight_list_json_schema": InsightList.model_json_schema(),
                **self.initial_state
            }
        )


root_agent = LogInsightsAssistant(initial_state={}).adk_agent
