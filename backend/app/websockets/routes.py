from app.websockets import bp
from app import socketio
import logging


logging.basicConfig(level=logging.DEBUG)

@bp.route('/')
def index():
    return {"howdy": "all"}



@socketio.on("stream")
def handleMessage(message):
    socketio.emit("stream", message)

@socketio.on("connect")
def handleConnect():
    print("connected")

@socketio.on("disconnect")
def handleDisconnect():
    print("disconnected")
