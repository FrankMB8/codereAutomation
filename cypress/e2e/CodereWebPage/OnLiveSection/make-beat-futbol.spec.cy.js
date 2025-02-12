/// <reference types="cypress" />

/**
 * @des 
 * @link 
 * @author Frank Marcano
 */
import { General } from "../../General/general.po"
// FUTBOL ##
const sportName = 'Fútbol'
const betSquare = '#sb-ticket'
const msgEmptyBet = 'Sus selecciones serán añadidas'
const sbGrid = '.sb-grid-item--row'
const bckGrColor = '.background-color-light'
const bttnContent = '.sb-button--content'
const ticktSelect = '.sb-ticket-selection--subtitle'
const colorGrey = '.color-grey-500'
const index = 0
const idTicket = '#ticket-selections'


beforeEach(() => {
    cy.visit('https://m.apuestas.codere.es/deportesEs/#/DirectosPage')
    cy.intercept('GET', '**/NavigationService/Home/GetLiveEventsBySportHandle*').as('eventsForBet')

})

describe('Making a beat on Futbol', () => {

    it('Verifying On-Live navBar on live section', () => {
        // Select the first country
        cy.get(General.mdOnlive + General.segmentScrillable + General.hydratedOnLive).contains(sportName).click({ force: true })
        // Verificar que en el cuadro de la derecha diga 'Sus seleccione serán añadidas'
        cy.get(betSquare).contains(msgEmptyBet).should('be.visible')
        // Seach the m
        // Click on 1 square, hacer los asertions the estilos y colores, antes y despues de hacer click
        cy.wait('@eventsForBet').then((interception) => {
            //Interception of the API response
            const betMadeIt = interception.response.body[0].Events[index].ParticipantAway;
            const matchGame = interception.response.body[0].Events[index].Name;
            cy.wrap(matchGame).as('matchGame')// Array to get the match game
            cy.wrap(betMadeIt).as('betMadeIt')// Array to get the away participant from the match
        })

        cy.get('@betMadeIt').then((name) => {
            //Verify the content from the match
            cy.get(sbGrid + bckGrColor).contains(name, { matchCase: false })
            // Get the button who contains #2 and click it
            cy.get(bttnContent).filter(':visible').contains('2').eq(index).click({ force: true })//Force true is present because is a ion element
            cy.wait(5000)// This wait is for the cookies prompt
            cy.get('.closeModal > .md').click({ multiple: true })// Miltiple true is because de presence of multiples prompts
            cy.get(bttnContent).contains('2').eq(index).parent().should('have.css', 'background-color', 'rgb(121, 192, 0)')
            //**** Check that is the correct match
            cy.get(idTicket).contains(name).should('be.visible')
            //Ingresar con el within al sb-grid-item--bets
        })

        cy.get('@matchGame').then((name) => {
            cy.get(ticktSelect + colorGrey).contains(name)
        })

    })
})

