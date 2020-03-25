describe('User visits forgot password page', () => {
  it('visits the forgot password page', () => {
    cy.visit('http://localhost:8000/');
    cy.contains('Log In').click();
    cy.url().should('include', '/login');
    cy.contains('Forgot Password?').click();
    cy.url().should('include', '/forgot-password');
  });

  it('enters an email address', () => {
    cy.get('#email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
    cy.contains('Submit').click();
  });

  it('should show a success alert once submitted', () => {
    cy.contains(
      'If your email is found, you will receive an email with next steps for resetting your password.'
    );
  });

  it('can go back to login screen after', () => {
    cy.contains('Back to Login').click();
    cy.url().should('include', '/login');
  });
});
