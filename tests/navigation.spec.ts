import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Reset state and login
    await page.request.post('/api/state/reset', { data: { profile: 'default' } });
    await page.goto('/login');
    await page.fill('input[formControlName="email"]', 'test@example.com');
    await page.fill('input[formControlName="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
  });

  test('should navigate to Sales Records page', async ({ page }) => {
    await page.click('nav >> text=Sales Records');
    await expect(page).toHaveURL('/sales');
    await expect(page.locator('app-sales-records')).toBeVisible();
    await expect(page.locator('h3:has-text("Sales Records")')).toBeVisible();
  });

  test('should navigate to User Profile page', async ({ page }) => {
    await page.click('nav >> text=User Profile');
    await expect(page).toHaveURL('/profile');
    // The profile page wraps the lit component or just displays the profile
    await expect(page.locator('app-user-profile-page')).toBeVisible();
    await expect(page.locator('h2:has-text("User Profile")')).toBeVisible();
  });

  test('should navigate back to Dashboard', async ({ page }) => {
    // Go to profile first
    await page.click('nav >> text=User Profile');
    await expect(page).toHaveURL('/profile');

    // Go back to Dashboard
    await page.click('nav >> text=Dashboard');
    await expect(page).toHaveURL('/');
    await expect(page.locator('app-dashboard')).toBeVisible();
  });
});
