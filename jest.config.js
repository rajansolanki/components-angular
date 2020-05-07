module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
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
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
