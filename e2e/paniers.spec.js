import { test, expect } from '@playwright/test';

test.describe('Liste des paniers', () => {
  test('affiche au moins un panier sur la page d\'accueil', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /paniers disponibles/i })).toBeVisible();
    await expect(page.locator('.panier-card').first()).toBeVisible();
  });

  test('navigue vers le détail d\'un panier', async ({ page }) => {
    await page.goto('/');
    await page.locator('.voir-plus').first().click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('.contenus')).toBeVisible();
  });

  test('affiche le contenu du panier dans la page de détail', async ({ page }) => {
    await page.goto('/');
    await page.locator('.voir-plus').first().click();
    await expect(page.locator('.contenus li').first()).toBeVisible();
  });
});
