import { test, expect } from '@playwright/test';

test.describe('CareConnect Web - Critical User Flows', () => {
  test('should display the welcome page and navigate to login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/welcome/);
    await expect(page.getByText('Welcome to')).toBeVisible();
    await expect(page.getByText('CareConnect')).toBeVisible();

    await page.getByText('Sign In').click();
    await expect(page).toHaveURL(/login/);
    await expect(page.getByText('Sign In')).toBeVisible();
  });

  test('should login and see the dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /Sign In/i }).click();

    await expect(page).toHaveURL(/app\/dashboard/, { timeout: 5000 });
    await expect(page.getByText("Today's Tasks")).toBeVisible();
    await expect(page.getByText("Today's Progress")).toBeVisible();
  });

  test('should register a new account', async ({ page }) => {
    await page.goto('/register');

    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByLabel('Confirm Password').fill('password123');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /Create Account/i }).click();

    await expect(page).toHaveURL(/app\/dashboard/, { timeout: 5000 });
  });

  test('should navigate between dashboard sections', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /Sign In/i }).click();
    await expect(page).toHaveURL(/app\/dashboard/, { timeout: 5000 });

    // Navigate to Medications
    await page.getByText('Medications').first().click();
    await expect(page.getByText('Medications Today')).toBeVisible();

    // Navigate to Appointments
    await page.getByText('Appointments').first().click();
    await expect(page.getByText('Your Appointments')).toBeVisible();

    // Navigate to Task History
    await page.getByText('Task History').first().click();
    await expect(page.getByText('Total Tasks')).toBeVisible();
  });

  test('should logout from the profile page', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /Sign In/i }).click();
    await expect(page).toHaveURL(/app\/dashboard/, { timeout: 5000 });

    // Navigate to profile
    await page.getByText('View Profile').click();
    await expect(page.getByText('Eleanor Rodriguez')).toBeVisible();

    // Sign out
    await page.getByText('Sign Out').click();
    await expect(page).toHaveURL(/login/);
  });
});
