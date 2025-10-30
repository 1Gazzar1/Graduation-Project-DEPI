# 🎬 MoovieMood

A sleek movie browser built with React that helps you explore over 9,000 movies from the TMDB API.

---

Check Out The [Live Demo](https://mooviemood.vercel.app/) !!

## Installation

1. Clone or fork the repo:

```bash
git clone https://github.com/1Gazzar1/MovieMood
cd MoovieMood
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

---

## Features

- ⚡ **9,000+ Movies** from TMDB, all with a **rating ≥ 6** and **vote count ≥ 250**
- **Advanced Filtering** by:
    - Title
    - Vote Count
    - Rating
    - Release Date
    - Cast Members
    - Genres
- **Sort** by:
    - Vote Count
    - Rating
    - Release Date
- 🎥 **Detailed Movie Pages** — click any movie to view more info , and from there you can be redirected to IMDB for that movie
- 💖 **Favorites System** — save your favorite movies locally and access them anytime
- 💾 No backend required — works 100% offline after cloning.

## Examples / Preview

1. this is home page , here you can filter and sort movies
   ![Home Page](./README-Screenshots/Home.png)
2. this is the favorites page where you can access all your favorites
   ![Favorites Page](./README-Screenshots/favorite.png)
3. this is the Movie Details page , it's where you go when you click on a certain movie
   ![Movie Details Page](./README-Screenshots/MovieDetails.png)

## Tech Stack

- React + [[Vite]]
- Framer Motion (for animation)
- React Router

---

Check Out my daily [dev log](./Devlog/MM-devlog.md) for this project

> 🔎 Explore over 9,000 movies with filters, favorites, and slick animations — built with React + TMDB.

## 💬 Feedback & Contributions

I’d love your feedback!  
Found a bug? Got an idea? Wanna help?  
Open an issue or send a PR — every bit helps.

## Todos ?

- make the localstorage only store movie ids and not whole movies (why ? it could store outdated movie data)

- replace some icons on the movie details page (add watched icon too)
