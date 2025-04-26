from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Permitir frontend acessar o backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, restrinja para o frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        # Aqui integraria com a grok-3-mini (exemplo usando uma API fictícia)
        # Substitua pela chamada real da grok-3-mini
        response = requests.post(
            "https://api.grok-3-mini.example.com/v1/chat",
            json={"message": data}
        )
        reply = response.json().get("reply", "Não entendi, tente novamente!")
        await websocket.send_text(reply)
