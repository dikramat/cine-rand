# CineRandom - Project Context

## Purpose

CineRandom is a client-side movie discovery app that helps users decide what to watch. It uses TMDB as its movie data provider and has no backend.

## Implemented Features

- Pick a random movie from TMDB.
- Pick a random movie from a configurable pool of TMDB's top-rated titles.
- Filter movie discovery by genre, actor, first letter of the title, and release-year range.
- Search for actors through TMDB and select an actor for filtering.
- Browse movies trending on TMDB this week in an automatically moving carousel with arrow and mouse-wheel controls.
- Select a trending movie and view its details inline in the app.
- Return from a movie to the filter screen while keeping the selected filters.
- Return to the home screen and reset filters when leaving the filter flow.

## Data and API

TMDB provides movie, genre, actor, weekly trending, top-rated, and movie-detail data. The app reads the API key from `VITE_TMDB_API_KEY`; each developer must configure their own local value. Do not commit API keys or local environment files.

There is no backend. The Vite `VITE_` environment variable is available to client-side code, which calls TMDB directly.

## Architecture

The application separates screen composition, reusable UI components, stateful hooks, TMDB requests, and movie-selection business logic. Shared types, configuration constants, and visible UI text are maintained separately from components and business logic.

## Guidance for Agents

- Follow `AGENTS.md` before making changes.
- Preserve the existing separation of responsibilities and avoid hardcoded UI text, domain data, or shared configuration.
- Keep movie discovery connected to TMDB; do not introduce fabricated movie data or a backend without approval.
- Preserve the current filter, navigation, inline-details, and carousel behavior when making unrelated changes.
