import React from "react";

function SearchForm() {
    return (
        <form className="search-form" name="search-form">
            <div className="search-form__string">
                <input className="search-form__input" placeholder="Фильм" type="text" required />
                <button className="search-form__button" type="submit">
                    {/* наверное тут img */}
                </button>
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
                <div className="search-form__pseudo-item">
                    <span className="search-form__circle"></span>
                </div>
                <span className="search-form__label-text">Короткометражки</span>
            </div>
            <div className="search-form__line"></div>

        </form>
    );
}

export default SearchForm;