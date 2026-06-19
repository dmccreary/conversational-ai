// Embedding Model Comparison - HTML/CSS panels MicroSim
// CANVAS_HEIGHT: 650
// Three side-by-side panels comparing how Word2Vec (Skip-gram), GloVe, and
// FastText learn word embeddings, plus a feature comparison table. Hovering any
// box updates a shared info line beneath the panels.

(function () {
    const info = document.getElementById('info');
    const defaultText = '<strong>Tip:</strong> hover over any box to learn how that step works.';
    const boxes = document.querySelectorAll('.box[data-info]');
    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            info.textContent = box.getAttribute('data-info');
        });
        box.addEventListener('mouseleave', () => {
            info.innerHTML = defaultText;
        });
    });
})();
