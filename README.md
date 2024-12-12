# Ultimate Guide & Cypress Boilerplate

This guide serves as a comprehensive resource for setting up and using a Cypress testing boilerplate, providing a robust framework for scalable and maintainable test automation.

## Documentation

This repository includes a dedicated `docs` directory that contains detailed resources and guidelines for best practices in test automation. These documents cover topics such as:

- `writing-tests-approach`: How to Write Tests for Better Readability
- `pom-and-aom`: Best Practices for Page Object Model (POM) and API Object Model (AOM)
- `soft-assertions`: Strategies for Implementing Soft Assertions and Error Handling
- `test-classification-by-criticality`: Guidelines for Tagging Tests by Priority
- `testing-subcription-roles-in-cypress`: Support for Different Roles (Subscriptions) and How to Use Them in Tests
- `support-for-multiple-test-environments`: Support for Multiple Test Environments and Environment Variables
- `generating-test-data-dynamically`: Proper Data Generation for Tests

Refer to the documentation to ensure adherence to established standards and for assistance in resolving common challenges.

## Test Environment

Our test framework is built upon the [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app), where all tests are run and validated.

## Repository Installation

To set up the repository, follow these steps:

1. Clone the repository

```bash
git clone .
```

2. Install

```bash
npm install
```

## Running Tests

1. `cy:open:stage`: Opens Cypress in interactive mode for the "stage" environment.
2. `cy:run:stage`: Runs tests mode for the "stage" environment.
3. `cy:run:stage:smoke`: Runs smoke tests tagged as @smoke in the "stage" environment.
4. `cy:run:stage:medium`: Runs medium-priority tests tagged as @medium in the "stage" environment.
5. `cy:run:stage:low`: Runs low-priority tests tagged as @low in the "stage" environment.

## Cypress Checklist

Here’s a checklist of essential steps for setting up a new Cypress framework:
Obligatory Checklist:

- Install TypeScript: Utilize TypeScript for better code management and type safety.
- Prettier & Linter: Set up Prettier and a linter for consistent code formatting.
- Grep Support: Integrate grep for filtering tests by tags for environments or criticality levels.
- Page Object Model (POM): Implement POM to encapsulate page-specific actions and locators.
- API Object Model (AOM): Define reusable API for complex workflows.
- Soft Assertions: Add support for soft assertions to improve test resilience.
- Reporting: Configure reporting tools like Allure or Mochawesome for detailed insights.
- Husky Integration: Add Husky to enforce pre-commit checks.
- cypress-plugin-steps: Use this plugin to make test steps more readable and descriptive.
- Dynamic Data Generation: Generate test data dynamically for greater flexibility.
- Regression Testing Support: Automate regression testing workflows.
- Screenshot & Video Optimization: Attach and optimize screenshots/videos for debugging.

## Application-Specific Checklist:

- Visual Testing: Add tools for visual regression testing.
- Performance Auditing: Integrate tools like cypress-audit for frontend performance testing.
- Quality Gates: Establish quality gates for automated validations.
- Cypress Containerization: Use Docker for running Cypress in consistent environments.
- CI/CD Integration: Set up support for continuous integration and delivery pipelines.
