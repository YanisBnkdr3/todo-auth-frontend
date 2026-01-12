import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Inscription réussie ✅, vous pouvez maintenant vous connecter !");
      navigate("/login");
    } catch (err) {
      alert("Erreur d'inscription");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister}>
        <h2>Inscription</h2>
        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "10px",
          }}
        >
          Créez votre compte gratuitement
        </p>
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Adresse email"
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
          S’inscrire maintenant
        </button>
        <p
          style={{ marginTop: "15px", textAlign: "center", fontSize: "0.9rem" }}
        >
          Déjà un compte ?{" "}
          <Link
            to="/login"
            style={{ color: "#00d2ff", textDecoration: "none" }}
          >
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
}
