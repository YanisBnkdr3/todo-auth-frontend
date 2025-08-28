import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import "./App.css";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <header className="navbar">
      <h1>
        <img src="/favicon.png" alt="logo" className="logo-icon" />
        Ma To-Do List
      </h1>
      <nav>
        <Link to="/">Accueil</Link>
        {isLoggedIn && <Link to="/tasks">Mes Tâches</Link>}
        {!isLoggedIn ? (
          <Link to="/login">
            <button className="primary">Connexion</button>
          </Link>
        ) : (
          <button onClick={handleLogout} className="secondary">
            Déconnexion
          </button>
        )}
      </nav>
    </header>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <Routes>
          {/* Page d'accueil */}
          <Route
            path="/"
            element={
              <div className="intro">
                <h2>Bienvenue sur Ma To-Do List</h2>
                <p>
                  Organisez vos tâches facilement avec un design moderne et
                  sécurisé.
                </p>
                <div className="buttons">
                  <Link to="/login">
                    <button className="primary">Connexion</button>
                  </Link>
                  <Link to="/register">
                    <button className="secondary">Inscription</button>
                  </Link>
                </div>
              </div>
            }
          />

          {/* Inscription */}
          <Route path="/register" element={<Register />} />

          {/* Connexion */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          {/* To-do list (protégée) */}
          <Route
            path="/tasks"
            element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />}
          />
        </Routes>

        <footer>
          © {new Date().getFullYear()} <span>Yanis Benkeder</span>. Tous droits
          réservés.
        </footer>
      </div>
    </Router>
  );
}

export default App;
