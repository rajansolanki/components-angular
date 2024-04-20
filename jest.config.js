module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '@rajansolanki/ll-shared': '<rootDir>/projects/ll-shared/src',
    '^routes$': '<rootDir>/src/app/routes',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/.git',
    '<rootDir>/dist',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: '<rootDir>/reports/jest', outputName: 'jest.xml' },
    ],
  ],
  coverageDirectory: '<rootDir>/reports/jest',
  globalSetup: 'jest-preset-angular/global-setup',
};
