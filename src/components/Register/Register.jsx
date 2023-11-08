import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.png";


function Register() {
    return (
        <section className="register">
            <div className="register__container">
                <Link to="/">
                    <img src={Logo} alt="Логотип" className="register__logo"/>
                </Link>
                <h2 className="register__title">Добро пожаловать!</h2>
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
                                required
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
                                required
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
    );
}

export default Register;