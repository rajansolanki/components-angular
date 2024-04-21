context('Loading bar', () => {
  const elements = {
    loadingBar: 'component-loading-bar > div',
    buttonLoading: '#button-loading',
    buttonError: '#button-error',
    buttonIdle: '#button-idle',
  };

  beforeEach(() => cy.visit('/loading-bar'));

  it('should display status', () => {
    cy.get(elements.loadingBar).should('be.visible');
    cy.get(elements.buttonLoading).click();
    cy.get(elements.loadingBar)
      .should('be.visible')
      .and('have.class', 'loading');
    cy.get(elements.buttonError).click();
    cy.get(elements.loadingBar).should('be.visible').and('have.class', 'error');
    cy.get(elements.buttonIdle).click();
    cy.get(elements.loadingBar).should('be.visible').and('have.class', 'idle');
  });
});
