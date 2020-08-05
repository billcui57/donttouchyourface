from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'  # will be env soon
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('./index.html')



@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)

def create_server():
    socketio.run(app)
