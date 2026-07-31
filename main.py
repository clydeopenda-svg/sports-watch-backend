from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

from config import Config
from extensions import db, jwt
from middleware import admin_required
from models import *
from controllers.auth_controller import AuthController
from controllers.sport_controller import SportController
from controllers.exercise_controller import ExerciseController
from controllers.workout_log_controller import WorkoutLogController
from controllers.goal_controller import GoalController
from controllers.attire_guide_controller import AttireGuideController

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt.init_app(app)
migrate = Migrate(app, db)
CORS(app)


@app.route("/register", methods=["POST"])
def register():
    return AuthController.register(request.get_json())


@app.route("/login", methods=["POST"])
def login():
    return AuthController.login(request.get_json())


@app.route("/sports", methods=["GET"])
def get_sports():
    sports = SportController.get_all_sports()
    return jsonify([s.to_dict() for s in sports]), 200


@app.route("/sports", methods=["POST"])
@admin_required
def create_sport():
    sport = SportController.create_sport(request.get_json())
    return sport.to_dict(), 201


@app.route("/sports/<int:id>", methods=["DELETE"])
@admin_required
def delete_sport(id):
    SportController.delete_sport(id)
    return {}, 204


@app.route("/exercises", methods=["GET"])
def get_exercises():
    exercises = ExerciseController.get_all_exercises()
    return jsonify([e.to_dict() for e in exercises]), 200


@app.route("/exercises", methods=["POST"])
@admin_required
def create_exercise():
    exercise = ExerciseController.create_exercise(request.get_json())
    return exercise.to_dict(), 201


@app.route("/workout-logs", methods=["GET"])
@jwt_required()
def get_workout_logs():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    pag = WorkoutLogController.get_logs_for_user(get_jwt_identity(), page, per_page)
    return {
        "items": [w.to_dict() for w in pag.items],
        "total": pag.total, "page": pag.page,
        "per_page": pag.per_page, "total_pages": pag.pages,
    }, 200


@app.route("/workout-logs", methods=["POST"])
@jwt_required()
def create_workout_log():
    log = WorkoutLogController.create_log(get_jwt_identity(), request.get_json())
    return log.to_dict(), 201


@app.route("/workout-logs/<int:id>", methods=["PATCH"])
@jwt_required()
def update_workout_log(id):
    log = WorkoutLogController.update_log(id, get_jwt_identity(), request.get_json())
    if log is None:
        return {"error": "Not your workout log"}, 403
    return log.to_dict(), 200


@app.route("/workout-logs/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_workout_log(id):
    ok = WorkoutLogController.delete_log(id, get_jwt_identity())
    if not ok:
        return {"error": "Not your workout log"}, 403
    return {}, 204


@app.route("/goals", methods=["GET"])
@jwt_required()
def get_goals():
    goals = GoalController.get_goals_for_user(get_jwt_identity())
    return jsonify([g.to_dict() for g in goals]), 200


@app.route("/goals", methods=["POST"])
@jwt_required()
def create_goal():
    goal = GoalController.create_goal(get_jwt_identity(), request.get_json())
    return goal.to_dict(), 201



@app.route("/sports/<int:sport_id>/attire", methods=["GET"])
def get_attire_for_sport(sport_id):
    items = AttireGuideController.get_by_sport(sport_id)
    return jsonify([i.to_dict() for i in items]), 200


@app.route("/attire", methods=["POST"])
@admin_required
def create_attire():
    item = AttireGuideController.create(request.get_json())
    return item.to_dict(), 201


@app.route("/attire/<int:id>", methods=["DELETE"])
@admin_required
def delete_attire(id):
    AttireGuideController.delete(id)
    return {}, 204


if __name__ == "__main__":
    app.run(debug=True)
