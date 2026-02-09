module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation)/)',
  ],
  moduleNameMapper: {
    '^react-native-vector-icons/Ionicons$':
      '<rootDir>/__mocks__/react-native-vector-icons/Ionicons.js',
  },
};
