'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const publicPath = process.env.REPOSITORY_NAME ? `/${process.env.REPOSITORY_NAME}/` : '/';

module.exports = {
    //https://webpack.js.org/configuration/

    context: __dirname,  //The base directory, an absolute path, for resolving entry points and loaders from configuration

    devtool: devMode ? 'cheap-module-eval-source-map' : false, //This option controls if and how source maps are generated

    mode: devMode ? 'development' : 'production',

    // Configure how performance hints are shown. For example if you have an asset that is over 250kb,
    // webpack will emit a warning notifying you of this.
    performance: {
        assetFilter: function(assetFilename) { //применяеться фильтр только для файлов js
            return assetFilename.endsWith('.js');
        }
    },


    entry: [ //The point or points to enter the application
        // 'webpack-dev-server/client',
        // 'webpack/hot/dev-server',
        './src/index'
    ],

    output: {
        filename: 'static/js/[name].[hash:8].js',
        // chunkFilename: 'static/js/[name].chunk.js',
        publicPath: publicPath,
        path: path.resolve(__dirname, 'build'),
    },

    watch: devMode, //Turn on watch mode.

    stats: {
        children: false,
        entrypoints: false,
        modules: false,
    },

    //webpack-dev-server configuration
    devServer: {
        open: true, //When open is enabled, the dev server will open the browser.
        contentBase: path.resolve(__dirname, 'src'),
        port: 8000,
        hot: true, //Enable Hot Module Replacement
        overlay: true, //Виводить помилки в браузер

        // lets you precisely control what bundle information gets displayed
        //options for console output (https://webpack.js.org/configuration/stats/)
        stats: {
            children: false,
            entrypoints: false,
            modules: false,
        }

    },

    module: { //These options determine how the different types of modules within a project will be treated
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                // exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react', 'stage-0'],
                            plugins: ['transform-runtime']
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            // quiet: true, //Loader will process and report errors only and ignore warnings if this option is set to true
                            // emitError: true,
                            failOnWarning: true,


                        }
                    }
                ]
            },


            {
                test: /\.s?[ac]ss$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules'),
                ],
                use: [
                    //Style-loader нужен для инжекта стилей в head
                    //Adds CSS to the DOM by injecting a <style> tag
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,

                    {
                        // позволяет импортировать CSS внутрь javascript-модуля
                        // The css-loader interprets @import and url() like import/require() and will resolve them.
                        // Currently, cssnano is bundled with css-loader, so you don't need to load it yourself.
                        // However, you can also use cssnano explicitly with postcss-loader
                        loader: 'css-loader',
                        options: {
                            //allows to configure how many loaders before css-loader should be applied to @imported resources
                            importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            minimize: !devMode //If true -> minimize
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [

                                autoprefixer({
                                    browsers: [
                                        '>5%',
                                        'last 2 versions',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],


                                }),


                            ]
                        }

                    },

                    'sass-loader'
                ]
            },
            {
                test: /\.eot|ttf|woff2?(\?v=\d+\.\d+\.\d+)?|\w*font\w*\.svg$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules')
                    ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: devMode ? 'static/fonts/[name].[ext]' : 'static/fonts/[name].[hash:8].[ext]',
                    },
                },
            },
            {
                test:    /\.jpe?g|png|svg$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules')
                ],
                use:     {
                    loader:  'file-loader',
                    options: {
                        name: devMode ? 'static/images/[name].[ext]' : 'static/images/[name].[hash:8].[ext]',
                    },
                },
            },
            // {
            //     test:    /\.html$/,
            //     include: [
            //         path.resolve(__dirname, 'public'),
            //     ],
            //     use:     {
            //         loader:  'html-loader',
            //         options: {
            //             self: true,
            //             minimize: true
            //         },
            //     },
            // }
        ]
    },

    plugins: [

        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            title: 'Hello',
            template: './public/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),

        new HtmlWebpackPlugin({
            content: publicPath,
            inject: false,
            filename: '404.html',
            template: './public/404.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }

        }),

        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),

        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),

        //экспорт стилей из js в отдельный файл
        new MiniCssExtractPlugin({
            filename: devMode ? 'static/css/[name].css' : 'static/css/[name].[hash:8].css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),

        //The DefinePlugin allows you to create global constants which can be configured at compile time.
        new webpack.DefinePlugin({
            "process.env": {
                __DEV__: JSON.stringify(devMode),
                __PATH__: JSON.stringify(publicPath)
            }
        }),


        // Generate a service worker script that will precache, and keep up to date,
        // the HTML & assets that are part of the Webpack build.
        new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'static/js/service-worker.js',
            minify: true,
            // For unknown URLs, fallback to the index page
            navigateFallback: publicPath + 'index.html',
            // Ignores URLs starting from /__ (useful for Firebase):
            // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),

        // Copy 404.html for Single Page Apps for GitHub Pages
        // new CopyWebpackPlugin([{
        //     from: './public/404.html'
        // }]),

        //A webpack plugin to remove/clean your build folder(s) before building
        new CleanWebpackPlugin(['build'], {dry: devMode, verbose: !devMode})


    ]


};