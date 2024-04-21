context('Hover', () => {
  const elements = {
    hover: 'component-hover a',
  };

  beforeEach(() => cy.visit('/hover'));

  it('should set variables on hover', () => {
    cy.get(elements.hover).should('be.visible').and('not.have.attr', 'style');
    cy.get(elements.hover)
      .click()
      .should('have.attr', 'style', '--x: -500px; --y: -25.53125px;');
  });
});
