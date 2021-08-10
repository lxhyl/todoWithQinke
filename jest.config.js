module.exports = {
    moduleFileExtensions: [
        'js',
        'vue'
    ],
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
    transform: {
        '^.+\\.vue$': '<rootDir>/node_modules/vue-jest',
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testEnvironment: "jsdom",
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    testMatch: ['<rootDir>/tests/**/*.spec.js'],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
}
