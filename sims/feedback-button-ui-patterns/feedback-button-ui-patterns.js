// Feedback Button UI Patterns
// Four interactive panels demonstrating different ways to collect thumbs-up /
// thumbs-down (or graded) feedback on a chatbot response. Each panel is live:
// clicking the controls shows the real before/after state transition.
// CANVAS_HEIGHT: 620

(function () {
  'use strict';

  const RESPONSE = 'Your order #4821 shipped today and arrives Thursday.';

  function bubble() {
    return '<div class="bot"><span class="botav">🤖</span>' +
      '<span class="bubble">' + RESPONSE + '</span></div>';
  }

  function buildPanels() {
    const grid = document.getElementById('grid');

    // 1) Minimal pattern
    const p1 = panel('1. Minimal',
      'Icons only, bottom-right of the message',
      bubble() +
      '<div class="thumbs">' +
        '<span class="tbtn" data-dir="up">👍</span>' +
        '<span class="tbtn" data-dir="down">👎</span>' +
      '</div>' +
      '<div class="note">Neutral gray until clicked, then green (up) or red (down).</div>');

    // 2) Labeled pattern
    const p2 = panel('2. Labeled',
      'Text labels, centered below the bubble',
      bubble() +
      '<div class="labeled">' +
        '<button class="lbtn" data-dir="up">👍 Helpful</button>' +
        '<button class="lbtn" data-dir="down">👎 Not helpful</button>' +
      '</div>' +
      '<div class="note">Hover to see the subtle scale-up; click to commit.</div>');

    // 3) Follow-up pattern
    const p3 = panel('3. Follow-up',
      'Progressive disclosure after a thumbs-down',
      bubble() +
      '<div class="followup">' +
        '<div class="thumbs">' +
          '<span class="tbtn" data-dir="up">👍</span>' +
          '<span class="tbtn" data-dir="down">👎</span>' +
        '</div>' +
        '<div class="followBox" id="followBox">' +
          '<div style="font-size:12px;font-weight:bold;margin-bottom:6px;">What went wrong?</div>' +
          '<button class="opt" data-opt="Wrong answer">Wrong answer</button>' +
          '<button class="opt" data-opt="Too vague">Too vague</button>' +
          '<button class="opt" data-opt="Harmful/unsafe">Harmful / unsafe</button>' +
          '<button class="opt" data-opt="Other">Other (please explain)</button>' +
          '<textarea id="otherText" placeholder="Tell us more..."></textarea>' +
          '<button class="submit" id="fbSubmit">Submit</button>' +
          '<div class="thanks" id="fbThanks">Thanks — your feedback was recorded.</div>' +
        '</div>' +
      '</div>' +
      '<div class="note">Most actionable insight comes from this follow-up step.</div>');

    // 4) Emoji pattern
    const p4 = panel('4. Emoji scale',
      'A five-point gradient of satisfaction',
      bubble() +
      '<div class="emojis">' +
        ['😞','😐','😊','😍','🎉'].map((e,i) =>
          '<span class="emoji" data-val="' + (i+1) + '">' + e + '</span>').join('') +
      '</div>' +
      '<div class="note">The chosen emoji enlarges and gains full color.</div>');

    grid.appendChild(p1); grid.appendChild(p2);
    grid.appendChild(p3); grid.appendChild(p4);

    wireThumbs();
    wireFollowup();
    wireEmoji();
  }

  function panel(title, tag, inner) {
    const d = document.createElement('div');
    d.className = 'panel';
    d.innerHTML = '<h2>' + title + '</h2><div class="tag">' + tag + '</div>' + inner;
    return d;
  }

  // Generic thumbs handler for minimal + labeled + follow-up panels
  function wireThumbs() {
    document.querySelectorAll('.tbtn, .lbtn').forEach(btn => {
      btn.addEventListener('click', function () {
        const group = this.parentElement;
        const dir = this.dataset.dir;
        const isLabeled = this.classList.contains('lbtn');
        const upCls = isLabeled ? 'up-on' : 'up-on';
        const downCls = isLabeled ? 'down-on' : 'down-on';
        // clear siblings
        group.querySelectorAll('.tbtn, .lbtn').forEach(s => {
          s.classList.remove('up-on', 'down-on');
        });
        this.classList.add(dir === 'up' ? upCls : downCls);

        // if this is the follow-up panel, toggle the box
        const fb = document.getElementById('followBox');
        if (fb && group.parentElement && group.parentElement.classList.contains('followup')) {
          if (dir === 'down') {
            fb.classList.add('show');
          } else {
            fb.classList.remove('show');
            resetFollow();
          }
        }
      });
    });
  }

  function wireFollowup() {
    document.querySelectorAll('.followBox .opt').forEach(opt => {
      opt.addEventListener('click', function () {
        document.querySelectorAll('.followBox .opt').forEach(o => o.classList.remove('sel'));
        this.classList.add('sel');
        const ta = document.getElementById('otherText');
        if (this.dataset.opt === 'Other') ta.classList.add('show');
        else ta.classList.remove('show');
      });
    });
    const sub = document.getElementById('fbSubmit');
    if (sub) sub.addEventListener('click', function () {
      document.getElementById('fbThanks').classList.add('show');
    });
  }

  function resetFollow() {
    document.querySelectorAll('.followBox .opt').forEach(o => o.classList.remove('sel'));
    const ta = document.getElementById('otherText');
    if (ta) { ta.classList.remove('show'); ta.value = ''; }
    const th = document.getElementById('fbThanks');
    if (th) th.classList.remove('show');
  }

  function wireEmoji() {
    document.querySelectorAll('.emoji').forEach(em => {
      em.addEventListener('click', function () {
        document.querySelectorAll('.emoji').forEach(e => e.classList.remove('sel'));
        this.classList.add('sel');
      });
    });
  }

  function init() { buildPanels(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
