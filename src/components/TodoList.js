import React, { useState, useEffect, useCallback } from "react";
import api from "../api";
import "../App.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const token = localStorage.getItem("token");

  // 🔹 Récupération des tâches (mémoïsée pour éviter le warning useEffect)
  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  // 🔹 Ajouter une tâche
  const addTask = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Changer état terminé / non terminé
  const toggleTask = async (id, completed) => {
    try {
      await api.put(
        `/tasks/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Supprimer une tâche
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Timer qui met à jour l'heure chaque seconde + fetch initial
  useEffect(() => {
    fetchTasks();
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchTasks]);

  // 🔹 Message de bienvenue dynamique
  const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours < 12) return "☀️ Bonjour";
    if (hours < 18) return "🌤️ Bon après-midi";
    return "🌙 Bonsoir";
  };

  return (
    <div className="intro">
      {/* En-tête avec timer */}
      <div className="todo-header">
        <h2>{getGreeting()} 👋</h2>
        <p className="clock">
          {currentTime.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      </div>

      <h3>📋 Ma To-Do List</h3>
      <br />

      {/* Formulaire d'ajout */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        💡 Cliquez sur une tâche pour la marquer comme complétée ou non.
      </p>

      {/* Liste des tâches */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              onClick={() => toggleTask(task._id, task.completed)}
              className={task.completed ? "completed" : ""}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
