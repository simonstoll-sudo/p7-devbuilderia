import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test('connexion avec des identifiants valides', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@panions.fr');
    await page.getByLabel('Mot de passe').fill('admin123');
    await page.getByRole('button', { name: /connexion/i }).click();
    await expect(page).toHaveURL('/distributions');
  });

  test('affiche une erreur avec des identifiants incorrects', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@panions.fr');
    await page.getByLabel('Mot de passe').fill('mauvais-mot-de-passe');
    await page.getByRole('button', { name: /connexion/i }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page).not.toHaveURL('/distributions');
  });

  test('affiche les distributions après connexion', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@panions.fr');
    await page.getByLabel('Mot de passe').fill('admin123');
    await page.getByRole('button', { name: /connexion/i }).click();
    await expect(page.getByRole('heading', { name: /distributions/i })).toBeVisible();
  });
});
