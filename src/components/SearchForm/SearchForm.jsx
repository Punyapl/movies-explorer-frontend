import React, { useState, useEffect } from "react";

function SearchForm({ submitHandler, checkbox, setCheckbox, lastSearchQuery, isLoading }) {
  const [queryValue, setQueryValue] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    lastSearchQuery && setQueryValue(lastSearchQuery);
  }, [lastSearchQuery]);

  const onClickCheckBox = () => setCheckbox(!checkbox);

  const handleInputChange = (e) => {
    const { value } = e.target;
    validateInput(value);
    setQueryValue(value);
  };

  const validateInput = (value) => {
    if (value.length === 0) {
      setErrorText("Заполните это поле");
      setIsFormValid(false);
    } else if (value.length < 2) {
      setErrorText("Минимальное количество символов — 2");
      setIsFormValid(false);
    } else if (value.length >= 30) {
      setErrorText("Максимальное количество символов — 30");
      setIsFormValid(false);
    } else if (!new RegExp(/^[а-яА-ЯёЁa-zA-Z]+$/).test(value)) {
      setErrorText("Нужно ввести ключевое слово");
      setIsFormValid(false);
    } else {
      setErrorText("");
      setIsFormValid(true);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    isFormValid ? submitHandler(checkbox, queryValue) : setErrorText("Заполните правильно это поле");
  };

  return (
    <form className="search-form" name="search-form" onSubmit={onSubmitForm} noValidate>
      <div className="search-form__string">
        <input
          className="search-form__input"
          name="film-query"
          placeholder="Фильм"
          type="text"
          required
          onChange={handleInputChange}
          value={queryValue}
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
            checked={checkbox}
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