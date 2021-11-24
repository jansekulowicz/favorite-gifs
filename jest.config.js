module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^unit-tests/(.*)$': '<rootDir>/tests/unit/$1'
  },
  collectCoverage: true,
  coverageReporters: ['text'],
  coveragePathIgnorePatterns: [
    'src/main.js',
    'tests/*'
  ]
}
