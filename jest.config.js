module.exports = {
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        //'^~/(.*)$': '<rootDir>/$1',
    },
    //transform: {
    //    '^.+\\.js$': 'babel-jest',
    //    '.*\\.(vue)$': 'vue-jest',
    //},
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/**/*.js',
    ],
    coverageReporters: ['json', 'lcovonly', 'text', 'clover'],
};
