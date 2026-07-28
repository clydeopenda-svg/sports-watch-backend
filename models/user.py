from sqlalchemy_serializer import SerializerMixin
from extensions import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    serialize_rules = ("-password_hash", "-profile.user", "-streak.user", "-workout_logs.user", "-goals.user")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.String, default="user")

    profile = db.relationship("Profile", back_populates="user", uselist=False)
    streak = db.relationship("Streak", back_populates="user", uselist=False)
    workout_logs = db.relationship("WorkoutLog", back_populates="user")
    goals = db.relationship("Goal", back_populates="user")
