import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import generator

load_dotenv()

app = FastAPI(
    title="AI Website Builder API",
    description="Generate complete websites from text prompts using AI",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generator.router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}
