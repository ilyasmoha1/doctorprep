import { test, expect } from '@playwright/test';

test.describe('Roadmap Generation Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Login first
        await page.goto('http://localhost:3000/login');
        await page.getByPlaceholder('name@example.com').fill('test@test.com');
        await page.getByLabel('Password').fill('password');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await expect(page).toHaveURL(/\/dashboard/);
    });

    test('Generate roadmap with valid inputs', async ({ page }) => {
        // Navigate to planner page (where roadmap form is)
        await page.goto('http://localhost:3000/dashboard/planner');

        // Fill in the form
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 6);
        const formattedDate = futureDate.toISOString().split('T')[0];

        await page.getByLabel('Exam Date').fill(formattedDate);
        await page.getByLabel('Study Hours Per Day').fill('6');
        await page.getByLabel('Target Weak Areas').fill('Cardiology, Biochemistry, Pharmacology');

        // Submit form
        await page.getByRole('button', { name: 'Generate My Roadmap' }).click();

        // Wait for loading state
        await expect(page.getByRole('button', { name: 'Generating Plan...' })).toBeVisible();

        // Wait for roadmap to appear (mock has 2s delay)
        await expect(page.getByText(/USMLE Step 1/)).toBeVisible({ timeout: 5000 });

        // Verify roadmap modules are displayed
        await expect(page.getByText(/Week 1-2:/)).toBeVisible();
        await expect(page.getByText(/Cardiology/)).toBeVisible();

        // Verify success toast appears
        await expect(page.getByText('Roadmap Generated!')).toBeVisible();
    });

    test('Form validation - empty fields', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard/planner');

        // Try to submit without filling fields
        await page.getByRole('button', { name: 'Generate My Roadmap' }).click();

        // HTML5 validation should prevent submission
        // Check that we're still on the same page
        await expect(page).toHaveURL(/\/planner/);
    });

    test('Form validation - past exam date', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard/planner');

        // Fill with past date
        const pastDate = new Date();
        pastDate.setMonth(pastDate.getMonth() - 1);
        const formattedDate = pastDate.toISOString().split('T')[0];

        await page.getByLabel('Exam Date').fill(formattedDate);
        await page.getByLabel('Study Hours Per Day').fill('6');
        await page.getByLabel('Target Weak Areas').fill('Cardiology');

        // Submit form
        await page.getByRole('button', { name: 'Generate My Roadmap' }).click();

        // Wait for error message
        await expect(page.getByText(/Exam date must be in the future/)).toBeVisible({ timeout: 3000 });
    });

    test('Form validation - invalid hours', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard/planner');

        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 6);
        const formattedDate = futureDate.toISOString().split('T')[0];

        await page.getByLabel('Exam Date').fill(formattedDate);
        await page.getByLabel('Study Hours Per Day').fill('20'); // More than max (16)
        await page.getByLabel('Target Weak Areas').fill('Cardiology');

        // Submit form
        await page.getByRole('button', { name: 'Generate My Roadmap' }).click();

        // Wait for error message
        await expect(page.getByText(/Cannot exceed 16 hours/)).toBeVisible({ timeout: 3000 });
    });

    test('Analytics tracking on form submission', async ({ page, context }) => {
        // Listen for console logs to verify analytics
        const consoleLogs: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'log' && msg.text().includes('[Analytics]')) {
                consoleLogs.push(msg.text());
            }
        });

        await page.goto('http://localhost:3000/dashboard/planner');

        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 6);
        const formattedDate = futureDate.toISOString().split('T')[0];

        await page.getByLabel('Exam Date').fill(formattedDate);
        await page.getByLabel('Study Hours Per Day').fill('6');
        await page.getByLabel('Target Weak Areas').fill('Cardiology, Biochemistry');

        await page.getByRole('button', { name: 'Generate My Roadmap' }).click();

        // Wait for completion
        await expect(page.getByText(/USMLE Step 1/)).toBeVisible({ timeout: 5000 });

        // Verify analytics events were tracked
        // Note: This is a basic check. In production, you'd use a proper analytics testing framework
        await page.waitForTimeout(1000); // Give time for analytics to fire

        // Check that some analytics events were logged
        expect(consoleLogs.length).toBeGreaterThan(0);
    });

    test('Roadmap displays correct number of modules', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard/planner');

        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 6);
        const formattedDate = futureDate.toISOString().split('T')[0];

        await page.getByLabel('Exam Date').fill(formattedDate);
        await page.getByLabel('Study Hours Per Day').fill('6');
        await page.getByLabel('Target Weak Areas').fill('Cardiology, Biochemistry, Pharmacology');

        await page.getByRole('button', { name: 'Generate My Roadmap' }).click();

        // Wait for roadmap
        await expect(page.getByText(/USMLE Step 1/)).toBeVisible({ timeout: 5000 });

        // Count module cards (should be 6 based on mock data)
        const moduleCards = page.locator('[class*="Card"]').filter({ hasText: /Week/ });
        await expect(moduleCards).toHaveCount(6, { timeout: 2000 });
    });
});
