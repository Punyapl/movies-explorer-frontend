import React from "react";
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer';
import Promo from "../Promo/Promo"
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
    return (
        <>
            <Header location={'main'} />
            <main className="main">
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
        </>
    )
}

export default Main;