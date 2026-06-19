// CANVAS_HEIGHT: 800
// Framework Comparison Matrix - Chart.js radar (spider) chart comparing five
// major chatbot frameworks across eight evaluation dimensions (0-10 scale).
// Semi-transparent filled areas let overlapping profiles be compared at a glance.

const dimensions = [
    'Deployment Flexibility',
    'Development Speed',
    'NLU Accuracy',
    'Customization Depth',
    'Enterprise Features',
    'Learning Curve',
    'LLM Integration',
    'Cost Efficiency'
];

// Scores ordered to match `dimensions` above. (LangChain "Learning Curve" was not
// supplied in the spec; set to 4 to reflect its well-known steep learning curve.)
const frameworks = [
    { name: 'Rasa',       color: '54, 162, 235',  data: [10, 4, 7, 10, 8, 3, 5, 8] },
    { name: 'Dialogflow', color: '34, 197, 94',   data: [2, 9, 9, 4, 9, 8, 6, 5] },
    { name: 'Botpress',   color: '249, 115, 22',  data: [7, 7, 6, 7, 7, 7, 5, 7] },
    { name: 'LangChain',  color: '147, 51, 234',  data: [9, 6, 8, 10, 5, 4, 10, 4] },
    { name: 'LlamaIndex', color: '212, 160, 23',  data: [9, 7, 8, 9, 6, 6, 10, 6] }
];

const datasets = frameworks.map(fw => ({
    label: fw.name,
    data: fw.data,
    backgroundColor: `rgba(${fw.color}, 0.12)`,
    borderColor: `rgba(${fw.color}, 1)`,
    pointBackgroundColor: `rgba(${fw.color}, 1)`,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: `rgba(${fw.color}, 1)`,
    borderWidth: 2,
    pointRadius: 3
}));

const ctx = document.getElementById('radarChart').getContext('2d');

new Chart(ctx, {
    type: 'radar',
    data: { labels: dimensions, datasets: datasets },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                labels: { font: { size: 13 }, usePointStyle: true, padding: 14 }
            },
            tooltip: {
                callbacks: {
                    label: (c) => `${c.dataset.label}: ${c.formattedValue} / 10`
                }
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                min: 0,
                max: 10,
                ticks: { stepSize: 2, font: { size: 10 }, backdropColor: 'rgba(255,255,255,0.7)' },
                pointLabels: { font: { size: 12 }, color: '#1f2937' },
                grid: { color: 'rgba(0,0,0,0.12)' },
                angleLines: { color: 'rgba(0,0,0,0.12)' }
            }
        }
    }
});
