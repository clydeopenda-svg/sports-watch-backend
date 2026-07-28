from extensions import db
from models import WorkoutLog


class WorkoutLogController:
    @classmethod
    def get_logs_for_user(cls, user_id, page, per_page):
        return WorkoutLog.query.filter_by(user_id=user_id).order_by(
            WorkoutLog.log_date.desc()
        ).paginate(page=page, per_page=per_page)

    @classmethod
    def create_log(cls, user_id, data):
        log = WorkoutLog(
            user_id=user_id,
            sport_id=data["sport_id"],
            log_date=data["log_date"],
            duration_minutes=data["duration_minutes"],
        )
        db.session.add(log)
        db.session.commit()
        return log

    @classmethod
    def update_log(cls, id, user_id, data):
        log = WorkoutLog.query.get_or_404(id)
        if str(log.user_id) != user_id:
            return None
        for field in ("sport_id", "log_date", "duration_minutes"):
            if field in data:
                setattr(log, field, data[field])
        db.session.commit()
        return log

    @classmethod
    def delete_log(cls, id, user_id):
        log = WorkoutLog.query.get_or_404(id)
        if str(log.user_id) != user_id:
            return False
        db.session.delete(log)
        db.session.commit()
        return True
