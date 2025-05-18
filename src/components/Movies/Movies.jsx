import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Preloader from "../Preloader/Preloader";

import { findOnlyShortMovies, filterMovies } from "../../utils/filter";
import { beatFilmApi } from "../../utils/MoviesApi";
import { UseGetWidth } from "../../hooks/useGetWidth";

import {
    DEFAULT_MESSAGE_ERROR,
    LAPTOP_CARD_BREAKPOINT,
    LAPTOP_CARD_BUNDLE,
    LAPTOP_CARD_INITIAL,
    TABLET_CARD_BREAKPOINT,
    TABLET_CARD_BUNDLE,
    TABLET_CARD_INITIAL,
    MOBILE_CARD_BREAKPOINT,
    MOBILE_CARD_BUNDLE,
    MOBILE_CARD_INITIAL
} from "../../utils/constants";


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

    useEffect(() => {
        if (queryData) {
            setLastSearchQuery(JSON.parse(queryData)?.searchQuery);
            setShortFilmsCheck(JSON.parse(queryData)?.isOnlyShortFilms);
        }
    }, [])

    useEffect(() => {
        const cardSettings = [
            { breakpoint: LAPTOP_CARD_BREAKPOINT, initialCards: LAPTOP_CARD_INITIAL, cardsInBundle: LAPTOP_CARD_BUNDLE },
            { breakpoint: TABLET_CARD_BREAKPOINT, initialCards: TABLET_CARD_INITIAL, cardsInBundle: TABLET_CARD_BUNDLE },
            { breakpoint: MOBILE_CARD_BREAKPOINT, initialCards: MOBILE_CARD_INITIAL, cardsInBundle: MOBILE_CARD_BUNDLE }
        ];

        const { initialCards: newInitialCards, cardsInBundle: newCardsInBundle } =
            cardSettings.find(setting => width >= setting.breakpoint) ||
            cardSettings[cardSettings.length - 1];

        setInitialCards(newInitialCards);
        setCardsInBundle(newCardsInBundle);
    }, [width]);

    let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];
    let filteredShortMovies = JSON.parse(queryData)?.filteredShortMovies || [];

    //!!!!!!!!!!
    useEffect(() => {
        const moviesToSet = !errorMessage ?
            (shortFilmsCheck ? filteredShortMovies : filteredMovies) : [];

        setMovies(moviesToSet.slice(0, cardsCount));
    }, [shortFilmsCheck, cardsCount, errorMessage]);

    useEffect(() => {
        if (queryData) {
            localStorage.setItem(
                "queryData",
                JSON.stringify({
                    ...JSON.parse(queryData),
                    isOnlyShortFilms: shortFilmsCheck
                })
            );
        }
    }, [shortFilmsCheck, queryData]);

    const handleSubmit = (isOnlyShortFilms, searchQuery) => {
        setErrorMessage("");
        setIsLoading(true);
        beatFilmApi
            .getMovies()
            .then((result) => {
                setErrorMessage("");
                let filteredMovies = filterMovies(searchQuery, result);
                let filteredShortMovies = findOnlyShortMovies(filteredMovies);
                localStorage.setItem("queryData", JSON.stringify({
                    result,
                    searchQuery: searchQuery,
                    filteredMovies: filteredMovies,
                    filteredShortMovies: filteredShortMovies,
                    isOnlyShortFilms
                }));

                setMovies(isOnlyShortFilms ? filteredShortMovies.slice(0, initialCardsAmount) : filteredMovies.slice(0, initialCardsAmount));
            })
            .catch((err) => {
                setMovies([]);
                setErrorMessage(DEFAULT_MESSAGE_ERROR);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    const handleMoreButton = () => {
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

    return (
        <>
            <Header location={'app'} />
            <main className="main">
                <section className="movies">
                    <SearchForm
                        submitHandler={handleSubmit}
                        checkbox={shortFilmsCheck}
                        setCheckbox={setShortFilmsCheck}
                        lastSearchQuery={lastSearchQuery}
                        isLoading={isLoading}
                    />
                    {isLoading ? <Preloader /> : <MoviesCardList movies={movies} savedMovies={savedMovies} onSavedPage={false} setSavedMovies={setSavedMovies} />}
                    {!isLoading && movies.length < 1 && (
                        <p className="movies__message">{errorMessage || "Ничего не найдено"}</p>
                    )}
                    <div className="movies__footer">
                        {shortFilmsCheck
                            ? cardsCount < filteredShortMovies.length &&
                            !isLoading && <button className="movies__button" onClick={handleMoreButton}>Ещё</button>
                            : cardsCount < filteredMovies.length &&
                            !isLoading && <button className="movies__button" onClick={handleMoreButton}>Ещё</button>}
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default Movies;