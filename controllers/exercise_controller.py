from extensions import db
from models import Exercise


class ExerciseController:
    @classmethod
    def get_all_exercises(cls):
        return Exercise.query.all()

    @classmethod
    def create_exercise(cls, data):
        exercise = Exercise(name=data["name"], muscle_group=data.get("muscle_group"))
        db.session.add(exercise)
        db.session.commit()
        return exercise
