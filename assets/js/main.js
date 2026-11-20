document.getElementById('yr').textContent = new Date().getFullYear();

// Terminal typing animation (content comes from _data/profile.yml → terminal)
const term = document.getElementById('term');
const lines = window.TERMINAL || [];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => reduce ? Promise.resolve() : new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

(async function type() {
  let html = '';
  const render = () => { term.innerHTML = html + '<span class="cursor"></span>'; };
  for (const { cmd, out } of lines) {
    html += '<span class="p">$ </span>';
    for (const ch of esc(cmd)) { html += ch; render(); await wait(55); }
    await wait(300);
    html += '\n' + esc((out || '').trim()) + '\n';
    render();
    await wait(450);
  }
})();

// Fade sections in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));