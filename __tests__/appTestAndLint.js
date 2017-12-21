'use strict';
const Inception = require('yo-inception');
const path = require('path');

const defaultPrompts = {
  moduleName: 'test-stuff',
  moduleDescription: 'some awesome description',
  authorName: 'cool',
  authorEmail: 'cool@example.com',
  authorWebsite: 'https://github.com/Eskalol',
  gitRepo: 'https://github.com/myAwesome/repo.git',
  license: 'MIT'
};

describe('generated tests and linting', () => {
  let inception;

  // Generate a package.json with all options enabled.
  beforeAll(done => {
    inception = new Inception(path.join(__dirname, 'tempDir'));
    inception.copyPackageJson(
      path.join(__dirname, '../generators/app/templates/_package.json'),
      {
        ...defaultPrompts,
        ava: true,
        jest: true,
        xo: true,
        eslint: true,
        eslintGoogle: true,
        eslintAirbnb: true,
        eslintStandard: true,
        cli: true
      }
    );
    return inception.npmInstall(false).then(() => done());
  }, 200000);

  describe('jest tests', () => {
    beforeAll(done => {
      inception
        .runGen(path.join(__dirname, '../generators/app'), {
          ...defaultPrompts,
          tests: 'jest',
          linter: 'eslint',
          eslintConifg: 'google'
        })
        .then(() => done());
    }, 60000);

    it(
      'tests should pass',
      async () => {
        await expect(inception.runAsyncCommand('npm', ['test'])).resolves.toBe(0);
      },
      20000
    );
  });

  describe('ava tests', () => {
    beforeAll(done => {
      inception
        .runGen(path.join(__dirname, '../generators/app'), {
          ...defaultPrompts,
          tests: 'ava',
          linter: 'eslint',
          eslintConifg: 'google'
        })
        .then(() => done());
    }, 60000);

    it(
      'tests should pass',
      async () => {
        await expect(inception.runAsyncCommand('npm', ['test'])).resolves.toBe(0);
      },
      20000
    );
  });

  describe('eslint:google', () => {
    beforeAll(done => {
      inception
        .runGen(path.join(__dirname, '../generators/app'), {
          ...defaultPrompts,
          tests: 'ava',
          linter: 'eslint',
          eslintConifg: 'google'
        })
        .then(() => done());
    }, 60000);

    it('linting should pass', async () => {
      await expect(
        inception.runAsyncCommand('npm', ['run', 'lint'], false)
      ).resolves.toBe(0);
    });
  });

  describe('eslint:airbnb', () => {
    beforeAll(done => {
      inception
        .runGen(path.join(__dirname, '../generators/app'), {
          ...defaultPrompts,
          tests: 'ava',
          linter: 'eslint',
          eslintConifg: 'airbnb'
        })
        .then(() => done());
    }, 60000);

    it('linting should pass', async () => {
      await expect(inception.runAsyncCommand('npm', ['run', 'lint'])).resolves.toBe(0);
    });
  });

  describe('eslint:standard', () => {
    beforeAll(done => {
      inception
        .runGen(path.join(__dirname, '../generators/app'), {
          ...defaultPrompts,
          tests: 'ava',
          linter: 'eslint',
          eslintConifg: 'standard'
        })
        .then(() => done());
    }, 60000);

    it('linting should pass', async () => {
      await expect(inception.runAsyncCommand('npm', ['run', 'lint'])).resolves.toBe(0);
    });
  });

  describe('xo linter', () => {
    beforeAll(done => {
      inception
        .runGen(path.join(__dirname, '../generators/app'), {
          ...defaultPrompts,
          tests: 'ava',
          linter: 'xo'
        })
        .then(() => done());
    }, 60000);

    it('linting should pass', async () => {
      await expect(inception.runAsyncCommand('npm', ['run', 'lint'])).resolves.toBe(0);
    });
  });

  afterAll(() => {
    inception.clean();
  });
});
