"""Auth tests, run with: python -m unittest discover tests

Uses an in-memory SQLite database so no PostgreSQL server or real data is needed.
Only the standard-library unittest runner is used, so no extra dependency.
"""
import os
import unittest

# Must be set before main/config are imported, because Config reads the
# environment at import time (load_dotenv does not override existing vars).
os.environ["DATABASE_URI"] = "sqlite://"
os.environ["JWT_SECRET_KEY"] = "test-secret-key-that-is-long-enough-for-hs256"

from main import app  # noqa: E402
from extensions import db  # noqa: E402


class RegisterTests(unittest.TestCase):
    def setUp(self):
        app.config["TESTING"] = True
        self.ctx = app.app_context()
        self.ctx.push()
        db.create_all()
        self.client = app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.ctx.pop()

    def register(self, **overrides):
        payload = {"username": "sam", "email": "sam@example.com", "password": "pw123456"}
        payload.update(overrides)
        return self.client.post("/register", json=payload)

    def test_register_creates_normal_user(self):
        res = self.register()
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.get_json()["user"]["role"], "user")
        self.assertIn("access_token", res.get_json())

    def test_register_ignores_client_supplied_admin_role(self):
        res = self.register(role="admin")
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.get_json()["user"]["role"], "user")

        # The issued token must not unlock admin-only routes either.
        token = res.get_json()["access_token"]
        res = self.client.post(
            "/sports",
            json={"name": "Hacked"},
            headers={"Authorization": f"Bearer {token}"},
        )
        self.assertEqual(res.status_code, 403)

    def test_register_rejects_duplicate_email(self):
        self.register()
        res = self.register(username="other")
        self.assertEqual(res.status_code, 422)

    def test_login_with_wrong_password_is_rejected(self):
        self.register()
        res = self.client.post("/login", json={"email": "sam@example.com", "password": "nope"})
        self.assertEqual(res.status_code, 401)


if __name__ == "__main__":
    unittest.main()
