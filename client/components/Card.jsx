import React, { useState } from "react";

export default function Card({ title, onClick, children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <h3
        onClick={() => setExpanded(!expanded)}
        style={{ userSelect: "none", marginBottom: "10px" }}
      >
        {title} {expanded ? "▲" : "▼"}
      </h3>
      {expanded && children}
    </div>
  );
}
