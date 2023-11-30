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

    useEffect(() => setMoviesForRender(savedMovies), [savedMovies])

    const deleteMovie = (movieId, likeHandler) => {
        mainApi
            .removeMovie(movieId, token)
            .then(() => {
                likeHandler(false);
                setSavedMovies((state) => state.filter((m) => m._id !== movieId));
                setMoviesForRender((state) => state.filter((m) => m._id !== movieId));
            })
            .catch((e) => console.log(e));
    };

    const submitHandler = (isOnlyShortFilms, searchQuery) => {
        const filteredMovies = filterMovies(searchQuery, savedMovies);
        const filteredShortMovies = findOnlyShortMovies(filteredMovies);

        isOnlyShortFilms
            ? setMoviesForRender(filteredShortMovies)
            : setMoviesForRender(filteredMovies);
    };

    useEffect(() => {
        mainApi
            .getSavedMovies(token)
            .then((moviesData) => {
                const values = Object.values(moviesData);
                setSavedMovies(values[0]);
            })
            .catch((e) => console.log(e));
    }, [setSavedMovies, token]);
    
    return (
        <>
            <Header location={'app'} />
            <main className="main">
                <section className="saved-movies">
                    <SearchForm submitHandler={submitHandler} checkbox={shortFilmsCheck} setCheckbox={setShortFilmsCheck}/>
                    {moviesForRender && !message && (
                        <MoviesCardList movies={moviesForRender} onSavedPage={true} onDeleteHandler={deleteMovie} savedMovies={savedMovies} />
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