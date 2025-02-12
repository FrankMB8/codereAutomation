/// <reference types="cypress" />

/**
 * @des 
 * @link 
 * @author Frank Marcano
 */

const onLiveSection = 'https://m.apuestas.codere.es/deportesEs/#/DirectosPage'
// Nav Bar On Live
const mdOnlive = '.md'
const segmentScrillable = '.segment-scrollable'
const hydratedOnLive = '.hydrated'
// Nav SportsName 
const navBarCntryName = '.sb-tabs-categories-swiper'
const navCntryButton = '.sb-tabs-categories-swiper--container'
//Nav Bar countryNames
//'.sb-tabs-categories-swiper--slide'
const tabCategories = '.sb-tabs-categories-swiper--container'
const swipperInitialized = '.swiper-initialized'
const swiperHorizontal = '.swiper-horizontal'
const swiperBackHidden = '.swiper-backface-hidden'
const buttonInner = '.button-inner'
const sbCategories = '.sb-tabs-categories-swiper'
//tabCategories + swipperInitialized + swiperHorizontal + swiperBackHidden - ***Changed class
// Function GET
function getLiveEvents(alias, param) {
    cy.wait(alias).then((interception) => {
        // *** No comprendo muy bien lo que hace esta función
        const sportEventsBody = interception.response.body
        //Sobre todo en esta linea
        const sportEvents = sportEventsBody.find(mName => mName.Name == param).Events
        const countryNames = sportEvents.flatMap((Events) => Events.CountryName)
        const lowerCntrNms = countryNames.map(country => country.toLowerCase())//***
        const uCntrNms = [...new Set(lowerCntrNms)]
        cy.wrap(uCntrNms).as('uCntrNms')
    })
}

describe('Checking the NAVBAR on-live section', () => {
    //Action who must do cypress after every test
    beforeEach(() => {
        cy.visit(onLiveSection)
        cy.intercept('GET', '**/NavigationService/Home/GetLiveEventsBySportHandle*').as('liveEvents')
    })

    it('Verifying On-Live navBar on live section', () => {
        //Method for operate with the Sports on this section
        cy.wait('@liveEvents').then((interception) => {
            const sportLiveEvents = interception.response.body
            const nameLiveEvents = sportLiveEvents.map((eventsNames) => eventsNames.Name)
            cy.wrap(nameLiveEvents).as('sportLiveEvents')
        })

        /*
        Live events are the results were we have the names of every sport and also the country 
        were the page shows the different types of country according to the sports
        */


        cy.get('@sportLiveEvents').then((names) => {
            names.forEach((namei) => {
                // In thin section we are selecting the country names
                cy.get(mdOnlive + segmentScrillable + hydratedOnLive).contains(namei).parent().click().should('have.css', 'color','rgb(121, 192, 0)').wait(200)
                cy.get(mdOnlive + segmentScrillable + hydratedOnLive).scrollTo('right')
                getLiveEvents('@liveEvents', namei)


                cy.get('@uCntrNms').then((countryName) => {
                    countryName.forEach((cntNm) => {
                        cy.get(sbCategories).as('sbCategories')
                        cy.get('@sbCategories').contains(cntNm).should('have.css', 'color', 'rgb(127, 134, 139)')
                        .click({force:true})
                        cy.get(sbCategories).contains(cntNm).should('have.css', 'color', 'rgb(51, 63, 72)')
                        //.trigger('mousemove', { clientX: 300, clientY: 0 })
                        //.trigger('mouseup')
                        
                    })
                })
            })
        })
    })
})
