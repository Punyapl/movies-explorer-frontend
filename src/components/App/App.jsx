import { useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer';
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx'
import SavedMovies from '../SavedMovies/SavedMovies.jsx'
import Profile from "../Profile/Profile.jsx";
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import "../../index.css"
import savedPageContext from "../../context/SavedPageContext.jsx";


function App() {

  const [onSavedPage, setOnSavedPage] = useState(false);

  function checkLocation() {
    const location = (window.location.href).replace('http://localhost:3000', '');
    if (location == '/movies' || location == '/saved-movies' || location == '/profile') {
      console.log(location)
      console.log('not pow')
      return false;
    } else {
      console.log(location)
      console.log('pow')
      return true;
    }
  }

  const [isMain, setIsMain] = useState(true)

  useEffect(() => {
    if (checkLocation()) {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [isMain,checkLocation])

  return (
    <savedPageContext.Provider value={{ onSavedPage, setOnSavedPage }}>
      <div className="page">
        {/* <Header location={'app'}/> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </savedPageContext.Provider>

  );
}

export default App;
