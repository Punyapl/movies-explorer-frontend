import React, { useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import Header from "../Header/Header";

import currentUserContext from "../../context/currentUserContext";
import { useBrowserValidation } from "../../hooks/useBrowserValidation";

function Profile({ setIsLoggedIn, submitHandler, isLoading, message, setMessage }) {
    const { currentUser, setCurrentUser } = useContext(currentUserContext);
    const { values, errors, isFormValid, handleChange, setValues } = useBrowserValidation(currentUser.name, currentUser.email);
    const navigate = useNavigate();
    useEffect(() => setMessage(""), [setMessage]);

    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email,
        });
        
    }, [currentUser.name, currentUser.email, setValues]);

    const signOut = () => {
        localStorage.removeItem("queryData");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
        setCurrentUser({
            name: "",
            email: "",
        })
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        submitHandler({ name: values["name"], email: values["email"] });
    };

    return (
        <>
            <Header location={'app'} />
            <main className="main">
                <section className="profile">
                    <div className="profile__container">
                        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                        <form className="profile__form" onSubmit={onSubmitForm} noValidate>
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
                                        value={values["name"] || ""}
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
                                        value={values["email"] || ""}
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