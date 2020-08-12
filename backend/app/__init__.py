from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app)



@socketio.on('connect')
def handleMessage():
    print("connected")
    socketio.send("User ha connected")





def create_server():
    socketio.run(app)
