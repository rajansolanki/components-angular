context('Cart', () => {
  const elements = {
    cart: 'component-cart > app-content',
    cartItemsCount: 'component-cart #items-count',
    cartItems: 'component-cart app-cart-item',
    cartItemsQuantity: 'component-cart app-cart-item .current-quantity',
    cartItemsPlus: 'component-cart app-cart-item .quantity-plus',
    cartItemsMinus: 'component-cart app-cart-item .quantity-minus',
    cartItemsRemove: 'component-cart app-cart-item .item-remove',
    cartCheckoutLink: 'component-cart #link',
  };

  beforeEach(() => cy.visit('/cart'));

  it('should update and remove items', () => {
    cy.get(elements.cart).should('be.visible');
    cy.get(elements.cartItemsCount).should('contain.text', 1);
    cy.get(elements.cartItems).should('have.length', 1);
    cy.get(elements.cartItemsCount).should('contain.text', 2);
    cy.get(elements.cartItems).should('have.length', 2);
    cy.get(elements.cartCheckoutLink).should('not.have.class', 'disabled');
    cy.get(elements.cartItemsQuantity).first().should('have.text', 1);
    cy.get(elements.cartItemsPlus).first().click();
    cy.get(elements.cartCheckoutLink).should('have.class', 'disabled');
    cy.get(elements.cartItemsQuantity).first().should('have.text', 2);
    cy.get(elements.cartCheckoutLink).should('not.have.class', 'disabled');
    cy.get(elements.cartItemsRemove).eq(1).click();
    cy.get(elements.cartCheckoutLink).should('have.class', 'disabled');
    cy.get(elements.cartItemsCount).should('contain.text', 1);
    cy.get(elements.cartItems).should('have.length', 1);
    cy.get(elements.cartCheckoutLink).should('not.have.class', 'disabled');
    cy.get(elements.cartItemsRemove).first().click();
    cy.get(elements.cart).should('not.be.visible');
  });
});
