// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { General } from "../e2e/General/general.po";

//1- Method for type any text on the search bar
Cypress.Commands.add('searching', (data, button) => {
    cy.get(button).type(data).should('be.visible')
});

//2- Method for type on the form
Cypress.Commands.add('fillIn', (fieldName, data, i) => {
    cy.get(General.labelText + General.scIon).contains(fieldName).click({ force: true })
    cy.get(General.nativeInput + General.scIon).eq(i).type(data, { force: true }).wait(300)
})
//3- Close Modal - Close the cookies prompt
Cypress.Commands.add('closeModal', () => {
    cy.get('.backgroundheader > .closeModal > .md').click({ force: true })
    cy.wait(300)
    cy.get('.closeModal > .md').as('bttnClick').click()
})

