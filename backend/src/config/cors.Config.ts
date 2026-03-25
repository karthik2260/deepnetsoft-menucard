// backend/src/config/cors.Config.ts
export const corsOption = {
  origin: [
    'http://localhost:5173', // for local development
    'https://deepnetsoft-menucard-app.vercel.app' // deployed frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // if using cookies
};