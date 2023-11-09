import React from "react";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__info">
                <p className="footer__year">&#169; 2022</p>
                <ul className="footer__links">
                    <li className="footer__link-container">
                        <a href="https://practicum.yandex.ru/" target="_blank" className="footer__link">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__link-container">
                        <a href="https://github.com/Punyapl" target="_blank" className="footer__link">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;