export function getMovieId(id, array) {
  const searchItem = array.find((movie) => movie.movieId === id);
  if (searchItem) {
    return searchItem._id;
  } else {
    return null;
  }
}