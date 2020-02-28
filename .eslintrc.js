module.exports = {
  root: true,
  extends: '@react-native-community',
  // parser: "babel-eslint",
  "parserOptions": {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },  
  rules: {
    semi: 1,
    quotes: [1, 'single'],
    'react/jsx-uses-vars': 1,
    curly: [1, "all"],
  }
};
