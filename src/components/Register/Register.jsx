import React, { useState, useEffect } from "react";
import validator from "validator";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.svg";

function Register({ submitHandler, isLoading, message, setMessage }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => setMessage(""), [setMessage]);

    const checkIsFormValid = (name, value) => {
        switch (name) {
            case "name":
                if (value.length === 0) {
                    setIsFormValid(false);
                    setMessage("");
                } else if (value.length < 2) {
                    setIsFormValid(false);
                    setMessage("Минимальная длина имени - 2");
                } else if (value.length > 30) {
                    setIsFormValid(false);
                    setMessage("Максимальная длина имени - 30");
                } else if (!new RegExp(/^[а-яА-ЯёЁa-zA-Z\s/-]+$/).test(value)) {
                    setIsFormValid(false);
                    setMessage("Для имени можно использовать только буквы, дефисы и пробелы");
                } else {
                    setIsFormValid(true);
                    setMessage("");
                }
                break;
            case "email":
                if (value.length === 0) {
                    setIsFormValid(false);
                    setMessage("");
                } else if (!validator.isEmail(value)) {
                    setIsFormValid(false);
                    setMessage("Проверьте правильность написания электронной почты");
                } else {
                    setIsFormValid(true);
                    setMessage("");
                }
                break;
            case "password":
                if (value.length === 0){
                    setIsFormValid(false)
                    setMessage("");
                } else if (value.length < 8) {
                    setIsFormValid(false)
                    setMessage("Минимальная длина пароля - 8");
                } else {
                    setIsFormValid(true);
                    setMessage("");
                }
                break;
            default:
                break;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        checkIsFormValid(name, value);
        if (name === "name") {
            setName(e.target.value)
        } else if (name === "email") {
            setEmail(e.target.value)
        } else if (name === "password") {
            setPassword(e.target.value)
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        submitHandler(name, email, password, setEmail, setPassword, setName);
        setIsFormValid(false);
    };

    return (
        <main className="main">
            <section className="register">
                <div className="register__container">
                    <Link to="/" className="register__logo-container">
                        <img src={Logo} alt="Логотип" className="register__logo" />
                    </Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <form className="register__form" name="register" onSubmit={handleSubmitForm}>
                        <fieldset className="register__inputs">
                            <div className="register__input">
                                <label
                                    className="register__input-label"
                                    htmlFor="name"
                                >
                                    Имя
                                </label>
                                <input
                                    className="register__input-field"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Имя"
                                    required
                                    minLength={2}
                                    maxLength={16}
                                    value={name}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="register__input">
                                <label
                                    className="register__input-label"
                                    htmlFor="email"
                                >
                                    E-mail
                                </label>
                                <input
                                    className="register__input-field"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    required
                                    value={email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="register__input">
                                <label
                                    className="register__input-label"
                                    htmlFor="password"
                                >
                                    Пароль
                                </label>
                                <input
                                    className="register__input-field"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Пароль"
                                    required
                                    minLength={6}
                                    maxLength={16}
                                    value={password}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                        <p
                            className={`register__message ${message ? "register__message_fail" : ""
                                }`}
                        >
                            {message}
                        </p>
                        <button className={`register__button ${!isFormValid && "register__button_disabled"}`} type="submit" disabled={!isFormValid || isLoading}>
                            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                        </button>
                    </form>
                    <p className="register__text">
                        Уже зарегистрированы?
                        <Link className="register__link" to="/sign-in">
                            Войти
                        </Link>
                    </p>
                </div>
            </section>
        </main>

    );
}

export default Register;