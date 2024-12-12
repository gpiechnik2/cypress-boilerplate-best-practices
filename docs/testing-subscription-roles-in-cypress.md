# Testing Subscription Roles in Cypress

Subscription roles, such as free and premium tiers, are a critical part of many modern applications. Testing these roles ensures users have access to the appropriate features based on their subscription level. To facilitate this process efficiently, Cypress provides a session management mechanism that reduces repetitive setup work and enhances test performance. This article explores how to manage sessions for subscription roles and use them effectively in your tests.

## Session Management in Cypress

Sessions allow Cypress to cache and reuse state across test cases or even across spec files. This feature is particularly useful when dealing with user roles like free or premium subscriptions because it avoids redundant steps like logging in or setting up user-specific states for each test. Here’s how it works:

1. Session Initialization:
    
    Each session is associated with a unique identifier (e.g., free or premium).
    
    When Cypress encounters a session for the first time, it executes the setup steps defined in a cy.session() call.
    
    Once created, the session state is cached and reused in subsequent tests.

2. Session Validation:
    
    Cypress allows for custom validation logic to ensure the session is still valid before reusing it. If the validation fails, the session setup steps are re-executed.

## Implementation of Role-Based Sessions

### Step 1: Defining the useSession Command

The useSession custom command initializes sessions for specific subscription roles. Here’s the breakdown of its implementation:

```typescript
Cypress.Commands.add('useSession', (sessionName) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username();
    const password = faker.internet.password();

    switch (sessionName) {
        case 'free': {
            cy.session("free", () => {
                authAPI.createUser({
                    firstName,
                    lastName,
                    username,
                    password,
                    confirmPassword: password
                });

                loginPage.visit();
                loginPage.fillUsernameInput(username);
                loginPage.fillPasswordInput(password);
                loginPage.clickSubmitButton();
            }, {
                cacheAcrossSpecs: true,
                validate() {
                    cy.visit('/user/settings'); // Ensure session validity
                },
            });

            Cypress.env("freeUser", { username, password });
            break;
        }
        case 'premium': {
            cy.session("premium", () => {
                authAPI.createUser({
                    firstName,
                    lastName,
                    username,
                    password,
                    confirmPassword: password
                });

                loginPage.visit();
                loginPage.fillUsernameInput(username);
                loginPage.fillPasswordInput(password);
                loginPage.clickSubmitButton();

                // Additional steps for premium roles
            }, {
                cacheAcrossSpecs: true,
                validate() {
                    cy.visit('/user/settings'); // Ensure session validity
                },
            });

            break;
        }
        default: {
            cy.log("Invalid session specified");
        }
    }
});

    Role Initialization: Each role (e.g., free or premium) is set up through the cy.session() function.
    Session Caching: The cacheAcrossSpecs: true option ensures that sessions persist across multiple spec files, optimizing test runtime.
    Validation: Custom validation ensures that a session is still valid before reuse, avoiding stale states.
```

### Step 2: Setting Up Sessions in the before Hook

To initialize sessions for multiple roles, the before hook ensures they are created once before all tests run:

```typescript
before(() => {
    cy.visit("/"); // Initial visit for session setup

    cy.useSession("free");
    cy.useSession("premium");

    // Clear session data to prevent carry-over
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
});
```

This approach ensures:

- Reusable Sessions: Sessions are created once and reused across tests.
- Clean State: Clearing cookies and storage avoids unexpected session carry-over.

## Testing Subscription Roles

Once sessions are set up, you can leverage them in your test scenarios by switching between user roles. For example:

```typescript
describe('Premium User Features', () => {
    beforeEach(() => {
        cy.useSession('premium');
    });

    it('Premium users can access exclusive features', () => {
        cy.visit('/premium-feature');
        cy.contains('Exclusive Content').should('be.visible');
    });
});

describe('Free User Features', () => {
    beforeEach(() => {
        cy.useSession('free');
    });

    it('Free users cannot access premium features', () => {
        cy.visit('/premium-feature');
        cy.contains('Upgrade to Premium').should('be.visible');
    });
});
```

Switching Roles: By calling cy.useSession('free') or cy.useSession('premium') in the beforeEach hook, you can simulate different subscription levels.

Efficient Testing: Sessions eliminate the need to repeatedly log in or set up user states in each test.

## Key Considerations

1. API Usage:
    
    For production-grade testing, user creation and login should ideally be handled via API calls rather than UI interactions.

2. Session Isolation:
    
    Always clear cookies, local storage, and session storage in the before or after hooks to ensure session isolation.

3. Validation Logic:
    
    Use robust validation logic to confirm the session's validity before reuse.

## Conclusion

Managing sessions for subscription roles in Cypress is a powerful way to streamline tests for applications with tiered access levels. By caching user sessions and reusing them across tests, you can significantly reduce test execution time while maintaining reliable results. This approach ensures thorough coverage of role-based features with minimal overhead.
