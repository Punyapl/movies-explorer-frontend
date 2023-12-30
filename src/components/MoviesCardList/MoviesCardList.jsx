import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import { mainApi } from "../../utils/MainApi";
import { getMovieId } from "../../utils/getMovieId";

function MoviesCardList({ movies, onSavedPage, savedMovies, setSavedMovies, setMoviesForRender }) {
    const token = localStorage.getItem("token");

    const saveMovie = (movie, likeHandler) => {
        mainApi
            .createMovie(movie, token)
            .then((newMovie) => {
                setSavedMovies([...savedMovies, Object.values(newMovie)[0]]);
                likeHandler(true);
            })
            .catch((err) => console.log(err));
    };

    const deleteMovie = (movieId, likeHandler) => {
        const idInSavedMovies = getMovieId(movieId, savedMovies)
        mainApi
            .removeMovie(onSavedPage ? movieId : idInSavedMovies, token)
            .then(() => {
                likeHandler(false);
                setSavedMovies((state) => state.filter((movie) => movie._id !== (onSavedPage ? movieId : idInSavedMovies)));
                if (onSavedPage) {
                    setMoviesForRender((state) => state.filter((movie) => movie._id !== movieId));
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <ul className="movies-list" >
            {movies?.map((movie) => (
                <li className="movies-list__card-container" key={movie._id || movie.id}>
                    <MoviesCard movie={movie} onSaveHandler={saveMovie} onDeleteHandler={deleteMovie} savedMovies={savedMovies} onSavedPage={onSavedPage} />
                </li>
            ))}
        </ul>
    );
}

export default MoviesCardList;