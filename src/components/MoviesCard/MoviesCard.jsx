import React, { useState, useEffect } from "react";

import deleteIcon from "../../images/delete.svg";
import likeIcon from "../../images/like.svg";
import likeIconActive from "../../images/likeActive.svg";

import { serverUrl } from "../../utils/constants";

function MoviesCard({ moviekey, nameRU, duration, onSaveHandler, onDeleteHandler, savedMovies, onSavedPage, ...props }) {

    const [isSaved, setIsSaved] = useState(false);

    const hourDuration = `${~~(duration / 60)}ч ${duration - ((~~(duration / 60)) * 60)}м`

    useEffect(() => {
        if (savedMovies.some((movie) => movie.movieId === props.id)) {
            setIsSaved(true);
        }
    }, [savedMovies, props.id])

    const handleSave = () => {
        const movieData = {
            country: props.country,
            director: props.director,
            duration: duration,
            year: props.year,
            description: props.description,
            image: serverUrl + props.image.url,
            trailerLink: props.trailerLink,
            nameRU: nameRU,
            nameEN: props.nameEN,
            thumbnail: serverUrl + props.image.formats.thumbnail.url,
            movieId: props.id,
        };
        onSaveHandler(movieData, setIsSaved);
    };

    const handleDelete = () => {
        onDeleteHandler(onSavedPage ? props._id : props.id, setIsSaved);
    };

    return (
        <li className="movies-card">
            <a href={props.trailerLink} className="movies-card__trailer-link">
                <img className="movies-card__image" src={onSavedPage ? props.image : `https://api.nomoreparties.co${props.image.url}`} alt={nameRU} />
            </a>

            <div className="movies-card__header">
                <h2 className="movies-card__title">{nameRU}</h2>
                <button
                    className={`movies-card__button ${!onSavedPage ? "movies-card__button_like" : "movies-card__button_delete"
                        }`}
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
        </li>
    );
}

export default MoviesCard;