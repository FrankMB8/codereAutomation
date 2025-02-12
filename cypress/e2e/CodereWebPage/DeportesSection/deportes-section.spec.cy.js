    /// <reference types="cypress" />

    /**
     * @des 
     * @link 
     * @author Frank Marcano
     */
const menuLat = '[class^="menuLatDestacados"]'
const homePageDeportes = 'https://m.apuestas.codere.es/deportes/#/HomePage'
const todayDeportes = '[class="codere-icon icon-calendar"]'
const calendarNavBarDate = '.sb-calendar-navbar--day'
const colorPrimary = '.color-primary'
const swiperWrapper = '.sb-tabs-categories-swiper--container'
const leftMenuOpen = '.leftMenuOpen'
const md = '.md'
const hydrated = '.hydrated'

describe('Checking UI in Deportes Section', () => {
    //Action who must do cypress afect every test
    beforeEach(() => {
        //Visit Codere homePage
        cy.visit(homePageDeportes)
        //Interception of the API
        cy.intercept('GET', '**/GetCountriesByDate?utcOffsetHours=0&dayDifference=0&sporthandle=soccer').as('getCountriesByDateSoccer')
        cy.intercept('GET', '**/GetCountriesByDate?utcOffsetHours=0&dayDifference=0&sporthandle=tennis').as('getCountriesByDateTenis')
        cy.intercept('GET', '**/GetCountriesByDate?utcOffsetHours=0&dayDifference=0&sporthandle=basketball').as('getCountriesByDateBasket')
    })

    it('Cheking DEPORTES section', () => {
        // TODAY section
        cy.get(todayDeportes).eq(1).click().wait(500)
         //STYLES TESTS 
        cy.get(calendarNavBarDate + colorPrimary).contains('HOY').and('have.css', 'color', 'rgb(121, 192, 0)')
        cy.get(`${calendarNavBarDate}${colorPrimary}`).contains('HOY').and('have.css', 'color', 'rgb(121, 192, 0)')
        cy.get(swiperWrapper).contains('fútbol').should('be.visible').and('have.css', 'color', 'rgb(51, 63, 72)')
        cy.get(swiperWrapper).contains('tenis').should('be.visible').and('have.css', 'color', 'rgb(127, 134, 139)')
        cy.get(swiperWrapper).contains('baloncesto').should('be.visible').and('have.css', 'color', 'rgb(127, 134, 139)')
        cy.get(swiperWrapper).contains('tenis').realHover().wait(500).should('have.css', 'color', 'rgb(51, 63, 72)')

        // Take the GET from the API, Then intercep the response, and go to the Body
        cy.get('@getCountriesByDateSoccer').then((interception) => {
            const leaguesByDate = interception.response.body;
            const todaySoccerName = leaguesByDate.flatMap((body) => body.Leagues.map((league) => league.Name))
            //Wrap is used to save the transformation of the array in one value
            cy.wrap(todaySoccerName).as('todaySoccerNames')
        })
        //Take the array previously transformed and then *****
        cy.get('@todaySoccerNames').then((todaySoccerName) => {
            todaySoccerName.forEach((todayName) => {
                //Access to the element from the web page who take us to the table were are the secctions of sports
                cy.get(leftMenuOpen + md + hydrated).wait(1500).contains(todayName)/*.and('be.visible')*/.click()
            })

        })
    })    
}) 

