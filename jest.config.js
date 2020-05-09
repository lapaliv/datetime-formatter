module.exports = {
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '^\@lapaliv\/datetime-formatter$': '<rootDir>/datetime-formatter',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/**/*.spec.js',
    ],
    coverageReporters: ['json', 'lcovonly', 'text', 'clover'],
};
