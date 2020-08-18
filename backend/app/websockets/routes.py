from app.websockets import bp
from app import socketio

@bp.route('/')
def index():
    return {"howdy": "all"}



@socketio.on("stream")
def handleMessage(message):
    print(message)

@socketio.on("connect")
def handleConnect():
    print("connected")

