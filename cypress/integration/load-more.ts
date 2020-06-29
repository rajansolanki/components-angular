context('Load more', () => {
  const elements = {
    loadMore: 'component-load-more > div',
    loadMoreHexagon: 'component-load-more #hexagon',
    loadMoreButton: 'component-load-more button',
    buttonLoading: '#button-loading',
    buttonError: '#button-error',
    buttonIdle: '#button-idle',
    retryClicked: '#retry-clicked',
  };

  beforeEach(() => cy.visit('/load-more'));

  it('should display loading cycle', () => {
    cy.get(elements.loadMore).should('be.visible');

    cy.get(elements.buttonLoading).click();
    cy.get(elements.loadMoreHexagon)
      .should('be.visible')
      .and('have.class', 'loading');
    cy.get(elements.loadMoreButton).should('not.be.visible');

    cy.get(elements.buttonError).click();
    cy.get(elements.loadMoreHexagon).should('not.be.visible');
    cy.get(elements.loadMoreButton).should('be.visible');
    cy.get(elements.retryClicked).should('not.be.visible');
    cy.get(elements.loadMoreButton).click();
    cy.get(elements.retryClicked).should('be.visible');

    cy.get(elements.buttonIdle).click();
    cy.get(elements.loadMoreHexagon).should('be.visible').and('not.have.class');
    cy.get(elements.loadMoreButton).should('not.be.visible');
  });
});
