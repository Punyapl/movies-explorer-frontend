import React from "react";

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links">
        <li className="nav-tab__link-container">
          <a className="nav-tab__link" href="#about">
            О проекте
          </a>
        </li>
        <li className="nav-tab__link-container">
          <a className="nav-tab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li className="nav-tab__link-container">
          <a className="nav-tab__link" href="#student">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;