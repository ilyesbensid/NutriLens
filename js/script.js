const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if(file){
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
        document.getElementById("uploadText").innerHTML="✅ تم اختيار الصورة";
    }

});

document.getElementById("analyzeBtn").addEventListener("click", async ()=>{

    result.innerHTML="⌛ جاري الاتصال بالخادم...";

    try{

        const response = await fetch("http://localhost:8000");

        const data = await response.json();

        result.innerHTML=`
        <h3>✅ تم الاتصال بالخادم</h3>

        <p><b>المشروع:</b> ${data.project}</p>

        <p><b>الحالة:</b> ${data.status}</p>

        <p>${data.message}</p>
        `;

    }catch(error){

        result.innerHTML="❌ لم أستطع الاتصال بالخادم";

    }

});