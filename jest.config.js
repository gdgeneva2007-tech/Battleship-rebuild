module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Transform files using babel-jest
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  
  // Module file extensions
  moduleFileExtensions: ['js', 'json'],
  
  // Directories to search for tests
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
  ],
  
  // Directories to ignore
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  
  // Coverage configuration (optional)
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js',
  ],
  
  // Setup files (optional)
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
