// this is a node script, so we have access to everything we would inside a node application

// provide entry and output information to webpack, so it can expose this information to another file

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
    const isProduction = env === 'production';

    // into the constructor function, pass in the name of the file where i want my styles to be saved
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return (module.exports = {
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
                    use: CSSExtract.extract({
                        use: ['css-loader', 'sass-loader'],
                    }),
                },
            ],
        },
        plugins: [CSSExtract],
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
        },
    });
};
