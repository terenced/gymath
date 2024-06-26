export default {
  rootDir: '.',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: 'src/.*\\.test\\.ts$',
  modulePathIgnorePatterns: ['language-server', '__vitest__'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
