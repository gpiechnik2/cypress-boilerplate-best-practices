

export default class RegisterPage {
    pathname = '/signup'
    firstNameInput = '#firstName'
    lastNameInput = '#lastName'
    usernameInput = "#username"
    passwordInput = "#password"
    confirmPasswordInput = "#confirmPassword"
    signUpButton = '[data-test="signup-submit"]'

    visit() {
        cy.visit(this.pathname)
    }

    fillFirstNameInput(firstName: string) {
        cy.get(this.firstNameInput).type(firstName)
    }

    fillLastNameInput(lastName: string) {
        cy.get(this.lastNameInput).type(lastName)
    }

    fillUsernameInput(username: string) {
        cy.get(this.usernameInput).type(username)
    }

    fillPasswordInput(password: string) {
        cy.get(this.passwordInput).type(password)
    }

    fillConfirmPasswordInput(confirmPassword: string) {
        cy.get(this.confirmPasswordInput).type(confirmPassword)
    }

    focusFirstNameInput() {
        cy.get(this.firstNameInput).focus();
    }

    focusLastNameInput() {
        cy.get(this.lastNameInput).focus();
    }

    focusUsernameInput() {
        cy.get(this.usernameInput).focus();
    }

    focusPasswordInput() {
        cy.get(this.passwordInput).focus();
    }

    focusConfirmPasswordInput() {
        cy.get(this.confirmPasswordInput).focus();
    }

    focusSignUpButton() {
        cy.get(this.signUpButton).focus()
    }

    clickSignUpButton() {
        cy.get(this.signUpButton).click()
    }

    fillValidRegisterForm(firstName: string, lastName: string, username: string, password: string, confirmPassword: string) {
        this.fillFirstNameInput(firstName)
        this.fillLastNameInput(lastName)
        this.fillUsernameInput(username)
        this.fillPasswordInput(password)
        this.fillConfirmPasswordInput(confirmPassword)
    }

    fillInvalidRegisterForm(
        firstName: string | null,
        lastName: string | null,
        username: string | null,
        password: string | null,
        confirmPassword: string | null
    ) {
        if (firstName) {
            this.fillFirstNameInput(firstName)
        } else {
            this.focusFirstNameInput()
        }

        if (lastName) {
            this.fillLastNameInput(lastName)
        } else {
            this.focusLastNameInput()
        }

        if (username) {
            this.fillUsernameInput(username)
        } else {
            this.focusUsernameInput()
        }

        if (password) {
            this.fillPasswordInput(password)
        } else {
            this.focusPasswordInput()
        }

        if (confirmPassword) {
            this.fillConfirmPasswordInput(confirmPassword)
        } else {
            this.focusConfirmPasswordInput()
        }

        this.focusSignUpButton()
    }
    
    firstNameIsRequiredTextShouldBeVisible() {
        cy.softAssert(() => {
            cy.contains('First Name is required').should('be.visible');
        }, 'First Name is required text should be visible');
    }

    lastNameIsRequiredTextShouldBeVisible() {
        cy.softAssert(() => {
            cy.contains('Last Name is required').should('be.visible');
        }, 'Last Name is required text should be visible');
    }

    usernameIsRequiredTextShouldBeVisible() {
        cy.softAssert(() => {
            cy.contains('Username is required').should('be.visible');
        }, 'Username is required text should be visible');
    }

    passwordsDoesNotMatchTextShouldBeVisible() {
        cy.softAssert(() => {
            cy.contains('Password does not match').should('be.visible');
        }, 'Password does not match text should be visible');
    }

    confirmYourPasswordTextShouldBeVisible() {
        cy.softAssert(() => {
            cy.contains('Confirm your password').should('be.visible');
        }, 'Confirm your password text should be visible');
    }

    signUpButtonShouldBeDisabled() {
        cy.softAssert(() => {
            cy.get(this.signUpButton).should('have.attr', 'disabled');
        }, 'Sign up button should be disabled');
    }
} 
