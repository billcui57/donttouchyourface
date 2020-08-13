#!/bin/bash
export FLASK_APP=app
export FLASK_ENV=development
source ./env/bin/activate
flask run --port=4000 &> console.log.txt & tail -f console.log.txt
deactivate
