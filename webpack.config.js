// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// module.exports = {
//   entry: {
//     entry: "./assets/src/index.js",
//   },
// //   output: {
// //     path: __dirname + "/.tmp/public",
// //     filename: "bundle.js",
// //   },
// output: {
//     path: `${__dirname}/assets`,
//     filename: 'bundle.js',
//     publicPath: '/',
//   },
//   module: {
//     rules: [
//       {
//         use: "babel-loader",
//         test: /\.js$/,
//         exclude: /node_modules/,
//       },
//     //   {
//     //     use: ["style-loader", "css-loader", "sass-loader"],
//     //     test: /\.s[ac]ss$/i,
//     //   },
//     //   {
//     //       test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
//     //       loader: 'file'
//     //   },
//     //   { test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
//     //   {
//     //     test: /\.(woff|woff2|eot|ttf|svg)$/,
//     //     exclude: /node_modules/,
//     //     loader: "file-loader",
//     //     options: {
//     //       limit: 1024,
//     //       name: "[name].[ext]",
//     //       publicPath: "dist/assets/",
//     //       outputPath: "dist/assets/",
//     //     },
//     //   },
//     {
//         test: /\.scss$/,
//         use: [
//             MiniCssExtractPlugin.loader,
//             "css-loader",
//             {
//                 loader: "sass-loader",
//                 options: {
//                     sourceMap: true,
//                 }
//             },
//         ]
//     },
//     {
//         test: /\.(sa|sc|c)ss$/,
//         use: ["style-loader", "css-loader", "sass-loader"]
//       },
//       {test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//         include: this.entry,
//         use: [{
//             loader: 'file-loader'
//         }]},
//         // {
//         //     test: /\.jsx?$/,
//         //     use: [
//         //         {
//         //             loader: 'eslint-loader',
//         //             options: {
//         //                 emitWarning: true
//         //             }
//         //         }
//         //     ],
//         //     include: this.entry,
//         //     enforce: 'pre'
//         // }
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "assets/src/index.html",
//     }),

//     // new webpack.ProvidePlugin({
//     //        process: 'process/browser',
//     // }),
//   ],
// };
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
// const webpack = require("webpack");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

// const browserConfig = {
//   entry: {
//     entry: ["babel-polyfill", "./assets/src/index.js"],
//   },

//   output: {
//     path: `${__dirname}/assets`,
//     // path: __dirname + "/.tmp/public",
//     filename: "bundle.js",
//   },
//   // watch:true,
//   devServer: {
//     port: 8080, // most common port
//     contentBase: "./public",
//     inline: true,
//     historyApiFallback: true,
//   },

//   optimization: {
//     //minimize: true,
//     //
//     minimizer: [new TerserPlugin()],
//     splitChunks: {
//       chunks: "all",
//     },
//   },
//   resolve: {
//     // Add '.ts' and '.tsx' as resolvable extensions.
//     extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx|ts|tsx)$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: "babel-loader",
//         options: {
//           presets: ["react", ["es2015", { modules: false }]],
//           plugins: ["transform-class-properties"],
//         },
//       },
    
//       {
//         test: /\.scss$/,
//         exclude: /node_modules/,

//         use: ["style-loader", "css-loader", "sass-loader"],
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
//         loader: "url-loader",
//         options:{limit:100000},
//       }, // this is to read fonts
//       {
//         test: /\.less$/,
//         use: [
//           {
//             loader: "style-loader", // creates style nodes from JS strings
//           },
//           {
//             loader: "css-loader", // translates CSS into CommonJS
//           },
//           {
//             loader: "less-loader", // compiles Less to CSS
//             options: {
//               javascriptEnabled: true,
//             },
//           },
//         ],
//       },
//     ],
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "assets/src/index.html",
//       fileName: "assets/src/index.html",
//     }),

//   ],
// };


// module.exports = [browserConfig];
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')

module.exports = {
  entry: {
    entry: "./assets/src/index.js",
  },

output: {
  path: __dirname + "/.tmp/public",
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080, // most common port
    contentBase: "./public",
    inline: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /(node_modules|bower_components)/,
              loader: "babel-loader",
              options: {
                plugins: ["transform-class-properties"],
              },
            },
          
            {
              test: /\.scss$/,
              exclude: /node_modules/,
      
              use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
            },
            {
              test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
              loader: "url-loader",
              options:{limit:100000},
            }, // this is to read fonts
            {
              test: /\.less$/,
              use: [
                {
                  loader: "style-loader", // creates style nodes from JS strings
                },
                {
                  loader: "css-loader", // translates CSS into CommonJS
                },
                {
                  loader: "less-loader", // compiles Less to CSS
                  options: {
                    javascriptEnabled: true,
                  },
                },
              ],
            },
          ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "assets/src/index.html",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
}),

   
  ],
};


