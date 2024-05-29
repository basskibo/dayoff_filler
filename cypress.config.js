const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
		experimentalRunAllSpecs: true,
		viewportWidth: 1920,
		viewportHeight: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
