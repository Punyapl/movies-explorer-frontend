import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.svg";


function Login() {
    return (
        <main className="main">
            <section className="login">
                <div className="login__container">
                    <Link to="/" className="login__logo-container">
                        <img src={Logo} alt="Логотип" className="login__logo" />
                    </Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <form className="login__form" name="login">
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
                                />
                            </div>
                        </fieldset>
                        <button className="login__button" type="submit">
                            Войти
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