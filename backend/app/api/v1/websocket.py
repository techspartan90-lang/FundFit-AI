import asyncio
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict, Any

router = APIRouter(tags=["WebSocket Real-Time"])

class ConnectionManager:
    """Manages active real-time WebSocket connections and broadcasts."""
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: Dict[str, Any]):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Unified WebSocket endpoint streaming live market updates, portfolio changes,
    AI recommendation alerts, and real-time notifications.
    """
    await manager.connect(websocket)
    try:
        # Send initial welcome payload
        await websocket.send_json({
            "type": "CONNECTION_ESTABLISHED",
            "message": "Connected to FUND FIT AI Real-Time WebSocket stream",
            "timestamp": "2026-07-31T22:00:00Z"
        })

        while True:
            # Receive client messages / heartbeats
            data = await websocket.receive_text()
            try:
                payload = json.loads(data)
                action = payload.get("action")

                if action == "SUBSCRIBE_MARKET":
                    await websocket.send_json({
                        "type": "MARKET_UPDATE",
                        "data": {
                            "nifty_50": 24855.40,
                            "sensex": 81465.10,
                            "india_vix": 14.20
                        }
                    })
                elif action == "SUBSCRIBE_AI_ALERTS":
                    await websocket.send_json({
                        "type": "AI_RECOMMENDATION_UPDATE",
                        "data": {
                            "recommendation_id": "rec-live-99",
                            "action": "REBALANCE",
                            "reason": "Portfolio drift exceeds 5.0% threshold"
                        }
                    })
                else:
                    await websocket.send_json({"type": "PONG", "payload": payload})
            except Exception:
                await websocket.send_json({"type": "ACK", "raw": data})
    except WebSocketDisconnect:
        manager.disconnect(websocket)
