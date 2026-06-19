// Chat Interface Anatomy
// An annotated chat-UI mockup. Twelve numbered markers map to component
// descriptions, design rationale, and best practices shown in the side panel.
// CANVAS_HEIGHT: 560

(function () {
  'use strict';

  // Component data keyed by callout number. cat = category color class.
  const COMPONENTS = {
    1: { cat: 'orange', title: 'Header Bar',
      anno: 'Persistent header provides context and controls.',
      bp: ['Bot name clearly identifies the conversation partner',
           'Green dot indicates online / available status',
           'Menu (hamburger) accesses settings, history, and help'] },
    2: { cat: 'gray', title: 'Bot Avatar',
      anno: 'Consistent visual identity builds familiarity.',
      bp: ['Use the same 32x32px avatar throughout the conversation',
           'Choose a meaningful icon, not a generic gear or robot',
           'Position consistently: left for bot, right for user'] },
    3: { cat: 'gray', title: 'Bot Message Bubble',
      anno: 'Left alignment plus a neutral color signals a bot message.',
      bp: ['Max width 280-320px (60-70 characters per line)',
           'Border radius ~16px for a friendly aesthetic',
           'Light gray background for low visual weight'] },
    4: { cat: 'blue', title: 'User Message Bubble',
      anno: 'Right alignment plus the brand color signals a user message.',
      bp: ['Same max width as the bot bubble for visual consistency',
           'Brand primary color as the background',
           'White text for sufficient contrast'] },
    5: { cat: 'orange', title: 'Timestamp',
      anno: 'Sparse timestamps reduce clutter.',
      bp: ['Show once per temporal group of 3-5 messages',
           'Relative time ("Just now", "5 min ago") for recent messages',
           'Absolute time ("2:34 PM") for older messages'] },
    6: { cat: 'gray', title: 'Typing Indicator',
      anno: 'Manages user expectations about latency.',
      bp: ['Appears after a ~500ms delay to avoid flicker',
           'Smooth fade-in / fade-out animation',
           'Disappears the moment the real message arrives'] },
    7: { cat: 'blue', title: 'Quick Reply Buttons',
      anno: 'Reduces typing and guides the conversation.',
      bp: ['Offer at most 3-4 options to avoid overwhelm',
           'Use concise labels of 2-4 words',
           'Hide them once the user selects one'] },
    8: { cat: 'green', title: 'Feedback Buttons',
      anno: 'Contextual feedback improves future responses.',
      bp: ['Small and unobtrusive (about 16x16px)',
           'Appear on hover/focus; always visible on mobile',
           'Give visual confirmation when clicked'] },
    9: { cat: 'orange', title: 'Scroll Container',
      anno: 'Handles conversation history gracefully.',
      bp: ['Auto-scroll to bottom when a new message arrives',
           'Show a "scroll to bottom" button if the user scrolled up',
           'Preserve scroll position on reload'] },
    10: { cat: 'blue', title: 'Input Field',
      anno: 'The primary user action point.',
      bp: ['Auto-expand up to 4 lines as the user types',
           'Placeholder: "Type a message..." (not "Ask me anything")',
           'Disable send when the field is empty'] },
    11: { cat: 'blue', title: 'Send Button',
      anno: 'An explicit submit action.',
      bp: ['Also triggered by Enter (Shift+Enter inserts a newline)',
           'Show a loading state while the message sends',
           'Disabled state when the input is empty'] },
    12: { cat: 'blue', title: 'Attachment Button',
      anno: 'Enables file or image upload (optional).',
      bp: ['Clearly communicate file type and size limits',
           'Show upload progress',
           'Preview the attachment before sending'] }
  };

  // Build the phone mockup with inline numbered markers.
  function buildMockup() {
    const col = document.getElementById('phonecol');
    col.innerHTML =
      '<div class="phone">' +
        // header (1) avatar within header is (1) too; menu marker
        '<div class="hdr">' +
          '<span class="av">🤖</span>' +
          '<div><div class="nm">SupportBot ' + pin(1) + '</div>' +
          '<div class="st"><span class="dot"></span>Online</div></div>' +
          '<span class="menu">&#9776;</span>' +
        '</div>' +

        '<div class="msgs">' +
          '<div class="ts">Today 2:30 PM ' + pin(5) + '</div>' +

          // bot message row: avatar (2) + bubble (3)
          '<div class="row">' +
            '<span class="botav">🤖</span>' + pinAbsWrapStart() +
            '<span class="bubble bot">Hi! I can help track an order or reset a password. ' +
            'What do you need? ' + pin(3) + '</span>' +
          '</div>' +
          '<div class="fb">👍 👎 ' + pin(8) + '</div>' +

          // quick replies (7)
          '<div class="quick"><span class="chip">Track order</span>' +
          '<span class="chip">Reset password</span> ' + pin(7) + '</div>' +

          // user message (4)
          '<div class="row user"><span class="bubble user">Track my order ' + pin(4) + '</span></div>' +

          // typing indicator (6)
          '<div class="row"><span class="botav">🤖</span>' +
            '<span class="bubble bot typing">' +
            '<span></span><span></span><span></span></span> ' + pin(6) +
          '</div>' +
        '</div>' +    // .msgs gets scroll-container pin (9) added below

        // input bar: attachment (12), input (10), send (11)
        '<div class="inputbar">' +
          '<span class="att">📎</span>' + pin(12) +
          '<input type="text" placeholder="Type a message..." readonly>' + pin(10) +
          '<span class="send">➤</span>' + pin(11) +
        '</div>' +
      '</div>';

    // The .msgs scroll container marker (9): pin it to the right edge of .msgs
    const msgs = col.querySelector('.msgs');
    msgs.style.position = 'relative';
    const p9 = document.createElement('span');
    p9.className = 'pin cat-orange pinabs';
    p9.style.right = '4px'; p9.style.top = '6px';
    p9.dataset.num = '9'; p9.textContent = '9';
    msgs.appendChild(p9);

    // wire all pins
    col.querySelectorAll('.pin').forEach(p => {
      p.classList.add('cat-' + (COMPONENTS[p.dataset.num].cat));
      p.addEventListener('click', () => select(p.dataset.num));
      p.addEventListener('mouseenter', () => show(p.dataset.num));
    });
  }

  function pin(n) {
    return '<span class="pin" data-num="' + n + '">' + n + '</span>';
  }
  // (kept simple — no absolute wrap needed in this layout)
  function pinAbsWrapStart() { return ''; }

  function select(n) {
    document.querySelectorAll('.pin').forEach(p =>
      p.classList.toggle('sel', p.dataset.num === String(n)));
    show(n);
  }

  function show(n) {
    const c = COMPONENTS[n];
    if (!c) return;
    document.getElementById('cardNum').textContent = n;
    document.getElementById('cardNum').className = '';
    document.getElementById('cardNum').setAttribute('id', 'cardNum');
    document.getElementById('cardTitleText').textContent = c.title;
    document.getElementById('cardAnno').textContent = c.anno;
    let html = '<b>Best practices:</b><ul>';
    c.bp.forEach(b => { html += '<li>' + b + '</li>'; });
    html += '</ul>';
    document.getElementById('cardBP').innerHTML = html;
    // color the number badge to match category
    const colors = { blue: '#1976d2', gray: '#607d8b', green: '#2e9e5b', orange: '#f57c00' };
    document.getElementById('cardNum').style.background = colors[c.cat];
  }

  function init() {
    buildMockup();
    select(1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
