# ⚙️ FUND FIT AI — Enterprise FastAPI Backend

FastAPI asynchronous RESTful backend service for the **FUND FIT AI** Mutual Fund & Wealth Intelligence Platform.

## 🏗️ Architecture

```
backend/
├── app/
│   ├── api/v1/         # REST API Route Handlers (Auth, Portfolio, Funds, Goals, AI, Market, Portals)
│   ├── core/           # Security, JWT, Database Session, Middleware & Config
│   ├── models/         # SQLAlchemy 2.0 ORM Relational Models
│   ├── schemas/        # Pydantic v2 Request & Response Data Schemas
│   ├── repositories/   # Async Repository Pattern Data Access Layer
│   ├── services/       # Business Logic & Service Coordinator Layer
│   ├── ai/             # Autonomous AI Engines (Risk, Regime, Benchmarks, Recommendations, Goals)
│   └── utils/          # Calculations, PDF & Excel Export Helpers
├── tests/              # Pytest Unit & API Integration Tests
├── main.py             # FastAPI App Entrypoint
├── Dockerfile          # Production Docker Container Specification
├── docker-compose.yml  # Multi-Container Compose Setup (FastAPI + Postgres + Redis + Celery)
└── requirements.txt    # Python 3.12 Dependencies
```

## 🚀 Quickstart

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install requirements
pip install -r requirements.txt

# 4. Launch FastAPI server
uvicorn app.main:app --reload --port 8000
```

Access Swagger OpenAPI Documentation at **[http://localhost:8000/docs](http://localhost:8000/docs)**.
