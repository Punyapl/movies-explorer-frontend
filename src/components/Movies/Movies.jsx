import React, { useContext, useEffect } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import savedPageContext from "../../context/SavedPageContext";

const allMovies = [
    {
        id: 1,
        title: "33 слова о дизайне",
        duration: 117,
        imageUrl:
            "https://www.webtekno.com/images/editor/default/0004/16/08eee52be4c382c677fe9273b23ae6be153174c3.jpeg",
    },
    {
        id: 2,
        title: "33 слова о дизайне",
        duration: 117,
        imageUrl:
            "https://www.webtekno.com/images/editor/default/0004/16/08eee52be4c382c677fe9273b23ae6be153174c3.jpeg",
    },
    {
        id: 3,
        title: "33 слова о дизайне",
        duration: 117,
        imageUrl:
            "https://www.webtekno.com/images/editor/default/0004/16/08eee52be4c382c677fe9273b23ae6be153174c3.jpeg",
    },
    {
        id: 4,
        title: "33 слова о дизайне",
        duration: 117,
        imageUrl:
            "https://www.webtekno.com/images/editor/default/0004/16/08eee52be4c382c677fe9273b23ae6be153174c3.jpeg",
    },
    {
        id: 5,
        title: "33 слова о дизайне",
        duration: 117,
        imageUrl:
            "https://www.webtekno.com/images/editor/default/0004/16/08eee52be4c382c677fe9273b23ae6be153174c3.jpeg",
    },
    {
        id: 6,
        title: "33 слова о дизайне",
        duration: 117,
        imageUrl:
            "https://www.webtekno.com/images/editor/default/0004/16/08eee52be4c382c677fe9273b23ae6be153174c3.jpeg",
    },
    {
        id: 7,
        title: "33 слова о дизайне",
        duration: 117,
        imageUrl:
            "https://www.webtekno.com/images/editor/default/0004/16/08eee52be4c382c677fe9273b23ae6be153174c3.jpeg",
    },
    {
        id: 8,
        title: "33 слова о дизайне",
        duration: 117,
        imageUrl:
            "https://www.webtekno.com/images/editor/default/0004/16/08eee52be4c382c677fe9273b23ae6be153174c3.jpeg",
    },
];

function Movies() {
    const { onSavedPage, setOnSavedPage } = useContext(savedPageContext);
    useEffect(() => setOnSavedPage(false), [setOnSavedPage]);

    return (
        <>
            <Header location={'app'} />
            <main className="main">
                <section className="movies">
                    <SearchForm />
                    <MoviesCardList movies={allMovies} />
                    <div className="movies__footer">
                        <button className="movies__button">Ещё</button>
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default Movies;