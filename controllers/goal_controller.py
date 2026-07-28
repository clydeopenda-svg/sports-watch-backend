from extensions import db
from models import Goal


class GoalController:
    @classmethod
    def get_goals_for_user(cls, user_id):
        return Goal.query.filter_by(user_id=user_id).all()

    @classmethod
    def create_goal(cls, user_id, data):
        goal = Goal(
            user_id=user_id,
            description=data["description"],
            target_date=data.get("target_date"),
        )
        db.session.add(goal)
        db.session.commit()
        return goal
