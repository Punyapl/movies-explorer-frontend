import React from "react";

import Header from "../Header/Header";

function Profile() {
    return (
        <section className="profile">
            <Header location={"app"} />
            <div className="profile__container">
                <h2 className="profile__title">Привет, Виталий!</h2>
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
                                placeholder="vitaliy@email.com"
                                required
                            />
                        </div>
                    </fieldset>
                    <div className="profile__buttons">
                        <button className="profile__button profile__edit-button" type="submit">
                            Редактировать
                        </button>
                        <button className="profile__button profile__exit-button">
                            Выйти из аккаунта
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Profile;