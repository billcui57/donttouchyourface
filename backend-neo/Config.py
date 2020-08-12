import os

basedir = os.path.abspath(os.path.dirname(__file__))

class ApiConfig(object):
    SQLALCHEMY_DATABASE_URL = "sqlite:///" + os.path.join(basedir, 'configData.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'secret!'