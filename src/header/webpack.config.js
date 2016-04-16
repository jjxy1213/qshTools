var path = require('path');

module.exports = {
    entry: {
        header: path.join(__dirname, './wjs/head')
    },
    output: {
        path: path.join(__dirname, './js'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 10 version!less-loader'},
            {test: /\.html$/, loader: 'html-minify-loader'},
            {test: /\.js$/, loader: 'babel'}
        ]
    }
};