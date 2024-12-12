/// <reference types="cypress" />

declare namespace Cypress {
    interface TestConfigOverrides {
        tags?: string | string[] | undefined;
    }
}
