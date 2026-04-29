import time
import datetime

from DB.db import SessionLocal
from DB.models import SensorData
from mqtt_worker import buffer, buffer_lock
from sqlalchemy import text


FLUSH_INTERVAL = 10  # seconds


def flush_buffer():
    while True:
        time.sleep(FLUSH_INTERVAL)

        with buffer_lock:
            if not buffer:
                continue

            local_copy = buffer.copy()
            buffer.clear()

        db = SessionLocal()

        try:
            print(f"[FLUSH] inserting {len(local_copy)} rows")

            objs = []

            for item in local_copy:
                objs.append(
                    SensorData(
                        device_id=item.get("device_id"),
                        temperature=item.get("temperature"),
                        humidity=item.get("humidity"),
                        alcohol=item.get("alcohol"),
                        air_quality=item.get("air_quality"),
                        created_at=datetime.datetime.utcnow()
                    )
                )

            db.add_all(objs)
            db.commit()

            db.execute(text("""
                DELETE FROM sensor_data
                WHERE created_at < NOW() - INTERVAL '3 days'
            """))
            db.commit()

        except Exception as e:
            print("[DB ERROR]", e)
            db.rollback()

        finally:
            db.close()