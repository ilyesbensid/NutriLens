from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(
    title="NutriLens API",
    version="0.1.0"
)

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

app.mount("/css", StaticFiles(directory=os.path.join(BASE_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(BASE_DIR, "js")), name="js")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return FileResponse(os.path.join(BASE_DIR, "index.html"))

@app.get("/login.html")
def login():
    return FileResponse(os.path.join(BASE_DIR, "login.html"))

@app.post("/analyze")
async def analyze_food(image: UploadFile = File(...)):
    return {
        "food": "Pizza 🍕",
        "calories": "266 kcal",
        "protein": "11 g",
        "carbs": "33 g",
        "fat": "10 g",
        "message": "تم تحليل الطعام بنجاح ✅",
        "filename": image.filename
    }
