describe('add to cart', () => {
  it('should allow me to add a product to the cart', () => {
    cy.visit('/')
      .contains('Multi-Vibe')
      .click({force: true})
      .wait(500)
      .findByText(/add to cart/i)
      .click({force: true})
      .findByText(/added to cart/i)
  })
})
