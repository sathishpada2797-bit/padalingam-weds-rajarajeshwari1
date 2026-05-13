// =====================
// COUNTDOWN TIMER
// =====================
function updateCountdown() {
  const target = new Date('2026-06-07T07:30:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-days').textContent  = String(d).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =====================
// WISHES
// =====================
const wishes = [];

function sendWish() {
  const nameEl = document.getElementById('wish-name');
  const textEl = document.getElementById('wish-text');
  const name = nameEl.value.trim();
  const text = textEl.value.trim();

  if (!name || !text) {
    if (!name) nameEl.style.borderColor = 'rgba(201,100,89,0.6)';
    if (!text) textEl.style.borderColor = 'rgba(201,100,89,0.6)';
    setTimeout(() => {
      nameEl.style.borderColor = '';
      textEl.style.borderColor = '';
    }, 1500);
    return;
  }

  wishes.unshift({ name, text });
  nameEl.value = '';
  textEl.value = '';
  renderWishes();
}

function renderWishes() {
  const list = document.getElementById('wishes-list');
  if (wishes.length === 0) {
    list.innerHTML = '<p class="wish-empty">Be the first to send a wish 🌸</p>';
    return;
  }
  list.innerHTML = wishes.map(w => `
    <div class="wish-item">
      <div class="wish-from">${escapeHtml(w.name)}</div>
      <div class="wish-text">"${escapeHtml(w.text)}"</div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Allow Enter key on name field to move to message
document.getElementById('wish-name').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('wish-text').focus();
  }
});

// =====================
// SCROLL FADE-IN
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});
