/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*.{js,jsx,ts,tsx,cjs,mjs,json,jsonc,css}': [
    'biome check --error-on-warnings --no-errors-on-unmatched --files-ignore-unknown=true',
  ],
  '*.{md,mdx,yaml,yml}': ['prettier --check'],
};

export default config;
