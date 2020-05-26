const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.glsl$/i,
                use: 'raw-loader',
            },
        ],
    },
    devtool: 'inline-cheap-source-map',
    plugins: [
        new HtmlPlugin({
            title: 'JS OpenGL',
            template: './src/index.html'
        })
    ]
};