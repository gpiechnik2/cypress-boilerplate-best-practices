// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { faker } from '@faker-js/faker';
import AuthAPI from 'cypress/apis/auth';
import LoginPage from "cypress/pages/login"
import RegisterPage from "cypress/pages/register";

const registerPage = new RegisterPage();
const loginPage = new LoginPage()
const authAPI = new AuthAPI()


// Soft Assertions
let softAssertFailures: string[] = [];

Cypress.Commands.add('softAssert', (assertionFn: () => void, errorMessage?: string) => {
    try {
        assertionFn();
    } catch (error: any) {
        const message = errorMessage || error.message;
        softAssertFailures.push(message);
        cy.log(`Soft assertion failed: ${message}`);
    }
});

Cypress.Commands.add('resolveSoftAsserts', () => {
    if (softAssertFailures.length > 0) {
        const errorMessages = softAssertFailures.join('\n');
        softAssertFailures = [];
        throw new Error(`Soft assertions failed:\n${errorMessages}`);
    }
});


// Sessions Management
Cypress.Commands.add('useSession', (sessionName) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const username = faker.internet.username()
    const password = faker.internet.password()

    switch (sessionName) {
        case 'free': {
            cy.session("free", () => {
                authAPI.createUser({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password,
                    confirmPassword: password
                })

                // it should also made via API, but for testing purposes i skipped it
                // for production and in terms of best practices it should be made via api
                loginPage.visit()
                loginPage.fillUsernameInput(username)
                loginPage.fillPasswordInput(password)
                loginPage.clickSubmitButton()
            }, {
                cacheAcrossSpecs: true,
                validate() {
                    // Protected URLs should return a 40x http code if user is unauthorized,
                    // and by default this will cause cy.visit() to fail url
                    cy.visit('/user/settings')
                },
            })

            Cypress.env("freeUser", {
                username: username,
                password: password
            })
        }
        case 'premium': {
            cy.session("premium", () => {
                authAPI.createUser({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password,
                    confirmPassword: password
                })

                // it should also made via API, but for testing purposes i skipped it
                // for production and in terms of best practices it should be made via api
                loginPage.visit()
                loginPage.fillUsernameInput(username)
                loginPage.fillPasswordInput(password)
                loginPage.clickSubmitButton()

                // additional steps for creating premium role
            }, {
                cacheAcrossSpecs: true,
                validate() {
                    // Protected URLs should return a 40x http code if user is unauthorized,
                    // and by default this will cause cy.visit() to fail url
                    cy.visit('/user/settings')
                },
            })
        }
        default: {
            cy.log("Invalid session specified")
        }
    }
});
