// Word Embedding Vector Space Visualization - Chart.js scatter MicroSim
// CANVAS_HEIGHT: 660
// A 2D projection of word embeddings showing that semantically related words sit
// close together. Four color-coded clusters (royalty, animals, technology, verbs)
// with word labels, dotted cluster circles, and a king->queen "gender" arrow.

// Each word: x, y in plot coordinates (0..10), plus its label.
const clusters = {
    Royalty: {
        color: '#8e24aa',
        ring: { x: 2.0, y: 7.6, r: 1.7 },
        words: [
            { x: 1.1, y: 8.4, label: 'king' },
            { x: 2.4, y: 8.6, label: 'queen' },
            { x: 1.0, y: 7.0, label: 'prince' },
            { x: 2.3, y: 7.1, label: 'princess' },
            { x: 2.9, y: 7.9, label: 'throne' },
            { x: 1.7, y: 6.4, label: 'crown' }
        ]
    },
    Animals: {
        color: '#2e7d32',
        ring: { x: 7.8, y: 7.8, r: 1.6 },
        words: [
            { x: 7.0, y: 8.5, label: 'cat' },
            { x: 8.2, y: 8.6, label: 'dog' },
            { x: 8.7, y: 7.7, label: 'bird' },
            { x: 7.2, y: 7.1, label: 'fish' },
            { x: 8.0, y: 6.7, label: 'pet' }
        ]
    },
    Technology: {
        color: '#1565c0',
        ring: { x: 2.1, y: 3.0, r: 1.5 },
        words: [
            { x: 1.2, y: 3.7, label: 'computer' },
            { x: 2.6, y: 3.7, label: 'software' },
            { x: 1.4, y: 2.4, label: 'algorithm' },
            { x: 2.9, y: 2.4, label: 'network' }
        ]
    },
    Verbs: {
        color: '#e65100',
        ring: { x: 7.9, y: 3.0, r: 1.4 },
        words: [
            { x: 7.1, y: 3.6, label: 'run' },
            { x: 8.5, y: 3.6, label: 'walk' },
            { x: 7.0, y: 2.5, label: 'sprint' },
            { x: 8.6, y: 2.5, label: 'jog' }
        ]
    }
};

// Build one scatter dataset per cluster so colors and the legend work.
const datasets = Object.keys(clusters).map(name => ({
    label: name,
    data: clusters[name].words.map(w => ({ x: w.x, y: w.y, label: w.label })),
    backgroundColor: clusters[name].color,
    borderColor: clusters[name].color,
    pointRadius: 6,
    pointHoverRadius: 9
}));

// Plugin: draw word labels, dotted cluster rings, and the king->queen arrow.
const annotationPlugin = {
    id: 'wordAnnotations',
    afterDatasetsDraw(chart) {
        const { ctx, scales: { x, y } } = chart;

        // Dotted cluster rings
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 1.5;
        for (const name in clusters) {
            const c = clusters[name];
            const cx = x.getPixelForValue(c.ring.x);
            const cy = y.getPixelForValue(c.ring.y);
            const rx = Math.abs(x.getPixelForValue(c.ring.r) - x.getPixelForValue(0));
            ctx.strokeStyle = c.color + '88';
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, rx, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();

        // Word labels
        ctx.save();
        ctx.font = '13px Arial, Helvetica, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        for (const name in clusters) {
            ctx.fillStyle = '#263238';
            for (const w of clusters[name].words) {
                const px = x.getPixelForValue(w.x);
                const py = y.getPixelForValue(w.y);
                ctx.fillText(w.label, px + 9, py);
            }
        }
        ctx.restore();

        // king -> queen "gender" relationship arrow
        const king = clusters.Royalty.words.find(w => w.label === 'king');
        const queen = clusters.Royalty.words.find(w => w.label === 'queen');
        if (king && queen) {
            const x1 = x.getPixelForValue(king.x), y1 = y.getPixelForValue(king.y);
            const x2 = x.getPixelForValue(queen.x), y2 = y.getPixelForValue(queen.y);
            ctx.save();
            ctx.strokeStyle = '#c2185b';
            ctx.fillStyle = '#c2185b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            // arrowhead
            const ang = Math.atan2(y2 - y1, x2 - x1);
            const ah = 8;
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - ah * Math.cos(ang - 0.4), y2 - ah * Math.sin(ang - 0.4));
            ctx.lineTo(x2 - ah * Math.cos(ang + 0.4), y2 - ah * Math.sin(ang + 0.4));
            ctx.closePath();
            ctx.fill();
            // label
            ctx.font = 'italic 12px Arial, Helvetica, sans-serif';
            ctx.fillStyle = '#c2185b';
            ctx.textAlign = 'center';
            ctx.fillText('gender', (x1 + x2) / 2, (y1 + y2) / 2 - 10);
            ctx.restore();
        }
    }
};

const ctx = document.getElementById('embeddingChart').getContext('2d');
new Chart(ctx, {
    type: 'scatter',
    data: { datasets },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { right: 18, top: 8 } },
        plugins: {
            title: {
                display: true,
                text: 'Word Embeddings Capture Semantic Similarity Through Spatial Proximity',
                font: { size: 15 },
                color: '#1a3a6c'
            },
            legend: { position: 'top', labels: { usePointStyle: true, font: { size: 13 } } },
            tooltip: {
                callbacks: {
                    label: (c) => c.raw.label + '  (' + c.dataset.label + ')'
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                min: 0, max: 10,
                title: { display: true, text: 'Dimension 1 (semantic feature space)', font: { size: 13 } },
                ticks: { display: false },
                grid: { color: '#eceff1' }
            },
            y: {
                type: 'linear',
                min: 0, max: 10,
                title: { display: true, text: 'Dimension 2 (semantic feature space)', font: { size: 13 } },
                ticks: { display: false },
                grid: { color: '#eceff1' }
            }
        }
    },
    plugins: [annotationPlugin]
});
