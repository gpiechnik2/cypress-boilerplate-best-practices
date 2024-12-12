## POM & AOM

In the previous section, we discussed POM (Page Object Model). Now, let’s clarify what AOM (API Object Model) means and how it complements POM when working with complex systems.

### POM (Page Object Model)

The Page Object Model is a design pattern commonly used in automated testing to create an abstraction layer between test scripts and the web application being tested. It organizes web elements and interactions into classes that represent individual pages or components of an application. This approach:

1. Enhances code reusability by centralizing element locators and methods for interaction.
2. Improves test maintainability since updates to the UI only require changes to the corresponding page class.
3. Increases readability of test scripts by providing clear and concise method calls.

For instance, a `LoginPage` class could include methods like `fillUsernameInput(username)`, `fillPasswordInput(password)`, and `clickSubmitButton()`. Tests can then interact with these methods rather than directly manipulating DOM elements.

### Breaking Down Tests

Let’s consider a booking management application. The typical workflow might look like this (excluding login, permissions setup, subscription confirmations, etc., for simplicity):

1. A user creates a team member.
2. A user schedules an event for the team member.
3. A user creates a booking for the event.

If we write a single, continuous test scenario, it effectively validates three different functionalities in one test, even though best practices dictate that each test scenario should verify a single functionality.

This segmentation is essential due to several reasons:

1. Unstable Tests: Long, end-to-end tests are more prone to flakiness due to dependencies on multiple steps.
2. Maintenance Challenges: If a single functionality changes, it requires updating numerous test cases.
3. Redundant Checks: These tests often verify the same functionality multiple times.

To address these challenges, long functional tests are broken into smaller, focused tests. The earlier steps in the workflow are covered via API tests, which are inherently more stable than UI tests.

Below is a visualization comparing test scenarios without and with API usage:

| Scenario | Simplified Test Steps (Without API)|
| - | - |
|Creating a Member |	1. The user creates a member.
| Creating an Event | 1. The user creates a member, 2. The user creates an event. |
| Creating a Booking | 1. The user creates a member, 2. The user creates an event, 3. The user creates a booking. |

With API integration, the scenarios change as follows:

| Scenario| Simplified Test Steps (With API) |
| - | - |
| Creating a Member | 1. The user creates a member. |
| Creating an Event | 1. The user creates a member via API, 2. The user creates an event. |
| Creating a Booking | 1. The user creates a member via API, 2. The user creates an event via API, 3. The user creates a booking. |

By leveraging APIs for earlier steps, we eliminate redundant UI interactions, improving stability and efficiency.

### AOM

The API Object Model is a design pattern similar to POM but tailored for interactions with an application’s API layer instead of its UI. It structures the methods and configurations needed to interact with API endpoints, grouping them logically by functionality or resource.

For example, if an application has endpoints for managing users, events, and bookings, the API Object Model might look like this:

```typescript
class UserAPI {
    createUser(data: UserData) {
        return cy.request({
            method: 'POST',
            url: '/api/users',
            body: data,
        });
    }

    deleteUser(userId: string) {
        return cy.request({
            method: 'DELETE',
            url: `/api/users/${userId}`,
        });
    }
}

class EventAPI {
    createEvent(data: EventData) {
        return cy.request({
            method: 'POST',
            url: '/api/events',
            body: data,
        });
    }
}
```

By organizing API interactions into specific classes, you can:

1. Improve Reusability: Methods can be reused across tests.
2. Enhance Readability: Test scripts focus on business logic rather than API request details.
3. Facilitate Maintenance: Updates to API endpoints require changes only in the corresponding AOM class.

### How AOM Complements POM

In complex systems, AOM can work alongside POM to simplify and stabilize test scenarios:

1. API for Setup: Use AOM to handle setup steps like creating users, setting permissions, or generating data.
2. UI for Validation: Use POM to validate the end-user experience for specific functionalities.

By leveraging both POM and AOM, you create a comprehensive testing framework that balances the efficiency of API interactions with the realism of UI validations.
