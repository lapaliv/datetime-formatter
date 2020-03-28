var path = require('path');

module.exports = {
    // Change to your "entry-point".
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'datetime-formatter.js',
        library: 'datetime-formatter',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        //alias: {
        //    '': path.resolve(__dirname, 'src'),
        //},
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
};
