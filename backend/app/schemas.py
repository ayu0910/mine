from pydantic import BaseModel, Field


class GenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=5, max_length=5000, description="Website description")
    framework: str = Field(
        default="html",
        description="Target framework: html, react, or nextjs",
    )


class GeneratedFile(BaseModel):
    filename: str
    content: str
    language: str


class GenerateResponse(BaseModel):
    files: list[GeneratedFile]
    preview_html: str
    summary: str
