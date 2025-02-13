/// <reference types="cypress" />

import { General } from "../../General/general.po"

/**
 * @des 
 * @link 
 * @author Frank Marcano
 */

const home = 'https://m.apuestas.codere.es/deportesEs/#/HomePage'
const btSignup = '.btSignUp'
const barButton = '.bar-button'
const barBUttonMd = '.bar-button-md'
const barButtDflt = '.bar-button-default'
const barButtDfltMd = '.bar-button-default-md'
const closemChMd = '.closeModal > .md'
//GenderButtons
const ionListRad = '.ion-list-radio'
const ngUntouched = '.ng-untouched'
const ngPristine = '.ng-pristine'
const ngValid = '.ng-valid'
const listMd = '.list-md'
const hydrated = '.hydrated'
const gender = 'Hombre'

//titles
const nameForm = 'Nombre'
const primerApellido = 'Primer Apellido'
const segundoApellido = 'Segundo Apellido'
const anio = 'Año'
const dni = 'NIE'
const direccion = 'Dirección'
const codPostal = 'Código Postal'
const movil = 'Móvil'
const Email = 'Email'
const user = 'Usuario'
const passw = 'Contraseña'
//Titles Assertions
const lblTxt = '.label-text'
const ionInpt = '.sc-ion-input-md'
//For demographic Data
const defaultSpan = '.default-span'
const greenText = '.green-text'
const green = '.green'
//For select elements
const labelText = '.labelselect'
const flotaing = '.floating'
//EndRegister Buttons
const confirm = '#confirm'// Button for accept the therm and conditions
const endRegister = '#endRegister'


beforeEach(() => {
    cy.visit(home)
})
// Hacer de un método el get para el assertion de los campos 1
describe('Filling the form', () => {
    it.only('Verify that all the fields work correctly', () => {
        //Visit the home Page and select the form
        cy.get(btSignup + barButton + barBUttonMd + barButtDflt + barButtDfltMd).click()
        cy.wait(2000)// This wait is for the cookies prompt
        cy.get(closemChMd).click({ multiple: true })
        cy.get(btSignup + barButton + barBUttonMd + barButtDflt + barButtDfltMd).click()
        cy.get(ionListRad + ngUntouched + ngPristine + ngValid + General.mdOnlive + listMd + hydrated).contains(gender).click({ force: true })
        cy.get('.alert-button-role-cancel > .alert-button-inner').click()
        //Identification data
        cy.fillIn(nameForm, 'Frank', 0)
        //***First Changes of the comands
        cy.fillIn(primerApellido, 'Marcano', 1)
        //Assertion for field: nameForm
        cy.get(lblTxt + ionInpt).eq(0).contains(nameForm).should('be.visible').and('have.css', 'color', 'rgb(121, 192, 0)')
        cy.fillIn(segundoApellido, 'Bruzual', 2)
        //Assertion for field: primerApellido
        cy.get(lblTxt + ionInpt).eq(1).contains(primerApellido).should('be.visible').and('have.css', 'color', 'rgb(121, 192, 0)')
        cy.get('select').eq(0).select('15')
        //Assertion for field: segundoApellido
        cy.get(lblTxt + ionInpt).eq(2).contains(segundoApellido).should('be.visible').and('have.css', 'color', 'rgb(121, 192, 0)')
        //***Demographic Data
        cy.get('select').eq(1).select('Julio', { force: true })
        cy.fillIn(anio, '1996', 3)
        cy.get('select').eq(2).select('Residente en España', { force: true })
        //**Assertion for: Año & Demographic data
        cy.get(lblTxt + ionInpt).eq(3).contains(anio).should('be.visible').and('have.css', 'color', 'rgb(121, 192, 0)')
        cy.get(defaultSpan + greenText).contains(' Fecha de nacimiento ').should('be.visible').and('have.css', 'color', 'rgb(121, 192, 0)')
        cy.get('select').eq(3).select('Venezolano', { force: true })
        cy.get('select').eq(4).select('Deporte y educación física', { force: true })
        //**Assertion for: Residencia
        cy.get(labelText + flotaing + greenText).eq(0).contains('Residencia').should('be.visible').and('have.css', 'color', 'rgb(121, 192, 0)')

        // Personal information
        cy.fillIn(dni, '25625745', 4)
        //**Assertion for: profesion
        cy.get(labelText + flotaing + green).eq(0).contains('Profesión').should('be.visible').and('have.css', 'color', 'rgb(121, 192, 0)')
        //CONTINUE*****
        // cy.get(lblTxt + ionInpt).eq(3).contains(anio).should('be.visible').and('have.css', 'color', 'rgb(121, 192, 0)')

        cy.fillIn(direccion, 'Independencia 466', 5)
        cy.fillIn(codPostal, '30008', 6)
        cy.fillIn(movil, '670760898', 7)

        //User Data
        cy.fillIn(Email, 'Fmarcano038@gmail.com', 8)
        cy.fillIn(user, 'FrankieElLoco', 9)
        cy.fillIn(passw, 'Cypress$', 10)
        cy.get(confirm).click()
        cy.get(endRegister)

        /*Things to do:
        1- the asertions from every field
        2- verify the letters which are typed just for an example
        3- 
        */
    })
})