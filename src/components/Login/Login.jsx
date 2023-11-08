import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.png";


function Login() {
    return (
        <section className="login">
            <div className="login__container">
                <Link to="/">
                    <img src={Logo} alt="Логотип" className="login__logo"/>
                </Link>
                <h2 className="login__title">Рады видеть!</h2>
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
                                required
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
    );
}

export default Login;