const API_URL = 'http://localhost:5000/api';

// Newsletter subscription
document.getElementById('newsletter-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  const language = document.documentElement.lang === 'es' ? 'es' : 'en';
  const message = document.getElementById('newsletter-message');

  try {
    const res = await fetch(`${API_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, language })
    });

    const data = await res.json();
    message.textContent = data.message || data.error;
    message.className = 'message ' + (res.ok ? 'success' : 'error');

    if (res.ok) {
      document.getElementById('newsletter-form').reset();
    }
  } catch (err) {
    message.textContent = 'Error subscribing. Try again.';
    message.className = 'message error';
  }
});

// Feedback submission
document.getElementById('feedback-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const chapterId = document.getElementById('chapter-id')?.value;
  const email = prompt('Enter your email for feedback:');

  if (!email) return;

  try {
    const res = await fetch(`${API_URL}/feedback/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chapter_id: parseInt(chapterId),
        email,
        feedback_text: document.getElementById('feedback-text').value,
        rating: parseInt(document.getElementById('feedback-rating').value)
      })
    });

    const data = await res.json();
    const message = document.getElementById('feedback-message');
    message.textContent = data.message || data.error;
    message.className = 'message ' + (res.ok ? 'success' : 'error');

    if (res.ok) {
      document.getElementById('feedback-form').reset();
    }
  } catch (err) {
    document.getElementById('feedback-message').textContent = 'Error submitting feedback.';
    document.getElementById('feedback-message').className = 'message error';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // determine saved preference or system preference
  const saved = (() => {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');

  const apply = (theme) => {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      if (toggle) { toggle.textContent = '☀️'; toggle.setAttribute('aria-pressed','true'); }
    } else {
      html.removeAttribute('data-theme');
      if (toggle) { toggle.textContent = '🌙'; toggle.setAttribute('aria-pressed','false'); }
    }
  };

  apply(initial);

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  });
});