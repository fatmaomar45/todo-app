"use client";

import { useState, useEffect } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  
  useEffect(() => {
    const savedTasks = localStorage.getItem("todo-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = () => {
    if (!input.trim()) return;
    const newTasks = [...tasks, { id: Date.now(), text: input, completed: false }];
    setTasks(newTasks);
    localStorage.setItem("todo-tasks", JSON.stringify(newTasks));
    setInput("");
  };

  
  const toggleComplete = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    localStorage.setItem("todo-tasks", JSON.stringify(newTasks));
  };

  
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("todo-tasks", JSON.stringify(newTasks));
    if (newTasks.length === 0) {
      localStorage.removeItem("todo-tasks");
    }
  };

  return (
    <div className="container mx-auto" style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1>Todo App 📝</h1>
      
      <div className="flex gap-2 mb-4" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            width: "300px",
            marginRight: "10px"
          }}
        />
        <button 
          onClick={addTask} 
          className="add-btn"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "white",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {tasks.map((task) => (
          <li 
            key={task.id} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              maxWidth: "380px",
              background: "#f9f9f9",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              border: "1px solid #eee"
            }}
          >
            <span 
              onClick={() => toggleComplete(task.id)}
              style={{ 
                cursor: "pointer", 
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#aaa" : "#333"
              }}
            >
              {task.completed ? "✅ " : "⬜ "}
              {task.text}
            </span>
            <button 
              onClick={() => deleteTask(task.id)}
              style={{
                background: "none",
                border: "none",
                color: "red",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
