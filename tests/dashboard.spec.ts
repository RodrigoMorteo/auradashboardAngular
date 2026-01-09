import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
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
  });

  test('should display all core widgets', async ({ page }) => {
    // Check Header
    await expect(page.locator('h2:has-text("Dashboard")')).toBeVisible();

    // Check Trends Widget
    await expect(page.locator('app-kpi-trends')).toBeVisible();
    await expect(page.locator('text=KPI Trends')).toBeVisible();

    // Check Activity Log Widget
    await expect(page.locator('app-activity-log')).toBeVisible();
    await expect(page.locator('text=Activity Feed')).toBeVisible();

    // Check Sales Records Widget (partial preview)
    await expect(page.locator('app-sales-records')).toBeVisible();
    await expect(page.locator('h3:has-text("Sales Records")')).toBeVisible();
  });

  test('should allow dragging widgets (CDK Drag and Drop)', async ({ page }) => {
    // Wait for widgets to be stable
    await page.waitForSelector('div[cdkDrag]');
    
    const widgets = page.locator('div[cdkDrag]');
    
    // Ensure we start with Trends first
    const firstWidget = widgets.nth(0);
    expect(await firstWidget.textContent()).toContain('KPI Trends');
    
    const dragHandle = firstWidget.locator('div[cdkDragHandle]');
    const targetLocation = widgets.nth(1);

    // Get the bounding box of the handle and the target
    const sourceBox = await dragHandle.boundingBox();
    const targetBox = await targetLocation.boundingBox();

    if (sourceBox && targetBox) {
      // Perform manual drag interaction
      await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
      await page.mouse.down();
      
      // Move slightly to trigger drag start
      await page.mouse.move(sourceBox.x + sourceBox.width / 2 + 10, sourceBox.y + sourceBox.height / 2 + 10);
      
      // Move to target
      await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 10 });
      
      // Release
      await page.mouse.up();
    }

    // Wait for animation/reorder
    await page.waitForTimeout(1000); 

    // Verify the order changed
    const newFirstWidget = widgets.nth(0);
    const newFirstWidgetText = await newFirstWidget.textContent();
    
    expect(newFirstWidgetText).not.toContain('KPI Trends');
    expect(newFirstWidgetText).toContain('Activity Feed');
  });
});
