from sqlalchemy_serializer import SerializerMixin
from extensions import db

class Streak(db.Model, SerializerMixin):
    __tablename__ = "streaks"
    serialize_rules = ("-user.streak",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True)
    current_streak = db.Column(db.Integer, default=0)
    longest_streak = db.Column(db.Integer, default=0)
    last_active_date = db.Column(db.Date)

    user = db.relationship("User", back_populates="streak")
