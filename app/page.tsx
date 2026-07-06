
"use client";
import { useState, useEffect } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [input, setInput] = useState("");

  
  useEffect(() => {
    const savedTasks = localStorage.getItem("todo-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("todo-tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTasks = [...tasks, { id: Date.now(), text: input, completed: false }];
    setTasks(newTasks);
    localStorage.setItem("todo-tasks", JSON.stringify(newTasks));
    setInput("");
  };

  const toggleComplete = (id: number) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    localStorage.setItem("todo-tasks", JSON.stringify(newTasks));
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("todo-tasks", JSON.stringify(newTasks));
    if (newTasks.length === 0) {
      localStorage.removeItem("todo-tasks");
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Todo App</h1>
      
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Enter a task..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="add-btn" onClick={addTask} style={{ width: "100px", marginBottom: "10px" }}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleComplete(task.id)}
                style={{ width: "auto", margin: 0, cursor: "pointer" }}
              />
              <span 
                className="todo-text" 
                style={{ 
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.5 : 1,
                  color: "#ffffff" 
                }}
              >
                {task.text}
              </span>
            </div>
            <button className="dlt-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
