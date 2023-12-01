 
describe('Fill a form with various types of data', ()=>{
    let inputName
    let inputEmail 
    let inputPhoneNum 
    let selectGender
    let radiusYearsExp 
    let skills
    let qaTools
    let otherDetails
    let submitButton

    beforeEach(()=>{
        // Cuando queremos correr el test, nos tira un exception porque la página carga un anuncio
        // cuyo tamaño no entra en el espacio que tiene la ventana, lo cual hace que nuestros test fallen,
        // por eso agregamos esta linea de código para agrandar el viewport y seguir con los test
        cy.viewport(1280, 720);
        cy.visit("https://qavalidation.com/demo-form/")

         inputName = '#g4072-fullname';
         inputEmail = '#g4072-email';
         inputPhoneNum = '#g4072-phonenumber';
         selectGender = '#g4072-gender'; // #g4072-gender-button
         radiusYearsExp = '.grunion-radio-options [type="radio"]';
         skills = '.grunion-checkbox-multiple-options [type="checkbox"]'; 
         qaTools = '#g4072-qatools'; // #g4072-qatools-button
         otherDetails = '#contact-form-comment-g4072-otherdetails';
         submitButton = '#contact-form-4072 > form > div.wp-block-jetpack-button.wp-block-button > button'
    })

        it('Submit with all fields filled', ()=>{
            cy.get(inputName)
            .type('Candela')
            .should('have.value', "Candela");

            cy.get(inputEmail)
            .type('cande@cande.com')
            .should('have.value', 'cande@cande.com');

            cy.get(inputPhoneNum)
            .type('0303456')
            .should('have.value', '0303456');

            cy.get(selectGender)
            .select('Female', {force: true})
            .should('have.value', 'Female');

            //Otra forma de interactuar con el elemento select, que refleja mejor el comportamiento
            //del usuario

            // cy.get(#g4072-gender-button)
            // .click()
            // .get('#ui-id-2')
            // .click()
            // cy.get('#g4072-gender-button > span.ui-selectmenu-text')
            // .should('have.text', 'Female');

            cy.get(radiusYearsExp)
            .check('2')
            .should('be.checked')

            cy.get(skills)
            .check(['Functional testing', 'Automation testing']).should('be.checked')

            cy.get(qaTools)
            .select('Cypress', {force: true})
            .should('have.value', 'Cypress'); 

            /// Enfoque tratando de emular el comportamiento del usuario, pero sin utilizar
            /// los métodos especificos de cypress para manipular los elementos select.

            // cy.get('#g4072-qatools-button')
            // .click()
            // .get('#ui-id-3')
            // .click()
            // cy.get('#g4072-qatools-button > span.ui-selectmenu-text')
            // .should('have.text', 'Cypress');

            cy.get(otherDetails)
            .type('Some details')
            .should('have.value', 'Some details')

            cy.get(submitButton)
            .click()

            cy.get('#contact-form-success-header')
            .should('have.text', 'Your message has been sent')

        })

        it('Try to submit with required fields only', ()=>{

            cy.get(inputName)
            .type('Candela')
            .should('have.value', "Candela");

            cy.get(inputEmail)
            .type('cande@cande.com')
            .should('have.value', 'cande@cande.com');

            cy.get(submitButton)
            .click()

            cy.get('#contact-form-success-header')
            .should('have.text', 'Your message has been sent')
        })


        it('Try to submit with all fields empty', ()=>{

            ///Utilizando el método submit de cypress, pero esto no refleja el comportamiento
            //real del usuario

            // cy.get('#contact-form-4072 > form')
            // .submit()
           
            // .get('.form-error')
            // .should('contain', 'Error')

            cy.get(submitButton)
            .click()

            // Verificamos que los campos Nombre y Email, tienen el estado :invalid 
            cy.get(inputName)
            .should('match', ':invalid')

            cy.get(inputEmail)
            .should('match', ':invalid')

        })

        it('Try to submit with invalid data type', ()=>{

            cy.get(inputName)
            .type('Candela')
            .should('have.value', "Candela");

            cy.get(inputEmail)
            .type('cande.com')
            .should('have.value', 'cande.com');

            cy.get(submitButton)
            .click()

            cy.get(inputEmail)
            .should('match', ':invalid')
        })

})