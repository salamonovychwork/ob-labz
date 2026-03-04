import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'

[
    { link: '/gerechtelijke-incasso/', title: 'Gerechtelijke incasso' },
    { link: '/incasso-op-maat/', title: 'Incasso op maat' },
    { link: '/over/', title: 'Over ons'},
    { link: '/huurincasso/', title: 'Huurincasso'},
    { link: '/incasso-no-cure-no-pay/', title: 'Incasso No Cure No Pay'},
    { link: '/dagvaarding/', title: 'Dagvaarding' },
    { link: '/incasso-internationaal/', title: 'Incasso internationaal' },
    { link: '/debiteur-opsporen/', title: 'Debiteur opsporen' },
    { link: '/rechercherapport/', title: 'Rechercherapport' },
    { link: '/beslaglegging-buitenland/', title: 'Beslaglegging in het buitenland' },
    { link: '/verhaalsrapport/', title: 'Verhaalsrapport' },
    { link: '/kredietrapporten/', title: 'Kredietrapport' },
    { link: '/europese-kredietrapporten/', title: 'Europees Kredietrapport' },
    { link: '/betalen/', title: 'Betalen' },
    { link: '/betalen/hulp-en-informatie/hulp-bij-geldproblemen/', title: 'Hulp bij geldproblemen' },
    { link: '/klachtenregeling/', title: 'Klachten- en geschillenregeling' },
    { link: '/tarieven/', title: 'Tarieven incassobureau' },
].forEach((param) => {
    test(param.title, async({ page }) => {
        await page.goto(param.link)
        await page.getByRole('button', { name: 'Allow all' }).click()
        await page.waitForTimeout(2000)
        const contactFormLinks = ['/betalen/', '/betalen/hulp-en-informatie/hulp-bij-geldproblemen/', '/klachtenregeling/']
        const isContactForm = contactFormLinks.includes(param.link)
        const form = page.getByRole('form', { name: isContactForm ? 'Contact form' : 'Contactformulier' })

        const labels = ['Particulier', 'Zakelijk']
        const label = labels[Math.floor(Math.random() * labels.length)]
        await form.locator('[data-name="type_bedrijf"]').getByText(label, { exact: true }).click()

        await form.getByRole('textbox', { name: 'Voornaam*' }).fill(faker.person.firstName())
        await form.getByRole('textbox', { name: 'Achternaam*' }).fill(faker.person.lastName())
        await form.getByRole('textbox', { name: 'Telefoonnummer' }).fill(faker.phone.number({ style: 'national' }))
        await form.getByRole('textbox', { name: 'E-mailadres' }).fill(faker.internet.email())
        if (isContactForm) {
            await form.getByRole('textbox', { name: 'Omschrijving vraag' }).fill(faker.lorem.sentence())
        }
        if (label === 'Zakelijk') {
            await form.getByRole('textbox', { name: 'Bedrijfsnaam*' }).fill(faker.company.name())
        }
        await form.getByRole('button', { name: 'Verstuur' }).click()
        await page.waitForTimeout(10000)
        const successText = isContactForm
            ? 'Wij hebben uw vraag ontvangen. Wij nemen zo snel mogelijk contact met u op. U ontvangt van ons een bevestiging per e-mail.'
            : 'Bedankt voor uw aanvraag! Wij nemen zo snel mogelijk contact met u op. U ontvangt van ons een bevestiging per e-mail.'
        await expect(page.locator('p').getByText(successText)).toBeVisible()
    })
})