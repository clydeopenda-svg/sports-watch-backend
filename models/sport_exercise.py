from sqlalchemy_serializer import SerializerMixin
from extensions import db

class SportExercise(db.Model, SerializerMixin):
    __tablename__ = "sport_exercises"
    serialize_rules = ("-sport.sport_exercises", "-exercise.sport_exercises")

    id = db.Column(db.Integer, primary_key=True)
    sport_id = db.Column(db.Integer, db.ForeignKey("sports.id"), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercises.id"), nullable=False)
    recommended_sets = db.Column(db.Integer)
    recommended_reps = db.Column(db.Integer)

    sport = db.relationship("Sport", back_populates="sport_exercises")
    exercise = db.relationship("Exercise", back_populates="sport_exercises")
