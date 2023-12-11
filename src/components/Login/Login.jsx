import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.svg";

function Login({ submitHandler, isLoading, message, setMessage }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => setMessage(""), [setMessage]);

    const onSubmit = (e) => {
        e.preventDefault();
        submitHandler(email, password, setEmail, setPassword);
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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