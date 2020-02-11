<div align="center">
  <img src="./docs/code.png" height="200px" alt="Codely"/>
</div>

<h3 align="center">
  The codely command line utility.
</h3>

<div align="center">
  <img alt="Made by Greyson Mascarenhas" src="https://img.shields.io/badge/made%20by-Greyson%20Mascarenhas-%23007acc"/>
  <img alt="Language count" src="https://img.shields.io/github/languages/count/greysonmrx/codely?color=%23007acc"/>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%23007acc"/>
</div>

<p align="center">
  <a href="#installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contributing">Contributing</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

## Installation

Installation is as simple as running the following command (if you see EACCES error, reading [fixing npm permissions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) may help):

`npm install -g codely`

or with yarn

`yarn add global codely`

## Usage

### Creating your project

Run the following command:

`codely init`

Then, answer the questions below:

1. What is the name of the project?
2. What do you want to code?

And then a folder will be created with the name of the project and with the selected subsystems.<br/><br/>

### Creating your react or react native component

Run the following command:

`codely generate:component`

Then, answer the questions below:

1. What is the name of the component?
2. Do you want to create the component using typescript?

And then a folder will be created with the name of the component inside src/components with an index file and a styles files.<br/><br/>

### Creating your react or react native page

Run the following command:

`codely generate:page`

Then, answer the questions below:

1. What is the name of the page?
2. Do you want to create the page using typescript?

And then a folder will be created with the name of the component inside src/pages with an index file and a styles files.

### Creating a new controller

Run the following command:

`codely generate:controller`

Then, answer the questions below:

1. What is the name of the controller?
2. What methods do you want to use?
3. Does your project use the JavaScript modules type (import/export)?
4. Do you want to create the controller using typescript?

And then a file will be created with the name of the controller inside src/app/controllers.

## Contributing

Please read [CONTRIBUTING.md](contributing.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](license.md) file for details.

Made with :hearts: by Greyson :wave:
