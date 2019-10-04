describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .findByText(/terms/i)
      .click()
      .findByText(/lorem ipsizzle/i)
  })
})
