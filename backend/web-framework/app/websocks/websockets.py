from flask import request
from app.websocks import bp
from app import sockio
from flask_socketio import send, emit

@sockio.on('client_connected')
def handle_client_connect_event(json):
    print(f'recieved json: {json}')