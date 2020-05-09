module.exports = {
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '^\@lapaliv\/datetime-formatter$': '<rootDir>/datetime-formatter',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/**/*.spec.js',
        '<rootDir>/**/*.spec.ts',
    ],
    coverageReporters: ['json', 'lcovonly', 'text', 'clover'],
};
