from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from Config import ApiConfig
from flask_socketio import SocketIO
from flask_cors import CORS

# db = SQLAlchemy()
# migrate = Migrate()


# def create_app(config_class=ApiConfig):
#     app = Flask(__name__)
#     CORS(app)
#     db.init_app(app)
#     migrate.init_app(app, db)
#     socketio.init_app(app, cors_allowed_origins='*')
#     socketio.run(app)
#     from app.websockets import bp as websockets_bp
#     app.register_blueprint(websockets_bp)
#     return app

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    socketio = SocketIO(app, cors_allowed_origins='*')
    socketio.run(app)
    from app.websockets import bp as websockets_bp
    app.register_blueprint(websockets_bp)
    return app