import { test, expect } from '@playwright/test';

const email = () => `test${Date.now()}@gm.com`;
const name = () => `student-${Date.now()}-${Math.random()}`

test.describe('Registration', () => {

   const email = () => `student-${Date.now()}-${Math.random()}@gm.com`;

   let uniqueEmail

   test.beforeAll(async ({ browser }) => {
      uniqueEmail = email();
      const page = await browser.newPage();

      await page.goto('');
      await expect(page.getByTestId('nav-sign-up')).toBeVisible();

      await page.getByTestId('nav-sign-up').click();
      await expect(page.getByTestId('auth-username')).toBeVisible();

      await page.getByTestId('auth-username').fill(name());
      await page.getByTestId('auth-email').fill(uniqueEmail);
      await page.getByTestId('auth-password').fill('QWErty123');
      await page.getByTestId('register-confirm-password').fill('QWErty123');
      await page.getByTestId('register-terms').check();

      await page.getByTestId('auth-submit').click();
      await expect(page.getByTestId('nav-profile')).toBeVisible();
      await page.close()
   });

   test('REG1 - registration as a new user', async ({ page }) => {
      await page.goto('');
      await expect(page.getByTestId('nav-sign-up')).toBeVisible();

      await page.getByTestId('nav-sign-up').click();
      await expect(page.getByTestId('auth-username')).toBeVisible();

      await page.getByTestId('auth-username').fill(name());
      await page.getByTestId('auth-email').fill(email());
      await page.getByTestId('auth-password').fill('QWErty123');
      await page.getByTestId('register-confirm-password').fill('QWErty123');
      await page.getByTestId('register-terms').check();

      await page.getByTestId('auth-submit').click();
      await expect(page.getByTestId('nav-profile')).toBeVisible();
   });

   test('REG2 - registration a new user with registered user credentials', async ({ page }) => {
      await page.goto('');
      await expect(page.getByTestId('nav-sign-up')).toBeVisible();

      await page.getByTestId('nav-sign-up').click();
      await expect(page.getByTestId('auth-username')).toBeVisible();

      await page.getByTestId('auth-username').fill(name());
      await page.getByTestId('auth-email').fill(uniqueEmail);
      await page.getByTestId('auth-password').fill('QWErty123');
      await page.getByTestId('register-confirm-password').fill('QWErty123');
      await page.getByTestId('register-terms').check();

      await page.getByTestId('auth-submit').click();
      await expect(page.getByText('body email або username вже зайняті')).toBeVisible();
   });

   test('REG3 - registration with empty e-mail field', async ({ page }) => {
      await page.goto('');
      await expect(page.getByTestId('nav-sign-up')).toBeVisible();

      await page.getByTestId('nav-sign-up').click();
      await expect(page.getByTestId('auth-username')).toBeVisible();

      await page.getByTestId('auth-username').fill(name());
      await page.getByTestId('auth-password').fill('QWErty123');
      await page.getByTestId('register-confirm-password').fill('QWErty123');
      await page.getByTestId('register-terms').check();

      await page.getByTestId('auth-submit').click();
      await expect(page.getByText('email некоректний email')).toBeVisible();
   });
});

test.describe('Login', () => {

   let uniqueEmail

   test.beforeAll(async ({ browser }) => {
      uniqueEmail = email();

      const page = await browser.newPage();

      await page.goto('');
      await expect(page.getByTestId('nav-sign-up')).toBeVisible();

      await page.getByTestId('nav-sign-up').click();
      await expect(page.getByTestId('auth-username')).toBeVisible();

      await page.getByTestId('auth-username').fill(name());
      await page.getByTestId('auth-email').fill(uniqueEmail);
      await page.getByTestId('auth-password').fill('QWErty123');
      await page.getByTestId('register-confirm-password').fill('QWErty123');
      await page.getByTestId('register-terms').check();

      await page.getByTestId('auth-submit').click();
      await expect(page.getByTestId('nav-profile')).toBeVisible();
      await page.close()
   });

   test('LOG1 - Successful login with valid data', async ({ page }) => {
      await page.goto('/login');
      await expect(page.getByTestId('auth-form')).toBeVisible();

      await page.getByTestId('auth-email').fill(uniqueEmail);
      await page.getByTestId('auth-password').fill('QWErty123');
      await page.getByTestId('auth-submit').click();

      await expect(page.getByTestId('nav-profile')).toBeVisible();
   });

   test('LOG2 - Login with not valid password', async ({ page }) => {
      await page.goto('/login');
      await expect(page.getByTestId('auth-form')).toBeVisible();

      await page.getByTestId('auth-email').fill(uniqueEmail);
      await page.getByTestId('auth-password').fill('NotValidPass111');
      await page.getByTestId('auth-submit').click();

      await expect(page.getByTestId('nav-profile')).not.toBeVisible();
      await expect(page.getByText('email or password неправильні')).toBeVisible();
   });

   test('LOG3 - Login with not registered email and password', async ({ page }) => {
      await page.goto('/login');
      await expect(page.getByTestId('auth-form')).toBeVisible();

      await page.getByTestId('auth-email').fill(email());
      await page.getByTestId('auth-password').fill('NotValidPass111');
      await page.getByTestId('auth-submit').click();

      await expect(page.getByTestId('nav-profile')).not.toBeVisible();
      await expect(page.getByText('email or password неправильні')).toBeVisible();
   });

});

