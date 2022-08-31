import '../login/login.cy';

describe('doing logout in app', () => {
  it('doing logout', () => {
    cy.contains('h1', 'Open recruiter');
    cy.wait(2500);
    cy.get('#more-vert-button').click();
    cy.get('#log-out-button').click();
    cy.wait(2500);
    cy.contains('h2', 'Login');
  });
});
