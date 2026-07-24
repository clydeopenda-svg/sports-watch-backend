from datetime import date, timedelta
import random
from werkzeug.security import generate_password_hash
from faker import Faker

from app import app
from models import db, User, Profile, Streak, Sport, Exercise, SportExercise, WorkoutLog, Goal

fake = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Users (1 admin + several regular users)
    users = []
    admin = User(username="coach_joseph", email="coach@example.com",
                 password_hash=generate_password_hash("password123"), role="admin")
    users.append(admin)

    for _ in range(6):
        u = User(username=fake.unique.user_name(), email=fake.unique.email(),
                 password_hash=generate_password_hash("password123"), role="user")
        users.append(u)

    db.session.add_all(users)
    db.session.commit()

    # Profile + Streak for every user (1:1)
    for u in users:
        db.session.add(Profile(user_id=u.id, age=random.randint(18, 40),
                                weight_kg=round(random.uniform(50, 95), 1),
                                height_cm=round(random.uniform(155, 195), 1)))
        db.session.add(Streak(user_id=u.id, current_streak=random.randint(0, 12),
                               longest_streak=random.randint(12, 30),
                               last_active_date=date.today()))
    db.session.commit()

    # Sports
    sport_names = ["Athletics", "Soccer", "Swimming", "Calisthenics", "Cycling", "Walking"]
    sports = [Sport(name=n, description=f"{n} training and conditioning") for n in sport_names]
    db.session.add_all(sports)
    db.session.commit()

    # Exercises
    exercise_names = ["Pressups", "Sprints", "Squats", "Plank", "Sit-ups", "Burpees", "Lunges"]
    exercises = [Exercise(name=n, muscle_group=fake.word()) for n in exercise_names]
    db.session.add_all(exercises)
    db.session.commit()

    # SportExercise (many:many with extra data) — link every sport to a few exercises
    for sport in sports:
        for ex in random.sample(exercises, 3):
            db.session.add(SportExercise(sport_id=sport.id, exercise_id=ex.id,
                                          recommended_sets=random.randint(2, 5),
                                          recommended_reps=random.randint(8, 20)))
    db.session.commit()

    # WorkoutLogs (1:many from User, tied to a Sport)
    for u in users:
        for _ in range(random.randint(3, 8)):
            db.session.add(WorkoutLog(user_id=u.id, sport_id=random.choice(sports).id,
                                       log_date=date.today() - timedelta(days=random.randint(0, 20)),
                                       duration_minutes=random.randint(15, 90)))
    db.session.commit()

    # Goals (1:many from User)
    for u in users:
        for _ in range(random.randint(1, 3)):
            db.session.add(Goal(user_id=u.id, description=fake.sentence(nb_words=6),
                                 target_date=date.today() + timedelta(days=random.randint(7, 60)),
                                 achieved=random.choice([True, False])))
    db.session.commit()

    print("Seeded successfully.")