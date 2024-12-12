export default class HomePage {
    pathname = '/'

    userShouldBeOnPage() {
        cy.softAssert(() => {
            cy.location('pathname').should('eq', this.pathname);
        }, 'User should be on the expected page.');
    }

    titleShouldExist() {
        cy.softAssert(() => {
            cy.title().should('eq', 'Cypress Real World App');
        }, 'Title should be "Cypress Real World App".');
    }
}
