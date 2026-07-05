"use client";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [list, setList] = useState<string[]>([]);

  function addTask() {
    if (task.trim() === "") return; 
    setList([...list, task]);
    setTask("");
  }

  function deleteTask(index: number) {
    const newList = list.filter((item, i) => i !== index);
    setList(newList);
  }

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
        style={{ color: "#000000", padding: "5px", marginRight: "10px",backgroundColor:"#ffffff" }}
      />
      <button className="add-btn" onClick={addTask}>Add</button>

      <ul>
        {list.map((item, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <span style={{ marginRight: "10px" }}>{item}</span>
            <button className="dlt-btn" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


