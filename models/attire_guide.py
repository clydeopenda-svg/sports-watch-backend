from sqlalchemy_serializer import SerializerMixin
from extensions import db

class AttireGuide(db.Model, SerializerMixin):
    __tablename__ = "attire_guides"
    serialize_rules = ("-sport",)

    id = db.Column(db.Integer, primary_key=True)
    sport_id = db.Column(db.Integer, db.ForeignKey("sports.id"), nullable=False)
    item_name = db.Column(db.String, nullable=False)
    mandatory = db.Column(db.Boolean, default=True)

    sport = db.relationship("Sport", back_populates="attire_guides")
