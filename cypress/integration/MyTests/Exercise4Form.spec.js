

describe('Login into a page', () => {
    beforeEach(() => {

        cy.fixture('example').as('users')

        cy.visit('/sampleapp')

    })


    it('Log in with valid credentials', () => {

        cy.get('@users').then((usuarios) => {
            usuarios.credencialesBuenas.forEach((persona) => {
                let nombre = persona.nombre

                var inputName = '[name="UserName"]'
                var inputPw = '[name="Password"]'

                cy.get(inputName)
                    .type(nombre)
                cy.get(inputName)
                    .should('have.value', nombre)

                cy.get(inputPw)
                    .type(persona.password)

                cy.get('#login')
                    .click()
                    .get('.text-success')
                    .should('contain', 'Welcome')
                cy.get('#login')
                    .click()
                    .get('#loginstatus')
                    .should('have.text', 'User logged out.')
            })
        })


    })

    it('Log in with invalid credentials', () => {

        cy.get('@users').then((usuarios) => {
            usuarios.credencialesFalsas.forEach((persona) => {
                let nombre = persona.nombre

                var inputName = '[name="UserName"]'
                var inputPw = '[name="Password"]'

                cy.get(inputName)
                    .type(nombre)
                cy.get(inputName)
                    .should('have.value', nombre)

                cy.get(inputPw)
                    .type(persona.password)

                cy.get('#login')
                    .click()
                    .get('#loginstatus')
                    .should('contain', 'Invalid username')
                cy.get(inputName).should('be.empty')
                cy.get(inputPw).should('be.empty')
            })
        })
    })

    it('Log in with username field empty', () => {

        cy.get('@users').then((usuarios) => {
            usuarios.credencialesFalsas.forEach((persona) => {
                let nombre = persona.nombre

                var inputName = '[name="UserName"]'
                var inputPw = '[name="Password"]'



                cy.get(inputPw)
                    .type(persona.password)

                cy.get('#login')
                    .click()
                    .get('#loginstatus')
                    .should('contain', 'Invalid username')
                cy.get(inputName).should('be.empty')
                cy.get(inputPw).should('be.empty')
            })
        })

    })

    it('Log in with password field empty', () => {

        cy.get('@users').then((usuarios) => {
            usuarios.credencialesFalsas.forEach((persona) => {
                let nombre = persona.nombre

                var inputName = '[name="UserName"]'
                var inputPw = '[name="Password"]'

                cy.get(inputName)
                    .type(nombre)
                cy.get(inputName)
                    .should('have.value', nombre)

                cy.get('#login')
                    .click()
                    .get('#loginstatus')
                    .should('contain', 'Invalid username')
                cy.get(inputName).should('be.empty')
                cy.get(inputPw).should('be.empty')
            })
        })



    })
})