from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config import Config
from models import db
from resources.auth import Register, Login

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)
CORS(app)

api.add_resource(Register, "/register")
api.add_resource(Login, "/login")

if __name__ == "__main__":
    app.run(debug=True)