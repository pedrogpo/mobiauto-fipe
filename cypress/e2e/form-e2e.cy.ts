describe('Fipe form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should display form and submit button', () => {
    cy.get('form').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should disable submit button when form is invalid', () => {
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('should enable submit button when form is valid', () => {
    cy.get('label').contains('Selecione o tipo').next().click()
    cy.get('li.MuiAutocomplete-option').contains('Carro').click()

    cy.get('label').contains('Selecione a marca').next().click()
    cy.get('li.MuiAutocomplete-option').contains('Acura').click()

    cy.get('label')
      .contains('Selecione o modelo')
      .next()
      .should('not.be.disabled')
      .then(($nextElement) => {
        cy.wrap($nextElement).click()
      })

    cy.get('li.MuiAutocomplete-option').contains('Integra GS 1.8').click()

    cy.get('div#mui-component-select-year')
      .contains('Selecione o ano')
      .should('exist')
      .should('not.be.disabled')
      .then(($nextElement) => {
        cy.wrap($nextElement).click()
      })

    cy.get('li.MuiButtonBase-root.MuiMenuItem-root')
      .contains('1992 Gasolina')
      .click()

    cy.get('button[type="submit"]').should('not.be.disabled').click()

    cy.url().should('include', '/fipe/carros/1/1/1992-1')

    cy.get('h1').contains('Acura').should('exist')

    cy.get('p').contains('Integra GS 1.8').should('exist')

    cy.get('p').contains('1992').should('exist')

    cy.get('p').contains('R$ 11.417,00').should('exist')
  })
})
