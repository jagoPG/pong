var path = require('path');

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'public/build')
    }
};