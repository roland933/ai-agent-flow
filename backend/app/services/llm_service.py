import httpx
import os


class LLMService:

    def __init__(self):
        self.base_url = os.getenv("OLLAMA_BASE_URL")
        self.model = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b")
        self.timeout = float(os.getenv("OLLAMA_TIMEOUT", "300"))


    async def execute_agent(
    self,
    agent_name: str,
    agent_type: str,
    assignment_title: str,
    assignment_description: str | None,
    previous_output: dict | None,
) -> str:

        prompt = self.build_prompt(
            agent_name=agent_name,
            agent_type=agent_type,
            assignment_title=assignment_title,
            assignment_description=assignment_description,
            previous_output=previous_output,
        )

        result = await self.generate(prompt)

        return result


    def build_prompt(
    self,
    agent_name: str,
    agent_type: str,
    assignment_title: str,
    assignment_description: str | None,
    previous_output: dict | None,
) -> str:

        prompt = f"""
        You are an AI agent named {agent_name}.

        Your role:
        {agent_type}

        Your task:
        {assignment_title}

        Task instructions:
        {assignment_description or "No additional instructions provided."}

        Previous agent output:
        {previous_output or "This is the first agent in the workflow."}

        Complete your assigned task based on your role and instructions.
        Provide a clear and structured result.
        """

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