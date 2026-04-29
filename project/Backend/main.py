from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import threading

from DB.db import Base, engine, SessionLocal
from DB.models import SensorData
from mqtt_worker import start_mqtt, latest_cache, short_cache
from buffer_worker import flush_buffer

app = FastAPI()

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# CREATE TABLE
# =========================
Base.metadata.create_all(bind=engine)


# =========================
# START SYSTEM
# =========================
@app.on_event("startup")
def startup():
    start_mqtt()

    t = threading.Thread(target=flush_buffer, daemon=True)
    t.start()

    print(" SYSTEM READY")


# =========================
# API: latest
# =========================
@app.get("/sensor/latest/{device_id}")
def get_latest(device_id: str):
    return latest_cache.get(device_id, {})


# =========================
# API: realtime
# =========================
@app.get("/sensor/realtime/{device_id}")
def get_realtime(device_id: str):
    return list(short_cache.get(device_id, []))


# =========================
# API: history (DB)
# =========================
@app.get("/sensor/history/{device_id}")
def get_history(device_id: str):

    db = SessionLocal()

    data = (
        db.query(SensorData)
        .filter(SensorData.device_id == device_id)
        .order_by(SensorData.created_at.desc())
        .limit(200)
        .all()
    )

    db.close()

    return data


# =========================
# MOCK (fallback)
# =========================
@app.get("/sensor/mock")
def mock_sensor():
    import random, datetime

    return {
        "device_id": "esp32-01",
        "temperature": round(random.uniform(15, 50), 2),
        "humidity": round(random.uniform(30, 70), 2),
        "alcohol": round(random.uniform(300, 800), 2),
        "air_quality": round(random.uniform(0, 2), 3),
        "timestamp": str(datetime.datetime.utcnow())
    }


# =========================
# HEALTH
# =========================
@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/debug/db")
def debug_db():
    db = SessionLocal()

    data = (
        db.query(SensorData)
        .order_by(SensorData.created_at.desc())
        .limit(10)
        .all()
    )

    result = []
    for row in data:
        result.append({
            "device_id": row.device_id,
            "temperature": row.temperature,
            "created_at": str(row.created_at)
        })

    db.close()

    return result