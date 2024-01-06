import React, { useState, useEffect } from "react";
import validator from "validator";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.svg";

function Login({ submitHandler, isLoading, message, setMessage }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => setMessage(""), [setMessage]);

    const checkIsFormValid = (name, value) => {
        switch (name) {
            case "email":
                if (value.length === 0) {
                    setIsEmailValid(false);
                    setIsFormValid(false);
                    setMessage("");
                } else if (!validator.isEmail(value)) {
                    setIsEmailValid(false);
                    setIsFormValid(false);
                    setMessage("Проверьте правильность написания электронной почты");
                } else {
                    setIsEmailValid(true);
                    setMessage("");
                }
                break;
            case "password":
                if (value.length === 0) {
                    setIsPasswordValid(false);
                    setIsFormValid(false);
                    setMessage("");
                } else if (value.length < 8) {
                    setIsPasswordValid(false);
                    setIsFormValid(false);
                    setMessage("Минимальная длина пароля - 8");
                } else {
                    setIsPasswordValid(true);
                    setMessage("");
                }
                break;
            default:
                break;
        }
    }

    const checkCombinedInputValidity = () => {
        const combinedValidity = (isEmailValid === true) && (isPasswordValid === true)
        if (combinedValidity) {
            setIsFormValid(true);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "email") {
            setEmail(e.target.value)
        } else if (name === "password") {
            setPassword(e.target.value)
        };

        checkIsFormValid(name, value);
    };

    useEffect(() => {
        checkCombinedInputValidity();
    })

    const handleSubmitForm = (e) => {
        e.preventDefault();
        submitHandler(email, password, setEmail, setPassword);
        setIsFormValid(false);
    };

    return (
        <main className="main">
            <section className="login">
                <div className="login__container">
                    <Link to="/" className="login__logo-container">
                        <img src={Logo} alt="Логотип" className="login__logo" />
                    </Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <form className="login__form" name="login" onSubmit={handleSubmitForm}>
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
                                    // minLength={6}
                                    // maxLength={16}
                                    value={password}
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
                        <button className={`login__button ${!isFormValid && "login__button_disabled"}`} type="submit" disabled={!isFormValid || isLoading}>
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