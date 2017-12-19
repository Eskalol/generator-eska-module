'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const slugify = (text) => {
  return text.toString().toLowerCase().replace(/\s+/g, '-');
};

const parseRepoName = (url) => {
  const regex = new RegExp(/(?:\.[a-z]+[\:|\/])(.+)(?:\.git)/); // eslint-disable-line no-useless-escape
  const match = String(url).match(regex);
  return match ? match[1] : '';
};

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the transcendent ' + chalk.red('generator-eska-module') + ' generator!'
    ));

    const eslintConfigPrompt = [{
      type: 'list',
      name: 'eslintConfig',
      message: 'Select eslint config',
      choices: ["airbnb", "google", "standard"],
      when: () => this.props.linter === 'eslint'
    }];

    const prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'Your module name:',
      default: slugify(this.appname),
      filter: text => slugify(text)
    }, {
      type: 'input',
      name: 'moduleDescription',
      message: 'Description:',
      default: ''
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Your name:',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to write your name.'
    }, {
      type: 'input',
      name: 'authorEmail',
      message: 'Your email:',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide an email.'
    }, {
      type: 'input',
      name: 'gitrepo',
      message: 'Git repository url:',
      validate: x => x.length > 0 ? true : 'You have to provide a git repository url.'
    }, {
      name: 'cli',
      message: 'Do you want a cli?',
      type: 'confirm',
      default: false
    }, {
      type: 'list',
      name: 'tests',
      message: 'Select test runner',
      choices: ["ava", "jest"]
    }, {
      type: 'list',
      name: 'linter',
      message: 'Select a linter',
      choices: ['eslint', 'xo']
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      return this.prompt(eslintConfigPrompt);
    }).then(props => {
      this.props = { ...this.props, ...props };
    });
  }

  writing() {
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
  }

  install() {
    this.installDependencies();
  }
};
