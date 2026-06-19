// CANVAS_HEIGHT: 430
// Latency Waterfall Visualization - Chart.js horizontal stacked bar chart that
// breaks a chatbot response into its latency components and contrasts a fast
// template query with a slow RAG + LLM query. Custom tooltips show exact and
// cumulative timings; annotations mark user-expectation and abandonment zones.

// Color scheme: blue = intent, green family = retrieval, orange = LLM, purple = formatting.
const C = {
    intent:   'rgba(54, 162, 235, 0.85)',
    template: 'rgba(34, 197, 94, 0.85)',
    context:  'rgba(22, 163, 74, 0.85)',
    vector:   'rgba(74, 222, 128, 0.85)',
    llm:      'rgba(249, 115, 22, 0.85)',
    format:   'rgba(147, 51, 234, 0.85)'
};

// Row 0 = Simple Query, Row 1 = Complex Query.
const data = {
    labels: [['Simple Query', '(Template)'], ['Complex Query', '(RAG + LLM)']],
    datasets: [
        { label: 'Intent Classification', data: [100, 150], backgroundColor: C.intent,   borderWidth: 1 },
        { label: 'Template Selection',    data: [50, 0],    backgroundColor: C.template,  borderWidth: 1 },
        { label: 'Context Retrieval',     data: [0, 300],   backgroundColor: C.context,   borderWidth: 1 },
        { label: 'Vector Search',         data: [0, 600],   backgroundColor: C.vector,    borderWidth: 1 },
        { label: 'LLM Generation',        data: [0, 5000],  backgroundColor: C.llm,       borderWidth: 1 },
        { label: 'Response Formatting',   data: [30, 50],   backgroundColor: C.format,    borderWidth: 1 }
    ]
};

const ctx = document.getElementById('latencyChart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        const value = context.parsed.x || 0;
                        if (value <= 0) return null;
                        let cumulative = 0;
                        for (let i = 0; i <= context.datasetIndex; i++) {
                            cumulative += data.datasets[i].data[context.dataIndex] || 0;
                        }
                        return `${context.dataset.label}: ${value}ms (ends at ${cumulative}ms)`;
                    },
                    footer: function(items) {
                        if (!items.length) return '';
                        const di = items[0].dataIndex;
                        let total = 0;
                        data.datasets.forEach(d => total += d.data[di] || 0);
                        return `Total: ${total}ms`;
                    }
                },
                backgroundColor: 'rgba(0,0,0,0.9)', padding: 10,
                titleFont: { size: 13, weight: 'bold' }, bodyFont: { size: 12 },
                footerFont: { size: 13, weight: 'bold' }
            },
            annotation: {
                annotations: {
                    expectation: {
                        type: 'line', xMin: 2000, xMax: 2000,
                        borderColor: 'rgba(202, 138, 4, 0.95)', borderWidth: 2, borderDash: [8, 4],
                        label: { display: true, content: 'User expectation (2s)', position: 'start',
                                 backgroundColor: 'rgba(202, 138, 4, 0.95)', color: '#fff',
                                 font: { size: 11, weight: 'bold' }, padding: 5, yAdjust: -12 }
                    },
                    abandonment: {
                        type: 'line', xMin: 5000, xMax: 5000,
                        borderColor: 'rgba(220, 38, 38, 0.95)', borderWidth: 2, borderDash: [8, 4],
                        label: { display: true, content: 'Abandonment risk (5s)', position: 'start',
                                 backgroundColor: 'rgba(220, 38, 38, 0.95)', color: '#fff',
                                 font: { size: 11, weight: 'bold' }, padding: 5, yAdjust: -12 }
                    },
                    llmShare: {
                        type: 'label', xValue: 3550, yValue: 1,
                        content: ['82% of total latency'],
                        backgroundColor: 'rgba(249, 115, 22, 0.95)', color: '#fff',
                        font: { size: 12, weight: 'bold' }, padding: 6, borderRadius: 4,
                        callout: { display: true, side: 8 }
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true, min: 0, max: 6500,
                title: { display: true, text: 'Time (milliseconds)', font: { size: 13, weight: 'bold' } },
                ticks: { callback: v => v.toLocaleString() + 'ms', font: { size: 11 } },
                grid: { color: 'rgba(0,0,0,0.08)' }
            },
            y: {
                stacked: true,
                ticks: { font: { size: 12, weight: 'bold' } },
                grid: { display: false }
            }
        },
        animation: { duration: 1400, easing: 'easeInOutQuart' }
    }
});
