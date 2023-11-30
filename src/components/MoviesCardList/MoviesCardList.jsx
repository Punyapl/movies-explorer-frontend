import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onSavedPage, onSaveHandler, onDeleteHandler, savedMovies }) {
    
    return (
        <ul
            className={`movies-list 
      ${onSavedPage
                    ? "movies-list_saved"
                    : ""
                }`}
        >
            {movies && movies.map((movie) => (
                <MoviesCard key={movie._id || movie.id} onSaveHandler={onSaveHandler} onDeleteHandler={onDeleteHandler} savedMovies={savedMovies} onSavedPage={onSavedPage} {...movie} />
            ))}
        </ul>
    );
}

export default MoviesCardList;