import React from "react";
import { NavLink, Link } from "react-router-dom";
import closeIcon from "../../images/close.svg"

function Navigation({ isOpen, closeHandler }) {
    return (
        <div className={`navigation-container navigation-overlay ${isOpen ? "navigation-overlay_visible" : ""}`}>
            <div className={`navigation ${isOpen ? "navigation_visible" : "navigation_hidden"}`}>
                <nav className="navigation__links">
                    <NavLink
                        className="navigation__link"
                        to="/"
                        replace
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        className="navigation__link"
                        to="/movies"
                        replace
                    >
                        Фильмы
                    </NavLink>
                    <NavLink
                        className="navigation__link"
                        to="/saved-movies"
                        replace
                    >
                        Сохранённые фильмы
                    </NavLink>
                </nav>
                    <Link className="navigation__account-button" to="/profile">
                        <span className="navigation__account-text">Аккаунт</span>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="navigation__account-icon"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.43 7.967a3.751 3.751 0 1 0-2.86 0A8.614 8.614 0 0 0 .807 9.58L2.19 11.42A6.317 6.317 0 0 1 6 10.149c1.431 0 2.749.473 3.81 1.27L11.19 9.58a8.614 8.614 0 0 0-3.76-1.613Z"
                                fill="#fff"
                            />
                        </svg>
                    </Link>

            </div>
            <button className="navigation-container__close" type="button" onClick={closeHandler}>
                <img src={closeIcon} alt="Открыть боковую панель" className="navigation-container__close-icon" />
            </button>
        </div>
    );
}

export default Navigation;