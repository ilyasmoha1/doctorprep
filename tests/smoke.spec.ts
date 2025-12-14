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
        await page.getByPlaceholder('name@example.com').fill('john@example.com');
        await page.getByLabel('Password').fill('student123');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // 5. Verify Dashboard
        await expect(page).toHaveURL(/\/dashboard/);
        await expect(page.getByText('Welcome back')).toBeVisible();
    });

    test('Settings: Persistence', async ({ page }) => {
        // 1. Go to Dashboard (Auth required, so we mock or login first)
        // For simplicity in this smoke test, we'll login again
        await page.goto('http://localhost:3000/login');
        await page.getByPlaceholder('name@example.com').fill('john@example.com');
        await page.getByLabel('Password').fill('student123');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // Wait for dashboard
        await expect(page).toHaveURL(/\/dashboard/);

        // 2. Open Settings
        // Use the header settings button (icon)
        await page.getByLabel('Settings').click();

        // 3. Toggle Dark Mode (Switch)
        // Note: shadcn switch is a button role usually
        const darkModeSwitch = page.getByLabel('Dark Mode');
        const isChecked = await darkModeSwitch.getAttribute('aria-checked');

        await darkModeSwitch.click();

        // 4. Save
        await page.getByRole('button', { name: 'Save Changes' }).click();

        // 4b. Verify Immediate Change
        const html = page.locator('html');
        if (isChecked === 'true') {
            await expect(html).not.toHaveClass(/dark/);
        } else {
            await expect(html).toHaveClass(/dark/);
        }

        // 5. Refresh Page
        await page.reload();

        // 6. Verify Persistence
        // Check if html has 'dark' class
        // html already defined above
        if (isChecked === 'true') {
            await expect(html).not.toHaveClass(/dark/);
        } else {
            await expect(html).toHaveClass(/dark/);
        }
    });

    test('Dashboard: Stats Display', async ({ page }) => {
        // Login
        await page.goto('http://localhost:3000/login');
        await page.getByPlaceholder('name@example.com').fill('john@example.com');
        await page.getByLabel('Password').fill('student123');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // Verify stats are visible
        await expect(page.getByText('Daily Streak')).toBeVisible();
        await expect(page.getByText('Questions Solved')).toBeVisible();
        await expect(page.getByText('Accuracy')).toBeVisible();
    });

    test('Dashboard: Continue Learning Cards', async ({ page }) => {
        // Login
        await page.goto('http://localhost:3000/login');
        await page.getByPlaceholder('name@example.com').fill('john@example.com');
        await page.getByLabel('Password').fill('student123');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // Verify learning cards are visible
        await expect(page.getByText('Continue Learning')).toBeVisible();
        await expect(page.getByText('Cardiovascular System')).toBeVisible();
        await expect(page.getByText('Neurology Basics')).toBeVisible();
    });

    test('Dashboard: Quick Actions', async ({ page }) => {
        // Login
        await page.goto('http://localhost:3000/login');
        await page.getByPlaceholder('name@example.com').fill('john@example.com');
        await page.getByLabel('Password').fill('student123');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // Verify quick actions section
        await expect(page.getByText('Quick Actions')).toBeVisible();
        await expect(page.getByRole('button', { name: /Study Planner/ })).toBeVisible();
        await expect(page.getByRole('button', { name: /Practice Questions/ })).toBeVisible();
    });

    test('Sign Out Flow', async ({ page }) => {
        // Login
        await page.goto('http://localhost:3000/login');
        await page.getByPlaceholder('name@example.com').fill('john@example.com');
        await page.getByLabel('Password').fill('student123');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // Verify we're on dashboard
        await expect(page).toHaveURL(/\/dashboard/);

        // Click sign out
        await page.getByRole('button', { name: 'Sign Out' }).click();

        // Verify redirect to home or login
        await expect(page).toHaveURL(/\/(login)?$/);
    });
});
