// User Context Data Model
// A vis-network graph showing the data model for personalized chatbot context:
// a central User connected to Profile, Preferences, History, and Sessions, with
// Sessions holding Queries, Preferences holding Settings, and History holding
// Behavioral Patterns.
// CANVAS_HEIGHT: 640

(function () {
  'use strict';

  // ---- color palette by node group ----
  const GROUP = {
    user:       { background: '#7b3fb5', border: '#4a148c', font: '#fff' },
    profile:    { background: '#ec407a', border: '#ad1457', font: '#fff' },
    preferences:{ background: '#42a5f5', border: '#1565c0', font: '#fff' },
    history:    { background: '#2e9e5b', border: '#1b5e20', font: '#fff' },
    session:    { background: '#fb8c00', border: '#e65100', font: '#fff' },
    query:      { background: '#90a4ae', border: '#546e7a', font: '#fff' },
    setting:    { background: '#90caf9', border: '#1976d2', font: '#0d2a4a' },
    pattern:    { background: '#a5d6a7', border: '#2e7d32', font: '#0d2a12' }
  };

  // properties shown in the info panel when a node is clicked/hovered
  const nodeData = [
    { id: 'user', label: 'Alice Chen', group: 'user', x: 0, y: 0, size: 28,
      props: 'User\nuser_id: u_8842\nname: Alice Chen\nemail: alice@company.com' },

    { id: 'profile', label: 'User Profile', group: 'profile', x: -250, y: -120,
      props: 'User Profile\nrole: Product Manager\ndepartment: Engineering\nlocation: San Francisco\nlanguage: en-US\npermissions: [read:analytics, write:feedback]' },
    { id: 'prefs', label: 'User Preferences', group: 'preferences', x: 250, y: -120,
      props: 'User Preferences\nverbosity: detailed\nformality: casual\nnotification_email: true\ndefault_scope: my_team' },
    { id: 'history', label: 'User History', group: 'history', x: -250, y: 130,
      props: 'User History\ntotal_queries: 342\ncommon_intents: [product_data, sales_reports]\navg_satisfaction: 4.2/5\nlast_active: today 14:30' },

    { id: 'sessA', label: 'Session A', group: 'session', x: 210, y: 120,
      props: 'Conversation Session\nsession_id: sess_2024_001\nstart_time: 10:05 AM\nactive_task: Q4 planning analysis' },
    { id: 'sessB', label: 'Session B', group: 'session', x: 360, y: 90,
      props: 'Conversation Session\nsession_id: sess_2024_002\nstart_time: 2:30 PM\nactive_task: Customer feedback review' },

    { id: 'q1', label: 'Q1', group: 'query', x: 130, y: 220, size: 11,
      props: 'Query\nquery_text: "Show Q3 revenue breakdown"\nintent: data_retrieval\nsatisfaction_score: 5' },
    { id: 'q2', label: 'Q2', group: 'query', x: 250, y: 240, size: 11,
      props: 'Query\nquery_text: "Compare to Q2"\nintent: comparison\nsatisfaction_score: 4' },
    { id: 'q3', label: 'Q3', group: 'query', x: 360, y: 210, size: 11,
      props: 'Query\nquery_text: "Project Q4 based on trends"\nintent: forecast\nsatisfaction_score: 5' },
    { id: 'q4', label: 'Q4', group: 'query', x: 460, y: 110, size: 11,
      props: 'Query\nquery_text: "Summarize feedback for Product X"\nintent: summarization\nsatisfaction_score: 4' },

    { id: 'set1', label: 'format', group: 'setting', x: 400, y: -150, size: 11,
      props: 'Preference Setting\nsetting_name: response_format\nsetting_value: tables\nupdated_at: 2024-10-02' },
    { id: 'set2', label: 'tz', group: 'setting', x: 320, y: -210, size: 11,
      props: 'Preference Setting\nsetting_name: time_zone\nsetting_value: America/Los_Angeles\nupdated_at: 2024-09-15' },

    { id: 'pat1', label: 'briefing', group: 'pattern', x: -430, y: 90, size: 11,
      props: 'Behavioral Pattern\npattern_type: morning_briefing\nfrequency: 0.85\nconfidence: 0.92' },
    { id: 'pat2', label: 'QoQ', group: 'pattern', x: -410, y: 210, size: 11,
      props: 'Behavioral Pattern\npattern_type: quarter_comparison\nfrequency: 0.71\nconfidence: 0.88' }
  ];

  // edges with relationship labels and styles
  const edgeData = [
    { from: 'user', to: 'profile', label: 'HAS_PROFILE', width: 4 },
    { from: 'user', to: 'prefs', label: 'HAS_PREFERENCES', width: 4 },
    { from: 'user', to: 'history', label: 'HAS_HISTORY', width: 4 },
    { from: 'user', to: 'sessA', label: 'INITIATED', width: 2 },
    { from: 'user', to: 'sessB', label: 'INITIATED', width: 2 },
    { from: 'sessA', to: 'q1', label: 'CONTAINS', width: 1 },
    { from: 'sessA', to: 'q2', label: 'CONTAINS', width: 1 },
    { from: 'sessA', to: 'q3', label: 'CONTAINS', width: 1 },
    { from: 'sessB', to: 'q4', label: 'CONTAINS', width: 1 },
    { from: 'prefs', to: 'set1', label: 'CONFIGURED_BY', width: 1, dashes: true },
    { from: 'prefs', to: 'set2', label: 'CONFIGURED_BY', width: 1, dashes: true },
    { from: 'history', to: 'pat1', label: 'EXHIBITS', width: 1, dashes: true },
    { from: 'history', to: 'pat2', label: 'EXHIBITS', width: 1, dashes: true }
  ];

  // which group each node belongs to a filter toggle ('session' covers queries)
  function filterKey(node) {
    if (node.group === 'session' || node.group === 'query') return 'session';
    if (node.group === 'setting') return 'setting';
    if (node.group === 'pattern') return 'pattern';
    return null; // always-on
  }

  let network, nodes, edges;
  const allNodes = {};

  function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
  }

  function buildNodes() {
    return nodeData.map(n => {
      allNodes[n.id] = n;
      const c = GROUP[n.group];
      return {
        id: n.id, label: n.label, x: n.x, y: n.y, fixed: false,
        shape: (n.group === 'user') ? 'ellipse' : 'box',
        size: n.size || 18,
        color: { background: c.background, border: c.border,
                 highlight: { background: c.background, border: 'gold' } },
        font: { color: c.font, size: n.group === 'user' ? 18 : 14, face: 'Arial' },
        borderWidth: n.group === 'user' ? 4 : 2,
        title: n.props.replace(/\n/g, '  •  ')
      };
    });
  }

  function buildEdges() {
    return edgeData.map((e, i) => ({
      id: 'e' + i, from: e.from, to: e.to, label: e.label,
      width: e.width, dashes: !!e.dashes,
      color: { color: '#90a0b0', highlight: 'gold' },
      font: { size: 10, color: '#445', strokeWidth: 3, strokeColor: '#fff', align: 'middle' },
      arrows: { to: { enabled: true, scaleFactor: 0.7 } },
      smooth: { type: 'continuous' }
    }));
  }

  function initNetwork() {
    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet(buildEdges());
    const enableMouse = !isInIframe();

    const options = {
      layout: { improvedLayout: false },
      physics: { enabled: false },
      interaction: {
        selectConnectedEdges: true,
        zoomView: enableMouse,
        dragView: enableMouse,
        dragNodes: false,
        navigationButtons: true,
        keyboard: { enabled: false },
        hover: true,
        tooltipDelay: 120
      },
      nodes: { shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 5, x: 2, y: 2 } },
      edges: {}
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // Fit the whole graph so nothing clips, then nudge right to clear the panel.
    network.once('afterDrawing', function () {
      network.fit({ animation: false });
      const scale = Math.min(network.getScale(), 0.9);
      const pos = network.getViewPosition();
      network.moveTo({ position: { x: pos.x + 30, y: pos.y }, scale: scale, animation: false });
    });

    network.on('click', function (params) {
      if (params.nodes.length > 0) {
        showInfo(params.nodes[0]);
      } else {
        document.getElementById('infoTitle').textContent = 'Click a node';
        document.getElementById('infoBody').textContent =
          'Hover a node to see its properties; click to highlight its connections.';
      }
    });
    network.on('hoverNode', function (params) { showInfo(params.node); });
  }

  function showInfo(id) {
    const n = allNodes[id];
    if (!n) return;
    const lines = n.props.split('\n');
    document.getElementById('infoTitle').textContent = lines[0];
    document.getElementById('infoBody').innerHTML =
      lines.slice(1).map(l => '<div>' + l + '</div>').join('');
  }

  function applyFilters() {
    const state = {};
    document.querySelectorAll('.ftog').forEach(cb => { state[cb.dataset.grp] = cb.checked; });
    nodeData.forEach(n => {
      const k = filterKey(n);
      const hidden = k && !state[k];
      nodes.update({ id: n.id, hidden: !!hidden });
    });
  }

  function init() {
    initNetwork();
    document.querySelectorAll('.ftog').forEach(cb =>
      cb.addEventListener('change', applyFilters));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
