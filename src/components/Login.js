import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate("/tasks");
    } catch (err) {
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "10px",
          }}
        >
          Bon retour parmi nous !
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">
          Se connecter
        </button>
        <p
          style={{ marginTop: "15px", textAlign: "center", fontSize: "0.9rem" }}
        >
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            style={{ color: "#00d2ff", textDecoration: "none" }}
          >
            S'inscrire
          </Link>
        </p>
      </form>
    </div>
  );
}
