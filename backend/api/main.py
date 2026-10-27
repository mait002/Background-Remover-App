from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove
from PIL import Image
import io

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    try:

        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        output = remove(image)

        buffer = io.BytesIO()
        output.save(buffer, format="PNG")
        buffer.seek(0)  
        # reset pointer to the beginning of the file stream

        return StreamingResponse(buffer, media_type="image/png")
    except Exception as e:
        return {"error": f"Failed processing image {str(e)}"}