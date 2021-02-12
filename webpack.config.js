// Webpack uses this to work with directories
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

    // Path to your entry point. From this file Webpack will begin his work
    entry: './src/javascript/index.js',

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            // rule for babel js. files
            {
                test: /\/js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            //rule for .sass, .scss and .css files
            {
                test: /\.(sa|sc|c)ss$/,
                // set loaders to transform files
                //loaders are applying from right to left
                //the first loader will be applied after others
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        //tu dodałaś !!!!!!!!
                        options: {
                            publicPath: ""
                        }
                    },
                    {
                        //this loader resolves url() and imports inside CSS
                        loader: "css-loader"
                    },
                    {
                        // then we apply postCSS fixes like autoprefixer and minifying
                        loader: "postcss-loader"
                    },
                    {
                        // first we transform SASS to CSS
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                //rules for images
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        //using file-loader for these files
                        loader: "file-loader",
                        //options with formats etc
                        options: {
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                //rules for fonts
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        //using file-loader
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],

    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on final bundle. For now we don't need production's JavaScript 
    // minifying and other thing so let's set mode to development
    mode: 'development'
};