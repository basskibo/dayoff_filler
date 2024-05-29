// cypress/integration/dayoff_spec.js

describe('Day Off Platform Automation', () => {
  it('Logs in and adds a day off', () => {
    // Visit the Day Off platform login page
    cy.visit('https://tracker.day-off.app/auth/login');

    // Select the login type (Company or Employee)
    cy.get('input[data-cy="loginType-company"]').check(); // or 'loginType-employee'

    // Fill in the email and password
    cy.get('input[data-cy="email"]').type('hr@company.com');
    cy.get('input[data-cy="password"]').type('your_password');

    // Submit the login form
    cy.get('button[data-cy="login_signin"]').click();

    // Wait for the login to complete and redirect
    cy.url().should('include', '/dashboard');

    // Navigate to the calendar or day off section
    cy.contains('Calendar').click();

    // Fill out the form to add a day off
    cy.get('input[name="date"]').type('2024-06-01'); // Adjust the selector as needed
    cy.get('textarea[name="reason"]').type('Vacation'); // Adjust the selector as needed
    cy.get('button[type="submit"]').click();

    // Verify that the day off has been added
    cy.contains('Day off successfully added').should('be.visible');
  });
});
