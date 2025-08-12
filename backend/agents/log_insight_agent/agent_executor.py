import json

from typing import override

from google.adk.artifacts import InMemoryArtifactService
from google.adk.memory import InMemoryMemoryService
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from agents.log_insight_agent.agent import LogInsightsAssistant
from models import BaseAdkAgent, BaseAdkAgentExecutor
from models.insight import InsightList


class LogInsightsAgentExecutor(BaseAdkAgentExecutor):
    """Agent executor for the Log Insights Assistant agent.

    Runs the ADK agent directly, without A2A RequestContext/EventQueue.
    """

    def __init__(self, initial_state: dict | None = None):
        super().__init__(initial_state=initial_state or {})
        self.artifact_name = "response"

    @override
    def _build_agent(self) -> BaseAdkAgent:
        return LogInsightsAssistant(initial_state=self.initial_state)

    @override
    def _build_runner(self) -> Runner:
        return Runner(
            app_name=self.adk_agent.name,
            agent=self.adk_agent,
            session_service=InMemorySessionService(),
            memory_service=InMemoryMemoryService(),
            artifact_service=InMemoryArtifactService(),
        )

    async def run(self, user_message: str, user_id: str = "default-user") -> InsightList:
        """Runs the agent with the given message and returns
        parsed InsightList.
        """
        if not user_message or not user_message.strip():
            raise ValueError("user_message cannot be empty.")

        # Create a session for this run
        session = await self.runner.session_service.create_session(
            app_name=self.adk_agent.name,
            user_id=user_id,
            state=self.initial_state,
        )

        # Build the message content
        user_message_content = types.Content(
            role="user",
            parts=[types.Part.from_text(text=user_message)]
        )

        # Collect all final text parts (expected to be a JSON string)
        response_text = ""
        async for event in self.runner.run_async(
            user_id=user_id,
            session_id=session.id,
            new_message=user_message_content,
        ):
            if event.is_final_response() and event.content and event.content.parts:
                for part in event.content.parts:
                    if part.text:
                        response_text += part.text

        response_text = response_text.strip()
        if not response_text:
            raise ValueError("Agent returned empty response")

        # Parse the JSON response to InsightList model
        try:
            response_json = json.loads(response_text)
            return InsightList(**response_json)
        except Exception as e:
            raise e
