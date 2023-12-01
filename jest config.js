module.exports ={
  // The root directory that Jest should scan for test files
  roots: ['<rootDir>/src/tests'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The file match patterns for the test files
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.js$',

  // Transform files using Babel to enable ES6 features (if needed)
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // Module file extensions to include in testing
  moduleFileExtensions: ['js'],

  // Code coverage configuration
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  // Ignore certain files or directories during test runs
  testPathIgnorePatterns: ['/node_modules/', '/coverage/'],

};