from sqlalchemy_serializer import SerializerMixin
from extensions import db

class Sport(db.Model, SerializerMixin):
    __tablename__ = "sports"
    serialize_rules = ("-workout_logs", "-sport_exercises.sport")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String)

    workout_logs = db.relationship("WorkoutLog", back_populates="sport")
    sport_exercises = db.relationship("SportExercise", back_populates="sport")
