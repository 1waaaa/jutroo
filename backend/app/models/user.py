from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    height = Column(Float)
    weight = Column(Float)
    city = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
