const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: "handlebars-loader" }
        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './src/index.html',
        })
    ],
    devServer:{
        publicPath: '/',
        historyApiFallback: true,
        noInfo: false,
        quiet: false,
        stats: 'errors-only',
        clientLogLevel: 'warning',
        compress: true,
        port: 4000,
    }
};


