# 🌅 Jutro

Jutro is a mobile app that helps you prepare for your day by bringing your schedule, weather, UV index, hydration, and outfit recommendations together in one place.

## ✨ Features

- Personalized daily planning
- Weather and UV tracking
- Hydration goals and reminders
- AI outfit recommendations based on your clothes, activity, and weather
- Notifications for important events
- Dynamic interface that changes throughout the day

## 🛠️ Tech Stack

### Frontend

- React Native
- Expo
- TypeScript
- Tailwind CSS

### Backend

- Python
- FastAPI
- REST API

### APIs & Database

- Open-Meteo API
- Google Gemini API
- SQL

## 💡 How It Works

Jutro connects different parts of your day instead of treating them as separate features.

The planner uses activity type, duration, time windows, and fixed or flexible activities to create a daily schedule.

Weather and UV information can influence planning, hydration, notifications, and outfit recommendations.

For outfit recommendations, users upload images of clothes they own. Gemini analyzes the available items together with the activity and weather and selects a suitable outfit from the uploaded clothes.

## 🚀 Getting Started

### Requirements

- Node.js
- Python 3
- npm
- Git
- Expo Go or an Expo development build

### Clone the repository

```bash
git clone https://github.com/1waaaa/jutroo.git
cd jutroo
```

### Backend

Open a terminal in the project folder:

```powershell
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
pip install -r requirements.txt
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```powershell
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The backend runs on:

```text
http://localhost:8000
```

### Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npx expo start
```

Open the app with Expo Go or an Expo development build.

### Physical device

For a physical device, the phone and computer need to be able to communicate with the backend.

If needed, start a tunnel:

```bash
ngrok http 8000
```

Then use the generated backend URL in the frontend configuration.

## 🔐 Environment Variables

The backend requires:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit `.env` files or API keys to the repository.

## 📁 Project Structure

```text
jutroo/
├── backend/
│   └── app/
│       ├── routes/
│       └── services/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── contexts/
│   └── assets/
└── README.md
```

## 🤖 AI Outfit Recommendations

Users upload photos of clothes they own.

Gemini receives the uploaded clothing together with the selected activity and recommends an outfit using the available items.

The recommendation considers the activity and weather. For example, hot weather does not automatically mean that shorts are appropriate if the user has an activity such as university.

## 🔮 Future Improvements

- Smarter weather-aware planning
- Adaptive hydration recommendations
- Digital wardrobe
- Daily and weekly insights
- Improved background notifications
- App Store and Google Play release

## 👩‍💻 Team

Jutro was built as a collaborative project combining frontend and backend development.
