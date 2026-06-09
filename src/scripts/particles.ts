interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const particles: Particle[] = [];
  const count = 80;
  let mouseX = -1000;
  let mouseY = -1000;
  let width = 0;
  let height = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    ctx!.scale(devicePixelRatio, devicePixelRatio);
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }
  }

  function getStyle(prop: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const particleColor = getStyle('--accent-primary') || '#00E5FF';
    const edgeColor = getStyle('--accent-secondary') || '#00FF94';
    const glowColor = getStyle('--glow-primary') || 'rgba(0,229,255,0.15)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 200 && mouseX > -500) {
        const force = (200 - dist) / 200;
        p.vx -= (dx * force) * 0.005;
        p.vy -= (dy * force) * 0.005;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.vy *= 0.99;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();

      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 8;

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = edgeColor;
          ctx.globalAlpha = 1 - d / 120;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  canvas.parentElement?.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  canvas.parentElement?.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  draw();
}
