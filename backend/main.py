# main.py
import dotenv
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers import log_router


dotenv.load_dotenv(dotenv.find_dotenv())

app = FastAPI(title="Log Monitoring API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach your routes
app.include_router(log_router)

@app.get("/HealthCheck")
def health_check():
    return "Healthy"

if __name__ == "__main__":
    # This will start uvicorn when you run: python main.py
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
