'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const slugify = (text) => {
  return text.toString().toLowerCase().replace(/\s+/g, '-');
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the transcendent ' + chalk.red('generator-eska-module') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'moduleName',
      message: 'Your module name',
      default: slugify(this.appname),
      filter: text => slugify(text)
    }, {

    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
