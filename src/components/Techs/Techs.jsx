import React from "react";

function Techs() {
    return (
        <section className="techs" id="techs">
            <h2 className="techs__title">
                Технологии
            </h2>
            <div className="techs__texts">
            <h3 className="techs__subtitle">
                7 технологий
            </h3>
            <p className="techs__text">
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            </div>
            <ul className="techs__tech-list">
                <li className="techs__tech-icon">HTML</li>
                <li className="techs__tech-icon">CSS</li>
                <li className="techs__tech-icon">JS</li>
                <li className="techs__tech-icon">React</li>
                <li className="techs__tech-icon">Git</li>
                <li className="techs__tech-icon">Express.js</li>
                <li className="techs__tech-icon">mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;