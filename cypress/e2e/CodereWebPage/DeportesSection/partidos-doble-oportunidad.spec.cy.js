/// <reference types="cypress" />

import { General } from "../../General/general.po"

/**
 * @des 
 * @link 
 * @author Frank Marcano
 */

const menuLat = '[class^="menuLatDestacados"]'
//const sideBarName = 'Primera División' - No es escalable
const keyIndex = 0
const keyIndexDO = 1
const sbGridItem = '.sb-grid-item--row'
const backGrColr = '.background-color-light'
const bttnContent = '.sb-button--content'
//Types of beats swiper wrapper
const buttonSwipperSlid = '.sb-tabs-categories-swiper--slide'



describe('Making a beat on "Primera Division", principal', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/NavigationService/LeftMenu/GetMenuLeft').as('getMenuLeft')
        cy.intercept('GET', '**/NavigationService/Event/GetEvents?parentId=2817453712&gameTypes=1;18').as('firstCategoryLeague')
        cy.intercept('GET', '**/NavigationService/Category/GetCategoriesByLeague?parentid=2817453712').as('typeofBets')   
        cy.intercept('GET', '**/NavigationService/Event/GetEvents?parentId=2817453712&category=2').as('squareOfBet')
    })

    it('Click on (partido principal) and then click on first macht', () => {
        //Visit the home page
        cy.visit(General.homePage)
        //Do a wait to intercept the response of the GET
        cy.wait('@getMenuLeft').then((category) => {
            const firstCatMenLft = category.response.body.highlightsConfig[0].LeagueName;
            cy.wrap(firstCatMenLft).as('firsCatLeftMenu')
        })
        //Select the first event of the left bar menu
        cy.get('@firsCatLeftMenu').then((categ)=>{
            cy.get(menuLat).wait(1500).contains(categ).and('be.visible').click().wait(1000)
        })
        //Select and click the bet
        cy.wait('@firstCategoryLeague').then((interception) => {
            const firstGame = interception.response.body[keyIndex].Name;
            const localTeam = interception.response.body[keyIndex].ParticipantHome;
            cy.wrap(firstGame).as('gameForbet')
            //Select the element who contain the Name
            cy.get(sbGridItem + backGrColr).contains(localTeam, { matchCase: false })
            //Select the first element from the grid wich contain the games 
            cy.get(bttnContent).filter(':visible').contains('2').eq(keyIndex).click({ force: true })
            //Close the sign in prompt
            cy.get('.backgroundheader > .closeModal > .md').click({ force: true })
            //Close the cookies prompt
            cy.wait(300)
            cy.get('.closeModal > .md').as('bttnClick').click()
            // Repeat the process of going to 'First Game'
            cy.get('@firsCatLeftMenu').then((categ)=>{
                cy.get(menuLat).wait(1500).contains(categ).and('be.visible').click().wait(1000)
            })
            // 
        })

    })

    it.only('Doble oportunidad - first macht', () => {
        //Visit primera division 
        cy.visit(General.homePage)
        //Do a wait to intercept the response of the GET
        cy.wait('@getMenuLeft').then((category) => {
            const firstCatMenLft = category.response.body.highlightsConfig[0].LeagueName;
            cy.wrap(firstCatMenLft).as('firsCatLeftMenu')
        })
        //Select the first event of the left bar menu
        cy.get('@firsCatLeftMenu').then((categ)=>{
            cy.get(menuLat).wait(1500).contains(categ).and('be.visible').click().wait(1000)
        })
      
        //Click on 'Doble oportunidad'
        // Mapear el reponse de la API para acceder al 'doble oportunidad'
        cy.wait(200)
        cy.wait('@typeofBets').then((bet) => {
            const betName = bet.response.body[3].CategoryName;
            cy.wrap(betName).as('chosenBet')
            cy.get(buttonSwipperSlid).contains(betName, { matchCase: false }).click()
            cy.wait(1000)
        })
        //Select the element with the bet
        cy.wait('@squareOfBet').then((square) =>{
            const squareBet = square.response.body[0].Games[0].Results[keyIndexDO].Name;
            //Select the first element from the grid wich contain the games 
            cy.get(bttnContent).filter(':visible')/* .contains('1 / X', { matchCase: false }) */
            .eq(keyIndexDO).click({ force: true })
            cy.closeModal()
            //Do the asertion for the side square
            cy.get(General.ticktSelect + General.mdOnlive + General.hydratedOnLive)
            .contains(squareBet, { matchCase: false }).should('be.visible')
        })
        


    })

})