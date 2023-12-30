import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Preloader from "../Preloader/Preloader";

import { findOnlyShortMovies, filterMovies } from "../../utils/filter";
import { beatFilmApi } from "../../utils/MoviesApi";
import { UseGetWidth } from "../../hooks/useGetWidth";
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

    useEffect(() => {
        if (queryData) {
            setLastSearchQuery(JSON.parse(queryData)?.searchQuery);
            setShortFilmsCheck(JSON.parse(queryData)?.isOnlyShortFilms);
        }
    }, [])

    useEffect(() => {
        const cardSettings = [
            { breakpoint: 1280, initialCards: 12, cardsInBundle: 3 },
            { breakpoint: 480, initialCards: 8, cardsInBundle: 2 },
            { breakpoint: 0, initialCards: 5, cardsInBundle: 5 }
        ];
    
        const { initialCards: newInitialCards, cardsInBundle: newCardsInBundle } = 
          cardSettings.find(setting => width >= setting.breakpoint) || 
          cardSettings[cardSettings.length - 1];
    
        setInitialCards(newInitialCards);
        setCardsInBundle(newCardsInBundle);
    }, [width]);

    let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];
    let filteredShortMovies = JSON.parse(queryData)?.filteredShortMovies || [];

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

    const submitHandler = (isOnlyShortFilms, searchQuery) => {
        setErrorMessage("");
        setIsLoading(true);
        beatFilmApi
            .getMovies()
            .then((result) => {
                setErrorMessage("");
                localStorage.setItem("queryData", JSON.stringify({
                    result,
                    searchQuery: searchQuery,
                    filteredMovies: filterMovies(searchQuery, result),
                    filteredShortMovies: findOnlyShortMovies(filteredMovies),
                    isOnlyShortFilms
                }));

                setMovies(isOnlyShortFilms ? filteredShortMovies.slice(0, initialCardsAmount) : filteredMovies.slice(0, initialCardsAmount));
            })
            .catch((err) => {
                setMovies([]);
                setErrorMessage(defaultMessageError);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
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
                    {isLoading ? <Preloader /> : <MoviesCardList movies={movies} savedMovies={savedMovies} onSavedPage={false} setSavedMovies={setSavedMovies} />}
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