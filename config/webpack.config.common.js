const { resolve, join } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
    target: 'web',
    entry: ['./src/client/index.tsx'],
    output: {
        publicPath: '/',
        path: resolve(__dirname, '..', 'build', 'client'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: { sourceMap: IS_DEV }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                localIdentName: IS_DEV ? '[path]-[name]_[local]' : '[name]_[local]_[hash:5]', // [hash:base64]
                                modules: true,
                                sourceMap: IS_DEV
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: IS_DEV }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: IS_DEV }
                        }
                    ]
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: IS_DEV
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
    resolve: {
        modules: ['node_modules', join('src', 'client')],
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    stats: {
        assetsSort: '!size',
        children: false,
        chunks: false,
        colors: true,
        entrypoints: false,
        modules: false
    }
};
