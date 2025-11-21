# 🔐 Environment Variables Setup (.env)

## ✅ Perfect! Now You Can Use .env File!

Instead of entering API keys in the UI every time, you can store them in a `.env` file in the backend folder. The system will automatically use these keys!

## 🚀 Quick Setup (3 Minutes)

### Step 1: Create .env File

Navigate to the backend folder and create a `.env` file:

```bash
cd backend
cp .env.example .env
```

Or manually create `/backend/.env`

### Step 2: Add Your API Keys

Open `/backend/.env` and add your keys:

```env
# Required: Groq API Key for blog content generation
GROQ_API_KEY=your_actual_groq_key_here

# Required: Gemini API Key for AI image generation
GEMINI_API_KEY=your_actual_gemini_key_here

# Optional: Pexels API Key for stock photos
PEXELS_API_KEY=your_actual_pexels_key_here

# Backend Configuration (optional)
PORT=8000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:5173
```

### Step 3: Get Your API Keys

#### Groq API Key (Required) - FREE
1. Go to: https://console.groq.com
2. Sign up / Log in
3. Click "API Keys"
4. Click "Create API Key"
5. Copy the key
6. Paste into `.env` file: `GROQ_API_KEY=your_key_here`

#### Gemini API Key (Required) - FREE  
1. Go to: https://aistudio.google.com
2. Sign in with Google
3. Click "Get API Key"
4. Create new key
5. Copy the key
6. Paste into `.env` file: `GEMINI_API_KEY=your_key_here`

#### Pexels API Key (Optional) - FREE
1. Go to: https://www.pexels.com/api/
2. Sign up / Log in
3. Generate API key
4. Copy the key
5. Paste into `.env` file: `PEXELS_API_KEY=your_key_here`

### Step 4: Start Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Step 5: Start Frontend

```bash
# New terminal
npm run dev
```

### Step 6: Test It!

1. Open: `http://localhost:5173`
2. Go to **Blog Creation** (skip Settings!)
3. Fill in blog details
4. Click **Create Blog with AI**
5. It works! The backend uses keys from `.env` automatically! 🎉

## 🎯 How It Works

```
┌────────────────────────────────────────┐
│  Flow with .env file:                  │
├────────────────────────────────────────┤
│                                        │
│  1. User opens React UI                │
│  2. User creates blog (no keys needed!)│
│  3. React sends request to backend     │
│  4. Backend reads keys from .env       │
│  5. Backend calls APIs with keys       │
│  6. Blog generated! ✅                 │
│                                        │
│  No need to enter keys in UI!         │
└────────────────────────────────────────┘
```

## 💡 Two Ways to Use API Keys

### Option 1: .env File (Recommended) ⭐

**Pros:**
- ✅ No need to enter keys in UI
- ✅ More secure (keys stay on server)
- ✅ Easier for deployment
- ✅ Keys persist across restarts
- ✅ One-time setup

**Setup:**
1. Add keys to `/backend/.env`
2. Start backend
3. Use UI without entering keys

### Option 2: UI Settings (Alternative)

**Pros:**
- ✅ Can change keys without restarting
- ✅ Can use different keys per session
- ✅ Good for testing multiple accounts

**Setup:**
1. Open UI Settings
2. Enter keys manually
3. Click Save

### Option 3: Hybrid (Best of Both!)

You can use both! The backend will:
1. **First** check if keys are provided in UI Settings headers
2. **If not**, use keys from `.env` file
3. This gives you flexibility!

## 📁 File Structure

```
your-project/
├── backend/
│   ├── .env  ← Your API keys (create this!)
│   ├── .env.example  ← Template (already exists)
│   ├── .gitignore  ← Protects .env from Git
│   ├── main.py  ← Backend code
│   └── requirements.txt
├── src/
│   └── ... (React frontend)
└── ENV_SETUP.md  ← This guide
```

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Add `.env` to `.gitignore` (already done!)
- ✅ Never commit `.env` to Git
- ✅ Use `.env.example` as template
- ✅ Keep `.env` on server only
- ✅ Use different keys for dev/prod

### ❌ DON'T:
- ❌ Share `.env` file
- ❌ Commit `.env` to repository
- ❌ Put real keys in `.env.example`
- ❌ Store keys in frontend code
- ❌ Share keys publicly

## 🧪 Testing Your Setup

### Test 1: Backend Loads Keys

```bash
cd backend
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('Groq:', 'OK' if os.getenv('GROQ_API_KEY') else 'Missing')"
```

Should output: `Groq: OK`

### Test 2: Backend Starts

```bash
python main.py
```

Should see: `Uvicorn running on http://0.0.0.0:8000`

### Test 3: API Health Check

Open browser: `http://localhost:8000/api/health`

Should see: `{"status": "ok", ...}`

### Test 4: Create Blog Without UI Keys

1. Open React UI: `http://localhost:5173`
2. DON'T enter keys in Settings
3. Go to Blog Creation
4. Create a blog
5. If it works, .env is working! ✅

## 🐛 Troubleshooting

### "Groq API key is required"

**Problem:** Backend can't find .env keys

**Solutions:**
1. Check `.env` file exists in `/backend/` folder
2. Check keys are on separate lines
3. Check no quotes around keys (just `GROQ_API_KEY=sk-123`)
4. Restart backend: Stop (Ctrl+C) and `python main.py`

### ".env file not found"

**Problem:** File doesn't exist

**Solution:**
```bash
cd backend
cp .env.example .env
# Then edit .env with your keys
```

### "Invalid API key"

**Problem:** Wrong key format

**Solutions:**
1. Check you copied the full key
2. No extra spaces before/after key
3. Get new key from API provider
4. Make sure key is activated

### Keys not working after change

**Problem:** Backend cache

**Solution:**
```bash
# Stop backend (Ctrl+C)
# Start again
python main.py
```

## 📊 Example .env File

```env
# ============================================
# Blog Generation System - Environment Config
# ============================================

# Groq API (Required)
# Get from: https://console.groq.com
GROQ_API_KEY=sk-proj-abc123xyz789...

# Gemini API (Required for Images)
# Get from: https://aistudio.google.com
GEMINI_API_KEY=AIzaSyABC123XYZ789...

# Pexels API (Optional)
# Get from: https://www.pexels.com/api/
PEXELS_API_KEY=563492ad6f917...

# Backend Configuration
PORT=8000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:5173
```

## 🎉 Benefits of Using .env

```
┌──────────────────────────────────────┐
│  Without .env:                       │
│  ✗ Enter keys in UI every time      │
│  ✗ Keys sent over network           │
│  ✗ Manual configuration              │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  With .env:                          │
│  ✓ One-time setup                    │
│  ✓ Keys stay secure on server       │
│  ✓ Automatic configuration           │
│  ✓ Easy deployment                   │
│  ✓ Professional setup                │
└──────────────────────────────────────┘
```

## 🚀 Complete Workflow

### First Time Setup:

```bash
# 1. Create .env file
cd backend
cp .env.example .env

# 2. Edit .env and add your keys
nano .env  # or use any text editor

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start backend
python main.py

# 5. Start frontend (new terminal)
cd ..
npm run dev

# 6. Open browser and create blogs!
# No need to enter keys in UI! ✨
```

### Every Time After:

```bash
# Terminal 1
cd backend && python main.py

# Terminal 2
npm run dev

# Done! Keys loaded automatically from .env
```

## 📚 More Information

- **Full Setup Guide**: [STANDALONE_SETUP.md](STANDALONE_SETUP.md)
- **API Keys Guide**: [API_KEYS_ONLY.md](API_KEYS_ONLY.md)
- **Backend Docs**: [backend/README.md](backend/README.md)

## ✅ Checklist

Setup .env correctly when you can check all these:

- [ ] `.env` file exists in `/backend/` folder
- [ ] GROQ_API_KEY is set
- [ ] GEMINI_API_KEY is set
- [ ] No quotes around keys
- [ ] No spaces before/after `=`
- [ ] Backend starts without errors
- [ ] Can create blog without entering keys in UI
- [ ] `.env` is in `.gitignore`

All checked? You're ready! 🎊

---

**Questions?**

- Can I use both .env and UI keys? **Yes! UI keys override .env keys**
- Is .env secure? **Yes, if you don't commit it to Git (already protected)**
- Can I change keys without restart? **Use UI Settings for dynamic changes**
- Where should I deploy .env? **Keep it secure on your server, never in Git**

**Happy blogging with automatic API key management!** 🚀
