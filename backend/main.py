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
# Set this to your Google Cloud VM's external IP address
OLLAMA_API_URL = "http://104.197.86.44:11434/api/generate"  # <-- Replace <YOUR_VM_EXTERNAL_IP> with your VM's IP
OLLAMA_MODEL = "llama3:8b"

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

            # Stream Ollama response, buffering raw bytes and decoding only valid UTF-8
            prompt = f"{system_prompt}\n\nUser: {user_message}"
            payload = {
                "model": OLLAMA_MODEL,
                "prompt": prompt,
                "stream": True,
                "temperature": 0.8
            }
            try:
                full_response = ""
                with session.post(OLLAMA_API_URL, json=payload, stream=True, timeout=60) as response:
                    response.raise_for_status()
                    for line in response.iter_lines():
                        if line:
                            try:
                                chunk = json.loads(line.decode('utf-8'))
                                text = chunk.get('response', '')
                                if text:
                                    full_response += text
                            except Exception as e:
                                await websocket.send_text(f"[Ollama API decode error: {e}]")
                await websocket.send_text(full_response)
                await websocket.send_text("[END]")
            except Exception as e:
                logger.error(f"Ollama API streaming error: {e}")
                await websocket.send_text(f"[Ollama API error: {e}]")
    except WebSocketDisconnect:
        logger.info("WebSocket disconnected")

def keep_model_warm():
    """
    Periodically send a lightweight request to keep the Ollama model loaded.
    """
    while True:
        try:
            payload = {
                "model": OLLAMA_MODEL,
                "prompt": "ping",
                "stream": False
            }
            session.post(OLLAMA_API_URL, json=payload, timeout=10)
            logger.info("Sent keep-alive ping to Ollama.")
        except Exception as e:
            logger.warning(f"Keep-alive ping failed: {e}")
        time.sleep(60)  # Ping every 1 minute

# Start the background thread to keep the model warm
# threading.Thread(target=keep_model_warm, daemon=True).start() 