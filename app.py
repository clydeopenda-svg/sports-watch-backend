from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config import Config
from models import db
from resources.auth import Register, Login
from resources.sports import Sports, SportByID
from resources.workout_logs import WorkoutLogs, WorkoutLogByID

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)
CORS(app)

api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(Sports, "/sports")
api.add_resource(SportByID, "/sports/<int:id>")
api.add_resource(WorkoutLogs, "/workout-logs")
api.add_resource(WorkoutLogByID, "/workout-logs/<int:id>")

if __name__ == "__main__":
    app.run(debug=True)