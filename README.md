# Boolflix — Movie & TV Search

A fast, Netflix-inspired search experience for movies and TV series, powered by TheMovieDB API. Built with Vue.js as my first real component-based project.

![Boolflix preview](preview.png)

> **How to try it:** the homepage starts empty by design. Type a movie or TV show title in the search bar in the top right (try "domani", "godfather" or "stranger things"), and the matching titles will appear with poster, language and rating.

## What this project is

A small but real Vue.js single page app that fetches live data from TheMovieDB API and renders the results in a responsive grid. The goal was to learn how Vue components, props, v-model and async API calls fit together in a feature that behaves like a real product.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Vue.js 2 |
| HTTP | Axios |
| Styling | HTML5, CSS3 |
| Data | TheMovieDB API |
| Build | Vue CLI |

## Features

- Live search across movies and TV series
- Posters, original titles, language flags and average ratings
- Component-based architecture with parent-child props
- Responsive grid layout

## Run locally

1. Clone the repo
2. `npm install`
3. Add your TheMovieDB API key in the config
4. `npm run serve`

## Context

Project from my **Boolean Academy full-stack bootcamp (2021)**, focused on Vue fundamentals: components, props, v-model and async data fetching with Axios.
