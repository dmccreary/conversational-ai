// Global variables
let models = [];
let publisherColors = {};
let metricLabels = {};
let metricKeys = {};
let chart;

// Load data and initialize chart
async function init() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        models = data.models;
        publisherColors = data.publisherColors;
        metricLabels = data.metricLabels;
        metricKeys = data.metricKeys;

        createChart();

        // Add event listeners
        document.getElementById('metric').addEventListener('change', updateChart);
        document.getElementById('modelType').addEventListener('change', updateChart);
        document.getElementById('benchmark').addEventListener('change', updateChart);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function getFilteredData(metric, modelType, benchmark) {
    const key = metricKeys[metric];
    let filtered = models;

    // Filter by model type
    if (modelType === 'closed') {
        filtered = filtered.filter(m => m.type === 'closed');
    } else if (modelType === 'open') {
        filtered = filtered.filter(m => m.type === 'open');
    }

    // Filter by benchmark
    if (benchmark === 't2kgb') {
        filtered = filtered.filter(m => m.benchmark === 't2kgb');
    } else if (benchmark === 'lettria') {
        filtered = filtered.filter(m => m.benchmark === 'lettria');
    }

    // Filter out models without data for this metric
    filtered = filtered.filter(m => m[key] !== null);

    // Group by publisher and type for separate datasets
    const datasets = [];
    const publishers = [...new Set(filtered.map(m => m.publisher))];

    publishers.forEach(publisher => {
        const closedModels = filtered.filter(m => m.publisher === publisher && m.type === 'closed');
        const openModels = filtered.filter(m => m.publisher === publisher && m.type === 'open');

        if (closedModels.length > 0) {
            datasets.push({
                label: `${publisher} (Closed)`,
                data: closedModels.map(m => ({
                    x: new Date(m.date),
                    y: m[key],
                    model: m
                })),
                backgroundColor: m => {
                    const model = closedModels.find(cm => cm.name === m.raw?.model?.name);
                    return model?.estimated ? 'rgba(217, 119, 6, 0.4)' : publisherColors[publisher];
                },
                borderColor: publisherColors[publisher],
                borderWidth: m => {
                    const model = closedModels.find(cm => cm.name === m.raw?.model?.name);
                    return model?.estimated ? 2 : 0;
                },
                borderDash: m => {
                    const model = closedModels.find(cm => cm.name === m.raw?.model?.name);
                    return model?.estimated ? [5, 5] : [];
                },
                pointStyle: closedModels.map(m => m.estimated ? 'rectRot' : 'circle'),
                pointRadius: closedModels.map(m => m.estimated ? 10 : 8),
                pointHoverRadius: 11,
                showLine: false
            });
        }

        if (openModels.length > 0) {
            datasets.push({
                label: `${publisher} (Open)`,
                data: openModels.map(m => ({
                    x: new Date(m.date),
                    y: m[key],
                    model: m
                })),
                backgroundColor: publisherColors[publisher],
                borderColor: publisherColors[publisher],
                pointStyle: 'triangle',
                pointRadius: 9,
                pointHoverRadius: 12,
                showLine: false
            });
        }
    });

    return datasets;
}

function createChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    const metric = document.getElementById('metric').value;
    const modelType = document.getElementById('modelType').value;
    const benchmark = document.getElementById('benchmark').value;

    const config = {
        type: 'scatter',
        data: {
            datasets: getFilteredData(metric, modelType, benchmark)
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: true
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 11 },
                    padding: 12,
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            const model = context[0].raw.model;
                            return model.name + (model.estimated ? ' (Estimated)' : '');
                        },
                        label: function(context) {
                            const model = context.raw.model;
                            const lines = [
                                `Publisher: ${model.publisher}`,
                                `Type: ${model.type === 'closed' ? 'Closed/Proprietary' : 'Open-Weights'}`,
                                `Release: ${model.date}`,
                                `Benchmark: ${model.benchmark === 't2kgb' ? 'Text2KGBench' : 'Text2KGBench-LettrIA'}`,
                                ``
                            ];

                            if (model.overall !== null) {
                                lines.push(`Overall F1: ${model.overall.toFixed(4)}`);
                            }
                            if (model.E !== null) {
                                lines.push(`Entities F1: ${model.E.toFixed(4)}`);
                            }
                            if (model.A !== null) {
                                lines.push(`Attributes F1: ${model.A.toFixed(4)}`);
                            }
                            if (model.P !== null) {
                                lines.push(`Properties F1: ${model.P.toFixed(4)}`);
                            }
                            if (model.R !== null) {
                                lines.push(`Relations F1: ${model.R.toFixed(4)}`);
                            }

                            return lines;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'quarter',
                        displayFormats: {
                            quarter: 'MMM yyyy'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Model Release Date',
                        font: { size: 12, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    min: '2023-01-01',
                    max: '2026-01-01'
                },
                y: {
                    title: {
                        display: true,
                        text: metricLabels[metric],
                        font: { size: 12, weight: 'bold' }
                    },
                    min: 0,
                    max: 1,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    }
                }
            }
        }
    };

    chart = new Chart(ctx, config);
}

function updateChart() {
    const metric = document.getElementById('metric').value;
    const modelType = document.getElementById('modelType').value;
    const benchmark = document.getElementById('benchmark').value;

    chart.data.datasets = getFilteredData(metric, modelType, benchmark);
    chart.options.scales.y.title.text = metricLabels[metric];
    chart.update();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
