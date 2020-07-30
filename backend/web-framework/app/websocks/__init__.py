from flask import Blueprint

bp = Blueprint('websocks', __name__)

from app.websocks import websockets