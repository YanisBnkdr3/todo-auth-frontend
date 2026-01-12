import React, { useState, useEffect, useCallback } from "react";
import api from "../api";
import "../App.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const token = localStorage.getItem("token");

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

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
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

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [fetchTasks]);

  const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours < 12) return "☀️ Bonjour";
    if (hours < 18) return "🌤️ Bon après-midi";
    return "🌙 Bonsoir";
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* En-tête */}
        <div className="todo-header">
          <div>
            <h2>{getGreeting()}</h2>
            <p className="todo-subtitle">Voici vos objectifs du jour</p>
          </div>
          <div className="clock-badge">
            {currentTime.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <form onSubmit={addTask} className="todo-form">
          <input
            type="text"
            placeholder="Ajouter une nouvelle tâche..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="btn-primary-small">
            Ajouter
          </button>
        </form>

        {/* Liste des tâches */}
        <div className="tasks-wrapper">
          {tasks.length === 0 ? (
            <p className="empty-msg">
              Aucune tâche pour le moment. Commencez par en ajouter une !
            </p>
          ) : (
            <ul className="todo-list">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className={`todo-item ${
                    task.completed ? "completed-row" : ""
                  }`}
                >
                  <div
                    className="task-content"
                    onClick={() => toggleTask(task._id, task.completed)}
                  >
                    <div
                      className={`checkbox ${task.completed ? "checked" : ""}`}
                    >
                      {task.completed && "✓"}
                    </div>
                    <span className={task.completed ? "text-done" : ""}>
                      {task.title}
                    </span>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
