import React from "react";

import { Link } from "react-router-dom";

import Header from "../Header/Header";

function Profile() {
    return (
        <>
            <Header location={'app'} />
            <main className="main">
                <section className="profile">
                    <div className="profile__container">
                        <h1 className="profile__title">Привет, Виталий!</h1>
                        <form className="profile__form">
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
                                        placeholder="Виталий"
                                        required
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
                                        placeholder="pochta@yandex.ru"
                                        required
                                    />
                                </div>
                            </fieldset>
                            <div className="profile__buttons">
                                <button className="profile__button profile__edit-button" type="submit">
                                    Редактировать
                                </button>
                                <Link to="/sign-in" className="profile__button-link">
                                    <button className="profile__button profile__exit-button" >
                                        Выйти из аккаунта
                                    </button>
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