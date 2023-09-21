const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, './'),
    output: { path: path.join(__dirname, "/dist"), filename: "bundle.js", },
    plugins: [new HtmlWebpackPlugin({ template: "index.html" }),],
    devServer: { port: 8000, hot: true, historyApiFallback: true, client: { logging: "info", progress: true } },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: "babel-loader", }, },
            { test: /\.(sa|sc|c)ss$/, use: ["style-loader", "css-loader", "sass-loader"], },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url-loader", options: { limit: false }, },
        ],
    },
    performance: {},

};