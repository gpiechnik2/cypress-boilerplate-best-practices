import { faker } from '@faker-js/faker';
import HomePage from 'cypress/pages/home';

import LoginPage from "cypress/pages/login"
import RegisterPage from "cypress/pages/register";

const registerPage = new RegisterPage();
const loginPage = new LoginPage()
const homePage = new HomePage()

describe('When the user navigates to the login page', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('User is able to log in with valid credentials', { tags: '@smoke' }, () => {
    loginPage.fillUsernameInput(Cypress.env('freeUser').username)
    loginPage.fillPasswordInput(Cypress.env('freeUser').password)
    loginPage.clickSubmitButton()
    homePage.userShouldBeOnPage()
    homePage.titleShouldExist()

    cy.resolveSoftAsserts()
  })

  it('User is not able to log in with an invalid username', { tags: '@medium' }, () => {    
    loginPage.fillUsernameInput(faker.internet.username())
    loginPage.fillPasswordInput(Cypress.env('freeUser').username)
    loginPage.clickSubmitButton()
    loginPage.usernameOrPasswordIsInvalidMessageIsVisible()

    cy.resolveSoftAsserts()

  })

  it('User is not able to log in with an invalid password', { tags: '@medium' }, () => {
    loginPage.fillUsernameInput(Cypress.env('freeUser').username)
    loginPage.fillPasswordInput(faker.internet.password())
    loginPage.clickSubmitButton()
    loginPage.usernameOrPasswordIsInvalidMessageIsVisible()
    
    cy.resolveSoftAsserts()
  })
})

describe('When the user navigates to the registration page', () => {
  beforeEach(() => {
    registerPage.visit();
  });

  it('User is able to register with valid credentials', { tags: '@smoke' }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const username = faker.internet.username()
    const password = faker.internet.password()

    registerPage.fillValidRegisterForm(firstName, lastName, username, password, password)
    registerPage.clickSignUpButton()
    loginPage.userShouldBeOnPage()

    cy.resolveSoftAsserts()
  });

  it('User is not able to register with mismatched passwords', { tags: '@low' }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const username = faker.internet.username()
    const password = faker.internet.password()
    const confirmPassword = faker.internet.password()

    registerPage.fillInvalidRegisterForm(firstName, lastName, username, password, confirmPassword)
    registerPage.passwordsDoesNotMatchTextShouldBeVisible()
    registerPage.signUpButtonShouldBeDisabled()

    cy.resolveSoftAsserts()
  });

  it('User is not able to register with a missing first name', { tags: '@low' }, () => {
    const firstName = ''
    const lastName = faker.person.lastName()
    const username = faker.internet.username()
    const password = faker.internet.password()

    registerPage.fillInvalidRegisterForm(firstName, lastName, username, password, password)
    registerPage.firstNameIsRequiredTextShouldBeVisible()
    registerPage.signUpButtonShouldBeDisabled()

    cy.resolveSoftAsserts()
  });

  it('User is not able to register with a missing last name', { tags: '@low' }, () => {
    const firstName = faker.person.firstName()
    const lastName = ''
    const username = faker.internet.username()
    const password = faker.internet.password()

    registerPage.fillInvalidRegisterForm(firstName, lastName, username, password, password)
    registerPage.lastNameIsRequiredTextShouldBeVisible()
    registerPage.signUpButtonShouldBeDisabled()

    cy.resolveSoftAsserts()
  });

  it('User is not able to register with a missing username', { tags: '@low' }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const username = ''
    const password = faker.internet.password()

    registerPage.fillInvalidRegisterForm(firstName, lastName, username, password, password)
    registerPage.usernameIsRequiredTextShouldBeVisible()
    registerPage.signUpButtonShouldBeDisabled()

    cy.resolveSoftAsserts()
  });

  it('User is not able to register with a missing confirm password', { tags: '@low' }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const username = faker.internet.username()
    const password = faker.internet.password()
    const confirmPassword = ''

    registerPage.fillInvalidRegisterForm(firstName, lastName, username, password, confirmPassword)
    registerPage.confirmYourPasswordTextShouldBeVisible()
    registerPage.signUpButtonShouldBeDisabled()

    cy.resolveSoftAsserts()
  });
});
