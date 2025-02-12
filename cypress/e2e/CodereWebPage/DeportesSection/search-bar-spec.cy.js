/// <reference types="cypress" />

/**
 * @des 
 * @link 
 * @author Frank Marcano
 */
const homePageSearchBar = 'https://m.apuestas.codere.es/deportes/#/HomePage'
const destacadosItemContent = '.destacados--item-content'
const fullWidthInput = '.full-width-input'
const serchIcon = '.native-input'
const ionInput = '.sc-ion-input-md'
const inputClear = '.input-clear-icon' 
const ionMd = '.sc-ion-input-md'
const itemContentName = '.search-accordion--item-content-name'

//Methods
const searchAndSelect = ((search, nmb) => {
    /*
    Intercept the GET and save as/ it have 2 parameters, 
    the first represent the value extracted from the maping of the GET response
    The second one is for the ramdom search of any text 
    */
    cy.intercept('GET', '**/FreeTextSearch*').as(`getTextSearch${nmb}`)
    // The previuos sintax is a coincidence patron to search any URL 
    // on the web page wich star with 'any' have in the middle /freeTextSearch and in the end a '*' to search any data 

   //Mapind the response so that we can make operation with it
    cy.wait(`@getTextSearch${nmb}`).then((interception) => {
        const freeTextsearch = interception.response.body;
        const selectedSearch = freeTextsearch.map((body) => body.Name)
        cy.wrap(selectedSearch).as(search)
        /*
        The nick name is represented by 'any', because on the test we do different 
        types of searching so we have to avoid to save differents names in the same nickName
        */
    })
    //Method for select the results from the search
    cy.get(`@${search}`).then((names)=>{
        names.forEach((name)=>{
        //The parameter is the DOM element were are the results
            cy.get(itemContentName).contains(name)
        })
    })
})
// Method for click on the 'x' and delete the typed search
const deleteSearch = (()=>{
    cy.get(inputClear + ionMd ).click().wait(1000)
})

describe('SearchBar test', () => {
beforeEach(()=>{
    cy.visit(homePageSearchBar)
    cy.intercept('GET', '**/FreeTextSearch*').as('getTextSearch')
})

it('Search Bar testing', () => {
    // We create cy.searching as a COMMAND
    cy.searching('---**+$$Q[_#WQ', serchIcon + ionInput )
    // Deleting the typed words
    deleteSearch()
    
    cy.searching('123475874124', serchIcon + ionInput)
    // Deleting the typed words
    deleteSearch()
    
    cy.searching('Fc Barcelona', serchIcon + ionInput)
    // Deleting the typed words
    deleteSearch()

    cy.searching('futbol', serchIcon + ionInput)
    searchAndSelect('resultsFutbol', '1') 
    deleteSearch()

    cy.searching('España', serchIcon + ionInput)
    searchAndSelect('resultsEspania', '2')
    deleteSearch()



})
})