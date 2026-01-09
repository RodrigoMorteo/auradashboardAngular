import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Reset state to default before each test
    await page.request.post('/api/state/reset', {
      data: { profile: 'default' }
    });
    await page.goto('/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[formControlName="email"]', 'test@example.com');
    await page.fill('input[formControlName="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=AuraDash')).toBeVisible();
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await page.fill('input[formControlName="email"]', 'wrong@example.com');
    await page.fill('input[formControlName="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should stay on login page and show error
    await expect(page).toHaveURL('/login');
    await expect(page.locator('text=Invalid credentials or server error')).toBeVisible();
  });

  test('should disable login button when form is invalid', async ({ page }) => {
    const loginButton = page.locator('button[type="submit"]');
    
    // Initial state (pre-filled in component, but let's clear it)
    await page.fill('input[formControlName="email"]', '');
    await expect(loginButton).toBeDisabled();

    await page.fill('input[formControlName="email"]', 'invalid-email');
    await expect(loginButton).toBeDisabled();

    await page.fill('input[formControlName="email"]', 'test@example.com');
    await page.fill('input[formControlName="password"]', '');
    await expect(loginButton).toBeDisabled();
  });
});
