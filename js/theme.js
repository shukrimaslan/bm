// ── theme.js — dark mode manager ────────────────────────────────
// Usage: import { initTheme, toggleTheme, getTheme } from './theme.js';
// Call initTheme() at top of every page's <script type="module">

export function getTheme() {
  return localStorage.getItem('bmvocab_theme') || 'light';
}

export function setTheme(theme) {
  localStorage.setItem('bmvocab_theme', theme);
  applyTheme(theme);
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getTheme());
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
