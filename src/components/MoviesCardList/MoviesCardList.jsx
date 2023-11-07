import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onSavedPage }) {
    return (
        <ul
            className={`movies-list 
      ${onSavedPage
                    ? "movies-list_saved"
                    : ""
                }`}
        >
            {movies.map((movie) => (
                <MoviesCard key={movie.id} {...movie} />
            ))}
        </ul>
    );
}

export default MoviesCardList;