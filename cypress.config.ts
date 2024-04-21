import { defineConfig } from 'cypress';

export default defineConfig({
  fixturesFolder: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/cypress/results.xml',
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:4200',
    supportFile: false,
  },
});
