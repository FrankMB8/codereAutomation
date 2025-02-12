/// <reference types="cypress" />
// Agregar las siguientes clases como PO
/*
Clases para añadir a PO
const clsModal = '.closeModal'
const md = '.md'
const hydratated = '.hydrataded'
 '[class^="menuLatDestacados"]'
const bttnContent = '.sb-button--content'
- Luego de añadirlas:
Buscar y reemplazar las que correspondan
Probar si funciona correctamente
Anotar resultados
*/
class General {
    constructor() {
        this.mdOnlive = '.md';
        this.segmentScrillable = '.segment-scrollable';
        this.hydratedOnLive = '.hydrated';
        this.homePage = 'https://m.apuestas.codere.es/deportesEs/#/HomePage';
        //This are for the form
        this.labelText = '.label-text';
        this.scIonMd = '.sc-ion-input-md';
        this.nativeInput = '.native-input';
        this.scIon = '.sc-ion-input-md';
        //Side Square bet
        this.ticktSelect = '.ticket-selection--row'

    }
}

const general = new General();
export { general as General }




