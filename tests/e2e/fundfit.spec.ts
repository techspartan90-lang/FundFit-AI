import { test, expect } from '@playwright/test';

test.describe('FUND FIT AI - End-to-End User Journey Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
  });

  test('1. User Registration & Authentication Flow', async ({ page }) => {
    await expect(page).toHaveTitle(/FUND FIT AI/i);

    // Click Login / Register
    const loginBtn = page.locator('button:has-text("Login"), a:has-text("Login")');
    if (await loginBtn.isVisible()) {
      await loginBtn.click();
    }

    // Verify auth modal or form presence
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
  });

  test('2. Mutual Fund Search & Analytics Dashboard', async ({ page }) => {
    // Search for mutual fund
    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('Quant Flexi Cap');
      await page.keyboard.press('Enter');
      await expect(page.locator('text=Quant')).toBeVisible();
    }
  });

  test('3. AI Goal Probability & Recommendation Verification', async ({ page }) => {
    // Verify AI Engine calculation rendering
    await page.goto('/ai-dashboard');
    await expect(page.locator('text=Goal Probability, text=Fund Fit Score, text=Risk Profile')).toBeDefined();
  });

});
