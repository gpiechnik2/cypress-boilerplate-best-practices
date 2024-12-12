## Test Classification by Criticality

When developing and testing software applications, it’s essential to classify tests based on their criticality. This helps prioritize execution and focus on features most crucial to system reliability. In our system, we classify tests into three main categories:

### Test Categories

- **Smoke Tests:**

  These tests validate the most critical functionalities of the application. They are designed to provide a quick check that the core features are functioning correctly after a build or deployment.

- **Medium-Criticality Tests:**

  These tests cover features that are important but not as critical as those included in the smoke tests. Examples include non-core workflows, integrations, or less frequently used features.

- **Low-Criticality Tests:**

  These tests target minor features or edge cases that, while important for a seamless user experience, do not directly affect the core functionality of the application.

### Leveraging Tags to Manage Test Execution

To organize and execute these test categories, we use tagging and filtering. Tags such as `@smoke`, `@medium`, and `@low` are applied to specific test cases. Using the **cy-grep** plugin, we can filter and execute only the tests relevant to a particular criticality level.

### Practical Example

Below is an example of how login tests are organized and tagged:

```javascript
describe('When the user navigates to the login page', () => {
  beforeEach(() => {
    (...)
  });

  it('User is able to log in with valid credentials', { tags: '@smoke' }, () => {
    (...)
  });

  it('User is not able to log in with an invalid username', { tags: '@low' }, () => {
    (...)
  });

  it('User is not able to log in with an invalid password', { tags: '@low' }, () => {
    (...)
  });
});
```

In this example tags like `@smoke` and `@low` indicate the criticality of each test.

### Configuring Cypress for Tagged Tests

In our `package.json` file, scripts are defined to execute tests based on their tags:

```json
{
  "scripts": {
    "cy:run:smoke": "cypress run --env grepTags='@smoke'",
    "cy:run:medium": "cypress run --env grepTags='@medium'",
    "cy:run:low": "cypress run --env grepTags='@low'"
  }
}
```

Here, the `--env grepTags` parameter ensures only tests tagged with the specified criticality level are executed.

### Benefits of Test Classification

#### 1. **Selective Execution**
By tagging tests, we can run only those relevant to the features being developed or the criticality being evaluated. This reduces overall test time and improves focus.

#### 2. **Improved Test Coverage**
Separating tests by criticality ensures that all aspects of the application, from core to edge-case functionalities, are validated appropriately.

#### 3. **Scalability**
As new features are added, tagging makes it easy to integrate additional tests into the appropriate criticality category.

#### 4. **Clear Reporting**
Reports generated from test runs can be filtered by tags, providing insights into which areas of the application are stable or need further attention.

### Conclusion

Classifying tests by criticality is a vital strategy in automated testing. By using tools like **cy-grep** and environment-specific configurations, we ensure that tests are organized, efficient, and focused on the right features. This approach allows for targeted testing, better coverage, and ultimately more reliable software delivery.

