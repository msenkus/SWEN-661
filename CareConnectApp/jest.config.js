module.exports = {
  preset: 'react-native',
  rootDir: __dirname,
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|lucide-react-native)/)',
  ],
  moduleNameMapper: {
    '^react-native-vector-icons/Ionicons$':
      '<rootDir>/__mocks__/react-native-vector-icons/Ionicons.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/__tests__/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
};
