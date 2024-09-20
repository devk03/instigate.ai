# Standard imports
from typing import Union
from fastapi import FastAPI, Request
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()

# Custom imports
from src.chatFunctions.instigate import instigate


@app.get("/")
def read_root():
    return {"Test": "Route"}


@app.post("/instigate")
async def chat(request: Request):
    """
    Instigates a response from the LLM
    """
    body = await request.json()
    message = body["message"]
    response = instigate(message)
    return response
