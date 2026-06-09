import { gsap } from 'gsap';

export function initTypewriter(element: HTMLElement) {
  const roles = [
    'Interdisciplinary Creative Technologist',
    'Systems Architect & Builder',
    'Explorer of Emergent Systems',
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    element.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  const chars: HTMLSpanElement[] = [];
  const text = roles[0];
  element.textContent = '';
  
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
    span.style.opacity = '0';
    element.appendChild(span);
    chars.push(span);
  }

  function typeIn() {
    const tl = gsap.timeline();
    tl.to(chars, { opacity: 1, duration: 0.03, stagger: 0.03, ease: 'none' });
    tl.to({}, { duration: 2 });
    tl.to(chars, { opacity: 0, duration: 0.02, stagger: 0.02, ease: 'none' });
    tl.call(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      const next = roles[roleIndex];
      chars.length = 0;
      element.textContent = '';
      for (let i = 0; i < next.length; i++) {
        const span = document.createElement('span');
        span.textContent = next[i] === ' ' ? '\u00A0' : next[i];
        span.style.opacity = '0';
        element.appendChild(span);
        chars.push(span);
      }
      typeIn();
    });
  }

  typeIn();
}
