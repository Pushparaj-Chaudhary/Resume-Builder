# AI Resume Builder

A comprehensive web application for building professional resumes with AI-integrated features to optimize for Applicant Tracking Systems (ATS).

## 🚀 Key Features

- **Resume Builder**: Intuitive builder with a live preview and multiple modern templates.
- **ATS Checker**: Evaluate your resume against specific job descriptions using AI.
- **ATS-Optimized Template**: A specialized, highly-parsable layout designed for machine readability.
- **"View Raw ATS Text"**: Preview exactly what the ATS system sees when parsing your resume.
- **AI Enhancements**: Enhances professional summaries and job descriptions with a single click.
- **Cloud Storage**: Securely store and manage multiple resumes in your dashboard.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide-React.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **AI Integration**: OpenAI SDK (configured for Google Gemini API compatibility).

## 📂 Project Structure

- `client/`: React frontend application.
- `server/`: Node.js/Express backend API.

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js installed
- MongoDB URI (Atlas or local)
- Google Gemini API Key

### 2. Backend Setup
```bash
cd server
npm install
# Configure your .env (see .env.example)
npm run server
```

### 3. Frontend Setup
```bash
cd client
npm install
# Configure your .env (see .env.example)
npm run dev
```

## 🌐 Deployment Configuration

### Frontend (Vercel)
The project includes a `vercel.json` for SPA routing. Ensure you set `VITE_BASE_URL` to your production backend URL.

### Backend (Render)
A `GET /api/health` endpoint is available for UptimeRobot monitoring to keep the Render free tier service awake.

## 📄 License

This project is licensed under the ISC License.
