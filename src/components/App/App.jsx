import { useState } from "react";
import { Route, Routes } from "react-router-dom";

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

  return (
    <savedPageContext.Provider value={{ onSavedPage, setOnSavedPage }}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </div>
    </savedPageContext.Provider>

  );
}

export default App;
