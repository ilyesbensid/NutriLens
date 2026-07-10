from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="NutriLens API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "project": "NutriLens",
        "status": "online",
        "message": "🚀 FastAPI يعمل بنجاح"
    }

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
