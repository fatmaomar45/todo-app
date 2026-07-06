"use client";

import { useEffect, useState } from "react";

type Task = {
  text: string;
  done: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [list, setList] = useState<Task[]>([]);

  
  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        
        if (Array.isArray(parsed)) {
          const cleaned = parsed.map((item) =>
            typeof item === "string"
              ? { text: item, done: false }
              : item
          );

          setList(cleaned);
        }
      } catch (e) {
        console.error("Invalid localStorage data");
      }
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  function addTask() {
    if (task.trim() === "") return;

    setList((prev) => [
      ...prev,
      { text: task, done: false },
    ]);

    setTask("");
  }

  function deleteTask(index: number) {
    setList((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleTask(index: number) {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        placeholder="Enter a task..."
        style={{
          padding: "5px",
          marginRight: "10px",
          backgroundColor: "lightblue",
          color: "#000",
        }}
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {list.map((item, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <span
              onClick={() => toggleTask(index)}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                textDecoration: item.done
                  ? "line-through"
                  : "none",
                color: item.done ? "gray" : "black",
              }}
            >
              {item.text}
            </span>

            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}