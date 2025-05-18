import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg"
import burgerIcon from "../../images/burger.svg"
import Navigation from "../Navigation/Navigation";
import currentUserContext from "../../context/currentUserContext";

function Header({ location }) {
    const [isActiveBurger, setIsActiveBurger] = useState(false);

    const openBurger = () => setIsActiveBurger(!isActiveBurger);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { currentUser, setCurrentUser } = useContext(currentUserContext);

    useEffect(() => {
        currentUser.name === ""
            ? setIsLoggedIn(false)
            : setIsLoggedIn(true);
    }, [currentUser.name])

    return (
        <>
            <header className={`header header_${location}`}>
                <nav className="header__nav">
                    <Link className="header__linked-logo" to="/">
                        <img src={headerLogo} alt="Movies explorer лого" className="header__logo" />
                    </Link>
                    <div className={`header__links ${isLoggedIn
                        ? ""
                        : "header__links_hidden"}`}>
                        <NavLink to="/movies" className="header__link">
                            Фильмы
                        </NavLink>
                        <NavLink to="/saved-movies" className="header__link">
                            Сохраненные фильмы
                        </NavLink>
                    </div>
                </nav>
                <div className="header__account-menu">
                    {isLoggedIn ? (
                        <Link className="header__account-button header__account-button_hidden" to="/profile">
                            <span className="header__account-text">Аккаунт</span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="header__account-icon"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.43 7.967a3.751 3.751 0 1 0-2.86 0A8.614 8.614 0 0 0 .807 9.58L2.19 11.42A6.317 6.317 0 0 1 6 10.149c1.431 0 2.749.473 3.81 1.27L11.19 9.58a8.614 8.614 0 0 0-3.76-1.613Z"
                                    fill="#fff"
                                />
                            </svg>
                        </Link>
                    ) : (
                        <>
                            <Link to="/sign-up" className="header__signin-button">
                                Регистрация
                            </Link>
                            <Link to="/sign-in" className="header__signup-button">
                                Войти
                            </Link>
                        </>
                    )}
                </div>
                {isLoggedIn && (
                    <button className="header__burger" type="button" onClick={openBurger}>
                        <img src={burgerIcon} alt="Открыть боковую панель" className="header__burger-icon" />
                    </button>
                )}
            </header>
            <Navigation isOpen={isActiveBurger} closeHandler={openBurger} />
        </>
    )
}

export default Header;