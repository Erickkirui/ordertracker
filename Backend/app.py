import os
from flask import Flask
from config import app_config
from flask_migrate import Migrate
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__)

CORS(app)

def initialize_models():
    from Server.Models.orders import Orders

def initialize_views():
    from Server.Views import api_endpoints
    app.register_blueprint(api_endpoints)

def create_app(config_name):
  
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Set the database URI in the app config
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///app.db'

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)

    with app.app_context():
        initialize_models()
        db.create_all()  # Call db.create_all() to create tables
        
    initialize_views()

    return app
