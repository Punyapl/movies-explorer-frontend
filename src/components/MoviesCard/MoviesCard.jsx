import React, { useState, useEffect } from "react";

import deleteIcon from "../../images/delete.svg";
import likeIcon from "../../images/like.svg";
import likeIconActive from "../../images/likeActive.svg";

import { serverUrl } from "../../utils/constants";

function MoviesCard({ movie, onSaveHandler, onDeleteHandler, savedMovies, onSavedPage }) {

    const [isSaved, setIsSaved] = useState(false);
    const { duration, image, trailerLink, nameRU, id, country, director, year, description, nameEN } = movie;
    const hourDuration = `${~~(duration / 60)}ч ${duration - ((~~(duration / 60)) * 60)}м`
    const movieData = {
        duration,
        image: onSavedPage ? image : `${serverUrl}${image.url}`,
        trailerLink,
        nameRU,
        movieId: id,
        country,
        director,
        year,
        description,
        thumbnail: !onSavedPage ? `${serverUrl}${image.formats.thumbnail.url}` : ``,
        nameEN,
    };

    useEffect(() => {
        setIsSaved(savedMovies.find(savedMovie => savedMovie.movieId === id) !== undefined);
      }, [savedMovies, id]);

    const handleSave = () => {
        onSaveHandler(movieData, setIsSaved);
    };

    const handleDelete = () => {
        if (onSavedPage) {
            const movieIdToDelete = movie._id;
            onDeleteHandler(movieIdToDelete, setIsSaved);
        } else {
            const movieIdToDelete = movie.id;
            onDeleteHandler(movieIdToDelete, setIsSaved);
        }
    };

    return (
        <div className="movies-card">
            <a href={movie.trailerLink} className="movies-card__trailer-link">
                <img className="movies-card__image" src={onSavedPage ? movie.image : `${serverUrl}${movie.image.url}`} alt={movie.nameRU} />
            </a>

            <div className="movies-card__header">
                <h2 className="movies-card__title">{movie.nameRU}</h2>
                <button
                    className={`movies-card__button ${!onSavedPage ? "movies-card__button_like" : "movies-card__button_delete"}`}
                    onClick={onSavedPage
                        ? handleDelete
                        : isSaved
                            ? handleDelete
                            : handleSave}
                >
                    {onSavedPage
                        ? (
                            <img src={deleteIcon} alt="Удалить" className="movies-card__button-icon movies-card__delete-icon" />
                        )
                        : (isSaved
                            ? (
                                <img src={likeIconActive} alt="Убрать из сохраненных" className="movies-card__button-icon movies-card__like-icon_active" />
                            )
                            : (
                                <img src={likeIcon} alt="Сохранить" className="movies-card__button-icon movies-card__like-icon" />
                            ))}
                </button>
            </div>

            <div className="movies-card__footer">
                <p className="movies-card__duration">{hourDuration}</p>

            </div>
        </div>
    );
}

export default MoviesCard;