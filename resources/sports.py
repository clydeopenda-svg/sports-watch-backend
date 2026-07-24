from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from models import db, Sport
from resources.decorators import admin_required


class Sports(Resource):
    def get(self):
        sports = Sport.query.all()
        return [s.to_dict() for s in sports], 200

    @admin_required
    def post(self):
        data = request.get_json()
        sport = Sport(name=data["name"], description=data.get("description"))
        db.session.add(sport)
        db.session.commit()
        return sport.to_dict(), 201


class SportByID(Resource):
    def get(self, id):
        sport = Sport.query.get_or_404(id)
        return sport.to_dict(), 200

    @admin_required
    def delete(self, id):
        sport = Sport.query.get_or_404(id)
        db.session.delete(sport)
        db.session.commit()
        return {}, 204