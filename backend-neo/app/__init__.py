from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from Config import ApiConfig
from flask_socketio import SocketIO

db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO()

def create_app(config_class=ApiConfig):
    app = Flask(__name__)
    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app)

    from app.websockets import bp as websockets_bp
    app.register_blueprint(websockets_bp)
    return app