import httpx
import os
import logging

logger = logging.getLogger(__name__)

class LLMService:

    def __init__(self):
        self.base_url = os.getenv("OLLAMA_BASE_URL")
        self.model = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b")
        self.timeout = float(os.getenv("OLLAMA_TIMEOUT", "300"))


    async def execute_agent(
   self,
    agent_name: str,
    agent_type_name: str,
    agent_type_description: str | None,
    agent_role: str | None,
    agent_responsibilities: str | None,
    agent_expected_output: str | None,
    agent_constraints: str | None,
    assignment_title: str,
    assignment_description: str | None,
    previous_output: str | None
) -> str:

        prompt = self.build_prompt(
            agent_name=agent_name,
            agent_type_name=agent_type_name,
            agent_type_description=agent_type_description,
            agent_role=agent_role,
            agent_responsibilities=agent_responsibilities,
            agent_expected_output=agent_expected_output,
            agent_constraints=agent_constraints,
            assignment_title=assignment_title,
            assignment_description=assignment_description,
            previous_output=previous_output,
        )

        result = await self.generate(prompt)

        return result



    def build_prompt(
        self,
        agent_name: str,
        agent_type_name: str,
        agent_type_description: str | None,
        agent_role: str | None,
        agent_responsibilities: str | None,
        agent_expected_output: str | None,
        agent_constraints: str | None,
        assignment_title: str,
        assignment_description: str | None,
        previous_output: str | None
    ) -> str:

        if previous_output:
             logger.info("Previous output detected. Entering previous agent context branch.")
             logger.info("Previous output length: %s characters", len(previous_output))


             previous_agent_context = f"""
             PREVIOUS AGENT'S RESULT:

             {previous_output}
             

            IMPORTANT WORKFLOW RULES:

            - The previous agent has already completed its assigned task.
            - Do not perform the previous agent's task again.
            - Do not rewrite, summarize or copy the previous result.
            - Use the previous result only as source material for your own task.
            - Focus exclusively on your assigned responsibilities.
            - Add new analysis, conclusions or insights.
            - If information is missing, explicitly identify the gap.
            """
        else:
            logger.info("No previous output. Entering first agent context branch.")
            previous_agent_context = """
            You are the first agent in this workflow.
            Start the assigned task from the beginning.
            """

        prompt = f"""
        You are an AI agent named {agent_name}.

        AGENT TYPE:
        {agent_type_name}

        TYPE DESCRIPTION:
        {agent_type_description or "Not specified."}

        YOUR ROLE:
        {agent_role or "Not specified."}

        YOUR RESPONSIBILITIES:
        {agent_responsibilities or "Follow the specific task instructions."}

        YOUR TASK:
        {assignment_title}

        TASK INSTRUCTIONS:
        {assignment_description or "No additional instructions provided."}

        EXPECTED OUTPUT:
        {agent_expected_output or "Provide a clear and structured result."}

        CONSTRAINTS:
        {agent_constraints or "Do not invent facts or data."}

        {previous_agent_context}

        GENERAL RULES:
        - Follow your assigned role and responsibilities.
        - Focus only on your specific task.
        - Produce actual results, not a description of how you would work.
        - Follow the expected output structure.
        - Respect all constraints.
        - Do not invent facts, statistics or sources.
        """

        logger.info(
            "Generated prompt for agent '%s' (type: %s)",
            agent_name,
            agent_type_name,
        )

        logger.debug("Full prompt:\n%s", prompt)

        return prompt.strip()



    async def generate(self, prompt: str) -> str:
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": prompt,
                        "stream": False
                    }
                )

                response.raise_for_status()

                result = response.json()

                return result["response"]

        except httpx.TimeoutException:
            raise RuntimeError("Ollama request timed out.")

        except httpx.ConnectError:
            raise RuntimeError("Could not connect to Ollama.")

        except httpx.HTTPStatusError as error:
            raise RuntimeError(
                f"Ollama returned HTTP {error.response.status_code}."
            )


llm_service = LLMService()