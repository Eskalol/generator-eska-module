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
  licesne: 'MIT'
};

describe('generator-eska-module:app', () => {
  describe('eslint:airbnb and jest', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
        ...defaultPrompts,
        cli: false,
        tests: 'jest',
        linter: 'eslint',
        eslintConfing: 'airbnb'
      });
    });
  });

  it('creates files', () => {
    assert.file(['package.json']);
  });
});
