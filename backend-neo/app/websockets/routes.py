from app.websockets import bp
from app import socketio

@bp.route('/')
def index():
    return {"howdy": "all"}

@socketio.on("json", namespace="/videostream")
def handleMessage(message):
    print(message)

@socketio.on("connect", namespace="/videostream")
def handleConnect():
    print("hi")