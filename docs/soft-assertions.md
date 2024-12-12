# Understanding Soft Assertions in Cypress

Testing is a crucial part of software development, and assertions are its cornerstone. Assertions ensure that application behavior matches expectations during test execution. Traditionally, assertions in testing frameworks like Cypress are hard assertions, meaning a single failure halts the test immediately. 

Soft assertions, on the other hand, allow tests to proceed even if an assertion fails, collecting all failures for later reporting. This article explains the concept of soft assertions, why they're useful, and how to implement them in Cypress.

## What Are Soft Assertions?

Soft assertions are a mechanism that allows tests to continue executing even if an assertion fails. Instead of stopping the test, failures are logged and collected. At the end of the test, these failures can be reviewed collectively. This approach ensures broader coverage of the test scenario, as other assertions within the test can still run.

## Why Use Soft Assertions?

Soft assertions provide several benefits:

1. Comprehensive Test Results:
    
    With soft assertions, you can identify multiple issues in a single test run. Traditional hard assertions stop after the first failure, potentially missing other bugs.

2. Improved Debugging:
    
    Soft assertions allow testers to review all failures simultaneously, saving time and effort in debugging.

3. Better Insight:
    
    Running all assertions in a scenario, even when some fail, offers better insight into the overall health of the system.

## Implementing Soft Assertions in Cypress

Cypress doesn’t provide built-in support for soft assertions, but they can be implemented using custom commands. Below is an example setup.

### Step 1: Define Soft Assertion Commands

In the commands.ts file, define custom commands for handling soft assertions:

```typescript
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
```

### Step 2: Using Soft Assertions in Tests

Here’s an example of how soft assertions can be used in a test:

```typescript
it('User is not able to register with a missing last name', { tags: '@low' }, () => {
    const firstName = faker.person.firstName();
    const lastName = '';
    const username = faker.internet.username();
    const password = faker.internet.password();

    registerPage.fillInvalidRegisterForm(firstName, lastName, username, password, password);

    registerPage.lastNameIsRequiredTextShouldBeVisible();
    registerPage.signUpButtonShouldBeDisabled();

    cy.resolveSoftAsserts();
});
```

### Step 3: Soft Assertion Methods in Page Objects

Integrate soft assertions in page object methods to make tests reusable and maintainable:

```typescript
lastNameIsRequiredTextShouldBeVisible() {
    cy.softAssert(() => {
        cy.contains('Last Name is required').should('be.visible');
    }, 'Last Name is required text should be visible');
}

signUpButtonShouldBeDisabled() {
    cy.softAssert(() => {
        cy.get(this.signUpButton).should('have.attr', 'disabled');
    }, 'Sign up button should be disabled');
}
```

## Key Considerations

1. Balance Between Soft and Hard Assertions:
    
    While soft assertions are great for exploratory testing, certain critical checks (e.g., verifying successful login) might warrant hard assertions to avoid cascading failures.

2. Test Cleanliness:
    
    Always resolve collected soft assertions at the end of the test using cy.resolveSoftAsserts() to ensure a clean slate for subsequent tests.

3. Logging and Debugging:
    
    Cypress logs soft assertion failures, making debugging straightforward. The final test failure message aggregates all the missed expectations.

## Conclusion

Soft assertions in Cypress enable a more flexible and informative testing process by collecting multiple assertion failures in a single test execution. This capability helps teams quickly identify and address a broader range of issues without rerunning tests multiple times. Implementing soft assertions is straightforward with custom commands, making them a valuable addition to your Cypress testing toolkit.
