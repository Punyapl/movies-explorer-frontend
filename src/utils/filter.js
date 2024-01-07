export function filterMovies (searchQuery, moviesArray) {
    const filteredMovies =  moviesArray.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredMovies
};

export function findOnlyShortMovies (movies) {
    const shortMovies = movies.filter((movie) => movie.duration < 40);
    return shortMovies
};