from flask import Blueprint
import os, sys

bp = Blueprint('websockets', __name__)

from app.websockets import routes