// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

const registerCypressGrep = require('@bahmutov/cy-grep')
registerCypressGrep()

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Performs a soft assertion, collecting failures but not stopping the test.
             * @param assertionFn The assertion function to execute.
             * @param errorMessage Optional custom error message to log on failure.
             */
            softAssert(assertionFn: () => void, errorMessage?: string): void;

            /**
             * Resolves all soft assertions collected during the test.
             * If there are any failures, the test will fail at this point.
             */
            resolveSoftAsserts(): void;

            /**
             * Authenticates a user by using stored cookies or logging in via an API request.
             */
            authenticate(): void;

            /**
             * Activates or Creates a session by its name.
             * This method restores the session's state for the specified user or context.
             * 
             * @param sessionName - The name of the session to activate.
             */
            useSession(sessionName: string): void;
        }
    }
}

before(() => {
    // BUG: https://github.com/cypress-io/cypress/issues/26154
    cy.visit("/")

    // Generate sessions for different user roles
    cy.useSession("free")
    cy.useSession("premium")

    // There is a feature (bug) in Cypress where after executing the "before" hook, 
    // the session from the before hook is carried over to the next test scenario. 
    // Because of this, we need to clear the session in such a way as to avoid unintended effects.
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
})
