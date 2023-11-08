import React from "react";
import placeholder from "../../images/placeholder.jpg"

function AboutMe() {
    return (
        <section className="about-me" id="student">
            <h2 className="about-me__title">
                Студент
            </h2>
            <div className="about-me__info">
                <div className="about-me__texts">
                <h2 className="about-me__subtitle">
                    Александр
                </h2>
                <h2 className="about-me__description">
                    Фронтенд-разработчик, 18 лет
                </h2>
                <h3 className="about-me__text">
                    Не смотря на то, что это всего лишь какой-то плейсхолдер, это наверняка самый лучший из тех, которых ты видел за всю историю плейсхолдеров. :D
                </h3>
                <a href="https://github.com/Punyapl" className="about-me__gh-link">Github</a>
                </div>
                <img src={placeholder} alt="Фото студента" className="about-me__img"/>
            </div>   
        </section>
    );
}

export default AboutMe;