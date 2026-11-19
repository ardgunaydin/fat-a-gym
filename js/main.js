
(function () {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  function showTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // The button names the theme you will get by clicking it.
    button.textContent = theme === 'dark' ? 'Switch to Light' : 'Switch to Dark';
    button.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme');
  }

  showTheme(document.documentElement.getAttribute('data-theme') || 'dark');

  button.addEventListener('click', function () {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    showTheme(next);
    try { localStorage.setItem('fatagym-theme', next); } catch (e) {}
  });
})();