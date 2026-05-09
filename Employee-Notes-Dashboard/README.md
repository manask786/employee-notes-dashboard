# Employee Notes Dashboard

A simple full-stack notes app built with Node.js, Express, MongoDB, Mongoose, React, Axios, and CSS.

## Folder Structure

- `server` - Express API and MongoDB connection
- `client` - React UI built with Vite

## Backend

1. Go to the `server` folder.
2. Create a `.env` file from `.env.example`.
3. Add your MongoDB connection string.
4. Run:

```bash
npm install
npm run dev
```

The server runs on `http://localhost:5000` by default.

## Frontend

1. Go to the `client` folder.
2. Create a `.env` file from `.env.example` if you want to change the API URL.
3. Run:

```bash
npm install
npm run dev
```

The app runs on Vite's local dev server.

## API Routes

- `POST /api/notes` - create a note
- `GET /api/notes` - fetch all notes
- `PUT /api/notes/:id` - update a note
- `DELETE /api/notes/:id` - delete a note
