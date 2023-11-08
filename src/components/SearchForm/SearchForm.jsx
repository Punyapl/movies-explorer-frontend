import React from "react";
import Preloader from "../Preloader/Preloader"

function SearchForm() {
    return (
        <form className="search-form" name="search-form">
            <div className="search-form__string">
                <input className="search-form__input" placeholder="Фильм" type="text" required />
                <button className="search-form__button" type="submit" />
            </div>
            <div className="search-form__short-film-container">
                <label className="search-form__label" htmlFor="short-film">
                    <input
                        className="search-form__radio"
                        type="checkbox"
                        name="short-film-option"
                        id="short-film"
                        value="short-film"
                    />
                    <div className="search-form__slider" />
                </label>
                <Preloader />
                <span className="search-form__label-text">Короткометражки</span>
            </div>
            <div className="search-form__line"></div>

        </form>
    );
}

export default SearchForm;