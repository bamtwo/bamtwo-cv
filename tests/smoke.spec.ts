import { test, expect } from '@playwright/test';

const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'lab', 'education', 'speaking', 'contact'];

test('homepage loads with 200 status', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
});

test('all section IDs present', async ({ page }) => {
  await page.goto('/');
  for (const id of sections) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test('navigation links point to valid sections', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('.nav-links-desktop a, .mobile-overlay-inner a');
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    if (href?.startsWith('#')) {
      await expect(page.locator(href)).toBeAttached();
    }
  }
});

test('no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto('/');
  expect(errors).toEqual([]);
});

test('theme toggle works', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const toggle = page.locator('[data-theme-toggle]');

  const initialTheme = await html.getAttribute('data-theme');
  await toggle.click();
  await page.waitForTimeout(600);
  const newTheme = await html.getAttribute('data-theme');
  expect(newTheme).not.toBe(initialTheme);

  const stored = await page.evaluate(() => localStorage.getItem('theme'));
  expect(stored).toBe(newTheme);
});

test('favicon loads', async ({ page }) => {
  await page.goto('/');
  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toBeAttached();
});

test('mobile menu toggles at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const btn = page.locator('[data-mobile-menu-toggle]');
  const overlay = page.locator('[data-mobile-overlay]');
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(overlay).toHaveClass(/open/);
});
