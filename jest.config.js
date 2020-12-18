module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        `${__dirname}/src/test/**/*.test.ts?(x)`
    ],
    coverageDirectory: 'logs/jest',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
//    testResultsProcessor: 'jest-sonar-reporter'
}
