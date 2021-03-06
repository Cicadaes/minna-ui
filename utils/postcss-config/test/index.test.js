/** @jest-environment node */

'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const postcss = require('postcss');
const postcssConfig = require('../index.js');

const readFile = promisify(fs.readFile);
const jestConfigPath = require.resolve('@minna-ui/jest-config');
const fixturesPath = path.join(path.dirname(jestConfigPath), 'fixtures');
const sourceCssPath = path.join(fixturesPath, 'import.css');
const sourceCssMixinPath = path.join(fixturesPath, 'mixin.css');
const mixinsPath = path.join(fixturesPath, 'css-mixins');

const options = {
  from: sourceCssPath,
  map: {
    inline: false,
    annotation: true,
  },
};

let sourceCss = '';
let sourceCssMixin = '';

beforeAll(async () => {
  [sourceCss, sourceCssMixin] = await Promise.all([
    readFile(sourceCssPath, 'utf8'),
    readFile(sourceCssMixinPath, 'utf8'),
  ]);
});

describe('PostCSS config', () => {
  it('compiles valid CSS', async () => {
    expect.assertions(5);
    const output = postcss(postcssConfig())
      .process(sourceCss, options);
    await expect(output).resolves.toBeDefined();
    const result = await output;
    expect(result.processor.plugins).not.toHaveLength(0);
    expect(result.opts.from).toBeDefined();
    expect(result.map).toBeDefined();
    expect(result.css).toMatchSnapshot();
  });

  it('compiles CSS with variable override', async () => {
    expect.assertions(5);
    const output = postcss(postcssConfig({
      variables: {
        color: 'rgb(0, 0, 255)', // blue
      },
    }))
      .process(sourceCss, options);
    await expect(output).resolves.toBeDefined();
    const result = await output;
    expect(result.processor.plugins).not.toHaveLength(0);
    expect(result.opts.from).toBeDefined();
    expect(result.map).toBeDefined();
    expect(result.css).toMatchSnapshot();
  });

  it('compiles CSS with standalone option true', async () => {
    expect.assertions(5);
    const output = postcss(postcssConfig({ standalone: true }))
      .process(sourceCss, options);
    await expect(output).resolves.toBeDefined();
    const result = await output;
    expect(result.processor.plugins).not.toHaveLength(0);
    expect(result.opts.from).toBeDefined();
    expect(result.map).toBeDefined();
    expect(result.css).toMatchSnapshot();
  });

  it('compiles CSS with verbose option true', async () => {
    expect.assertions(5);
    const output = postcss(postcssConfig({ verbose: true }))
      .process(sourceCss, options);
    await expect(output).resolves.toBeDefined();
    const result = await output;
    expect(result.processor.plugins).not.toHaveLength(0);
    expect(result.opts.from).toBeDefined();
    expect(result.map).toBeDefined();
    expect(result.css).toMatchSnapshot();
  });

  it('compiles CSS with debug option true', async () => {
    expect.assertions(5);
    const output = postcss(postcssConfig({ debug: true }))
      .process(sourceCss, options);
    await expect(output).resolves.toBeDefined();
    const result = await output;
    expect(result.processor.plugins).not.toHaveLength(0);
    expect(result.opts.from).toBeDefined();
    expect(result.map).toBeDefined();
    expect(result.css).toMatchSnapshot();
  });

  it('compiles CSS with custom mixin', async () => {
    expect.assertions(3);
    const output = postcss(postcssConfig({ mixinsPath }))
      .process(sourceCssMixin, { from: sourceCssMixinPath });
    await expect(output).resolves.toBeDefined();
    const result = await output;
    expect(result.css).toMatch('.target::after');
    expect(result.css).toMatchSnapshot();
  });
});
