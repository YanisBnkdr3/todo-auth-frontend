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
      <div className="navbar-brand">
        <img src="/favicon.png" alt="logo" className="logo-icon" />
        <h1>Ma To-Do List</h1>
      </div>
      <nav>
        <Link to="/" className="nav-link">
          Accueil
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/tasks" className="nav-link">
              Mes Tâches
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn-login-nav">Connexion</button>
          </Link>
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

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="landing-page">
                  <section className="hero">
                    <div className="hero-text">
                      <span className="badge">Version 2.0 disponible</span>
                      <h2>
                        Maîtrisez votre temps, <br />
                        <span>simplifiez votre vie.</span>
                      </h2>
                      <p>
                        Organisez vos tâches quotidiennes avec une interface
                        intuitive et sécurisée.
                      </p>
                      <div className="hero-buttons">
                        <Link to="/register">
                          <button className="btn-primary">
                            Inscriz-Vous maintenant
                          </button>
                        </Link>
                        <Link to="/login">
                          <button className="btn-outline">Se connecter</button>
                        </Link>
                      </div>
                    </div>
                    <div className="hero-visual">
                      <div className="mockup-window">
                        <div className="mockup-header">
                          <span className="dot red"></span>
                          <span className="dot yellow"></span>
                          <span className="dot green"></span>
                        </div>
                        <div className="mockup-content">
                          <div className="skeleton-item done"></div>
                          <div className="skeleton-item"></div>
                          <div className="skeleton-item"></div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="features">
                    <div className="feature-card">
                      <h3>☁️ Sync Cloud</h3>
                      <p>Accès universel.</p>
                    </div>
                    <div className="feature-card">
                      <h3>🛡️ Sécurité</h3>
                      <p>Données chiffrées.</p>
                    </div>
                    <div className="feature-card">
                      <h3>⚡ Rapidité</h3>
                      <p>Performance fluide.</p>
                    </div>
                  </section>
                </div>
              }
            />

            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/tasks"
              element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <p>
              © {new Date().getFullYear()} Yanis Benkeder. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
