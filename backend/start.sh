#!/bin/bash


stty -echoctl # hide ^C

# function called by trap
stop(){
    echo "Deactivating virtual environment and killing python process to free up the port..."
    deactivate
    PID=$(sudo ps -A | grep "python" | awk '{print $1}')
    sudo kill $PID
}

trap 'stop' SIGINT

if [ ! -d "./env" ] 
then
    echo "No virtual environment detected, creating new one..."
    python3 -m venv env
fi

source ./env/bin/activate
pip3 install -r requirements.txt
export FLASK_APP=start.py
export FLASK_ENV=development


flask run 





