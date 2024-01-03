import React, { useContext, useEffect, useState } from "react";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";

import Header from "../Header/Header";

import currentUserContext from "../../context/currentUserContext";


function Profile({ setIsLoggedIn, submitHandler, isLoading, message, setMessage }) {
    const { currentUser, setCurrentUser } = useContext(currentUserContext);
    const [formValues, setFormValues] = useState({
        name: currentUser.name,
        email: currentUser.email,
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const checkIsFormValid = (name, value) => {
        switch (name) {
            case "name":
                if ((value.length > 2)) {
                    setIsFormValid(true);
                } else if (value.length < 30) {
                    setIsFormValid(true);
                } else if (new RegExp(/^[а-яА-ЯёЁa-zA-Z\s/-]+$/).test(value)) {
                    setIsFormValid(true);
                } else if (value !== currentUser.name){
                    setIsFormValid(true);
                } else {
                    setIsFormValid(false);
                }
                break;
            case "email":
                if (value.length !== 0) {
                    setIsFormValid(true);
                } else if (validator.isEmail(value)) {
                    setIsFormValid(true);
                } else if (value !== currentUser.email){
                    setIsFormValid(true);
                } else {
                    setIsFormValid(false);
                }
                break;
            default:
                break;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        checkIsFormValid(name, value);
        setFormValues({ ...formValues, [name]: value });
    };

    const navigate = useNavigate();

    useEffect(() => {
        setMessage("");
    }, [setMessage]);

    const signOut = () => {
        localStorage.clear();
        navigate("/");
        setIsLoggedIn(false);
        setCurrentUser({ name: "", email: "" });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        checkIsFormValid(formValues.name, formValues.email);
        submitHandler({ name: formValues.name, email: formValues.email });
        setIsFormValid(false);
    };

    return (
        <>
            <Header location={'app'} />
            <main className="main">
                <section className="profile">
                    <div className="profile__container">
                        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                        <form className="profile__form" onSubmit={handleSubmitForm} noValidate>
                            <fieldset className="profile__inputs">
                                <div className="profile__input">
                                    <label
                                        className="profile__input-label"
                                        htmlFor="name"
                                    >
                                        Имя
                                    </label>
                                    <input
                                        className="profile__input-field"
                                        id="name"
                                        name="name"
                                        type="text"
                                        minLength="2"
                                        maxLength="30"
                                        placeholder={currentUser.name}
                                        value={formValues.name}
                                        required
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="profile__input">
                                    <label
                                        className="profile__input-label"
                                        htmlFor="email"
                                    >
                                        E-mail
                                    </label>
                                    <input
                                        className="profile__input-field"
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={currentUser.email}
                                        value={formValues.email}
                                        required
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </fieldset>
                            <p className="profile__message">
                                {message}
                            </p>
                            <div className="profile__buttons">
                                <button className={`profile__button profile__edit-button ${!isFormValid && "profile__button_disabled"}`} type="submit" disabled={!isFormValid || isLoading}>
                                    Редактировать
                                </button>
                                <Link to="/" className="profile__button profile__exit-button" onClick={signOut}>
                                    Выйти из аккаунта
                                </Link>

                            </div>
                        </form>
                    </div>
                </section>
            </main>

        </>

    );
}

export default Profile;