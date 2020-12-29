# Webpack-Config

A repo to help new users better understand and use Webpack.

Prerequisites: knowledge of terminal, npm, JavaScript, and your favorite code editor. I'm using VSCode.

## Setting up your project

Create a new folder for your project. Navigate to the project directory in terminal. You will run most commands in this tutorial in your root project directory.

Create a `src` and `dist` folder. Create the `index.html` file in the dist folder.

If you are creating a new project from scratch, you will need to create a `package.json` file to manage dependencies.

`npm init -y`

## Installing webpack

Install webpack in

`npm instal --save-dev webpack webpack-cli`

Or:

`npm i -D webpack webpack-cli`

Use lodash package for manipulating objects and arrays.

`npm i lodash`

### webpack.config.js

Create a new file called `webpack.config.js` and copy-paste this starter code into the file.

- `index.js` is your web app's entry point, located in the src folder.
- `bundle.js` is the file outputted in the root path of your project in a folder called `dist`.

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      /* include loaders here */
    ],
  },
}`
```

### Configuring the package.json file

Delete the `"main"` property and add the `"private": true,` property.

Add a `"build"` property in the `"scripts"` object.

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.11.0",
    "webpack-cli": "^4.3.0",
  }
}
```

> Now when compiling webpack, all we have to type in terminal is:
> `npm run build`.

## Loaders

Webpack uses loaders to manage static assets such as styles, images, fonts, data, and more.

Include loaders in the `rules` array in `module`. Each rule is an object with two properties, test and use. 

- `test` looks for file extensions that match the given regular expression.
- `use` specifies the loader to use. It must be installed as a dev dependency via npm in order to be used.

```js
module: {
  rules: [
    /* include loaders here */
  ]
}`
```

### Loading CSS

Install the loaders and save them as a dev dependency

`npm install --save-dev style-loader css-loader`

Or:

`npm i -D style-loader css-loader`

Import the style into the entry point of your app in index.js

```js
// You must use the .css extension otherwise webpack will throw an error!
import './style.css';
```

Include the rule in webpack.config.js

```js
// Load CSS
{
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
  // NOTE, style-loader and css-loader must be in this order
},
```

### Loading images

Import an image into the .js file where you want to use it

```js
import image from './icon.png';`
```

Include the rule in webpack.config.js

```js
// Load images
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
},
```

### Loading toml, yaml, or json5 files
`npm install toml yamljs json5 --save-dev`

---

## Build project with config file

`npx webpack --config webpack.config.js`

By default, webpack automatically uses the configuration file.

Use `npm run build` with a script in the package.json file `"build": "webpack"`

---

## Output Management

### HtmlWebpackPlugin

Generates a new index.html file on each build.

Instead of specifying the output file, use this plugin to generate the bundles for all entry points. If we rename, add, or delete an entry point the app still builds.

`npm install --save-dev html-webpack-plugin`

Or

`npm i -D html-webpack-plugin`

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
  entry: {
    // Entry points dynamically generate bundle names, based on the entry point name
    index: './src/index.js',
    print: './src/print.js',
  },

  // 
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### Cleaning up /dist 

Use the clean-webpack-plugin to clean out the dist folder before each build.

`npm install --save-dev clean-webpack-plugin`

Or

`npm i -D clean-webpack-plugin`

```js
const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

## Using Source Maps

Errors in bundled files only point to the bundle, not the individual files. Webpack uses source maps that map compiled code to the original source code.

Include `devtool: 'inline-source-map'` under entry in the configuration file.

When an error is encountered, the console displays an error occurring in the original source code file, not the bundle!

---

## Options to Automatically Compile Code

1. Webpack watch mode
2. webpack-dev-server
3. webpack-dev-middleware

### Watch Mode

Include a script in the json file to watch for changes and compile code on save.

`"watch": "webpack --watch",`

We also tell the CleanWebpackPlugin to not remove index.html after each build when running `webpack --watch` using the `cleanStaleWebpackAssets` option.

You still have to refresh the browser to see changes to the code.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### webpack-dev-server

Use the webpack-dev-server to provide live reloading.

`npm install --save-dev webpack-dev-server`

Or

`npm i -D webpack-dev-server`

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

Add a script in the package.json file:  
`"start": "webpack serve --open 'Firefox'",`

### webpack-dev-middleware

Use webpack-dev-middleware to emit processed files to a sever. It's often used with Express.

`npm install --save-dev express webpack-dev-middleware`

Or

`npm i -D express webpack-dev-middleware`

Include this npm script to start the server:  
`"server": "node server.js"`

You still have to refresh to see changes to your code.

Use webpack-hot-middleware to enable hot reloading.

