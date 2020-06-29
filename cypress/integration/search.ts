context('Search', () => {
  const elements = {
    search: 'component-search input',
    searchClear: 'component-search #clear',
    searchAutocomplete: 'component-search component-autocomplete',
    searchAutocompleteOptions:
      'component-search component-autocomplete component-option',
  };

  beforeEach(() => cy.visit('/search'));

  it('should display autocomplete', () => {
    cy.get(elements.search).should('be.visible').and('not.have.value');
    cy.get(elements.searchClear).should('not.be.visible');
    cy.get(elements.searchAutocomplete).should('not.be.visible');
    cy.get(elements.search).type('pa');
    cy.get(elements.searchClear).should('be.visible');
    cy.get(elements.searchAutocomplete).should('be.visible');
    cy.get(elements.searchAutocompleteOptions)
      .first()
      .should('be.visible')
      .and('contain.text', 'painting')
      .and('not.have.class', 'ng-animating')
      .click();
    cy.get(elements.searchAutocompleteOptions).first().click();
    cy.get(elements.searchAutocomplete).should('not.be.visible');
    cy.get(elements.search).should('have.value', 'painting');
    cy.get(elements.searchClear).click();
    cy.get(elements.searchClear).should('not.be.visible');
    cy.get(elements.search).should('not.have.value');
    cy.get(elements.searchAutocomplete).should('not.be.visible');
  });
});
