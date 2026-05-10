import json
import logging
import os

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI, OpenAIError

from app.prompts import REACT_SYSTEM_PROMPT, SYSTEM_PROMPT
from app.schemas import GeneratedFile, GenerateRequest, GenerateResponse

router = APIRouter()
logger = logging.getLogger(__name__)


def get_client() -> AsyncOpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENAI_API_KEY not configured. Set it in backend/.env",
        )
    return AsyncOpenAI(api_key=api_key)


@router.post("/generate", response_model=GenerateResponse)
async def generate_website(req: GenerateRequest):
    client = get_client()

    if req.framework == "html":
        return await _generate_html(client, req.prompt)
    elif req.framework == "react":
        return await _generate_react(client, req.prompt)
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported framework: {req.framework}")


@router.post("/generate/stream")
async def generate_website_stream(req: GenerateRequest):
    client = get_client()

    async def stream():
        try:
            response = await client.chat.completions.create(
                model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": req.prompt},
                ],
                stream=True,
                max_tokens=16000,
                temperature=0.7,
            )
            async for chunk in response:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
        except OpenAIError as e:
            logger.error("OpenAI API error during streaming: %s", e)
            yield f"\n<!-- STREAM_ERROR: {e} -->\n"

    return StreamingResponse(stream(), media_type="text/plain")


async def _generate_html(client: AsyncOpenAI, prompt: str) -> GenerateResponse:
    response = await client.chat.completions.create(
        model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        max_tokens=16000,
        temperature=0.7,
    )

    html_content = response.choices[0].message.content or ""
    html_content = html_content.strip()

    if html_content.startswith("```"):
        lines = html_content.split("\n")
        html_content = "\n".join(lines[1:-1]) if lines[-1].strip() == "```" else html_content

    return GenerateResponse(
        files=[GeneratedFile(filename="index.html", content=html_content, language="html")],
        preview_html=html_content,
        summary=f"Generated a complete HTML website based on: {prompt[:100]}",
    )


async def _generate_react(client: AsyncOpenAI, prompt: str) -> GenerateResponse:
    response = await client.chat.completions.create(
        model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        messages=[
            {"role": "system", "content": REACT_SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        max_tokens=16000,
        temperature=0.7,
    )

    raw = response.choices[0].message.content or ""
    raw = raw.strip()

    if raw.startswith("```"):
        lines = raw.split("\n")
        raw = "\n".join(lines[1:-1]) if lines[-1].strip() == "```" else raw

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return GenerateResponse(
            files=[GeneratedFile(filename="App.jsx", content=raw, language="jsx")],
            preview_html="<p>React code generated. Use the code tab to view files.</p>",
            summary=f"Generated React components for: {prompt[:100]}",
        )

    files = [
        GeneratedFile(
            filename=f["filename"],
            content=f["content"],
            language=f.get("language", "jsx"),
        )
        for f in data.get("files", [])
    ]

    preview = "<p>React project generated with {} files. Use the code tab to view.</p>".format(
        len(files)
    )

    return GenerateResponse(
        files=files,
        preview_html=preview,
        summary=data.get("summary", f"Generated React app for: {prompt[:100]}"),
    )
