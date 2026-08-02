from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "FUND FIT AI Backend Platform"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "supersecret_jwt_key_change_in_production_environment_fundfit_ai"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "fundfit_ai_db"
    POSTGRES_PORT: int = 5432
    DATABASE_URL: Optional[str] = "sqlite+aiosqlite:///./fundfit_ai.db"

    REDIS_URL: str = "redis://localhost:6379/0"
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"

    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "*"]
    OLLAMA_HOST: str = "http://localhost:11434"
    OLLAMA_DEFAULT_MODEL: str = "llama2"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()

# Safe fallback to SQLite if Supabase database password is still a placeholder
if not settings.DATABASE_URL or "YOUR_DATABASE_PASSWORD" in settings.DATABASE_URL or "YOUR_SUPABASE" in settings.DATABASE_URL:
    settings.DATABASE_URL = "sqlite+aiosqlite:///./fundfit_ai.db"

