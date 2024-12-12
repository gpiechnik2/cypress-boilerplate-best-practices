export default class AuthAPI {
    static CreateUserData: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        confirmPassword: string;
    };

    createUser(data: typeof AuthAPI.CreateUserData) {
        return cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl') + '/users',
            body: data,
        });
    }
}
