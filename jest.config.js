module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '@bit/rajansolanki.dev.(.*)': '<rootDir>/src/app/components/$1',
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
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
