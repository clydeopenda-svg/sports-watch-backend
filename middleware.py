from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask_jwt_extended.exceptions import NoAuthorizationError


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except NoAuthorizationError:
            return {"error": "Missing or invalid token"}, 401
        if get_jwt().get("role") != "admin":
            return {"error": "Admins only"}, 403
        return fn(*args, **kwargs)
    return wrapper
