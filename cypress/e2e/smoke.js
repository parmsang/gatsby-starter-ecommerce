describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .getByText(/terms/i)
      .click()
      .getByText(/lorem ipsizzle/i)
  })
})
