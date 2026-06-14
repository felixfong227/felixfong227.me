import { test, expect } from '@playwright/test';

test('renders title and headline', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Felix Fong/);
  await expect(page.locator('#name')).toHaveText('Felix Fong');
});

test('social links point to the right places', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="https://github.com/felixfong227"]')).toBeVisible();
  await expect(page.locator('a[href="https://linkedin.com/in/felixfong227"]')).toBeVisible();
});

test('profile image is rendered via <picture>', async ({ page }) => {
  await page.goto('/');
  const pic = page.locator('picture img#profile_picture');
  await expect(pic).toBeVisible();
});

test('wave rails have different heights matching wave shape', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const left = await page
    .locator('.rail-left')
    .evaluate((el) => el.getBoundingClientRect().height);
  const right = await page
    .locator('.rail-right')
    .evaluate((el) => el.getBoundingClientRect().height);
  expect(left).toBeGreaterThan(0);
  expect(right).toBeGreaterThan(left);
  expect(right / left).toBeGreaterThan(2);
  expect(right / left).toBeLessThan(3);
});
