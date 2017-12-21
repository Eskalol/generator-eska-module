'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const defaultPrompts = {
  moduleName: 'test stuff',
  moduleDescription: 'some awesome description',
  authorName: 'cool',
  authorEmail: 'cool@example.com',
  authorWebsite: 'superAwesome.com',
  gitRepo: 'https://github.com/myAwesome/repo.git',
  license: 'MIT'
};

describe('generator-eska-module:app', () => {
  describe('eslint:airbnb and jest', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
        ...defaultPrompts,
        cli: false,
        tests: 'jest',
        linter: 'eslint',
        eslintConfig: 'airbnb'
      });
    });
    it('should create files', () => {
      assert.file([
        'README.md',
        '.gitattributes',
        '.editorconfig',
        '.npmignore',
        '.gitignore',
        '.npmrc',
        '.travis.yml',
        '__tests__/index.js',
        'index.js',
        'package.json',
        '.eslintrc.js'
      ]);
      assert.noFile(['cli.js']);
    });

    it('package.json file should contain correct content', () => {
      assert.fileContent('package.json', '"name": "test stuff"');
      assert.fileContent('package.json', '"description": "some awesome description"');
      assert.fileContent('package.json', '"license": "MIT"');
      assert.fileContent(
        'package.json',
        '"repository": "https://github.com/myAwesome/repo.git"'
      );
      assert.fileContent('package.json', '"name": "cool"');
      assert.fileContent('package.json', '"email": "cool@example.com"');
      assert.fileContent('package.json', '"url": "superAwesome.com"');
      assert.fileContent('package.json', 'jest');
      assert.fileContent('package.json', 'eslint');
      assert.fileContent('package.json', 'eslint-config-airbnb');
      assert.noFileContent('package.json', 'eslint-config-google');
      assert.noFileContent('package.json', 'eslint-config-standard');
      assert.noFileContent('package.json', 'cli');
      assert.noFileContent('package.json', 'xo');
      assert.noFileContent('package.json', 'ava');
    });

    it('.eslintrc.js should contain correct content', () => {
      assert.fileContent('.eslintrc.js', 'airbnb');
    });

    it('test files should contain correct content', () => {
      assert.fileContent('__tests__/index.js', 'describe');
    });
  });

  describe('eslint:google, ava and cli', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
        ...defaultPrompts,
        cli: true,
        tests: 'ava',
        linter: 'eslint',
        eslintConfig: 'google'
      });
    });
    it('should create files', () => {
      assert.file([
        'README.md',
        '.gitattributes',
        '.editorconfig',
        '.npmignore',
        '.gitignore',
        '.npmrc',
        '.travis.yml',
        '__tests__/index.js',
        'index.js',
        'package.json',
        '.eslintrc.js',
        'cli.js'
      ]);
    });

    it('package.json file should contain correct content', () => {
      assert.fileContent('package.json', '"name": "test stuff"');
      assert.fileContent('package.json', '"description": "some awesome description"');
      assert.fileContent('package.json', '"license": "MIT"');
      assert.fileContent(
        'package.json',
        '"repository": "https://github.com/myAwesome/repo.git"'
      );
      assert.fileContent('package.json', '"name": "cool"');
      assert.fileContent('package.json', '"email": "cool@example.com"');
      assert.fileContent('package.json', '"url": "superAwesome.com"');
      assert.fileContent('package.json', 'ava');
      assert.fileContent('package.json', 'eslint');
      assert.fileContent('package.json', '"bin": "cli.js');
      assert.fileContent('package.json', 'eslint-config-google');
      assert.noFileContent('package.json', 'eslint-config-standard');
      assert.noFileContent('package.json', 'eslint-config-airbnb');
      assert.noFileContent('package.json', 'xo');
      assert.noFileContent('package.json', 'jest');
    });

    it('.eslintrc.js should contain correct content', () => {
      assert.fileContent('.eslintrc.js', 'google');
    });

    it('test files should contain correct content', () => {
      assert.fileContent('__tests__/index.js', 'ava');
    });
  });

  describe('eslint:standard, ava', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
        ...defaultPrompts,
        cli: false,
        tests: 'ava',
        linter: 'eslint',
        eslintConfig: 'standard'
      });
    });

    it('should create files', () => {
      assert.file([
        'README.md',
        '.gitattributes',
        '.editorconfig',
        '.npmignore',
        '.gitignore',
        '.npmrc',
        '.travis.yml',
        '__tests__/index.js',
        'index.js',
        'package.json',
        '.eslintrc.js'
      ]);
      assert.noFile(['cli.js']);
    });

    it('package.json file should contain correct content', () => {
      assert.fileContent('package.json', '"name": "test stuff"');
      assert.fileContent('package.json', '"description": "some awesome description"');
      assert.fileContent('package.json', '"license": "MIT"');
      assert.fileContent(
        'package.json',
        '"repository": "https://github.com/myAwesome/repo.git"'
      );
      assert.fileContent('package.json', '"name": "cool"');
      assert.fileContent('package.json', '"email": "cool@example.com"');
      assert.fileContent('package.json', '"url": "superAwesome.com"');
      assert.fileContent('package.json', 'ava');
      assert.fileContent('package.json', 'eslint');
      assert.fileContent('package.json', 'eslint-config-standard');
      assert.noFileContent('package.json', 'eslint-config-airbnb');
      assert.noFileContent('package.json', 'eslint-config-google');
      assert.noFileContent('package.json', '"bin": "cli.js');
      assert.noFileContent('package.json', 'xo');
      assert.noFileContent('package.json', 'jest');
    });

    it('.eslintrc.js should contain correct content', () => {
      assert.fileContent('.eslintrc.js', 'standard');
    });

    it('test files should contain correct content', () => {
      assert.fileContent('__tests__/index.js', 'ava');
    });
  });

  describe('xo, jest and cli', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
        ...defaultPrompts,
        cli: true,
        tests: 'jest',
        linter: 'xo',
        eslintConfig: 'standard'
      });
    });

    it('should create files', () => {
      assert.file([
        'README.md',
        '.gitattributes',
        '.editorconfig',
        '.npmignore',
        '.gitignore',
        '.npmrc',
        '.travis.yml',
        '__tests__/index.js',
        'index.js',
        'package.json',
        'cli.js'
      ]);
      assert.noFile(['.eslintrc.js']);
    });

    it('package.json file should contain correct content', () => {
      assert.fileContent('package.json', '"name": "test stuff"');
      assert.fileContent('package.json', '"description": "some awesome description"');
      assert.fileContent('package.json', '"license": "MIT"');
      assert.fileContent(
        'package.json',
        '"repository": "https://github.com/myAwesome/repo.git"'
      );
      assert.fileContent('package.json', '"name": "cool"');
      assert.fileContent('package.json', '"email": "cool@example.com"');
      assert.fileContent('package.json', '"url": "superAwesome.com"');
      assert.fileContent('package.json', 'jest');
      assert.fileContent('package.json', 'xo');
      assert.fileContent('package.json', '"bin": "cli.js');
      assert.noFileContent('package.json', 'eslint-config-airbnb');
      assert.noFileContent('package.json', 'eslint-config-google');
      assert.noFileContent('package.json', 'eslint-config-standard');
      assert.noFileContent('package.json', 'eslint');
      assert.noFileContent('package.json', 'ava');
    });

    it('test files should contain correct content', () => {
      assert.fileContent('__tests__/index.js', 'describe');
    });
  });

  describe('README.md content', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
        ...defaultPrompts,
        cli: true,
        tests: 'jest',
        linter: 'xo',
        eslintConfig: 'standard'
      });
    });

    it('should be created', () => {
      assert.file(['README.md']);
    });

    it('should contain module name', () => {
      assert.fileContent('README.md', defaultPrompts.moduleName);
    });

    it('should contain module description', () => {
      assert.fileContent('README.md', defaultPrompts.moduleDescription);
    });

    it('should contain license', () => {
      assert.fileContent('README.md', defaultPrompts.license);
    });

    it('should contain author name', () => {
      assert.fileContent('README.md', defaultPrompts.authorName);
    });
  });
});
