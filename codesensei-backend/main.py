from fastapi import FastAPI
from pydantic import BaseModel
from gemini_service import analyze_code
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeInput(BaseModel):
    code: str
    language: str

@app.post("/analyze")
async def analyze(input: CodeInput):
    return {"analysis": analyze_code(input.code, input.language)}
