export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  const style = document.createElement('style');
  style.textContent = `
    .cursor-dot {
      position: fixed; z-index: 999; pointer-events: none;
      width: 6px; height: 6px; border-radius: 50%;
      background-color: var(--accent-primary);
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    }
    .cursor-ring {
      position: fixed; z-index: 998; pointer-events: none;
      width: 32px; height: 32px; border-radius: 50%;
      border: 1.5px solid var(--accent-primary);
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, border-color 0.2s;
      mix-blend-mode: difference;
    }
    .cursor-ring.hover {
      width: 48px; height: 48px;
      border-color: var(--accent-secondary);
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
  });

  const interactives = document.querySelectorAll('a, button, [data-interactive]');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  function animate() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}
