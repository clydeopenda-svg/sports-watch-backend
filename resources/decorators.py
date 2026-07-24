from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        if get_jwt().get("role") != "admin":
            return {"error": "Admins only"}, 403
        return fn(*args, **kwargs)
    return wrapper