// this is a node script, so we have access to everything we would inside a node application

// provide entry and output information to webpack, so it can expose this information to another file

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// environment variable that stores the environment you are currently in
// (heroku automatically sets this for us, with a value = 'production')
// we need to set this up in our test environment (it will be production, test or undefined (development))
// set up environment variables regardless of operating system with npm module cross-env
// then just make a change to the package.json script
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'test') {
    // make testing environment variables for separate testing firebase database
    // read the files in by using npm module, dotenv
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    // make development environment variables for development database
    require('dotenv').config({ path: '.env.development' });
}

module.exports = env => {
    const isProduction = env === 'production';

    // into the constructor function, pass in the name of the file where i want my styles to be saved
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return (module.exports = {
        entry: './src/app.js',
        //entry: './src/playground/hoc.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
                        use: [
                            {
                                loader: 'css-loader',
                                options: { sourceMap: true },
                            },
                            {
                                loader: 'sass-loader',
                                options: { sourceMap: true },
                            },
                        ],
                    }),
                },
            ],
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(
                    process.env.FIREBASE_API_KEY
                ),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
                    process.env.FIREBASE_AUTH_DOMAIN
                ),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
                    process.env.FIREBASE_DATABASE_URL
                ),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
                    process.env.FIREBASE_PROJECT_ID
                ),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
                    process.env.FIREBASE_STORAGE_BUCKET
                ),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
                    process.env.FIREBASE_MESSAGING_SENDER_ID
                ),
            }),
        ],

        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/',
        },
    });
};
