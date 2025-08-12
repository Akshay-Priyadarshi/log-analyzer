import random
import uuid

from datetime import datetime, timedelta

import pandas as pd


# Sample data for Log attributes
levels = ["INFO", "WARN", "ERROR", "DEBUG", "CRITICAL"]
sources = ["AuthService", "PaymentGateway", "UserService", "InventoryService"]
hosts = ["192.168.0.1", "192.168.0.2", "10.0.0.1"]
applications = ["app-001", "app-002", "app-003"]
environments = ["production", "staging", "dev"]
error_codes = ["E001", "E002", "E003", None]
stack_traces = [
    "Traceback (most recent call last):\n  File 'main.py', line 1, in <module>",
    None
]
contexts = [
    {"request_id": "req-123", "user_id": "user-001"},
    {"request_id": "req-456", "user_id": "user-002"},
    None
]

# Generate sample logs
logs = []
for i in range(500):
    logs.append({
        "id": str(uuid.uuid4()),
        "level": random.choice(levels),
        "message": f"Sample log message {i+1}",
        "timestamp": datetime.utcnow() - timedelta(
            minutes=random.randint(0, 500)
        ),
        "source": random.choice(sources),
        "host": random.choice(hosts),
        "application_id": random.choice(applications),
        "thread_id": str(random.randint(1000, 5000)),
        "environment": random.choice(environments),
        "error_code": random.choice(error_codes),
        "stack_trace": random.choice(stack_traces),
        "context": random.choice(contexts)
    })

# Create DataFrame
df_logs = pd.DataFrame(logs)

# Save to Excel
file_path = "./sample_logs.xlsx"
df_logs.to_excel(file_path, index=False)
