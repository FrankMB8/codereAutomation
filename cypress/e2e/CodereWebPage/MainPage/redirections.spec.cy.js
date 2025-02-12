/// <reference types="cypress" />

/**
 * @des Cheking redirections from main page
 * @link 
 * @author Frank Marcano
 */

const deportesHref = 'https://m.apuestas.codere.es/deportes/#/HomePage'
const enVivo = 'https://m.apuestas.codere.es/deportes/#/DirectosPage'
const slots = 'https://m.apuestas.codere.es/deportes/#/SlotsPage'
const casino = 'https://m.apuestas.codere.es/deportes/#/CasinoPage'
const ruletaEnVivo = 'https://m.apuestas.codere.es/deportes/#/CasinoPage?category=En%20Vivo'
const aviator = 'https://m.apuestas.codere.es/deportes/#/AviatorPage'
const textUpperCase = '.text-uppercase'

describe('Cheking main page redirections', () => {

    it('Cheking redirections from main page', () => {
        cy.visit('https://www.codere.es/')
        cy.get(textUpperCase).contains('Deportes').should('have.attr', 'href', deportesHref)
        cy.get(textUpperCase).contains('En vivo').should('have.attr', 'href', enVivo)
        cy.get(textUpperCase).contains('Slots').should('have.attr', 'href', slots)
        cy.get(textUpperCase).contains('Casino').should('have.attr', 'href', casino)
        cy.get(textUpperCase).contains('Ruleta en vivo').should('have.attr', 'href', ruletaEnVivo)
        cy.get(textUpperCase).contains('Aviator').should('have.attr', 'href', aviator)
    })
})



