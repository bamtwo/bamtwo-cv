export function initScramble(element: HTMLElement) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.!#$%&';
  const final = element.getAttribute('data-email') || element.textContent || '';
  let interval: ReturnType<typeof setInterval> | null = null;

  element.addEventListener('mouseenter', () => {
    let iteration = 0;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      element.textContent = final
        .split('')
        .map((char, idx) => {
          if (idx < iteration) return final[idx];
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iteration += 1 / 3;

      if (iteration >= final.length) {
        if (interval) clearInterval(interval);
        element.textContent = final;
      }
    }, 40);
  });

  element.addEventListener('mouseleave', () => {
    if (interval) clearInterval(interval);
    element.textContent = final;
  });
}
