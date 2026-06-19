// Pareto Chart for Query Distribution
// A combined bar + line (Pareto) chart: query counts per intent as descending
// blue bars on the left axis, cumulative percentage as a red line on the right
// axis, with an 80% reference line and a shaded "critical 20%" focus zone.
// CANVAS_HEIGHT: 590

(function () {
  'use strict';

  // intent counts, already ordered by frequency (descending)
  const INTENTS = [
    { name: 'check_balance',  count: 12450 },
    { name: 'password_reset', count: 7120 },
    { name: 'track_order',    count: 4890 },
    { name: 'update_address', count: 3200 },
    { name: 'payment_method', count: 2780 },
    { name: 'refund_status',  count: 1940 },
    { name: 'product_specs',  count: 950 },
    { name: 'store_hours',    count: 720 },
    { name: 'other (10 more)', count: 4650 }
  ];

  const labels = INTENTS.map(i => i.name);
  const counts = INTENTS.map(i => i.count);
  const total = counts.reduce((a, b) => a + b, 0);

  // cumulative percentage
  let running = 0;
  const cumulative = counts.map(c => { running += c; return +(running / total * 100).toFixed(1); });

  // find the first intent where cumulative crosses 80%
  let crossIdx = cumulative.findIndex(p => p >= 80);
  if (crossIdx < 0) crossIdx = cumulative.length - 1;

  // blue gradient: darker for higher frequency. The long-tail "other" bar gray.
  function barColor(ctx) {
    const i = ctx.dataIndex;
    if (i === INTENTS.length - 1) return '#b0bec5'; // long-tail gray
    const t = i / (INTENTS.length - 2);             // 0..1
    const r = Math.round(13 + t * (144 - 13));
    const g = Math.round(71 + t * (202 - 71));
    const b = Math.round(161 + t * (249 - 161));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // ---- custom plugin: focus-zone shading + 80% reference lines + annotation ----
  const paretoPlugin = {
    id: 'paretoAnnotations',
    afterDatasetsDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      const xScale = scales.x;
      const yPct = scales.yPct;
      if (!xScale || !yPct) return;

      // shaded focus zone: left edge through the 80%-crossing bar
      const zoneRight = xScale.getPixelForValue(crossIdx) + xScale.width / labels.length / 2;
      ctx.save();
      ctx.fillStyle = 'rgba(76, 175, 80, 0.10)';
      ctx.fillRect(chartArea.left, chartArea.top, zoneRight - chartArea.left, chartArea.bottom - chartArea.top);

      // horizontal dashed 80% line
      const y80 = yPct.getPixelForValue(80);
      ctx.strokeStyle = '#9c27b0';
      ctx.setLineDash([6, 5]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(chartArea.left, y80);
      ctx.lineTo(chartArea.right, y80);
      ctx.stroke();

      // vertical dashed line at the 80% crossing
      const xCross = xScale.getPixelForValue(crossIdx);
      ctx.beginPath();
      ctx.moveTo(xCross, chartArea.top);
      ctx.lineTo(xCross, chartArea.bottom);
      ctx.stroke();
      ctx.setLineDash([]);

      // labels
      ctx.fillStyle = '#7b1fa2';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('80% threshold', chartArea.left + 6, y80 - 6);

      ctx.fillStyle = '#2e7d32';
      ctx.textAlign = 'center';
      ctx.fillText('Critical 20% (focus here)', (chartArea.left + zoneRight) / 2, chartArea.top + 16);

      // 80/20 callout near the inflection point
      ctx.fillStyle = '#c62828';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('80 / 20 rule', xCross + 8, chartArea.top + 40);
      ctx.restore();
    }
  };

  function init() {
    const ctx = document.getElementById('pareto').getContext('2d');
    new Chart(ctx, {
      data: {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Query count',
            data: counts,
            yAxisID: 'y',
            backgroundColor: barColor,
            borderColor: '#0d47a1',
            borderWidth: 1,
            order: 2
          },
          {
            type: 'line',
            label: 'Cumulative %',
            data: cumulative,
            yAxisID: 'yPct',
            borderColor: '#e53935',
            backgroundColor: '#e53935',
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#e53935',
            tension: 0.25,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { font: { size: 12 } } },
          tooltip: {
            callbacks: {
              afterBody: function (items) {
                const i = items[0].dataIndex;
                const pct = (counts[i] / total * 100).toFixed(1);
                return 'Share: ' + pct + '%  |  Cumulative: ' + cumulative[i] + '%';
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Intent types (ordered by frequency)', font: { size: 12 } },
            ticks: { maxRotation: 45, minRotation: 35, font: { size: 11 } },
            grid: { display: false }
          },
          y: {
            position: 'left',
            beginAtZero: true,
            title: { display: true, text: 'Query count', font: { size: 12 }, color: '#1565c0' },
            ticks: { color: '#1565c0' }
          },
          yPct: {
            position: 'right',
            beginAtZero: true,
            max: 100,
            title: { display: true, text: 'Cumulative percentage', font: { size: 12 }, color: '#e53935' },
            ticks: { color: '#e53935', callback: v => v + '%' },
            grid: { drawOnChartArea: false }
          }
        }
      },
      plugins: [paretoPlugin]
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
