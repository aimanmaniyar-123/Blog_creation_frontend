# Backend API Setup Guide

This document explains how to set up your Python backend to work with the React frontend.

## Required Endpoints

Your Python backend should expose the following endpoints:

### 1. Health Check
```python
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend is running"}
```

### 2. Generate Blog
```python
@app.post("/api/blog/generate")
async def generate_blog(request: BlogGenerationRequest):
    # Extract API keys from headers
    groq_api_key = request.headers.get("X-Groq-API-Key")
    gemini_api_key = request.headers.get("X-Gemini-API-Key")
    pexels_api_key = request.headers.get("X-Pexels-API-Key")
    
    # Your existing Streamlit logic here
    # Use the generate_blog_with_llm, generate_gemini_image, etc.
    
    return {
        "success": True,
        "title": "Generated Blog Title",
        "content": "Full blog content in markdown",
        "wordCount": 3500,
        "readingTime": "15 min",
        "images": ["image_url_1", "image_url_2"],
        "imageDescriptions": ["Description 1", "Description 2"],
        "seoScore": "8.5/10"
    }
```

### 3. Export Blog
```python
@app.post("/api/blog/export")
async def export_blog(request: ExportRequest):
    # Use your existing generate_pdf, generate_docx, generate_html functions
    
    if request.format == "pdf":
        pdf_bytes = generate_pdf(
            request.title,
            request.content,
            request.metaInfo,
            request.images,
            request.imageDescriptions
        )
        return Response(content=pdf_bytes, media_type="application/pdf")
    
    elif request.format == "docx":
        docx_bytes = generate_docx(...)
        return Response(content=docx_bytes, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    
    elif request.format == "html":
        html_bytes = generate_html(...)
        return Response(content=html_bytes, media_type="text/html")
```

## Request/Response Models

### BlogGenerationRequest
```python
class BlogGenerationRequest(BaseModel):
    topic: str
    category: str
    niche: str = ""
    keywords: str = ""
    targetAudience: str
    contentIntent: str
    expertiseLevel: str
    tone: str
    length: str
    writingStyle: str
    additionalContext: str = ""
    useAiImages: bool
    numAiImages: int
    usePexels: bool
    numPexelsImages: int
```

### ExportRequest
```python
class ExportRequest(BaseModel):
    title: str
    content: str
    format: str  # "pdf", "docx", or "html"
    images: List[str] = []
    imageDescriptions: List[str] = []
    metaInfo: dict = {}
```

## CORS Configuration

Make sure to enable CORS for your frontend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Running the Backend

1. Install dependencies:
```bash
pip install fastapi uvicorn groq google-generativeai requests fpdf python-docx pillow
```

2. Run the server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

3. Configure frontend:
   - Go to Settings page
   - Enter `http://localhost:8000` as Backend API Base URL
   - Click "Test" to verify connection
   - Add your API keys (Groq, Gemini, Pexels)
   - Click "Save Settings"

## Converting Streamlit to FastAPI

Your existing Streamlit code can be adapted to FastAPI:

1. **Session state** → **Request body parameters**
2. **st.form** → **POST endpoint with Pydantic models**
3. **st.download_button** → **Return Response with file bytes**
4. **st.spinner** → **Progress tracking via websockets (optional)**

## Example FastAPI Structure

```
backend/
├── main.py              # FastAPI app
├── blog_generator.py    # Your existing blog generation logic
├── image_generator.py   # Gemini image generation
├── exporters.py         # PDF, DOCX, HTML generators
└── requirements.txt
```

## Testing the API

Use curl or Postman to test:

```bash
# Health check
curl http://localhost:8000/api/health

# Generate blog
curl -X POST http://localhost:8000/api/blog/generate \
  -H "Content-Type: application/json" \
  -H "X-Groq-API-Key: your_key" \
  -H "X-Gemini-API-Key: your_key" \
  -d '{"topic": "AI in Healthcare", "category": "Technology", ...}'
```
