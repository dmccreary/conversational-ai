// RAG Limitations Overview
// CANVAS_HEIGHT: 620
// Interactive infographic: three columns describing the main categories of RAG
// limitations. Hover a card to reveal mitigation strategies; click the example
// box to expand a detailed scenario.

const columns = [
  {
    accent: "#1e88e5", accentDark: "#0d47a1", accentLight: "#e3f2fd",
    icon: "📄",            // page facing up
    title: "Context Length Limits",
    problem: "Relevant information exceeds the model's context window.",
    exampleShort: "Analyze all 10 quarterly reports (50,000 tokens) - but the context window is only 8,000 tokens.",
    exampleDetail: "Because the combined documents are over six times larger than the window, you must select a subset. Choosing the wrong reports means the model never sees the data it needs, and there is no signal that anything was left out.",
    impact: "Must choose which documents to include, risking missing critical information.",
    mitigations: [
      "Chunk documents and retrieve only the most relevant passages.",
      "Use a model with a larger context window.",
      "Summarize or compress documents before augmentation.",
      "Apply re-ranking so the highest-value chunks fit first."
    ]
  },
  {
    accent: "#e53935", accentDark: "#b71c1c", accentLight: "#ffebee",
    icon: "🧠",            // brain
    title: "Hallucination",
    problem: "The model generates plausible but incorrect information.",
    exampleShort: "Query: \"What's our Q3 profit?\" Context: \"Q3 revenue was 2.3M.\" Response: \"Q3 profit was 450K\" (fabricated).",
    exampleDetail: "The context contained revenue, not profit, yet the model produced a confident profit figure that appears nowhere in the source. The answer reads fluently, so users have no easy way to spot that the number was invented.",
    impact: "Users receive confident-sounding but factually wrong answers.",
    mitigations: [
      "Require citations and verify them against the source text.",
      "Lower the generation temperature for factual queries.",
      "Add an instruction to answer only from the provided context.",
      "Use a grounding or fact-check pass before showing the answer."
    ]
  },
  {
    accent: "#fb8c00", accentDark: "#e65100", accentLight: "#fff3e0",
    icon: "📚",            // books
    title: "Factual Accuracy",
    problem: "The corpus contains outdated, contradictory, or incomplete information.",
    exampleShort: "Retrieves both the 2022 policy (2 days remote) and the 2024 policy (4 days remote), producing an inconsistent answer.",
    exampleDetail: "Both documents match the query, so retrieval surfaces them together. The model has no built-in notion of which one is current, and may blend or pick the wrong version, giving employees conflicting guidance.",
    impact: "Responses are based on flawed or conflicting source material.",
    mitigations: [
      "Tag documents with effective dates and prefer the newest.",
      "Run periodic corpus curation to remove stale documents.",
      "Detect and flag contradictions across retrieved chunks.",
      "Maintain a single authoritative source per topic."
    ]
  }
];

function buildCard(c) {
  const lis = c.mitigations.map(m => `<li>${m}</li>`).join("");
  return `
  <div class="card" style="--accent:${c.accent};--accent-dark:${c.accentDark};--accent-light:${c.accentLight}">
    <div class="warn" title="Severity">⚠️</div>
    <div class="icon">${c.icon}</div>
    <h3>${c.title}</h3>
    <div class="label">Problem</div>
    <div class="problem">${c.problem}</div>
    <div class="example">
      <div class="label">Example scenario (click to expand)</div>
      ${c.exampleShort}
      <span class="ex-hint">+ show details</span>
      <div class="ex-detail">${c.exampleDetail}</div>
    </div>
    <div class="impact"><span class="label">Impact:</span> ${c.impact}</div>
    <div class="mitigation">
      <div class="label">Mitigation strategies</div>
      <ul>${lis}</ul>
    </div>
  </div>`;
}

document.getElementById("cards").innerHTML = columns.map(buildCard).join("");

// Click-to-expand the example boxes
document.querySelectorAll(".example").forEach(ex => {
  ex.addEventListener("click", () => {
    ex.classList.toggle("open");
    const hint = ex.querySelector(".ex-hint");
    if (hint) hint.textContent = ex.classList.contains("open") ? "− hide details" : "+ show details";
  });
});
