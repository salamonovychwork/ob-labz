import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'

test('Debt collection advice Form', async({ page }) => {
    await page.goto('/gratis-incasso-advies/')
    await page.getByRole('button', { name: 'Allow all' }).click()
    await page.waitForTimeout(2000)
    await page.getByText('Particulier', { exact: true }).click()
    await page.getByRole('textbox', { name: 'Voornaam*' }).fill(faker.person.firstName())
    await page.getByRole('textbox', { name: 'Achternaam*' }).fill(faker.person.lastName())
    await page.getByRole('textbox', { name: 'Telefoonnummer*' }).fill(faker.phone.number({ style: 'international' }))
    await page.getByRole('textbox', { name: 'E-mailadres*' }).fill(faker.internet.email())
    await page.getByRole('button', { name: 'Indienen' }).click()
    await expect(page.getByRole('heading', { name: 'Bedankt voor uw aanvraag –' })).toBeVisible({ timeout: 10000 })
})