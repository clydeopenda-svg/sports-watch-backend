from sqlalchemy_serializer import SerializerMixin
from extensions import db

class Exercise(db.Model, SerializerMixin):
    __tablename__ = "exercises"
    serialize_rules = ("-sport_exercises.exercise",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    muscle_group = db.Column(db.String)

    sport_exercises = db.relationship("SportExercise", back_populates="exercise")
