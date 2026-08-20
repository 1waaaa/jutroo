# 🌅 Jutro

> **Wake up. Open Jutro. Know your day.**

Jutro is an AI-powered personal morning assistant designed to make everyday life a little easier.

Instead of checking multiple apps for your schedule, weather, hydration, UV exposure, and outfit inspiration, Jutro brings everything together into one personalized daily experience.

Jutro helps you organize your day while taking care of the small things that are easy to overlook — from drinking enough water and protecting your skin from UV radiation to choosing an outfit that fits both the weather and your activities.

---

## 💡 Inspiration

**Jutro** is the Serbian word for **morning**, and that is exactly where our idea started.

We were inspired by the recent European heat wave and how difficult it could be to simply get through a normal day when the UV index is extremely high. Going outside at the wrong time, not drinking enough water, wearing the wrong clothes, or trying to organize too many things at once can quickly turn an ordinary day into an exhausting one.

We realized that these problems are connected, but the solutions are usually scattered across different apps.

So we asked ourselves:

**What if your morning assistant could prepare you for the entire day?**

That became Jutro.

---

## ✨ What Jutro Does

Jutro brings the things you need throughout your day together in one place.

### 📅 Personalized Daily Planning

Jutro creates a personalized daily plan based on:

- activities the user needs to complete
- activity duration
- available time windows
- fixed and flexible activities
- weather conditions

The planner understands the difference between activities that cannot be moved, such as university or work, and flexible activities such as going for a walk or getting coffee.

Instead of simply displaying a list of tasks, Jutro helps organize them into a realistic schedule.

### ☀️ Weather & UV Awareness

Jutro keeps users aware of the conditions outside, including:

- temperature
- weather conditions
- UV index

Weather information is also used by other parts of the application.

For example, a high UV index can trigger a notification, while temperature and weather conditions can influence activity planning, hydration, and outfit recommendations.

We believe that taking care of yourself is not only about food and exercise. Protecting your skin from excessive UV exposure is also an important part of everyday self-care.

### 💧 Hydration Tracking

Jutro helps users stay hydrated throughout the day.

Users receive personalized hydration goals and can keep track of their water intake.

The idea is to make hydration something that happens naturally throughout the day instead of something users have to remember on their own.

### 👗 AI Outfit Recommendations

Jutro can generate outfit recommendations using the clothing items that the user actually owns.

The recommendation takes into account:

- uploaded clothing items
- current weather
- temperature
- planned activity
- the context of the activity

The outfit generation is powered by **Google Gemini**.

The AI does not simply make a decision based on temperature.

For example, **30°C does not automatically mean shorts**. If the user has university that day, Jutro can consider that context and recommend an outfit that is appropriate for the activity as well as the weather.

The goal is to make outfit recommendations feel practical and personalized rather than generic.

### 🔔 Notifications

Jutro can notify users when something important requires their attention.

Examples include:

- high UV exposure
- hydration reminders
- other relevant information throughout the day

The goal is not to constantly interrupt the user, but to surface information when it actually matters.

---

## 🎨 A Different Kind of Productivity App

Jutro is not meant to feel like another productivity dashboard.

Its UI changes throughout the day, with colors and atmosphere inspired by the natural transition from morning to afternoon and evening.

We wanted opening Jutro to feel calming and refreshing, like taking a deep breath before starting your day.

Instead of adding more information to your life, Jutro is designed to reduce the amount of information you have to think about.

---

## 🛠️ How We Built It

Jutro is a full mobile application combining a mobile frontend, custom backend, database, external APIs, and AI.

### Frontend

- **React Native**
- **Expo**
- **TypeScript**
- **Tailwind CSS**

### Backend

- **Python**
- **FastAPI**
- **REST API**

### Database

- **SQL database**

### External APIs & AI

- **Open-Meteo API** — weather and UV data
- **Google Gemini API** — AI-powered outfit generation

---

## 🏗️ Architecture

The application is divided into a React Native frontend and a FastAPI backend.

```text
                     ┌─────────────────────┐
                     │   React Native      │
                     │       + Expo        │
                     │      Frontend       │
                     └──────────┬──────────┘
                                │
                                │ REST API
                                ▼
                     ┌─────────────────────┐
                     │       FastAPI       │
                     │       Backend       │
                     └───────┬─────┬───────┘
                             │     │
                ┌────────────┘     └──────────────┐
                ▼                                  ▼
       ┌─────────────────┐                ┌─────────────────┐
       │    SQL Database │                │ External APIs   │
       │                 │                │                 │
       │ Users / Data    │                │ Open-Meteo      │
       └─────────────────┘                │ Gemini          │
                                          └─────────────────┘
```

The frontend communicates with the backend through REST APIs.

The backend is responsible for application logic, database communication, weather data, planning, and AI integration.

---

## 📁 Project Structure

```text
jutro/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── contexts/
│   ├── assets/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

- Node.js
- Python 3
- npm
- Git
- Expo / Expo Go

---

## 1. Clone the Repository

```bash
git clone https://github.com/1waaaa/jutroo.git
cd jutroo
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment:

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the required dependencies:

```powershell
pip install -r requirements.txt
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The API key should not be committed to GitHub.

---

## ▶️ Start the Backend

From the `backend` directory:

```powershell
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The backend will run on:

```text
http://localhost:8000
```

---

# 📱 Frontend Setup

Open a new terminal and navigate to the frontend:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start Expo:

```powershell
npx expo start
```

The application can then be opened using **Expo Go** or an appropriate development build.

---

# 🌐 Testing the Backend on a Physical Device

When testing Jutro on a physical mobile device, the phone needs to be able to communicate with the backend running on the computer.

For development, the backend can be exposed using **ngrok**:

```bash
ngrok http 8000
```

This creates a public URL that forwards requests to the local FastAPI server.

```text
Internet
    │
    ▼
ngrok public URL
    │
    ▼
localhost:8000
    │
    ▼
FastAPI Backend
```

---

# 🤖 AI Outfit Generation

One of the main AI features of Jutro is personalized outfit generation.

The user uploads images of clothing they own.

The backend sends those images together with the user's activity to Gemini.

The AI then:

1. Identifies the uploaded clothing items.
2. Considers the user's activity.
3. Considers the weather context.
4. Selects suitable items from the uploaded clothing.
5. Returns a structured outfit recommendation.
6. Provides a short explanation for the recommendation.

The system is instructed to use only the clothing items provided by the user.

```text
User's wardrobe
       │
       ▼
Upload clothing images
       │
       ▼
FastAPI Backend
       │
       ▼
Google Gemini
       │
       ▼
Outfit recommendation
       │
       ▼
React Native App
```

---

# 🌦️ Weather-Aware Planning

Weather is not treated as a separate feature.

It influences several parts of the application.

```text
                 Weather
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
     Planning    Hydration    Outfit
        │           │           │
        └───────────┼───────────┘
                    ▼
             Daily Experience
```

For example:

- high temperatures can influence hydration
- high UV levels can trigger notifications
- weather can affect outdoor activities
- temperature can influence outfit recommendations
- weather can be considered when organizing flexible activities

This allows the different parts of Jutro to work together instead of behaving like separate features.

---

# 🧠 Planner

The planner receives information about the user's activities, including:

- activity type
- duration
- earliest possible start time
- latest possible start time
- whether the activity is fixed or flexible
- whether the activity is outdoors

The backend then generates a schedule that takes these constraints into account.

For example:

```text
Fixed activity:
University
11:00 → 14:00

Flexible activities:
Gym
16:00 → 22:00

Cafe
15:00 → 23:00
```

The planner can then organize the flexible activities around the fixed parts of the user's day.

---

# 📲 User Experience

We wanted Jutro to feel simple from the moment it is opened.

The user should not have to navigate through several different tools just to understand their day.

Instead, Jutro brings together:

**weather → planning → hydration → outfits → notifications → daily experience**

in one place.

---

# 🏆 Why Jutro?

Modern life requires us to constantly make small decisions.

What should I wear?

When should I go outside?

Do I need to protect myself from the sun?

Have I drunk enough water?

Can I fit everything into my schedule?

Jutro connects these decisions into one personalized experience.

Our goal is simple:

> **You open Jutro in the morning, and you already know what your day looks like.**

---

# 🔮 What's Next

We see Jutro as something that could grow far beyond a hackathon project.

Some of the features we would like to build next include:

- **Smarter weather-aware planning** — automatically suggesting better times for outdoor activities.
- **Adaptive hydration recommendations** — adjusting hydration goals based on temperature, activity, and time spent outdoors.
- **A smarter digital wardrobe** — allowing Jutro to better understand the clothes users actually own.
- **Daily and weekly insights** — helping users understand patterns in hydration, activity, and routines.
- **Richer dynamic themes and animations** — making the interface evolve even more naturally throughout the day.
- **Reliable background notifications** — allowing Jutro to stay helpful even when the application is not open.
- **App Store and Google Play release** — turning Jutro from a hackathon project into a real product people can use every morning.

---

# 👩‍💻 Built For the Hackathon

Jutro was created as a collaborative hackathon project.

We combined frontend development, backend development, mobile technologies, external APIs, databases, and generative AI to turn a simple idea into a working end-to-end mobile application.

This project gave us the opportunity to work through the entire product development process:

```text
Idea
  ↓
Architecture
  ↓
API Design
  ↓
Database
  ↓
Backend
  ↓
Frontend
  ↓
AI & API Integrations
  ↓
Testing
  ↓
Mobile Application
```

---

# ❤️ Our Goal

Jutro is not meant to tell you how to live your life.

It is meant to make the everyday decisions that come with a busy life feel a little easier.

A little less planning.

A little less remembering.

A little more time for yourself.

**Wake up. Open Jutro. Know your day.**
