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
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isNameValid, setIsNameValid] = useState(false);
    const [isProfileChanged, setIsProfileChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setIsFormValid(false);
        setFormValues({
            name: currentUser.name,
            email: currentUser.email,
        });
    }, [currentUser])

    useEffect(() => {
        if ((currentUser.name !== formValues.name) || (currentUser.email !== formValues.email)) {
            setIsProfileChanged(true);
        }
        if ((currentUser.name === formValues.name) && (currentUser.email === formValues.email)) {
            setIsProfileChanged(false);
        }
    }, [currentUser, formValues]);

    const checkIsFormValid = (name, value) => {
        switch (name) {
            case "name":
                if (value.length < 2) {
                    setIsNameValid(false);
                } else if (value.length > 30) {
                    setIsNameValid(false);
                } else if (!new RegExp(/^[а-яА-ЯёЁa-zA-Z\s/-]+$/).test(value)) {
                    setIsNameValid(false);
                } else {
                    setIsNameValid(true);
                }
                break;
            case "email":
                if (!validator.isEmail(value)) {
                    setIsEmailValid(false);
                } else {
                    setIsEmailValid(true);
                }
                break;
            default:
                break;
        };
    }

    const checkCombinedInputValidity = () => {

        if (isProfileChanged) {

            checkIsFormValid("email", formValues.email)
            checkIsFormValid("name", formValues.name)
            const combinedValidity = (isEmailValid === true) && (isNameValid === true);
            if (combinedValidity) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            };

        } else {
            setIsFormValid(false);
        }

    }

    const handleChange = (e) => {
        setMessage("");
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
        checkIsFormValid(name, value);


    };

    useEffect(() => {
        checkCombinedInputValidity();
    })

    useEffect(() => {
        if (!isEmailValid) {
            setErrorMessage("Проверьте правильность написания поля E-mail")
        } else if (!isNameValid) {
            setErrorMessage("Проверьте правильность написания поля Имя")
        }
        else {
            setErrorMessage("")
        }
    }, [isEmailValid, isNameValid])

    useEffect(() => {
        setMessage("");
        setErrorMessage("")
    }, [setMessage, setErrorMessage]);

    const navigate = useNavigate();



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
                            <div className="profile__messages">
                                <p className="profile__message">
                                    {message}
                                </p>
                                <p className={`profile__error-message ${(errorMessage === "")? 'profile__error-message_hidden' : ''}`}>
                                    {errorMessage}
                                </p>
                            </div>

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