const path = require('path');
const webpack = require('webpack');
const outputDir = './wwwroot/js'

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return[{
    entry:{app: './App/index.js'},
    output: {
        path: path.resolve(__dirname, outputDir),
        filename: '[name].bundle.js',
        publicPath: '/js/'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: [['es2015', { "modules": false }], 'react', 'stage-0'] }
                }]
            }
        ]
    },
    plugins: [
        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2
        })

    ].concat(isDevBuild ? [
        // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(outputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
    ] : [
        // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin()
    ]),
}]

}