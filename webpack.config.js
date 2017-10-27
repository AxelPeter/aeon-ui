'use strict';

const path = require('path');
const webpack = require('webpack');

const AngularInjectorPlugin = require("webpack-angular-injector-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
});
const hotModuleReplacement = new webpack.HotModuleReplacementPlugin();
const indexHtml = new HtmlWebpackPlugin({
    title: 'Webpack Test (Replacement)',
    template: path.resolve(__dirname, 'src/index.html')
});

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/app/app.module.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }],
                fallback: 'style-loader'
            })
        }]
    },
    devtool: 'eval',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true
    },
    plugins: [
        extractLess,
        hotModuleReplacement,
        indexHtml
    ]
};