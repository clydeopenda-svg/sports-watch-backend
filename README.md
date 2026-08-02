# Sports Watch

Sports Watch is a full-stack fitness tracking app that helps users log workouts, track goals, monitor streaks, and explore sport-specific attire guidance. The project combines a Flask backend with a React/Vite frontend to provide a polished dashboard experience for athletes and fitness-focused users.

## Overview

This project includes:

- user authentication and registration
- workout log creation and history
- progress-oriented dashboard views
- goal tracking
- sport and exercise management
- attire guidance for different sports

## Tech Stack

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- Flask-CORS
- PostgreSQL

### Frontend
- React
- Vite
- React Router

## Features

- Secure JWT-based authentication
- Protected workout log endpoints
- Admin-only management for sports, exercises, and attire content
- Paginated workout history
- Personalized goals and streak-based dashboard insights
- Modern dashboard UI with premium styling

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL

## Backend Setup

1. Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install backend dependencies:

```bash
pip install -r requirements.txt
```

3. Create a .env file in the project root:

```env
DATABASE_URI=postgresql:///sports_watch
JWT_SECRET_KEY=your_jwt_secret
SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:5173
```

4. Run database migrations:

```bash
export FLASK_APP=main.py
flask db upgrade
```

5. Seed the database with sample data:

```bash
python seed.py
```

6. Start the backend:

```bash
flask run
```

The API will typically be available at http://127.0.0.1:5000.

## Frontend Setup

1. Install frontend dependencies:

```bash
cd client
npm install
```

2. Start the Vite development server:

```bash
npm run dev
```

The frontend will typically be available at http://localhost:5173.

## Main API Endpoints

### Authentication
- POST /register
- POST /login

### Sports
- GET /sports
- POST /sports (admin only)
- DELETE /sports/<id> (admin only)

### Exercises
- GET /exercises
- POST /exercises (admin only)

### Workout Logs
- GET /workout-logs
- POST /workout-logs
- PATCH /workout-logs/<id>
- DELETE /workout-logs/<id>

### Goals
- GET /goals
- POST /goals

### Attire Guidance
- GET /sports/<sport_id>/attire
- POST /attire (admin only)
- DELETE /attire/<id> (admin only)

## Project Structure

- main.py — Flask app entry point and route definitions
- config.py — application configuration and environment variables
- extensions.py — shared Flask extensions
- controllers/ — request handling and business logic
- models/ — SQLAlchemy models
- migrations/ — Alembic migrations
- client/ — React/Vite frontend
- seed.py — sample data seeding
- requirements.txt — backend dependencies

## Notes

- Keep secret values out of version control.
- If your local PostgreSQL setup differs, update the DATABASE_URI value in your .env file accordingly.
- The project includes an ERD in the docs folder for reference.
