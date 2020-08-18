from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from Config import ApiConfig
from flask_socketio import SocketIO

# db = SQLAlchemy()
# migrate = Migrate()
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')


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
    socketio.run(app)
    from app.websockets import bp as websockets_bp
    app.register_blueprint(websockets_bp)
    return app
