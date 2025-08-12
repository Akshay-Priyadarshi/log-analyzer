import json

from abc import abstractmethod

from google.adk.agents.callback_context import CallbackContext
from google.adk.runners import Runner

from models.base_adk_agent import BaseAdkAgent


class BaseAdkAgentExecutor:
    """A base executor for running ADK agents directly without A2A."""

    def __init__(self, initial_state: dict | None = None):
        self.initial_state = initial_state or {}
        self.agent = self._build_agent()
        self.adk_agent = self.agent.adk_agent
        self.runner = self._build_runner()

    @abstractmethod
    def _build_agent(self) -> BaseAdkAgent:
        raise NotImplementedError

    @abstractmethod
    def _build_runner(self) -> Runner:
        raise NotImplementedError

    def before_agent_callback(self, callback_context: CallbackContext):
        for key, value in self.initial_state.items():
            if callback_context.state.get(key) is None:
                callback_context.state[key] = value

    async def run(self, user_input: str):
        """Runs the agent with the given user_input and returns the final result.

        This avoids A2A-specific TaskUpdater/session handling and just
        gets the raw final output from the agent.
        """
        if not user_input or not user_input.strip():
            raise ValueError("user_input cannot be empty.")

        # Create an ADK session directly
        session = await self.runner.session_service.create_session(
            app_name=self.adk_agent.name,
            user_id="default-user",
            state=self.initial_state,
        )

        # Send the message to the agent
        final_text = ""
        async for event in self.runner.run_async(
            user_id="default-user",
            session_id=session.id,
            new_message=user_input,
        ):
            if event.is_final_response() and event.content and event.content.parts:
                for part in event.content.parts:
                    if part.text:
                        final_text += part.text

        # If the model is supposed to return JSON, try parsing it
        try:
            return json.loads(final_text)
        except json.JSONDecodeError:
            return final_text
