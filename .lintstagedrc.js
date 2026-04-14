import { relative } from 'node:path';
import { cwd } from 'node:process';

/**
 * @param {string[]} filenames
 * @returns {string}
 */
const buildEslintCommand = (filenames) =>
  `eslint --max-warnings=0 ${filenames.map((f) => relative(cwd(), f)).join(' ')}`;

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*': ['prettier --check --ignore-unknown'],
  '*.{js,jsx,ts,tsx,cjs,mjs}': [buildEslintCommand],
};

export default config;
