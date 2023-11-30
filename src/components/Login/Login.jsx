import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.svg";

import useBrowserValidation from "../../hooks/useBrowserValidation";

function Login({ submitHandler, isLoading, message, setMessage }) {

    const { values, errors, handleChange, isFormValid, setIsFormValid } =
    useBrowserValidation();

    useEffect(() => setMessage(""), [setMessage]);

    const onSubmit = (e) => {
        e.preventDefault();
        submitHandler(values["email"], values["password"]);
    };

    return (
        <main className="main">
            <section className="login">
                <div className="login__container">
                    <Link to="/" className="login__logo-container">
                        <img src={Logo} alt="Логотип" className="login__logo" />
                    </Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <form className="login__form" name="login" onSubmit={onSubmit}>
                        <fieldset className="login__inputs">
                            <div className="login__input">
                                <label
                                    className="login__input-label"
                                    htmlFor="email"
                                >
                                    E-mail
                                </label>
                                <input
                                    className="login__input-field"
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="E-mail"
                                    value={values["email"] || ""}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="login__input">
                                <label
                                    className="login__input-label"
                                    htmlFor="password"
                                >
                                    Пароль
                                </label>
                                <input
                                    className="login__input-field"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Пароль"
                                    required
                                    minLength={6}
                                    maxLength={16}
                                    value={values["password"] || ""}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>
                        </fieldset>
                        <p
                            className={`login__message ${message ? "login__message_fail" : ""
                                }`}
                        >
                            {message}
                        </p>
                        <button className="login__button" type="submit">
                            {isLoading ? "Загрузка..." : "Войти"}
                        </button>
                    </form>
                    <p className="login__text">
                        Ещё не зарегистрированы?
                        <Link className="login__link" to="/sign-up">
                            Регистрация
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Login;