import React from "react";

function NavTab() {
  return (
    <nav className="nav-tab">
      <a className="nav-tab__link" href="#about">
        О проекте
      </a>
      <a className="nav-tab__link" href="#techs">
        Технологии
      </a>
      <a className="nav-tab__link" href="#student">
        Студент
      </a>
    </nav>
  );
}

export default NavTab;