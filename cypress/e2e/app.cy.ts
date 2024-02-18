describe('Navigation', () => {
  it('should start on the index and find heading', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    cy.get('h1').contains('Hello World');
  });
});
