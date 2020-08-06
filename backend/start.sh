#!/bin/bash
export FLASK_APP=app
export FLASK_ENV=development
source ./venv/bin/activate
python3 run.py &> console.log.txt & tail -f console.log.txt
deactivate
