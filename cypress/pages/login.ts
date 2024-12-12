

export default class LoginPage {
    pathname = '/signin'
    usernameInput = '#username'
    passwordInput = '#password'
    submitButton = '[data-test="signin-submit"]'

    visit() {
        cy.visit(this.pathname)
    }

    userShouldBeOnPage() {
        cy.location('pathname').should('eq', this.pathname)
    }

    fillUsernameInput(username: string) {
        cy.get(this.usernameInput).type(username)
    }

    fillPasswordInput(password: string) {
        cy.get(this.passwordInput).type(password)
    }

    clickSubmitButton() {
        cy.get(this.submitButton).click()
    }

    usernameOrPasswordIsInvalidMessageIsVisible() {
        cy.softAssert(() => {
            cy.contains('Username or password is invalid').should('be.visible');
        }, 'Username or password is invalid message should be visible.');
    }
} 
