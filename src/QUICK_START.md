# ⚡ Quick Start - Get Running in 5 Minutes

## 🎯 Goal
Connect your Streamlit Python backend with the modern React UI.

## 📋 Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- Your Streamlit code ready
- API keys (Groq, Gemini, Pexels)

## 🚀 5-Minute Setup

### 1️⃣ Copy Export Functions (2 minutes)

Open your Streamlit file and copy these 3 functions:

- `generate_pdf()` 
- `generate_docx()`
- `generate_html()`

Paste them into `/backend/main.py` after line 180 (the helper functions section).

**Quick tip:** Search for these function names in your Streamlit code, copy the entire function including all helper functions they use.

### 2️⃣ Start Backend (1 minute)

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Wait for: `Uvicorn running on http://0.0.0.0:8000`

### 3️⃣ Start Frontend (1 minute)

**New terminal:**
```bash
npm install  # First time only
npm run dev
```

Wait for: `Local: http://localhost:5173`

### 4️⃣ Configure (1 minute)

1. Open browser: `http://localhost:5173`
2. Click **Settings**
3. Enter:
   - Backend URL: `http://localhost:8000`
   - Click **Test** (should see ✅)
   - Groq API Key: `your-key-here`
   - Gemini API Key: `your-key-here`
   - Click **Save Settings**

### 5️⃣ Create Blog! (30 seconds)

1. Click **Blog Creation**
2. Enter topic: "AI in Healthcare"
3. Click **Create Blog with AI**
4. Wait for generation
5. Download PDF/DOCX/HTML!

## ✅ Done!

You're now running:
- ✅ FastAPI Backend on port 8000
- ✅ React Frontend on port 5173
- ✅ Connected and working!

## 🆘 Quick Fixes

### Backend won't start
```bash
pip install fastapi uvicorn groq google-generativeai
```

### Frontend won't start
```bash
npm install
```

### Can't connect
- Check backend is running: `http://localhost:8000/api/health`
- Check URL in Settings: `http://localhost:8000` (no trailing /)

### No export functions
- You need to copy `generate_pdf()`, `generate_docx()`, `generate_html()` from your Streamlit code
- See `SETUP_GUIDE.md` for detailed instructions

## 📚 More Help

- **Detailed Setup**: See `SETUP_GUIDE.md`
- **Understanding Flow**: See `INTERCONNECTION.md`
- **Backend Docs**: See `backend/README.md`

## 🎊 What You Get

- Modern, animated UI
- Real-time progress tracking
- Image generation (Gemini)
- Export to PDF/DOCX/HTML
- All your Streamlit functionality
- Better user experience

Happy blogging! 🚀
