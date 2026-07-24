from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

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


class Profile(db.Model, SerializerMixin):
    __tablename__ = "profiles"
    serialize_rules = ("-user.profile",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True)
    age = db.Column(db.Integer)
    weight_kg = db.Column(db.Float)
    height_cm = db.Column(db.Float)

    user = db.relationship("User", back_populates="profile")


class Streak(db.Model, SerializerMixin):
    __tablename__ = "streaks"
    serialize_rules = ("-user.streak",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True)
    current_streak = db.Column(db.Integer, default=0)
    longest_streak = db.Column(db.Integer, default=0)
    last_active_date = db.Column(db.Date)

    user = db.relationship("User", back_populates="streak")


class Sport(db.Model, SerializerMixin):
    __tablename__ = "sports"
    serialize_rules = ("-workout_logs", "-sport_exercises.sport")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String)

    workout_logs = db.relationship("WorkoutLog", back_populates="sport")
    sport_exercises = db.relationship("SportExercise", back_populates="sport")


class Exercise(db.Model, SerializerMixin):
    __tablename__ = "exercises"
    serialize_rules = ("-sport_exercises.exercise",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    muscle_group = db.Column(db.String)

    sport_exercises = db.relationship("SportExercise", back_populates="exercise")


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


class WorkoutLog(db.Model, SerializerMixin):
    __tablename__ = "workout_logs"
    serialize_rules = ("-user.workout_logs", "-sport.workout_logs")

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    sport_id = db.Column(db.Integer, db.ForeignKey("sports.id"), nullable=False)
    log_date = db.Column(db.Date, nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="workout_logs")
    sport = db.relationship("Sport", back_populates="workout_logs")


class Goal(db.Model, SerializerMixin):
    __tablename__ = "goals"
    serialize_rules = ("-user.goals",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.String, nullable=False)
    target_date = db.Column(db.Date)
    achieved = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="goals")