<p align="center">
  <img src="./assets/banner.png" alt="Monster Synth Banner" width="900" height="450" />
</p>

# Monster Synth Web App

**Monster Synth** is a web application that transforms audio input into a dynamic virtual "music monster." The monster evolves based on audio features such as BPM, pitch, and timbre. By combining audio analysis, web graphics, and machine learning, Monster Synth delivers a fun and educational experience for music and tech enthusiasts. Whether you’re exploring how different sounds affect visual elements, or seeking an engaging tool for music visualization, Monster Synth offers a seamless blend of creativity and technology.

---

## 🚀 Key Features (MVP)

-   **User Authentication & Registration**
    -   Email/password and OAuth (Google, GitHub) via NextAuth.js integrated with Supabase database.
-   **Monster Creation**
    -   Generate a base monster with default visual attributes before any audio input.
-   **Audio Input**
    -   Upload MP3/WAV files or record directly in the browser via Web Audio API.
-   **Audio Analysis**
    -   Extract features (BPM, key, spectral data) using Meyda/Web Audio API in the Next.js frontend.
-   **Dynamic Evolution**
    -   Update monster appearance and behaviors (colors, shapes, animations) based on extracted audio data in real time.
-   **User Dashboard**
    -   View monster stats, evolution history, and music analytics (e.g., BPM over time charts).

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack & Architecture](#tech-stack--architecture)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Roadmap & Progress](#roadmap--progress)
6. [Checklist](#checklist)
7. [Contributing](#contributing)
8. [License](#license)

---

## Overview

Monster Synth blends the worlds of audio processing and interactive graphics. Using modern web technologies, users can see their music visualized and personified as a “monster” whose traits shift and evolve according to the sound’s characteristics. This project serves as:

-   **Educational tool**: Understand audio features like BPM, pitch, and timbre through visual feedback.
-   **Creative playground**: Artists and developers can experiment with custom mappings between sound and visual parameters.
-   **Foundation for ML research**: Extendable for future machine learning models that generate entirely new creature forms from audio input.

---

## 🛠 Tech Stack & Architecture

### Frontend

-   **Next.js (React)**
    -   Server-side rendering (SSR) and static generation (SSG) for performance and SEO.
-   **Tailwind CSS**
    -   Utility-first CSS framework for rapid UI development.
-   **Canvas API / Three.js**
    -   2D/3D rendering of the monster, with support for complex animations.
-   **Web Audio API + Meyda**
    -   In-browser audio capture and real-time feature extraction (BPM, spectral centroid, etc.).
-   **NextAuth.js**
    -   Authentication flows, using Supabase adapter for session persistence.

### Backend

-   **NestJS (Node.js)**
    -   Modular RESTful API architecture, with support for middleware and dependency injection.
-   **Supabase**
    -   Postgres database for user and session data, plus Supabase Storage for hosting audio files.
-   **Prisma**
    -   Type-safe ORM for database schema management and migrations.

### System Workflow

```plaintext
[Browser (Next.js)]
  ├─ Authentication (NextAuth.js ↔ Supabase)
  ├─ Audio capture & analysis (Web Audio API + Meyda)
  ├─ Monster rendering (Canvas/Three.js)
  └─ REST API calls → [NestJS] → Supabase (Postgres + Storage)

[NestJS]
  ├─ Auth validation middleware
  ├─ Endpoints: upload audio → Supabase Storage
  ├─ Endpoints: retrieve analysis data, monster state
  └─ Database operations via Prisma/Postgres
```

---

## Getting Started

### Prerequisites

-   Node.js >= 18.x
-   npm or yarn
-   A Supabase project (for Auth & Storage)
-   GitHub account (to fork & open PRs)

### Installation

```bash
# Clone the repo
git clone https://github.com/LumaAlexia/monster-synth.git
cd monster-synth

# Install root dependencies
npm install

# Install frontend and backend dependencies in parallel
cd frontend && npm install
cd ../backend && npm install
```

### Setup Environment Variables

Create a `.env` file in the `frontend` and `backend` directories with the following variables:

```plaintext
# Frontend .env
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend .env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_supabase_database_url
```

### Running in Development

```bash
# Start backend server
cd backend
npm run dev

# Start frontend dev server
cd ../frontend
npm run dev
```

Visit `http://localhost:3000` to interact with your Monster Synth instance.

---

## Usage

1. Sign up or log in via email or OAuth (Google, GitHub).
2. Record audio live or upload an MP3/WAV file.
3. Watch your monster spawn and evolve based on the track’s BPM, pitch, and timbre.
4. Save sessions to your dashboard and explore analytics on monster evolution over time.

---

## Roadmap & Progress

-   [x] **Project setup & environment configuration**
-   [ ] **Authentication & Storage integration**
-   [ ] **Audio Input & Feature Extraction** _(in progress)_
-   [ ] **Monster Generation Engine**
-   [ ] **User Dashboard & Session History**
-   [ ] **Testing & CI/CD**
-   [ ] **Deployment & Monitoring**

---

## Checklist

-   [ ] NextAuth.js + Supabase authentication flows
-   [ ] Supabase Storage endpoints for audio
-   [ ] Browser-based audio recording & file upload
-   [ ] Meyda integration for feature extraction
-   [ ] Canvas/Three.js monster rendering setup
-   [ ] Audio-to-visual mapping logic
-   [ ] Session persistence and analytics dashboard
-   [ ] Unit tests (Jest) & E2E tests (Cypress/Playwright)
-   [ ] CI/CD pipeline (GitHub Actions)
-   [ ] Deployment scripts (Vercel & Render/Heroku)
-   [ ] Error monitoring (Sentry, LogRocket)

---

## Errors & Issues

If you encounter any issues, please check the following:

-   Ensure all environment variables are correctly set in `.env`.
-   Check the browser console for any JavaScript errors.
-   Review the server logs for backend errors.
-   If you find a bug, please open an issue on GitHub with detailed steps to reproduce.
-   For feature requests or enhancements, open a discussion on GitHub.

## Disclaimer

This project is for educational purposes and is not intended for commercial use. All audio processing and visualizations are generated in-browser and do not store any user data beyond session management.

Assets for the following project are both created using AI tools and manually designed. The project is open-source and contributions are welcome. Ask for permission before using any assets in commercial projects.
