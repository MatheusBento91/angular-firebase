import '../user/user.cy';

describe('check if are on the create user component', () => {
  it('cheking', () => {
    cy.get('.container__title').contains('Create user');
  });
});

describe('check the dashboard component', () => {
  it('click in menu', () => {
    cy.get('#menu-button').click();
  });

  it('navigate for dashboard component', () => {
    cy.get('[ng-reflect-router-link="/home/dashboard"] > .mat-list-item-content').click();
    cy.wait(5000);
    cy.get(':nth-child(1) > .mat-card > h3').contains('Average developers salary')
  });

  it('scroll in dashboard', () => {
    cy.get('.mat-drawer-content').scrollTo('bottom', {
      duration: 5000,
      easing: 'swing',
    });
    cy.get('.mat-drawer-content').scrollTo('top', {
      duration: 3000,
      easing: 'swing',
    });
  });
});
