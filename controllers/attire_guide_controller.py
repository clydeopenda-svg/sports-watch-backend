from extensions import db
from models import AttireGuide


class AttireGuideController:
    @classmethod
    def get_by_sport(cls, sport_id):
        return AttireGuide.query.filter_by(sport_id=sport_id).all()

    @classmethod
    def create(cls, data):
        item = AttireGuide(
            sport_id=data["sport_id"],
            item_name=data["item_name"],
            mandatory=data.get("mandatory", True),
        )
        db.session.add(item)
        db.session.commit()
        return item

    @classmethod
    def delete(cls, id):
        item = AttireGuide.query.get_or_404(id)
        db.session.delete(item)
        db.session.commit()
