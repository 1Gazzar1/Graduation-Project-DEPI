import allmovies from "../assets/final_movies_v4.json";
// const settings = {
// 	title : "the",
// 	voteCount : 10 ,
// 	rating : 6 ,
// 	cast: [] ,
// 	releaseDate : 1950 ,
// 	genres : []
// }
export const loadMovies = async () => {
    return allmovies;
};
export const getMovieById = (movies, ID) => {
    const movie = movies.find((m) => m.id === Number(ID));
    return movie;
};
export const getMoviesByIds = (movies, ids) => {
    const idSet = new Set(ids);
    return movies.filter((m) => idSet.has(m.id));
};

export const filterMovies = (movies, settings) => {
    let { title, voteCount, rating, cast, releaseDate, genres } = settings;
    const regex = new RegExp(title, "i");
    return movies.filter(
        (m) =>
            m.title.match(regex) &&
            m.vote_count >= voteCount &&
            m.vote_average >= rating &&
            +m.release_date.split("-")[0] >= releaseDate &&
            movieHasCast(m.cast, cast) &&
            movieHasGenres(m.genres, genres),
    );
};

function movieHasCast(movieCast, userCast) {
    if (userCast.length === 0) return true;
    const castSet = new Set(movieCast.map((m) => m.toLowerCase()));
    for (let i = 0; i < userCast.length; i++) {
        if (!castSet.has(userCast[i].toLowerCase())) {
            return false;
        }
    }
    return true;
}

function movieHasGenres(movieGenre, userGenre) {
    if (userGenre.length === 0) return true;
    const movieSet = new Set(movieGenre.map((m) => m.toLowerCase()));
    for (let i = 0; i < userGenre.length; i++) {
        if (!movieSet.has(userGenre[i].toLowerCase())) {
            return false;
        }
    }
    return true;
}

export function sortMovies(movies, sortBy, asc) {
    if (asc === "1") {
        return sortBy === "release_date"
            ? movies.sort(
                  (a, b) => a[sortBy].split("-")[0] - b[sortBy].split("-")[0],
              )
            : movies.sort((a, b) => a[sortBy] - b[sortBy]);
    }
    return sortBy === "release_date"
        ? movies.sort(
              (a, b) => b[sortBy].split("-")[0] - a[sortBy].split("-")[0],
          )
        : movies.sort((a, b) => b[sortBy] - a[sortBy]);
}

export function getMovieImg(file_path) {
    return `https://image.tmdb.org/t/p/w500${file_path}`;
}

export function gatherCastMember(movies) {
    const castMembersSet = new Set();
    for (const movie of movies) {
        for (const member of movie.cast) {
            castMembersSet.add(member);
        }
    }
    return [...castMembersSet];
}
export function gatherMovieGenres() {
    return [
        "History",
        "Western",
        "Action",
        "Horror",
        "Thriller",
        "Family",
        "Science Fiction",
        "Animation",
        "Crime",
        "Drama",
        "Comedy",
        "Mystery",
        "Music",
        "Documentary",
        "Fantasy",
        "Romance",
        "War",
        "Adventure",
        "TV Movie",
    ];
}
