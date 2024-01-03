describe('Synonyms Checks', () => {
  it('Should display synonyms in a table with the correct order', () => {
    cy.visit('/')

    cy.intercept('https://api.datamuse.com/words?**').as('synonyms')
    cy.get('[id="synonymsInput"]').type('bird')
    cy.get('[data-testid="Submit"]').click()
    cy.wait('@synonyms').then((synonyms) => {
      cy.get('[data-testid*="synonym-"]').each((element, index) => {
        cy.get(element).should('have.text', synonyms.response.body[index].word)
      })
    })
  })
})
