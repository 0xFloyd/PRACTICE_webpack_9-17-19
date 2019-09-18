const path = require("path"); 
const HtmlWebpackPlugin = require('html-webpack-plugin');  
const { CleanWebpackPlugin } = require('clean-webpack-plugin');    //need this because webpack needs an absolute path to create bundle. 

module.exports = {
    entry: {               //first file in dependency graph, first file that kicks off your application
        app: './src/index.js',
        print: './src/print.js'
    },                   
    
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
   ],
    
    output: {
        filename: '[name].bundle.js',   //running yarn build on this allows webpack to run modules in the browser 
        path: path.resolve(__dirname, 'dist')      //tells bundle where it shjould put the file when it's finished building with yarn build. adds "build" folder
    },

    module: {
        rules: [
            { 
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, 
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};



/*
to use webpack, you need a webpack.config.js file to tell webpack how to bundle appication 


//main principle in webpack: everything is surrounded by the dependency graph. so many sure everything is imported into your entry point file. 

//this allows you to have incremental builds, by adding sources (modules) one at time. also allows you to use mdoules and have them run in the browser. 

// with entry and output, we tell webpack how to start and where to end, and where we want the bundle created. 

the dependency graph. we can import from different javascripts. webpack goes through all the files and creates dependencies throughout your applicatio

using the webpack --watch CLI flag prevents you from having to run the build process everytime something is ListeningStateChangedEvent, and iosntead webpack updates automatiocaloly when things changes
this is the main principle with webpack: everything surrounds the dependency graph. this allows you to improt modules and also run them in the browser.  

the goal is to allow webpack to manage every asset even if theyre not bundled together 

loaders: third core concept of webpack. 

webpack takes a source, does something to that source, then returns the new source. this allows this new asset to be treated as a module. 
it will eventually be converted back to javascript so webpack can add it to the dependency graph 

why use loader? ruleset --> rulesets are objects, and takes two important properties.
1. the first property is "test". this tells webpack to perform some kind of transform once it comes across this expression. 
a really common example of this is babel-loader

plugins in webpack do what laoders CanvasPattern. wehn you want to use a plugin in webopack, youll pass in plugin array with all the plugins, and add refernce at the top 



4 core conetps of webpack:
1. entry -> first file webpack starts at when it creates its dependency graph 
2. Output -> tells webpack how and where to put the budles, and how to forrmat them 
3. rules / Loaders - how to treat files before theyre added to the dependency grpah on a per-file basis. allows any asset to be treated like a module 
4. plugins -> allow you to perform any other kind of functionalioty. extremely cvusto0mizeable. theres a rich swet of plugins webpack provides. 

if you can understand those 4 conepts, you should be able to walk into any webpack config and understand it/ modify it for yourself 

*/