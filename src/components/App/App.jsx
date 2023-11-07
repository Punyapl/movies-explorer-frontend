import { useState } from "react";
import { Route, Routes, Redirect } from "react-router-dom";

import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx'
import SavedMovies from '../SavedMovies/SavedMovies.jsx'
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
        </Routes>
      </div>
    </savedPageContext.Provider>

  );
}

export default App;
