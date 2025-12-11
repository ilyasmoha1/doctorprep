import { test, expect } from '@playwright/test';

test.describe('Get Started Flow & Settings', () => {

    test('Guest User: Get Started -> Login -> Dashboard', async ({ page }) => {
        // 1. Start at Home
        await page.goto('http://localhost:3000');

        // 2. Click Get Started (Hero)
        await page.getByRole('button', { name: 'Start Free Trial' }).click();

        // 3. Verify Redirect to Login
        await expect(page).toHaveURL(/\/login/);

        // 4. Fill Login (Mock)
        await page.getByPlaceholder('name@example.com').fill('test@test.com');
        await page.getByPlaceholder('password').fill('password');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // 5. Verify Dashboard
        await expect(page).toHaveURL(/\/dashboard/);
        await expect(page.getByText('Welcome back')).toBeVisible();
    });

    test('Settings: Persistence', async ({ page }) => {
        // 1. Go to Dashboard (Auth required, so we mock or login first)
        // For simplicity in this smoke test, we'll login again
        await page.goto('http://localhost:3000/login');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // 2. Open Settings
        await page.getByRole('button', { name: 'Settings' }).click(); // Gear icon might need name or aria-label

        // 3. Toggle Dark Mode (Switch)
        // Note: shadcn switch is a button role usually
        const darkModeSwitch = page.getByLabel('Dark Mode');
        const isChecked = await darkModeSwitch.getAttribute('aria-checked');

        await darkModeSwitch.click();

        // 4. Save
        await page.getByRole('button', { name: 'Save Changes' }).click();

        // 5. Refresh Page
        await page.reload();

        // 6. Verify Persistence
        // Check if html has 'dark' class
        const html = page.locator('html');
        if (isChecked === 'true') {
            await expect(html).not.toHaveClass(/dark/);
        } else {
            await expect(html).toHaveClass(/dark/);
        }
    });
});
