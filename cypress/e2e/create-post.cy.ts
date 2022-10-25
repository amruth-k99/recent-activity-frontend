/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// describe('Blog Creation', () => {
//   it('should navigate to the /create page', () => {
//     // Start from the index page
//     cy.visit('http://localhost:3000/');

//     // Find a link with an href attribute containing "create" and click it
//     cy.get('a[href*="post/create"]').click();

//     // The new url should include "/about"
//     cy.url().should('include', '/create');

//     // The new post page should contain an input with placeholder "Article Title"
//     cy.get('input[placeholder*="Article Title..."]').type('New Blog Testing');

//     // The new post page should contain an input with placeholder "Blog Starts Here..."
//     cy.get('textarea[name="content"]').type(
//       'Content of the blog'
//     );

//     cy.get('input[name="tags"]').type(
//       'new,blog,testing,react,redux,redux-saga'
//     );

//     cy.get('button[id="create-post"]').click();
//   });
// });

// Prevent TypeScript from reading file as legacy script
export {};
