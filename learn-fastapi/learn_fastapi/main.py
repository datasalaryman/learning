from fastapi import FastAPI

from pydantic import BaseModel
from typing import Any

app = FastAPI()

class PayloadModel(BaseModel):
    table: str
    data: dict[str, list[Any]]

@app.get("/")
async def root():
    return "Hello, I'm CRUD API"

@app.post("/create")
async def create(payload: PayloadModel):
    return payload

@app.get("/read")
async def read():
    return "Reading table in DB"

@app.post("/update")
async def update(payload: PayloadModel):
    return payload

@app.get("/delete")
async def delete():
    return "Deleting table in DB"