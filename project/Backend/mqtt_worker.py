import json
import datetime
import paho.mqtt.client as mqtt
from collections import deque
from threading import Lock

# =========================
# GLOBAL STATE
# =========================
buffer = []
buffer_lock = Lock()

latest_cache = {}
short_cache = {}

MAX_BUFFER = 1000

# =========================
# MQTT CONFIG
# =========================
MQTT_BROKER = "broker.hivemq.com"
MQTT_PORT = 1883
MQTT_TOPIC = "esp32/sensor/01"


def on_message(client, userdata, msg):
    global buffer, latest_cache, short_cache

    try:
        payload_str = msg.payload.decode()
        data = json.loads(payload_str)
        device_id = data["device_id"]

        # 🔥 PRINT ตรงนี้เลย (สำคัญสุด)
        print("\n📥 ===== ESP32 DATA RECEIVED =====")
        print(f"Topic      : {msg.topic}")
        print(f"Device ID  : {device_id}")

        for k, v in data.items():
            print(f"   {k}: {v}")

        print("=================================\n")

        # 🟢 latest
        latest_cache[device_id] = data

        # 🟡 realtime
        if device_id not in short_cache:
            short_cache[device_id] = deque(maxlen=50)

        short_cache[device_id].append(data)

        # 💾 buffer
        buffer.append(data)

    except Exception as e:
        print("[MQTT ERROR]", e)


client = mqtt.Client()
client.on_message = on_message


def start_mqtt():
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.subscribe(MQTT_TOPIC)
    client.loop_start()
    print("🚀 MQTT started")