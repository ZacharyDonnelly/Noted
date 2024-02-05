import path from 'path'

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const jestConfig = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': path.join(__dirname, './config/jest/jest-preprocess.ts')
  },
  moduleNameMapper: {
    // if your using tsconfig.paths theres is no harm in telling jest
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@/(.*)$': '<rootDir>/src/$1',

    // mocking assets and styling
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/mocks/fileMock.ts',
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public', '\\lib', '<rootDir>/cypress/'],
  globals: {
    __PATH_PREFIX__: ''
  },
  // to obtain access to the matchers.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePaths: ['<rootDir>'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  setupFiles: [path.join(__dirname, './config/jest/loadershim.ts')],
  setupFilesAfterEnv: ['./config/jest/setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}']
}

export default jestConfig
