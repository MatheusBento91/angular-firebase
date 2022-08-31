import '../login/login.cy';

describe('check if are on the home component', () => {
  it('cheking', () => {
    cy.contains('h1', 'Open recruiter');
  });
});

describe('changed for dark mode theme', () => {
  it('change theme', () => {
    cy.wait(2500);
    cy.get('#mat-toggle-theme').click();
  });
});

describe('check the admin component', () => {
  it('click in menu', () => {
    cy.get('#menu-button').click();
  });

  it('navigate for admin component', () => {
    cy.get(
      '[ng-reflect-router-link="/home/admin"] > .mat-list-item-content'
    ).click();
    cy.contains('h2', 'Create admin');
  });
});
