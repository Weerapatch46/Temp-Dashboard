from sqlalchemy import Column, Integer, Float, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from DB.db import Base


# =========================
# 📊 SENSOR HISTORY
# =========================
class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)

    device_id = Column(String, nullable=False, index=True)

    temperature = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    alcohol = Column(Float, nullable=True)
    air_quality = Column(Float, nullable=True)

    created_at = Column(DateTime, server_default=func.now(), index=True)


# =========================
# 🔘 DEVICE COMMAND
# =========================
class DeviceCommand(Base):
    __tablename__ = "device_command"

    id = Column(Integer, primary_key=True, index=True)

    device_id = Column(String, nullable=False, index=True)

    command = Column(String, nullable=False)

    payload = Column(JSON, nullable=True)

    status = Column(String, default="PENDING", index=True)

    response = Column(Text, nullable=True)

    created_at = Column(DateTime, server_default=func.now(), index=True)

    executed_at = Column(DateTime, nullable=True)