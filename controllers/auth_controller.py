from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from extensions import db
from models import User


class AuthController:
    @classmethod
    def register(cls, data):
        if User.query.filter_by(email=data.get("email")).first():
            return {"error": "Email already registered"}, 422

        user = User(
            username=data["username"],
            email=data["email"],
            password_hash=generate_password_hash(data["password"]),
            role=data.get("role", "user"),
        )
        db.session.add(user)
        db.session.commit()

        token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})
        return {"user": user.to_dict(), "access_token": token}, 201

    @classmethod
    def login(cls, data):
        user = User.query.filter_by(email=data.get("email")).first()
        if not user or not check_password_hash(user.password_hash, data.get("password", "")):
            return {"error": "Invalid email or password"}, 401

        token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})
        return {"user": user.to_dict(), "access_token": token}, 200
