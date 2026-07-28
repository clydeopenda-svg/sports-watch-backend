from sqlalchemy_serializer import SerializerMixin
from extensions import db

class Goal(db.Model, SerializerMixin):
    __tablename__ = "goals"
    serialize_rules = ("-user.goals",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.String, nullable=False)
    target_date = db.Column(db.Date)
    achieved = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="goals")
