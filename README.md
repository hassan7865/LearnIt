# LearnIt

Learning platform with an Express/MongoDB backend and a frontend app.

**Live:** [learn-it-ruby.vercel.app](https://learn-it-ruby.vercel.app)

## Overview

LearnIt is a full-stack learning app: courses/content managed through an Express API with MongoDB, plus a separate frontend.

## Stack

- **Backend** (repo root): Node.js, Express, Mongoose/MongoDB
- **Frontend** (`frontend/`): Client application

## Structure

```
index.js      # API entry
Models/       # Mongoose models
Routes/       # Express routes
frontend/     # Frontend app
vercel.json   # Deploy config
```

## Getting started

### Backend

```bash
npm install
# Set MongoDB URI and other env vars
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev   # or the script defined in frontend/package.json
```

## Deploy

Backend/frontend can be deployed via Vercel using the included `vercel.json` where applicable.
