import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx'
import SavedMovies from '../SavedMovies/SavedMovies.jsx'
import Profile from "../Profile/Profile.jsx";
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import "../../index.css"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import currentUserContext from "../../context/currentUserContext";
import { mainApi } from "../../utils/MainApi";
import * as auth from "../../utils/auth.js"
import { defaultMessageError } from "../../utils/constants.js";
import { defaultMessageSaved } from "../../utils/constants.js";

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMoviesMessage, setSavedMoviesMessage] = useState("");
  const [unauthPageMessage, setUnauthPageMessage] = useState("");
  const [profilePageMessage, setProfilePageMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [savedMovies, setSavedMovies] = useState([])

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      navigate("/movies");
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getCurrentUserInfo(token)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token, isLoggedIn, setCurrentUser]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedMovies(token)
        .then((moviesData) => {
          const values = Object.values(moviesData);
          const ownSavedMovies = values[0].filter((movie) => movie.owner === currentUser._id)

          localStorage.setItem("savedMovies", JSON.stringify(ownSavedMovies));
          setSavedMovies(ownSavedMovies);
          setSavedMoviesMessage("");
        })
        .catch((err) => {
          setSavedMoviesMessage(defaultMessageError);
        });
    }

  }, [currentUser._id, setSavedMovies, token, isLoggedIn, setSavedMoviesMessage]);

  function registerUser(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          loginUser(email, password);
          setUnauthPageMessage("");
        }
      })
      .catch((err) => {
        err.json().then((err) => {
          if (err?.message) {
            setUnauthPageMessage(err.message);
          } else {
            setUnauthPageMessage('Не удалось зарегистрироваться');
          }
        })
          .catch((err) => console.error(err))
          .finally(() => {
            setIsLoading(false);
          });
      });
  }

  function loginUser(email, password) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((data) => {
        if (data.jwt) {
          setIsLoggedIn(true);
          navigate("/movies");
          setUnauthPageMessage("");
        }
      })
      .catch((err) => {
        switch (err.status) {
          case 401:
            setUnauthPageMessage('Неверные данные для входа');
            break;
          default:
            setUnauthPageMessage('Не удалось войти');
        }
        err.json()
        console.log(err)
        err.json().then((err) => {
          if (err?.message) {
            setUnauthPageMessage(err.message);
          } else {
            setUnauthPageMessage('Не удалось войти');
          }
        })
          .then(() => setIsLoggedIn(false))
          .catch((err) => console.error(err))
          .finally(() => setIsLoading(false));
      });
  }

  function updateUserInfo(userDataFromForm) {
    setProfilePageMessage("");
    setIsLoading(true);
  
    mainApi
      .editCurrentUserInfo(userDataFromForm, token)
      .then((userDataUpdated) => {
        setCurrentUser({
          name: userDataUpdated.name,
          email: userDataUpdated.email,
        });
        mainApi
          .getCurrentUserInfo(token)
          .then((res) => {
            setCurrentUser(res.data);
            setIsLoading(false);
            setProfilePageMessage(defaultMessageSaved);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Movies
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  message={savedMoviesMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  setIsLoggedIn={setIsLoggedIn}
                  submitHandler={updateUserInfo}
                  isLoading={isLoading}
                  message={profilePageMessage}
                  setMessage={setProfilePageMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-up" element={<Register
            submitHandler={registerUser}
            isLoading={isLoading}
            message={unauthPageMessage}
            setMessage={setUnauthPageMessage} />} />
          <Route path="/sign-in" element={<Login
            submitHandler={loginUser}
            isLoading={isLoading}
            message={unauthPageMessage}
            setMessage={setUnauthPageMessage}
          />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
