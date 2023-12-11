import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Preloader from "../Preloader/Preloader";

import { findOnlyShortMovies, filterMovies } from "../../utils/filter";
import { beatFilmApi } from "../../utils/MoviesApi";
import { UseGetWidth } from "../../hooks/useGetWidth";
import { getMovieId } from "../../utils/getMovieId";
import { mainApi } from "../../utils/MainApi";
import { defaultMessageError } from "../../utils/constants";

function Movies({ savedMovies, setSavedMovies }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initialCardsAmount, setInitialCards] = useState(0);
    const [cardsPage, setCardsPage] = useState(0);
    const [cardsInBundle, setCardsInBundle] = useState(0);
    const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
    const [lastSearchQuery, setLastSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const cardsCount = initialCardsAmount + cardsInBundle * cardsPage;
    const width = UseGetWidth();
    const queryData = localStorage.getItem("queryData");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (queryData) {
            setLastSearchQuery(JSON.parse(queryData)?.searchQuery);
            setShortFilmsCheck(JSON.parse(queryData)?.isOnlyShortFilms);
        }
    }, [])

    useEffect(() => {
        if (width >= 1280) {
            setInitialCards(12);
            setCardsInBundle(3);
        } else if (width > 480 && width < 1280) {
            setInitialCards(8);
            setCardsInBundle(2);
        } else if (width <= 480) {
            setInitialCards(5);
            setCardsInBundle(5);
        }
    }, [width]);

    let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];
    let filteredShortMovies = JSON.parse(queryData)?.filteredShortMovies || [];

    useEffect(() => {
        if (!errorMessage) {
            shortFilmsCheck
                ? setMovies(filteredShortMovies.slice(0, cardsCount))
                : setMovies(filteredMovies.slice(0, cardsCount));
        }
    }, [shortFilmsCheck, cardsCount, errorMessage]);

    useEffect(() => {
        if (queryData) {
            const updatedQueryData = JSON.parse(queryData);
            updatedQueryData.isOnlyShortFilms = shortFilmsCheck;
            localStorage.setItem("queryData", JSON.stringify(updatedQueryData));
        }
    }, [shortFilmsCheck, queryData]);

    const submitHandler = async (isOnlyShortFilms, searchQuery) => {
        setIsLoading(true);
        beatFilmApi
            .getMovies()
            .then((result) => {
                filteredMovies = filterMovies(searchQuery, result);
                filteredShortMovies = findOnlyShortMovies(filteredMovies);
                const queryData = {
                    result,
                    searchQuery: searchQuery,
                    filteredMovies,
                    filteredShortMovies,
                    isOnlyShortFilms,
                };
                localStorage.setItem("queryData", JSON.stringify(queryData));

                isOnlyShortFilms
                    ? setMovies(filteredShortMovies.slice(0, initialCardsAmount))
                    : setMovies(filteredMovies.slice(0, initialCardsAmount));

                setErrorMessage("")
                setIsLoading(false);
            })
            .catch((e) => {
                setMovies([]);
                setErrorMessage(defaultMessageError);
                console.log(e);
                setIsLoading(false);
            });
    };

    const moreButtonHandler = () => {
        if (shortFilmsCheck) {
            if (cardsCount < filteredShortMovies.length) {
                setCardsPage((prevPage) => prevPage + 1);
            }
        } else {
            if (cardsCount < filteredMovies.length) {
                setCardsPage((prevPage) => prevPage + 1);
            }
        }
    };

    const saveMovie = (movie, likeHandler) => {
        mainApi
            .createMovie(movie, token)
            .then((newMovie) => {
                setSavedMovies([...savedMovies, Object.values(newMovie)[0]]);
                likeHandler(true);
            })
            .catch((e) => console.log(e));
    };

    const deleteMovie = (movieId, likeHandler) => {
        const idInSavedMovies = getMovieId(movieId, savedMovies)
        mainApi
            .removeMovie(idInSavedMovies, token)
            .then(() => {
                likeHandler(false);
                setSavedMovies((state) => state.filter((m) => m._id !== idInSavedMovies));
            })
            .catch((e) => console.log(e));
    };

    return (
        <>
            <Header location={'app'} />
            <main className="main">
                <section className="movies">
                    <SearchForm
                        submitHandler={submitHandler}
                        checkbox={shortFilmsCheck}
                        setCheckbox={setShortFilmsCheck}
                        lastSearchQuery={lastSearchQuery}
                        isLoading={isLoading}
                    />
                    {isLoading ? <Preloader /> : <MoviesCardList movies={movies} onSaveHandler={saveMovie} onDeleteHandler={deleteMovie} savedMovies={savedMovies} onSavedPage={false} />}
                    {!isLoading && movies.length < 1 && (
                        <p className="movies__message">{errorMessage || "Ничего не найдено"}</p>
                    )}
                    <div className="movies__footer">
                        {shortFilmsCheck
                            ? cardsCount < filteredShortMovies.length &&
                            !isLoading && <button className="movies__button" onClick={moreButtonHandler}>Ещё</button>
                            : cardsCount < filteredMovies.length &&
                            !isLoading && <button className="movies__button" onClick={moreButtonHandler}>Ещё</button>}
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default Movies;