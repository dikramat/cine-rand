CineRandom
CineRandom helps you find a movie to watch using data from TMDB.
Features
- Pick a random movie.
- Filter movies by genre, actor, and the first letter of the title.
- Combine filters.
- View movie details without leaving the app.
Requirements
- Node.js and npm
- A TMDB API Read Access Token
Setup
Install dependencies:
npm install
Create a .env.local file in the project root and add your TMDB token:
VITE_TMDB_API_KEY=your_tmdb_api_read_access_token
Replace the placeholder with your TMDB API Read Access Token. Do not commit .env.local.
Run locally
npm run dev
Build
npm run build
Preview the production build
npm run preview
