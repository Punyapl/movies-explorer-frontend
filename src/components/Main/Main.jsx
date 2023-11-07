import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer';
import Promo from "../Promo/Promo"
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
    return (
        <main className="main">
            <Header location={"main"} />
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </main>
    )
}

export default Main;