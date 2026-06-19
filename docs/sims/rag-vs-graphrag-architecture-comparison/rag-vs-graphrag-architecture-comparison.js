// RAG vs GraphRAG Architecture Comparison
// CANVAS_HEIGHT: 980
// Two-column architecture comparison diagram (Standard RAG vs GraphRAG) with a
// center "VS" separator, limitation/advantage callouts, and a capability table.
// The layout is built in main.html + style.css; this script adds light
// interactivity: hovering a table row gently emphasizes the matching column.

document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".cmp-table tbody tr");
  const ragCol = document.querySelector(".col.rag");
  const grCol = document.querySelector(".col.graphrag");

  rows.forEach(row => {
    row.style.cursor = "default";
    row.addEventListener("mouseenter", () => {
      // Briefly raise both columns to draw the eye back to the diagram.
      if (ragCol) ragCol.style.filter = "saturate(1.15)";
      if (grCol) grCol.style.filter = "saturate(1.15)";
    });
    row.addEventListener("mouseleave", () => {
      if (ragCol) ragCol.style.filter = "";
      if (grCol) grCol.style.filter = "";
    });
  });
});
