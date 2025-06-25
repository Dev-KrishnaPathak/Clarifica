from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import requests
import threading
import time
import json
import logging

# --- Configuration ---
# Set this to your Gemini API key
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
GEMINI_API_KEY = "AIzaSyBU6NxbTZaSZB9NfYGlBR1XP81RZlR2WTI"

# --- Logging setup ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("clarifica-backend")

# --- FastAPI app setup ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- HTTP session for connection pooling ---
session = requests.Session()

SYSTEM_PROMPTS = {
    "ai-therapist": "You are Dr. Sophia, a professional, empathetic, and solution-oriented AI therapist. Respond with empathy and actionable advice.",
    "vent": "You are Riley, a casual, supportive, and active listener. Respond in a friendly and understanding manner.",
    "decision-support": "You are Atlas, a logical and structured decision support assistant. Help the user break down their problem and consider options."
}

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
                user_message = msg.get("user_message", "")
                chat_type = msg.get("chat_type", "ai-therapist")
                system_prompt = SYSTEM_PROMPTS.get(chat_type, SYSTEM_PROMPTS["ai-therapist"])
            except Exception as e:
                await websocket.send_text(json.dumps({"error": f"Invalid message format: {e}"}))
                continue

            prompt = f"{system_prompt}\n\nUser: {user_message}"
            payload = {
                "contents": [
                    {"parts": [{"text": prompt}]}
                ]
            }
            url = f"{GEMINI_API_URL}?key={GEMINI_API_KEY}"
            headers = {"Content-Type": "application/json"}
            try:
                response = session.post(url, headers=headers, json=payload, timeout=60)
                response.raise_for_status()
                gemini_data = response.json()
                # Extract the response text from Gemini's response
                text = gemini_data["candidates"][0]["content"]["parts"][0]["text"]
                await websocket.send_text(text)
                await websocket.send_text("[END]")
            except Exception as e:
                logger.error(f"Gemini API error: {e}")
                await websocket.send_text(f"[Gemini API error: {e}]")
    except WebSocketDisconnect:
        logger.info("WebSocket disconnected") 