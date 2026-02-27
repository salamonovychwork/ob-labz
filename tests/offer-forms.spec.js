import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'

[
    { link: '/herfst/', title: 'Autumn offer Form' },
    { link: '/10jaar/', title: '10th anniversary offer Form' },
    { link: '/bedrijven/', title: 'Offer for companies Form' },
    { link: '/lss-2/', title: 'Final Summons Service Offer Form' },
    { link: '/winter/', title: 'Winter offer' },
    { link: '/lente/', title: 'Spring offer Service agreement Collection' },
    { link: '/zomer/', title: 'Summer Offer Service Agreement Collection' },
    { link: '/relaties/', title: 'Customer Care Relations Offer Form' },
].forEach((param) => {
    test(param.title, async({ page }) => {
        await page.goto(param.link)
        await page.getByRole('button', { name: 'Allow all' }).click()
        await page.waitForTimeout(2000)
        await page.getByRole('button', { name: 'Aanbieding claimen' }).click()
        const today = new Date().toISOString().split('T')[0]
        await page.locator('input[name="agreement_date"]').fill(today)
        await page.getByRole('textbox', { name: 'Bedrijfsnaam*' }).fill(faker.company.name())
        await page.locator('select[name="contactpersoon"]').selectOption('de heer')
        await page.getByRole('textbox', { name: 'Voornaam contactpersoon*' }).fill(faker.person.firstName())
        await page.getByRole('textbox', { name: 'Achternaam contactpersoon*' }).fill(faker.person.lastName())
        await page.getByRole('textbox', { name: 'Postcode*' }).fill(faker.location.zipCode())
        await page.getByRole('textbox', { name: 'Plaats*' }).fill(faker.location.city())
        await page.getByRole('textbox', { name: 'Adres*', exact: true }).fill(faker.location.streetAddress())
        if (param.link === '/bedrijven/') {
            await page.locator('input[name="telefoonnummer"]').fill(faker.phone.number({ style: 'international' }))
            await page.locator('input[name="mailadres"]').fill(faker.internet.email())
        } else {
            await page.getByRole('textbox', { name: 'Telefoonnummer*' }).fill(faker.phone.number({ style: 'international' })),
            await page.getByRole('textbox', { name: 'E-mailadres*' }).fill(faker.internet.email())
        }
        await page.locator('select[name="country"]').selectOption('Afghanistan')
        const vatNumber = `NL${faker.string.numeric(9)}B01`
        await page.getByRole('textbox', { name: 'Btw-nummer*' }).fill(vatNumber)
        await page.getByRole('textbox', { name: 'Bankrekeningnummer*' }).fill(faker.finance.iban())
        const kvkNumber = faker.string.numeric(8)
        await page.getByRole('textbox', { name: 'KvK' }).fill(kvkNumber)
        await page.getByRole('button', { name: 'Bevestigen' }).click()
        await expect(page.getByRole('heading', { name: 'Tarieven en voorwaarden' })).toBeVisible({ timeout: 6000 })
    })
})