import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test';

const FILE_PATH = 'files/cowboy.jpeg'

test.skip('Collection registration Form', async ({ page }) => {
  await page.goto('/incasso-internationaal/')
  await page.getByRole('button', { name: 'Allow all' }).click();
  await page.getByRole('link', { name: 'Zaak Indienen' }).click();
  await page.getByRole('textbox', { name: 'Uw mailadres*' }).fill(faker.internet.email());
//   await page.getByText('Particulier').nth(1).click();
//   await page.locator('.close').first().click();
  await page.getByText('Particulier').nth(3).click();
  await page.locator('select[name="type-incasso__1"]').selectOption('Uitspraak huurcommissie');
  await page.locator('select[name="valuta__1"]').selectOption('Dollar (Australië)');
  await page.getByPlaceholder('Openstaand bedrag *:').fill(String(faker.number.int()));
  const fileInput = (nth) => page.locator('.codedropz-upload-wrapper:visible input[type="file"]').nth(nth);
  await fileInput(0).setInputFiles(FILE_PATH);
  await fileInput(1).setInputFiles(FILE_PATH);
  await fileInput(2).setInputFiles(FILE_PATH);
  await page.getByRole('textbox', { name: 'Specificatie terug te krijgen' }).fill('qweqwe');
  await fileInput(3).setInputFiles(FILE_PATH);
  await page.getByRole('button', { name: 'Volgende' }).click();
  await page.waitForTimeout(5000)
});