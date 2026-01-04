module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["**/*.spec.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",

    "!src/server.ts",
    "!src/routes.ts",

    "!src/controllers/**",

    "!src/generated/**",

    "!src/**/*.d.ts",
    "!src/**/index.{ts,tsx,js}",
    "!src/**/__tests__/**",
  ],
};
