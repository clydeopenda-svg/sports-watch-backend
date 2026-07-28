from extensions import db
from models import Sport


class SportController:
    @classmethod
    def get_all_sports(cls):
        return Sport.query.all()

    @classmethod
    def get_sport_by_id(cls, id):
        return Sport.query.get_or_404(id)

    @classmethod
    def create_sport(cls, data):
        sport = Sport(name=data["name"], description=data.get("description"))
        db.session.add(sport)
        db.session.commit()
        return sport

    @classmethod
    def delete_sport(cls, id):
        sport = Sport.query.get_or_404(id)
        db.session.delete(sport)
        db.session.commit()
