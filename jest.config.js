module.exports = {
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '^\@lapaliv\/datetime-formatter$': '<rootDir>/datetime-formatter',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/__tests__/**/*.spec.js',
        '<rootDir>/__tests__/**/*.spec.ts',
    ],
    coverageReporters: ['json', 'lcovonly', 'text', 'clover'],
};
