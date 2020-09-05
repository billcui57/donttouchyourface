from app.websockets import bp
from app import socketio


@bp.route('/')
def index():
    return {"howdy": "all"}



@socketio.on("stream-client", namespace="/api/test")
def handleBase64Frame(base64):
    socketio.emit("stream-server", base64)
    print(base64)

@socketio.on("connect", namespace="/api/test")
def handleConnect():
    print("connected")

@socketio.on("disconnect", namespace="/api/test")
def handleDisconnect():
    print("disconnected")
