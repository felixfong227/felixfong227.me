import { test, expect } from '@playwright/test';

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 740 };

const name = (page) => page.getByRole('heading', { name: 'Felix Fong' });
const profile = (page) => page.getByAltText("Felix Fong's profile picture");

test('renders title and headline', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Felix Fong/);
  await expect(name(page)).toHaveText('Felix Fong');
});

test('social links point to the right places', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /Github/ })).toHaveAttribute(
    'href',
    'https://github.com/felixfong227',
  );
  await expect(page.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
    'href',
    'https://linkedin.com/in/felixfong227',
  );
});

test('profile image is rendered via <picture> with webp', async ({ page }) => {
  await page.goto('/');
  await expect(profile(page)).toBeVisible();
  await expect(page.locator('picture source[type="image/webp"]')).toHaveCount(1);
});

test.describe('desktop layout', () => {
  test.use({ viewport: DESKTOP });

  test('name is rotated and uses the display type scale', async ({ page }) => {
    await page.goto('/');
    const heading = name(page);
    await expect(heading).toHaveCSS('rotate', '-90deg');
    await expect(heading).toHaveCSS('font-size', '64px');
    await expect(heading).toHaveCSS('line-height', '95px');
    await expect(heading).toHaveCSS('letter-spacing', '15.68px'); // 64px * 0.245em
    await expect(heading).toHaveCSS('text-transform', 'uppercase');
    await expect(heading).toHaveCSS('color', 'rgb(0, 0, 0)');
    const family = await heading.evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family).toContain('Oswald');
  });

  test('profile picture is 274px and circular', async ({ page }) => {
    await page.goto('/');
    const pic = profile(page);
    await expect(pic).toHaveCSS('width', '274px');
    await expect(pic).toHaveCSS('height', '274px');
    const radius = await pic.evaluate((el) => getComputedStyle(el).borderTopLeftRadius);
    expect(radius).not.toBe('0px');
  });
});

test.describe('mobile layout', () => {
  test.use({ viewport: MOBILE });

  test('name is upright and uses the smaller scale', async ({ page }) => {
    await page.goto('/');
    const heading = name(page);
    await expect(heading).toHaveCSS('rotate', 'none');
    await expect(heading).toHaveCSS('font-size', '36px');
    await expect(heading).toHaveCSS('line-height', '53px');
    await expect(heading).toHaveCSS('letter-spacing', '3.78px'); // 36px * 0.105em
  });

  test('profile picture shrinks to 149px', async ({ page }) => {
    await page.goto('/');
    const pic = profile(page);
    await expect(pic).toHaveCSS('width', '149px');
    await expect(pic).toHaveCSS('height', '149px');
  });
});

test.describe('wave background', () => {
  test.use({ viewport: DESKTOP });

  test('rails extend at the wave edge heights (left != right)', async ({ page }) => {
    await page.goto('/');
    const left = await page.locator('.rail-left').evaluate((el) => el.getBoundingClientRect().height);
    const right = await page.locator('.rail-right').evaluate((el) => el.getBoundingClientRect().height);
    expect(left).toBeCloseTo(50, 0); // 3.125em at 16px root
    expect(right).toBeCloseTo(120.37, 0); // 7.523em at 16px root
    expect(right).toBeGreaterThan(left);
    expect(right / left).toBeGreaterThan(2);
    expect(right / left).toBeLessThan(3);
  });
});
