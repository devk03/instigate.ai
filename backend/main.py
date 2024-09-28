# Standard imports
from fastapi import FastAPI, Request, UploadFile, File
from dotenv import load_dotenv
import pytesseract
from PIL import Image
import io


app = FastAPI()
load_dotenv()

# Custom imports
from src.chatFunctions.instigate import instigate


@app.get("/")
def read_root():
    return {"Test": "Route"}


@app.post("/instigate_text")
async def chat(request: Request):
    """
    Instigates a response from the LLM
    """
    body = await request.json()
    message = body["message"]
    response = instigate(message)
    return response


@app.post("/instigate_image")
async def image_chat(file: UploadFile = File(...)):
    """
    Instigates a response from the LLM based on uploaded image
    """

    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    # Perform OCR
    text = str(pytesseract.image_to_string(image))

    # Generate instigation based on extracted text
    response = instigate(text)

    return response
