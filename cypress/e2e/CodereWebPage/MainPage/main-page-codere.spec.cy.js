/// <reference types="cypress" />

/**
 * @des Checking Codere Page
 * @link 
 * @author Frank Marcano
 */

import "cypress-real-events/support";
const textUpperCase = '.text-uppercase'
const menuLat = '[class^="menuLatDestacados"]'
/* 
CLICK ON THE PROMPT OF COOKIES
const coockieBtn = '.cookie-btn-group' 
const navBarVerifier = (titulo) => {
    cy.get(textUpperCase).contains(titulo).should('be.visible').and('have.css', 'color', 'rgb(51, 63, 72)') 
    cy.get(textUpperCase).contains(titulo).realHover().wait(1500) .should('have.css', 'color', 'rgb(255, 255, 255)' )
} */
describe('Codere main page', () => {
    beforeEach(()=>{
        cy.visit('https://m.apuestas.codere.es/deportesEs/#/HomePage')
        cy.intercept('GET', '**/NavigationService/LeftMenu/GetMenuLeft').as('getMenuLeft')
    })
    it('Checking home page of codere', () => {
    // Method for do operation with the navBar
    cy.wait('@getMenuLeft').then((interception) => {
        const leagueMenuName = interception.response.body.highlightsConfig
        const names = leagueMenuName.map((config) => config.LeagueName)
        cy.wrap(names).as('leagueName')
    })
    // Action for test the left menu bar
    cy.get('@leagueName').then((names) => {
        names.forEach((name) => {
            cy.get(menuLat).wait(1500).contains(name).and('be.visible').click()
        })
    })

    })
})


