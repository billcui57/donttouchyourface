from flask import Flask
from Config import ApiConfig
from flask_socketio import SocketIO


socketio = SocketIO()

def create_app(config_class=ApiConfig):
    app = Flask(__name__)
    socketio.init_app(app, cors_allowed_origins = '*')
    socketio.run(app)

    from app.websockets import bp as websockets_bp
    app.register_blueprint(websockets_bp)
    return app