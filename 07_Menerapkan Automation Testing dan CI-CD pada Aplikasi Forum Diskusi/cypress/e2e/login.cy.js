/* Login End-to-End Test Scenario
  1. should display login page correctly
  2. should display toast message when login fails
  3. should highlight input fields when invalid credentials are entered
  4. should redirect to dashboard page when login is successful
  5. should redirect to register page when register link is clicked
*/

describe('Login page spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.wait(1000);
  });

  it('should display login page correctly', () => {
    cy.get('nav').should('exist');
    cy.get('form').should('exist');
    cy.get('h1').should('exist').contains('Login');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
    cy.get('span').should('exist').contains('Register');
  });

  it('should display toast message when login fails', () => {
    cy.get('input[name="email"]').type('invalid-email@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.get('div[role="status"]').should('exist').contains('Error');
  });

  it('should highlight input fields when invalid credentials are entered', () => {
    cy.get('input[name="email"]').type('invalid-email@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true');
    cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'true');
  });

  it('should redirect to dashboard page when login is successful', () => {
    cy.get('input[name="email"]').type('haruna@gmail.com');
    cy.get('input[name="password"]').type('taksa123');
    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    cy.get('div[role="status"]').should('exist').contains('Success');
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should redirect to register page when register link is clicked', () => {
    cy.get('span').should('exist').contains('Register').click();
    cy.url().should('eq', 'http://localhost:5173/register');
  });
});
