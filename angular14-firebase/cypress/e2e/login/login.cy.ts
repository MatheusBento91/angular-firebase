describe('doing login in the app', () => {
  it('check login title', () => {
    cy.visit('/', { timeout: 30000 });
    cy.contains('h2', 'Login');
  });

  it('doing a invalid login', () => {
    cy.get('#email')
      .type('user@gmail.com')
      .should('have.value', 'user@gmail.com');
    cy.get('#password').type('1234567').should('have.value', '1234567');
    cy.get('#login-button').click();
    cy.wait(5000);
    cy.contains('h2', 'Login');
  });

  it('doing a valid login', () => {
    cy.get('#hide-button').click();
    cy.get('#password').clear().type('123456').should('have.value', '123456');
    cy.get('#login-button').click();
    cy.contains('h1', 'Open recruiter');
  });
});
