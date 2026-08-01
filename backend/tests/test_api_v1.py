import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert "data" in json_data
    assert json_data["data"]["status"] == "healthy"

def test_auth_register_and_login():
    reg_resp = client.post("/api/v1/auth/register", json={
        "email": "testinvestor@fundfit.ai",
        "password": "Password123!",
        "full_name": "Test Investor"
    })
    assert reg_resp.status_code == 201
    reg_json = reg_resp.json()
    assert reg_json["success"] is True
    assert "access_token" in reg_json["data"]

    login_resp = client.post("/api/v1/auth/login", json={
        "email": "testinvestor@fundfit.ai",
        "password": "Password123!"
    })
    assert login_resp.status_code == 200
    login_json = login_resp.json()
    assert login_json["success"] is True

def test_market_overview():
    resp = client.get("/api/v1/market/overview")
    assert resp.status_code == 200
    json_data = resp.json()
    assert json_data["success"] is True
    assert "nifty_50" in json_data["data"]

def test_fund_search():
    resp = client.get("/api/v1/funds/search?q=Quant")
    assert resp.status_code == 200
    json_data = resp.json()
    assert json_data["success"] is True
    assert len(json_data["data"]) > 0

def test_ai_risk_analysis():
    resp = client.post("/api/v1/ai/risk-analysis", json={"survey_risk_score": 75.0})
    assert resp.status_code == 200
    json_data = resp.json()
    assert json_data["success"] is True
    assert "risk_score" in json_data["data"]

def test_custom_422_validation_error_handler():
    resp = client.post("/api/v1/auth/login", json={"email": "invalid_email_format"})
    assert resp.status_code == 422
    json_data = resp.json()
    assert json_data["success"] is False
    assert json_data["message"] == "Validation Error"
    assert len(json_data["errors"]) > 0
