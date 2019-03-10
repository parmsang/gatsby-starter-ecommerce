describe('add to cart', () => {
  it('should allow me to add a product to the cart', () => {
    cy.visit('/')
      .waitForRouteChange()
      .getByText(/multi-vibe/i)
      .click({force: true})
      .waitForRouteChange()
      .getByText(/add to cart/i)
      .click({force: true})
      .getByText(/added to cart/i)
  })
})
