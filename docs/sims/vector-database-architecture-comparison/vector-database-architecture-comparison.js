// Vector Database Architecture Comparison - HTML/CSS columns MicroSim
// CANVAS_HEIGHT: 740
// Three layered architecture stacks (FAISS, Pinecone, Weaviate) read top-to-bottom,
// plus a feature comparison matrix. Hovering any layer updates a shared info line.

(function () {
    const info = document.getElementById('info');
    const defaultText = '<strong>Tip:</strong> hover over any layer to learn what it does.';
    document.querySelectorAll('[data-info]').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('mouseenter', () => { info.textContent = el.getAttribute('data-info'); });
        el.addEventListener('mouseleave', () => { info.innerHTML = defaultText; });
    });
})();
