import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.svg";


function Register() {
    return (
        <main className="main">
            <section className="register">
                <div className="register__container">
                    <Link to="/" className="register__logo-container">
                        <img src={Logo} alt="Логотип" className="register__logo" />
                    </Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <form className="register__form" name="register">
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
                                />
                            </div>
                        </fieldset>
                        <button className="register__button" type="submit">
                            Зарегистрироваться
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