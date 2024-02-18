module.exports = {
  ignorePatterns: ['**/public/**', '**/.cache/**', '**/static/**', '**/coverage/**'],
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:testing-library/react',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'airbnb'
  ],
  plugins: ['import'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', '**/tsconfig.json']
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-void': 'off',
    'prettier/prettier': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'no-unexpected-multiline': 'error',
    'prefer-const': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'no-array-constructor': 'off',
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': 'error',
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-duplicate-type-constituents': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase']
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        browser: true,
        es6: true
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'next/core-web-vitals',
        'airbnb-typescript'
      ],
      plugins: ['@typescript-eslint', 'react', 'testing-library', 'prettier'],
      rules: {
        'react/jsx-filename-extension': [
          'warn',
          {
            extensions: ['tsx']
          }
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      env: {
        browser: true,
        es6: true
      },
      extends: ['prettier'],
      rules: {},
      plugins: ['testing-library', 'react', 'prettier']
    },
    {
      files: ['**/tests/**', '**/__mocks__/**', '*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      extends: ['plugin:jest/all', 'plugin:jest-dom/recommended'],
      plugins: ['jest', 'jest-dom'],
      env: {
        browser: true,
        es6: true,
        'jest/globals': true
      },
      rules: {
        'jest/no-hooks': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false
          }
        ],
        'import/no-relative-packages': 'off',
        'jest/no-conditional-in-test': 'off',
        'jest/prefer-snapshot-hint': 'off'
      }
    }
  ]
};
