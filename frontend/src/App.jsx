import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  async function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8001/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      setResult(data);

    } catch (error) {
      setResult({
        message: "حدث خطأ في الاتصال بالسيرفر ❌"
      });
    }
  }

  return (
    <div>
      <h1>🍎 NutriLens</h1>
      <p>AI Food Analyzer</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      {image && (
        <div>
          <h3>Your Food Image:</h3>

          <img
            src={image}
            alt="food"
            width="300"
          />
        </div>
      )}

      {result && (
        <div>
          <h2>{result.message}</h2>

          <h3>
            🍽️ Food: {result.food}
          </h3>

          <p>
            🔥 Calories: {result.calories}
          </p>

          <p>
            💪 Protein: {result.protein}
          </p>

          <p>
            🍚 Carbs: {result.carbs}
          </p>

          <p>
            🥑 Fat: {result.fat}
          </p>
        </div>
      )}

    </div>
  );
}

export default App;