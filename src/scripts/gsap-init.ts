import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.noise-overlay', { opacity: 0 }, { opacity: 'var(--noise-opacity)', duration: 0.3 })
      .fromTo('.site-nav', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.1')
      .fromTo('.hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');

    return () => {
      tl.kill();
    };
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.site-nav', { y: 0, opacity: 1 });
    gsap.set('.hero-content', { opacity: 1, y: 0 });
  });
}
