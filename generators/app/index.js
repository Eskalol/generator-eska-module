'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const slugify = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-');
};

// Const parseRepoName = url => {
//   const regex = new RegExp(/(?:\.[a-z]+[\:|\/])(.+)(?:\.git)/); // eslint-disable-line no-useless-escape
//   const match = String(url).match(regex);
//   return match ? match[1] : '';
// };

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the transcendent ' +
          chalk.red('generator-eska-module') +
          ' generator!'
      )
    );

    const eslintConfigPrompt = [
      {
        type: 'list',
        name: 'eslintConfig',
        message: 'Select eslint config',
        choices: ['airbnb', 'google', 'standard'],
        when: () => this.props.linter === 'eslint'
      }
    ];

    const prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Your module name',
        default: slugify(this.appname),
        filter: text => slugify(text)
      },
      {
        type: 'input',
        name: 'moduleDescription',
        message: 'Description',
        default: ''
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Your name',
        store: true,
        validate: x => (x.length > 0 ? true : 'You have to write your name.')
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email',
        store: true,
        validate: x => (x.length > 0 ? true : 'You have to provide an email.')
      },
      {
        type: 'input',
        name: 'authorWebsite',
        message: 'Your Website',
        store: true,
        validate: x => (x.length > 0 ? true : 'You have to provide your personal website')
      },
      {
        type: 'input',
        name: 'gitRepo',
        message: 'Git repository url:',
        validate: x => (x.length > 0 ? true : 'You have to provide a git repository url.')
      },
      {
        type: 'list',
        name: 'license',
        message: 'Select license',
        default: 'MIT',
        choices: [
          'MIT',
          'Apache 2.0',
          'Mozilla Public License 2.0',
          'BSD 2-Clause (FreeBSD) License',
          'BSD 3-Clause (NewBSD) License',
          'Internet Systems Consortium (ISC) License',
          'GNU AGPL 3.0',
          'GNU GPL 3.0',
          'GNU LGPL 3.0',
          'Unlicense',
          'No License (Copyrighted)'
        ]
      },
      {
        name: 'cli',
        message: 'Do you want a cli?',
        type: 'confirm',
        default: false
      },
      {
        type: 'list',
        name: 'tests',
        message: 'Select test runner',
        choices: ['ava', 'jest']
      },
      {
        type: 'list',
        name: 'linter',
        message: 'Select a linter',
        choices: ['eslint', 'xo']
      }
    ];

    return this.prompt(prompts)
      .then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
        return this.prompt(eslintConfigPrompt);
      })
      .then(props => {
        this.props = { ...this.props, ...props };
      });
  }

  default() {
    this.composeWith(require.resolve('generator-license'), {
      name: this.props.authorName,
      email: this.props.authorEmail,
      website: this.props.authorWebsite,
      license: this.props.license
    });
  }

  writing() {
    const eslintConfig = this.props.eslintConfig || '';
    const eslint = this.props.linter === 'eslint';
    const tpl = {
      ...this.props,
      ava: this.props.tests === 'ava',
      jest: this.props.tests === 'jest',
      xo: this.props.linter === 'xo',
      eslint: this.props.linter === 'eslint',
      eslintGoogle: eslintConfig === 'google',
      eslintAirbnb: eslintConfig === 'airbnb',
      eslintStandard: eslintConfig === 'standard'
    };

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      tpl
    );

    this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));

    if (eslint && eslintConfig === 'google') {
      this.fs.copy(
        this.templatePath('eslint(google)/eslintrc'),
        this.destinationPath('.eslintrc')
      );
    }

    if (eslint && eslintConfig === 'airbnb') {
      this.fs.copy(
        this.templatePath('eslint(airbnb)/eslintrc'),
        this.destinationPath('.eslintrc')
      );
    }

    if (eslint && eslintConfig === 'standard') {
      this.fs.copy(
        this.templatePath('eslint(standard)/eslintrc'),
        this.destinationPath('.eslintrc')
      );
    }

    if (this.props.cli) {
      this.fs.copy(this.templatePath('cli.js'), this.destinationPath('cli.js'));
    }
  }

  install() {
    this.installDependencies();
  }
};
