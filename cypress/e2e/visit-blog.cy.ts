/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

const BASE_URL = 'http://localhost:3000';
const CHECKING_POST_URL =
  '/post/microfrontends:-microservices-for-the-frontend818';

describe('Navigation', () => {
  it('should navigate to a blog page', () => {
    // Start from the index page
    cy.visit(BASE_URL);

    // Find a link with an href attribute containing the below URL and click it
    cy.get(`a[href*='${CHECKING_POST_URL}']`).click({ force: true });

    // The new post page should contain an input with placeholder "Article Title"
    cy.get('div[placeholder*="Article Title..."]').should(
      'have.text',
      'Microfrontends: Microservices for the Frontend'
    );
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
