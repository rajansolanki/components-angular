context('Masonry', () => {
  const elements = {
    masonry: 'component-masonry img',
  };

  beforeEach(() => cy.visit('/masonry'));

  it('should display images', () => {
    cy.get(elements.masonry).should('have.length', 5).and('be.visible');
  });
});
