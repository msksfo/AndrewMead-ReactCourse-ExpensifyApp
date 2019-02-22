// this is a node script, so we have access to everything we would inside a node application

// provide entry and output information to webpack, so it can expose this information to another file

const path = require('path');

module.exports = {
    entry: './src/app.js',
    //entry: './src/playground/hoc.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
    },
};
