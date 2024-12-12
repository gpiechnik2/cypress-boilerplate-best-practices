import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      require('@bahmutov/cy-grep/src/plugin')(config);

      const environment = config.env.environment || 'stage';
      const envConfig = require(`./cypress/config/cypress.${environment}.json`);
      console.log(`Running test on the ${environment} environment.`);
      console.log('Loaded env variables:', { ...config.env, ...envConfig });
      console.log(envConfig)
      return { ...config, ...envConfig };
    },
  },
  env: { grepFilterSpecs: true, grepOmitFiltered: true },
})
