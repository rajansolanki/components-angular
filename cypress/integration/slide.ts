context('Slide', () => {
  const elements = {
    slide: 'component-slide > div',
    slideVariantSelect: 'component-slide select',
    slideImageContainer: 'component-slide component-image > div',
    slideImage: 'component-slide component-image img',
  };

  beforeEach(() => cy.visit('/slide'));

  it('should display variants', () => {
    cy.get(elements.slide).should('be.visible');
    cy.get(elements.slideVariantSelect)
      .and('contain', 'Blue')
      .and('contain', 'Black')
      .find(':selected')
      .contains('Blue');
    cy.get(elements.slideImageContainer).should('have.class', 'loaded');
    cy.get(elements.slideImage).should('be.visible');
    cy.get(elements.slideVariantSelect).select('Black');
    cy.get(elements.slideImageContainer).should('have.class', 'loading');
    cy.get(elements.slideImageContainer).should('have.class', 'loaded');
  });
});
