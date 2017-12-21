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
  gitRepo: 'myAwesome/repo.git',
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
      assert.file(['package.json']);
    });

    it('files should contain correct content', () => {
      assert.fileContent('package.json', '"name": "test stuff"');
      assert.fileContent('package.json', '"description": "some awesome description"');
      assert.fileContent('package.json', '"license": "MIT"');
      assert.fileContent('package.json', '"repository": "myAwesome/repo.git"');
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
      assert.file(['package.json']);
    });

    it('files should contain correct content', () => {
      assert.fileContent('package.json', '"name": "test stuff"');
      assert.fileContent('package.json', '"description": "some awesome description"');
      assert.fileContent('package.json', '"license": "MIT"');
      assert.fileContent('package.json', '"repository": "myAwesome/repo.git"');
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
      assert.file(['package.json']);
    });

    it('files should contain correct content', () => {
      assert.fileContent('package.json', '"name": "test stuff"');
      assert.fileContent('package.json', '"description": "some awesome description"');
      assert.fileContent('package.json', '"license": "MIT"');
      assert.fileContent('package.json', '"repository": "myAwesome/repo.git"');
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
      assert.file(['package.json']);
    });

    it('files should contain correct content', () => {
      assert.fileContent('package.json', '"name": "test stuff"');
      assert.fileContent('package.json', '"description": "some awesome description"');
      assert.fileContent('package.json', '"license": "MIT"');
      assert.fileContent('package.json', '"repository": "myAwesome/repo.git"');
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
  });
});
