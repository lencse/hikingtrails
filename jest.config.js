module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/src/test/**/*.ts?(x)'
    ],
    coverageDirectory: 'logs/jest',
    collectCoverage: true,
//    testResultsProcessor: 'jest-sonar-reporter'
}
