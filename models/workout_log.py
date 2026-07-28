from sqlalchemy_serializer import SerializerMixin
from extensions import db

class WorkoutLog(db.Model, SerializerMixin):
    __tablename__ = "workout_logs"
    serialize_rules = ("-user", "-sport.sport_exercises")

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    sport_id = db.Column(db.Integer, db.ForeignKey("sports.id"), nullable=False)
    log_date = db.Column(db.Date, nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="workout_logs")
    sport = db.relationship("Sport", back_populates="workout_logs")
