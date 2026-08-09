from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.weather import router as weather_router
from app.routes.planner import router as planner_router
from app.routes.outfit import router as outfit_router


from app.database.database import Base, engine
from app.models.user import User
from app.routes.auth import router as auth_router

app = FastAPI()

# Dozvoli pristup sa React Native aplikacije
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Za hakaton je sasvim u redu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(planner_router)
app.include_router(outfit_router)

@app.get("/")
def root():
    return {
        "message": "Backend radi!"
    }

app.include_router(weather_router)