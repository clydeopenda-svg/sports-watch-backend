from sqlalchemy_serializer import SerializerMixin
from extensions import db

class Profile(db.Model, SerializerMixin):
    __tablename__ = "profiles"
    serialize_rules = ("-user.profile",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True)
    age = db.Column(db.Integer)
    weight_kg = db.Column(db.Float)
    height_cm = db.Column(db.Float)

    user = db.relationship("User", back_populates="profile")
