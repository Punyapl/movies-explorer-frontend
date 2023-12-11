import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onSavedPage, onSaveHandler, onDeleteHandler, savedMovies }) {
    
    return (
        <ul className="movies-list" >
            {movies?.map((movie) => (
                <MoviesCard key={movie._id || movie.id} movie={movie} onSaveHandler={onSaveHandler} onDeleteHandler={onDeleteHandler} savedMovies={savedMovies} onSavedPage={onSavedPage} />
            ))}
        </ul>
    );
}

export default MoviesCardList;