describe('User Logs In', () => {
  it('visits the login page', () => {
    cy.visit('http://localhost:8000/');
    cy.contains('Log In').click();
    cy.url().should('include', '/login');
  });
  it('enters login credentials', () => {
    cy.get('#email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
    cy.get('#password')
      .type('fakepassword')
      .should('have.value', 'fakepassword');
  });

  it('should not redirect the user after failed login', () => {
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/login');
  });
});
