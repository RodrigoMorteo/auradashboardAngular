import { test, expect } from '@playwright/test';

test.describe('User Profile Preferences', () => {
  test.beforeEach(async ({ page }) => {
    // Reset state to default
    await page.request.post('/api/state/reset', {
      data: { profile: 'default' }
    });
    
    // Login
    await page.goto('/login');
    await page.fill('input[formControlName="email"]', 'test@example.com');
    await page.fill('input[formControlName="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    
    // Navigate to Profile
    await page.click('nav >> text=User Profile');
    await expect(page).toHaveURL('/profile');
  });

  test('should display and update communication preferences', async ({ page }) => {
    // Verify visibility of the new section
    await expect(page.locator('h3:has-text("Communication Preferences")')).toBeVisible();

    const emailCheckbox = page.locator('input[formControlName="emailNotifications"]');
    const smsCheckbox = page.locator('input[formControlName="smsNotifications"]');
    const dailyRadio = page.locator('input[value="Daily"]');
    const weeklyRadio = page.locator('input[value="Weekly"]');
    const monthlyRadio = page.locator('input[value="Monthly"]');

    // Verify initial values (from default.json: email=true, sms=false, freq=Weekly)
    await expect(emailCheckbox).toBeChecked();
    await expect(smsCheckbox).not.toBeChecked();
    await expect(weeklyRadio).toBeChecked();

    // Update preferences
    await emailCheckbox.uncheck();
    await smsCheckbox.check();
    await dailyRadio.check();

    // Save changes
    await page.click('button:has-text("Save Changes")');

    // Verify success message
    await expect(page.locator('text=Changes saved successfully!')).toBeVisible();

    // Verify values remain updated in UI
    await expect(emailCheckbox).not.toBeChecked();
    await expect(smsCheckbox).toBeChecked();
    await expect(dailyRadio).toBeChecked();

    // Reload and verify persistence
    await page.reload();
    await expect(emailCheckbox).not.toBeChecked();
    await expect(smsCheckbox).toBeChecked();
    await expect(dailyRadio).toBeChecked();
  });

  test('should handle radio button mutual exclusivity', async ({ page }) => {
    const dailyRadio = page.locator('input[value="Daily"]');
    const weeklyRadio = page.locator('input[value="Weekly"]');
    const monthlyRadio = page.locator('input[value="Monthly"]');

    await dailyRadio.check();
    await expect(dailyRadio).toBeChecked();
    await expect(weeklyRadio).not.toBeChecked();
    await expect(monthlyRadio).not.toBeChecked();

    await monthlyRadio.check();
    await expect(monthlyRadio).toBeChecked();
    await expect(dailyRadio).not.toBeChecked();
    await expect(weeklyRadio).not.toBeChecked();
  });
});
