import path from 'path';

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfigOptions = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsConfig: './config/jest/tsconfig.test.json' }],
    '^.+\\.jsx?$': path.join(__dirname, './config/jest/jest-preprocess.ts')
  },
  moduleNameMapper: {
    // Tsconfig paths for tests
    '@/(.*)$': '<rootDir>/src/app/$1',
    '@/types/(.*)$': '<rootDir>/types/$1',
    // Assets
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/mocks/fileMock.ts',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/config/jest/mocks/styleMock.ts'
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public', '\\lib', '<rootDir>/cypress/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePaths: ['<rootDir>'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  setupFiles: [path.join(__dirname, './config/jest/loadershim.ts')],
  setupFilesAfterEnv: [path.join(__dirname, './config/jest/setupTests.ts')],
  collectCoverage: false,
  verbose: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}']
};
export default jestConfigOptions;
