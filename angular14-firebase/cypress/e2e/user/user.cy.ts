import '../admin/admin.cy';

describe('check if are on the admin component', () => {
  it('cheking', () => {
    cy.contains('h2', 'Create admin');
  });
});

describe('check the user component', () => {
  it('click in menu', () => {
    cy.get('#menu-button').click();
  });

  it('navigate for user component', () => {
    cy.get(
      '[ng-reflect-router-link="/home/user"] > .mat-list-item-content'
    ).click();
    cy.wait(5000);
    cy.get('.container__btn').contains('Create user');
  });

  it('scroll in list user', () => {
    cy.get('.mat-drawer-content').scrollTo('bottom', {
      duration: 5000,
      easing: 'swing',
    });
    cy.get('.mat-drawer-content').scrollTo('top', {
      duration: 3000,
      easing: 'swing',
    });
  });

  it('click in create user button', () => {
    cy.wait(1000);
    cy.get('.container__btn').click();
    cy.get('.container__title').contains('Create user');
  });

  describe('changed for light mode theme', () => {
    it('change theme', () => {
      cy.wait(1000);
      cy.get('#mat-toggle-theme').click();
    });
  });
});
