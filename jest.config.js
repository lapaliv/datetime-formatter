module.exports = {
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '^\@lapaliv\/datetime-formatter$': '<rootDir>/datetime-formatter',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/tests/**/*.spec.js',
        '<rootDir>/tests/**/*.spec.ts',
    ],
    coverageReporters: ['json', 'lcovonly', 'text', 'clover'],
};
