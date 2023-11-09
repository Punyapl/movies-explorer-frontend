import React from "react";
import arrow from "../../images/arrow.svg"

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">
                Портфолио
            </h2>
            <ul className="portfolio__links">
                <li className="portfolio__project">
                    <a href="https://github.com/Punyapl/how-to-learn" target="_blank" className="portfolio__link">Статичный сайт</a>
                    <img src={arrow} alt="Перейти к проекту" className="portfolio__arrow"/>
                </li>
                <li className="portfolio__project">
                    <a href="https://github.com/Punyapl/russian-travel" target="_blank" className="portfolio__link">Адаптивный сайт</a>
                    <img src={arrow} alt="Перейти к проекту" className="portfolio__arrow"/>
                </li>
                <li className="portfolio__project">
                    <a href="https://mesto-punyapl.nomoredomainsrocks.ru" target="_blank" className="portfolio__link">Одностраничное приложение</a>
                    <img src={arrow} alt="Перейти к проекту" className="portfolio__arrow"/>
                </li>
            </ul>   
        </section>
    );
}

export default Portfolio;