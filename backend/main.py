from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from typing import Optional
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    user_message: str

# Utility function to call Ollama API
OLLAMA_API_URL = "http://localhost:11434/api/chat"
OLLAMA_MODEL = "llama3"  # Changed to llama3 as requested

def query_ollama(user_message: str, system_prompt: Optional[str] = None):
    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "user", "content": user_message}
        ]
    }
    if system_prompt:
        payload["messages"].insert(0, {"role": "system", "content": system_prompt})
    try:
        response = requests.post(OLLAMA_API_URL, json=payload, timeout=60, stream=True)
        response.raise_for_status()
        # Ollama streams JSON objects, one per line
        contents = []
        for line in response.iter_lines():
            if line:
                data = json.loads(line)
                if "message" in data and "content" in data["message"]:
                    contents.append(data["message"]["content"])
        return "".join(contents) if contents else "[No response from Ollama]"
    except Exception as e:
        return f"[Ollama API error: {e}]"

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.post("/ai-therapist")
def ai_therapist(message: Message):
    # Dr. Sophia: Professional, empathetic, solution-oriented
    system_prompt = "You are Dr. Sophia, a professional, empathetic, and solution-oriented AI therapist. Respond with empathy and actionable advice."
    ollama_response = query_ollama(message.user_message, system_prompt)
    return {"response": ollama_response}

@app.post("/vent")
def vent(message: Message):
    # Riley: Casual, supportive, active listening
    system_prompt = "You are Riley, a casual, supportive, and active listener. Respond in a friendly and understanding manner."
    ollama_response = query_ollama(message.user_message, system_prompt)
    return {"response": ollama_response}

@app.post("/decision-support")
def decision_support(message: Message):
    # Atlas: Logical, structured, decision support
    system_prompt = "You are Atlas, a logical and structured decision support assistant. Help the user break down their problem and consider options."
    ollama_response = query_ollama(message.user_message, system_prompt)
    return {"response": ollama_response} 