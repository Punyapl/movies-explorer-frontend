import React, { useState, useContext } from "react";

import savedPageContext from "../../context/SavedPageContext";
import deleteIcon from "../../images/delete.svg";
import likeIcon from "../../images/like.svg";
import likeIconActive from "../../images/likeActive.svg";

function MoviesCard({ title, duration, imageUrl }) {
    const { onSavedPage } = useContext(savedPageContext);

    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => setIsSaved(!isSaved);
    const handleDelete = () => console.log("Карточка удалена");
    const hourDuration = `${~~(duration / 60)}ч ${duration - ((~~(duration / 60)) * 60)}м`

    return (
        <li className="movies-card">
            <img className="movies-card__image" src={imageUrl} alt={title} />
            <div className="movies-card__header">
                <h2 className="movies-card__title">{title}</h2>
                <button
                    className={`movies-card__button ${!onSavedPage ? "movies-card__buttton_like" : "movies-card__button_delete"
                        }`}
                    onClick={!onSavedPage ? handleSave : handleDelete}
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