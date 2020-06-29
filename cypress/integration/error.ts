context('Error', () => {
  const elements = {
    errorApp: 'component-error > #banner-app',
    errorGlobal: 'component-error > #banner-global',
    errorText: 'component-error p',
    errorButtons: 'component-error .banner-actions a',
    buttonApp: '#button-app',
    buttonGlobal: '#button-global',
    buttonReset: '#button-reset',
  };

  beforeEach(() => cy.visit('/error'));

  it('should display errors', () => {
    cy.get(elements.buttonApp).click();
    cy.get(elements.errorApp).should('be.visible');
    cy.get(elements.errorGlobal).should('not.be.visible');
    cy.get(elements.errorText).should('contain.text', 'load products');
    cy.get(elements.errorButtons)
      .should('have.length', 2)
      .and('contain.text', 'Dismiss')
      .and('contain.text', 'Retry');

    cy.get(elements.buttonGlobal).click();
    cy.get(elements.errorGlobal).should('be.visible');
    cy.get(elements.errorApp).should('not.be.visible');
    cy.get(elements.errorText).should('contain.text', 'an error');
    cy.get(elements.errorButtons)
      .should('have.length', 2)
      .and('contain.text', 'Back')
      .and('contain.text', 'Reload');

    cy.get(elements.buttonReset).click();
    cy.get(elements.errorApp).should('not.be.visible');
    cy.get(elements.errorGlobal).should('not.be.visible');
  });
});
