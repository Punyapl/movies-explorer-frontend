import React, { useState, useEffect } from "react";

import { useFormValidation } from "../../utils/useFormValidation";

function SearchForm({ submitHandler, checkbox, setCheckbox, lastSearchQuery, isLoading }) {
    const [errorText, setErrorText] = useState("");
    const { values, setValues, errors, handleChange, isFormValid, setIsFormValid } =
        useFormValidation();

    useEffect(() => {
        if (lastSearchQuery) {
            setValues({ ...values, "film-query": lastSearchQuery });
        }
    }, [lastSearchQuery, setValues]);

    const onClickCheckBox = () => setCheckbox(!checkbox);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (values["film-query"] === undefined) {
            setErrorText("Запрос не может быть пустым");
            return;
        }
        if (isFormValid) {
            submitHandler(checkbox, values["film-query"]);
        }
        setErrorText(errors["film-query"]);
    };

    return (
        <form className="search-form" name="search-form" onSubmit={onSubmitForm} noValidate>
            <div className="search-form__string">
                <input className="search-form__input"
                    name="film-query"
                    placeholder="Фильм"
                    type="text"
                    required
                    onChange={handleChange}
                    value={values["film-query"] || ""}
                    autoComplete="off"
                    disabled={isLoading}
                />
                <button className="search-form__button" type="submit" />
            </div>
            <span className="search-form__error">{errorText}</span>
            <div className="search-form__short-film-container">
                <label className="search-form__label">
                    <input
                        className="search-form__radio"
                        type="checkbox"
                        name="short-film-option"
                        id="short-film"
                        value="short-film"
                        checked={checkbox || false}
                        onChange={onClickCheckBox}
                        disabled={isLoading}
                    />
                    <span className="search-form__slider" />
                </label>
                <span className="search-form__label-text">Короткометражки</span>
            </div>
            <div className="search-form__line"></div>

        </form>
    );
}

export default SearchForm;