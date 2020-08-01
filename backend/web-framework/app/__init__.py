from flask import Flask, request
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()
sockio = SocketIO()

def create_app():
    app = Flask(__name__)

    db.init(app)
    migrate.init(app)
    sockio.init(app)



    from app.websockets import bp as ws_bp
    app.register_blueprint(ws_bp)

