let currentTheme: 'dark' | 'light';

export function initTheme() {
  const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  currentTheme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme, false);

  const toggleBtn = document.querySelector('[data-theme-toggle]');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, true);
      localStorage.setItem('theme', newTheme);
      currentTheme = newTheme;
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light', false);
      currentTheme = e.matches ? 'dark' : 'light';
    }
  });
}

function applyTheme(theme: 'dark' | 'light', animate: boolean) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (animate && !reducedMotion) {
    const toggleBtn = document.querySelector('[data-theme-toggle]');
    const rect = toggleBtn?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const radius = Math.hypot(window.innerWidth, window.innerHeight);

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9999; pointer-events: none;
      clip-path: circle(0 at ${cx}px ${cy}px);
      background: var(--base);
      transition: clip-path 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(${radius}px at ${cx}px ${cy}px)`;
    });

    overlay.addEventListener('transitionend', () => {
      document.documentElement.setAttribute('data-theme', theme);
      overlay.remove();
      dispatchThemeChange();
    });
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    dispatchThemeChange();
  }
}

function dispatchThemeChange() {
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: currentTheme } }));
}
