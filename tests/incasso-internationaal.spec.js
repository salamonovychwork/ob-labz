import { faker } from '@faker-js/faker'
import { test} from '@playwright/test';

const FILE_PATH = 'files/cowboy.jpeg';

[
  { link: '/incasso-internationaal/', title: 'Incasso-internationaal', clickName: 'Zaak Indienen', clickIndex: 0 },
  { link: 'incasso/incasso-aanmeldformulier/', title: 'Incasso-aanmeldformulier', clickName: null },
  { link: '/serviceovereenkomst/#', title: 'Incasso-serviceovereenkomst', clickName: 'Aanvragen', clickIndex: 0 },
  { link: '/serviceovereenkomst-europa/#', title: 'Incasso-serviceovereenkomst-europa', clickName: 'Aanvragen', clickIndex: 0 },
  { link: '/serviceovereenkomst-wereld/', title: 'Incasso-serviceovereenkomst-wereld', clickName: 'Aanvragen', clickIndex: 0 },
  { link: '/serviceovereenkomst-benelux/', title: 'Incasso-serviceovereenkomst-benelux', clickName: 'Indienen', clickIndex: 1 }
].forEach((param) => {
  test(param.title, async ({ page }) => {
  await page.goto(param.link);
  await page.getByRole('button', { name: 'Allow all' }).click();
  if (param.clickName) await page.getByRole('link', { name: param.clickName }).nth(param.clickIndex).click();
  await page.reload()
  await page.getByRole('textbox', { name: 'Uw mailadres*' }).fill(faker.internet.email());
  await page.getByText('Particulier').nth(1).click();
  await page.locator('.close').first().click();
  await page.getByText('Particulier').nth(3).click();
  await page.locator('select[name="type-incasso__1"]').selectOption('Uitspraak huurcommissie');
  await page.locator('select[name="valuta__1"]').selectOption('Dollar (Australië)');
  await page.getByPlaceholder('Openstaand bedrag *:').fill(String(faker.number.int()));
  const fileInput = (nth) => page.locator('.codedropz-upload-wrapper:visible input[type="file"]').nth(nth);
  await fileInput(0).setInputFiles(FILE_PATH);
  await fileInput(1).setInputFiles(FILE_PATH);
  await fileInput(2).setInputFiles(FILE_PATH);
  await page.getByRole('textbox', { name: 'Specificatie terug te krijgen bedrag' }).fill('qweqwe');
  await fileInput(3).setInputFiles(FILE_PATH);
  await page.getByRole('button', { name: 'Volgende' }).click();
  await page.waitForTimeout(5000)
  
  // Step 2
  await page.getByRole('textbox', { name: 'Bedrijfsnaam*' }).fill(faker.person.firstName);
  await page.getByRole('textbox', { name: 'Achternaam schuldenaar*' }).fill(faker.person.lastName);
  await page.getByRole('textbox', { name: 'Tussenvoegsel schuldenaar' }).fill("Van Der");
  await page.getByRole('textbox', { name: 'Postcode' }).fill(faker.location.zipCode());
  await page.getByRole('textbox', { name: 'Huisnummer' }).fill(String(faker.number.int({ min: 1, max: 1000 })));
  await page.getByRole('textbox', { name: 'Toevoeging' }).fill(faker.string.alpha({ length: 1, casing: 'upper' }));
  await page.getByRole('textbox', { name: 'Straatnaam' }).fill(faker.location.street());
  await page.getByRole('textbox', { name: 'Woonplaats' }).fill(faker.location.city());
  await page.getByRole('textbox', { name: 'Land' }).fill(faker.location.country());
  await page.getByRole('textbox', { name: 'E-mailadres schuldenaar*' }).fill(faker.internet.email());
  await page.getByRole('textbox', { name: 'Telefoonnummer' }).fill(faker.phone.number({ style: 'international' }));
  await page.getByRole('textbox', { name: 'Mobiel' }).fill('+316' + faker.string.numeric(8));
  await page.getByRole('button', { name: 'Volgende' }).click();
  await page.waitForTimeout(5000)

  // Step 3
  await page.getByRole('textbox', { name: 'Voornaam schuldenaar*' }).fill(faker.person.firstName());
  await page.getByRole('textbox', { name: 'KvK-nummer' }).fill(faker.string.numeric(8));
  await page.getByRole('textbox', { name: 'Voornaam contactpersoon*' }).fill(faker.person.firstName());
  await page.getByRole('textbox', { name: 'Achternaam contactpersoon' }).fill(faker.person.lastName());
  await page.getByRole('textbox', { name: 'Tussenvoegsel contactpersoon' }).fill(faker.helpers.arrayElement(['van', 'de', 'van der', 'den', 'ter']));
  await page.getByRole('textbox', { name: 'Postcode*' }).fill(faker.location.zipCode());
  await page.getByRole('textbox', { name: 'Huisnummer*' }).fill(String(faker.number.int({ min: 1, max: 1000 })));
  await page.getByRole('textbox', { name: 'Toevoeging' }).fill(faker.string.alpha({ length: 1, casing: 'upper' }));
  await page.getByRole('textbox', { name: 'Straatnaam*' }).fill(faker.location.street());
  await page.getByRole('textbox', { name: 'Woonplaats*' }).fill(faker.location.city());
  await page.getByRole('textbox', { name: 'Land*' }).fill(faker.location.country());
  await page.getByRole('textbox', { name: 'Telefoonnummer*' }).fill(faker.phone.number({ style: 'international' }));
  await page.getByRole('textbox', { name: 'Mobiel' }).fill('+316' + faker.string.numeric(8));
  await page.getByRole('textbox', { name: 'IBAN-nummer voor terugbetaling vordering*' }).fill(faker.finance.iban());
  await page.getByRole('textbox', { name: 'BTW-nummer*' }).fill('NL' + faker.string.numeric(9) + 'B' + faker.string.numeric(2));

  // Step 4
  for (let i = 1; i <= 4; i++) {
    await page.locator(`span[data-name="acceptance-${i}"] label`).click();
  }

  await page.getByRole('button', { name: 'Bevestigen' }).click();

})
})  