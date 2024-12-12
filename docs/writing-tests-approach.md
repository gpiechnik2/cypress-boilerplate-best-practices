## Writing Tests Approach

Writing tests in our approach is a simplified and slightly modified form of the traditional BDD (Behavior-Driven Development) style. Our goal is to ensure maximum clarity and readability of the test structure while maintaining its functionality. 

Key elements of traditional BDD — Given, When, and Then — are integrated in a way that optimizes the organization and comprehensibility of the code.

We decided to abandon all libraries and the use of Gherkin syntax for defining tests for one simple reason: this syntax and its file extensions have limitations that are insurmountable when it comes to automated testing. This includes, for instance, dynamically defining values in the names of Given, When, Then steps.

### How Do We Apply BDD in Tests?

#### Given

In traditional BDD, the Given section describes the initial state or setup before the test begins. In our approach, these steps are moved to the beforeEach function. This function prepares the test environment before each test case (it).

Why? By placing setup steps in beforeEach, we avoid code duplication and improve readability. This ensures that the initial test context is always consistent, while the it sections focus solely on the test logic.

Example:

```typescript
beforeEach(() => {
    loginPage.visit();
})
```

Here, the function redirect user to the login page.

#### When

In our test structure, the When section is reflected in the describe block's description. This description should clearly indicate the user scenario or action being tested.

Why? Grouping test cases under a descriptive describe block helps focus on a specific behavior or feature of the application. It also makes navigating and managing tests easier.

Example:

```typescript
describe('When the user navigates to the login page', () => {
    // Login-related scenarios
});
```

#### Then

The Then section is represented by individual test cases defined in the it blocks. Each block describes the expected result of the application’s behavior.

Why? By moving the details of expectations into it blocks, we ensure each test focuses on a single specific outcome. This aids in debugging and makes it easier to understand exactly what is being tested.

Example:

```typescript
it('User is able to log in with valid credentials', { tags: '@smoke' }, () => {
    loginPage.fillUsernameInput('validUser');
    loginPage.fillPasswordInput('validPassword');
    loginPage.clickSubmitButton();

    // assertions
});
```

### Benefits of Our Approach

- Conciseness: The simplified approach removes redundant steps, focusing on key actions and outcomes.

- Readability: The clear assignment of Given to beforeEach, When to describe, and Then to it makes the test structure intuitive even for newcomers.

- Flexibility: With well-described actions in the Page Object Model (POM) and Application Object Model (AOM), the implementation details are separated from the test logic, allowing for easy updates.
