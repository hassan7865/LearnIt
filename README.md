# LearnIt

Full-stack learning / video platform: Express + MongoDB API with a React (CRA) frontend. Users browse and watch videos; admins manage the catalog.

**Live:** [learn-it-ruby.vercel.app](https://learn-it-ruby.vercel.app)

## Overview

LearnIt serves a built frontend from the API in production (`frontend/build`) while exposing REST routes for auth, users, and videos. The client uses Redux, MUI, and `react-player` for playback.

## Features

- Sign up / sign in with JWT and bcrypt-hashed passwords
- Video catalog: create/delete (admin), list and watch
- User profile updates and personal watch list (`myList`)
- Frontend pages: intro, home, video player, watch list, auth
- Firebase helpers on the client; API duration utilities (`get-video-duration`)

## Stack

| Layer | Tech |
|-------|------|
| Backend | Node.js, Express, Mongoose, JWT, bcryptjs, cors, dotenv |
| Frontend | React (Create React App), Redux Toolkit, MUI, Axios, react-player, styled-components |
| Deploy | Vercel (`vercel.json`); static SPA served from Express |

## Structure

```
index.js          # API + static frontend serve
Models/           # User, Video
Routes/           # auth, user, video, verifyToken
frontend/         # CRA app (src/Pages, Components, Redux)
vercel.json
```

## Setup

### Backend (repo root)

```bash
npm install
# .env: MONGOURL, PORT, JWTKEY
npm start
```

### Frontend (development)

```bash
cd frontend
npm install
npm start
```

For production-style serving, build the client (`npm run build` in `frontend/`) so `frontend/build` exists for the Express static handler.

## API prefixes

- `/api/auth` — signup / signin  
- `/api/user` — profile, watch list  
- `/api/video` — video CRUD (admin-gated writes)  
