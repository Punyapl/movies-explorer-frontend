import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { mainApi } from "../../utils/MainApi";
import { findOnlyShortMovies, filterMovies } from "../../utils/filter";

function SavedMovies({ savedMovies, setSavedMovies, message }) {
    const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
    const [moviesForRender, setMoviesForRender] = useState(savedMovies)
    const token = localStorage.getItem("token");

    useEffect(() => {
        setMoviesForRender(savedMovies)
    }, [savedMovies])

    const submitHandler = (isOnlyShortFilms, searchQuery) => {
        setMoviesForRender(isOnlyShortFilms ? findOnlyShortMovies(filterMovies(searchQuery, savedMovies)) : filterMovies(searchQuery, savedMovies));
    };

    useEffect(() => {
        mainApi
            .getSavedMovies(token)
            .then((moviesData) => {
                const values = Object.values(moviesData);
                setSavedMovies(values[0]);
            })
            .catch((err) => console.log(err));
    }, [setSavedMovies, token]);

    return (
        <>
            <Header location={'app'} />
            <main className="main">
                <section className="saved-movies">
                    <SearchForm submitHandler={submitHandler} checkbox={shortFilmsCheck} setCheckbox={setShortFilmsCheck} />
                    {moviesForRender && !message && (
                        <MoviesCardList movies={moviesForRender} onSavedPage={true} savedMovies={savedMovies} setSavedMovies={setSavedMovies} setMoviesForRender={setMoviesForRender} />
                    )}
                    {message && (
                        <p className="saved-movies__message">{message}</p>
                    )}
                    {moviesForRender.length < 1 && !message && (
                        <p className="saved-movies__message">Сохраненных фильмов нет</p>
                    )}

                    <div className="saved-movies__footer">
                        <button className="saved-movies__button">Ещё</button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default SavedMovies;