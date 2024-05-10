module.exports = {
  extends: "../../.eslintrc.js",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      "jsx": true
    },
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ['dist', '.eslintrc.js'],
}
