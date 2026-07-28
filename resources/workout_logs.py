from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import db, WorkoutLog


class WorkoutLogs(Resource):
    @jwt_required()
    def get(self):
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 10, type=int)
        user_id = get_jwt_identity()

        pag = WorkoutLog.query.filter_by(user_id=user_id).order_by(
            WorkoutLog.log_date.desc()
        ).paginate(page=page, per_page=per_page)

        return {
            "items": [w.to_dict() for w in pag.items],
            "total": pag.total,
            "page": pag.page,
            "per_page": pag.per_page,
            "total_pages": pag.pages,
        }, 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()

        log = WorkoutLog(
            user_id=user_id,
            sport_id=data["sport_id"],
            log_date=data["log_date"],
            duration_minutes=data["duration_minutes"],
        )
        db.session.add(log)
        db.session.commit()
        return log.to_dict(), 201


class WorkoutLogByID(Resource):
    @jwt_required()
    def patch(self, id):
        log = WorkoutLog.query.get_or_404(id)
        if str(log.user_id) != get_jwt_identity():
            return {"error": "Not your workout log"}, 403

        data = request.get_json()
        for field in ("sport_id", "log_date", "duration_minutes"):
            if field in data:
                setattr(log, field, data[field])
        db.session.commit()
        return log.to_dict(), 200

    @jwt_required()
    def delete(self, id):
        log = WorkoutLog.query.get_or_404(id)
        if str(log.user_id) != get_jwt_identity():
            return {"error": "Not your workout log"}, 403

        db.session.delete(log)
        db.session.commit()
        return {}, 204