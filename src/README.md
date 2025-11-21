# 🤖 Blog Generation System - Modern React UI

A modern, animated web application for automated blog content generation using AI. This React frontend **works completely standalone** - just add your API keys (Groq, Gemini, Pexels) and start creating blogs!

## ✅ No Streamlit Required!

This system works **100% independently**. You only need:
- ✅ Groq API key (for blog generation)
- ✅ Gemini API key (for AI images)
- ✅ Pexels API key (optional, for stock photos)

**Get Started**: See **[STANDALONE_SETUP.md](STANDALONE_SETUP.md)** for 5-minute setup!

## ✨ Features

### 🎨 Frontend (React + TypeScript)
- ✅ Modern, animated UI with smooth transitions
- ✅ Real-time progress tracking
- ✅ Comprehensive blog configuration
- ✅ Responsive design (mobile/desktop)
- ✅ Settings management with API key storage
- ✅ Multi-format export (PDF, DOCX, HTML)
- ✅ Image gallery with AI-generated visuals
- ✅ Error handling with helpful messages

### 🐍 Backend (FastAPI + Python)
- ✅ Uses your existing Streamlit functions
- ✅ RESTful API endpoints
- ✅ Groq/Llama-3.1 for content generation
- ✅ Gemini 2.5 Flash for image generation
- ✅ Pexels integration for stock photos
- ✅ PDF/DOCX/HTML export
- ✅ CORS enabled
- ✅ Interactive API documentation

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BLOG GENERATION SYSTEM                    │
└─────────────────────────────────────────────────────────────┘

    FRONTEND                   BACKEND                   EXTERNAL APIs
    
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│  React UI    │ ──────► │  FastAPI     │ ──────► │  Groq API    │
│  TypeScript  │  HTTP   │  Python      │         │  (Llama-3.1) │
│  Motion      │  REST   │              │         │              │
│  Tailwind    │ ◄────── │  Your        │ ──────► │  Gemini API  │
│              │  JSON   │  Streamlit   │         │  (Images)    │
│  Port 5173   │         │  Functions   │         │              │
│              │         │              │ ──────► │  Pexels API  │
│              │         │  Port 8000   │         │  (Photos)    │
└──────────────┘         └──────────────┘         └──────────────┘
```

## 🚀 Quick Start

### Option 1: Express Setup (5 minutes)
See **[QUICK_START.md](QUICK_START.md)** for fastest setup.

### Option 2: Detailed Setup
See **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for complete instructions.

### Option 3: Understanding the Connection
See **[INTERCONNECTION.md](INTERCONNECTION.md)** to understand how everything connects.

## 📦 Installation

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Server runs on: `http://localhost:8000`

### Frontend Setup

```bash
npm install
npm run dev
```

App runs on: `http://localhost:5173`

## ⚙️ Configuration

1. Open app: `http://localhost:5173`
2. Go to **Settings**
3. Configure:
   - **Backend URL**: `http://localhost:8000`
   - **Groq API Key**: Your Groq key (get from [console.groq.com](https://console.groq.com))
   - **Gemini API Key**: Your Gemini key (get from [aistudio.google.com](https://aistudio.google.com))
   - **Pexels API Key**: Optional (get from [pexels.com/api](https://www.pexels.com/api/))
4. Click **Test** to verify connection
5. Click **Save Settings**

## 📝 Usage

### Create a Blog

1. Navigate to **Blog Creation**
2. Configure your blog:
   - **Core Topic**: Enter your blog topic
   - **Category**: Select category (Technology, Business, etc.)
   - **Target Audience**: Choose audience level
   - **Tone**: Select tone (Professional, Casual, etc.)
   - **Length**: Choose word count (800-6000 words)
   - **Writing Style**: Pick style (How-to, Listicle, etc.)
   - **Images**: Enable AI image generation
3. Click **Create Blog with AI**
4. Watch real-time progress
5. View generated content and images
6. Export as PDF, DOCX, or HTML

### Export Options

- **PDF**: Professional document with images and formatting
- **DOCX**: Editable Word document with images
- **HTML**: Web-ready HTML with styling

## 🎯 Pages

### 📊 Dashboard
- System metrics and statistics
- Active agents overview
- Recent activity feed
- Performance indicators

### ✍️ Blog Creation
- Comprehensive blog configuration
- Real-time generation progress
- Image generation (Gemini/Pexels)
- Content preview
- Multi-format export

### 🤖 Agent Monitor
- Active agent status
- System health metrics
- Load balancing info
- Agent performance

### 📈 Analytics
- Blog performance metrics
- Agent efficiency charts
- Engagement statistics
- Success rate tracking

### ⚙️ Settings
- Backend configuration
- API key management
- Default preferences
- Image generation settings
- Export preferences
- Agent configuration

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Backend
- **FastAPI** - REST API framework
- **Groq** - LLM integration (Llama-3.1)
- **Google Generative AI** - Image generation (Gemini)
- **FPDF** - PDF generation
- **python-docx** - DOCX generation
- **Pillow** - Image processing
- **Requests** - API calls

## 📂 Project Structure

```
blog-generation-ui/
├── src/
│   ├── App.tsx                 # Main app component
│   ├── components/
│   │   ├── Dashboard.tsx       # Dashboard page
│   │   ├── BlogCreation.tsx    # Blog creation form
│   │   ├── AgentMonitor.tsx    # Agent monitoring
│   │   ├── Analytics.tsx       # Analytics dashboard
│   │   ├── Settings.tsx        # Settings page
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── Logo.tsx            # Animated logo
│   │   └── ui/                 # UI components
│   └── utils/
│       └── api.ts              # API client
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── start.sh               # Linux/Mac startup
│   ├── start.bat              # Windows startup
│   └── README.md              # Backend documentation
├── QUICK_START.md             # 5-minute setup guide
├── SETUP_GUIDE.md             # Detailed setup instructions
├── INTERCONNECTION.md         # Architecture explanation
└── README.md                  # This file
```

## 🔌 API Endpoints

### Health Check
```http
GET /api/health
```

### Generate Blog
```http
POST /api/blog/generate
Headers:
  X-Groq-API-Key: your_groq_key
  X-Gemini-API-Key: your_gemini_key
  X-Pexels-API-Key: your_pexels_key
Body: BlogGenerationRequest
```

### Export Blog
```http
POST /api/blog/export
Body: ExportRequest
```

Interactive API docs: `http://localhost:8000/docs`

## 🎨 Screenshots

### Blog Creation Page
Modern form with comprehensive options, real-time progress tracking, and smooth animations.

### Generated Blog Preview
View content, metrics, AI-generated images, and export options.

### Settings Page
Configure backend URL, API keys, and preferences with connection testing.

## 🔧 Development

### Run Frontend in Development
```bash
npm run dev
```

### Run Backend in Development
```bash
cd backend
python main.py
# OR
uvicorn main:app --reload
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🚢 Deployment

### Frontend
Deploy to:
- **Vercel** (recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**

### Backend
Deploy to:
- **Render** (recommended)
- **Railway**
- **Heroku**
- **AWS EC2/ECS**
- **Google Cloud Run**

## 🐛 Troubleshooting

### Connection Failed
- Verify backend is running: `http://localhost:8000/api/health`
- Check backend URL in Settings (no trailing slash)
- Ensure CORS is enabled in `backend/main.py`

### API Errors
- Verify API keys are correct
- Check API key quotas/limits
- Review backend console logs

### Export Not Working
- Copy export functions from Streamlit code
- See `SETUP_GUIDE.md` Step 1.1

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get running in 5 minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions
- **[INTERCONNECTION.md](INTERCONNECTION.md)** - Architecture deep dive
- **[backend/README.md](backend/README.md)** - Backend documentation

## 🤝 Contributing

This is a custom implementation for your blog generation system. Modify and extend as needed!

## 📄 License

Private project - All rights reserved

## 🎉 Features Comparison

| Feature | Streamlit UI | React UI |
|---------|-------------|----------|
| **UI Design** | Basic | Modern, Animated |
| **Performance** | Slower | Faster |
| **Mobile** | Poor | Responsive |
| **Animations** | None | Smooth |
| **Customization** | Limited | Full control |
| **API** | No | RESTful |
| **Real-time** | Page reload | Live updates |
| **UX** | Functional | Polished |

## 🔗 Links

- **Groq Console**: https://console.groq.com
- **Gemini AI Studio**: https://aistudio.google.com
- **Pexels API**: https://www.pexels.com/api/
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **React Docs**: https://react.dev

## ✨ Credits

- **UI Design**: Modern web best practices
- **Animations**: Motion (Framer Motion)
- **AI Models**: Groq (Llama-3.1), Google Gemini
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4

---

**Built with ❤️ for automated blog content generation**

🚀 Get started: `npm run dev` → `http://localhost:5173`