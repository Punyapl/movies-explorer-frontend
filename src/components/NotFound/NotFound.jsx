import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const backHandler = () => navigate(-1);

  return (
    <main className="main">
      <section className="not-found">
        <div className="not-found__content">
          <div className="not-found__text">
            <h1 className="not-found__error">404</h1>
            <h2 className="not-found__title">Страница не найдена</h2>
          </div>
          <button className="not-found__back" onClick={backHandler}>
            Назад
          </button>
        </div>
      </section>
    </main>

  );
}

export default NotFound;