var loaders = require("./loaders");
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: {
        app: ['./sb/index.ts'],
        stories: './sb/stories'
    },
    output: {
        filename: '[name].js',
        path: 'sb-build',
        publicPath: ''
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    devtool: false,
    plugins: [
        new CopyWebpackPlugin([
            { from: './sb/.static/preview.html', to: 'preview.html' },
            { from: './sb/.static/index.html', to: 'index.html' }
        ]),
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: false
        }),
        
        // Tell SB witch framework you use insede
        // Feature like live template and model editing avaliable onle for angular now
        // SB will turn off for them to prevent crashes
        new webpack.DefinePlugin({
            'process.env': {
                'TYPE': 'angular',
            }
        })
    ],
    module: {
        loaders: loaders
    }
};