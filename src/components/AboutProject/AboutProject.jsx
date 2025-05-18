import React from "react";

function AboutProject() {
    return (
        <section className="about-project" id="about">
            <h2 className="about-project__title">
                О проекте
            </h2>
            <div className="about-project__cards">
                <div className="about-project__card">
                    <h3 className="about-project__subtitle">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__card">
                    <h3 className="about-project__subtitle">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__roadmap">
                <div className="about-project__backend">
                    <p className="about-project__roadmap-time about-project__roadmap-time_colored">1 неделя</p>
                    <p className="about-project__roadmap-title">Back-end</p>
                </div>
                <div className="about-project__frontend">
                    <p className="about-project__roadmap-time">4 недели</p>
                    <p className="about-project__roadmap-title">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;