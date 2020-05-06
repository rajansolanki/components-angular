module.exports = {
  '*.spec.ts': () => 'tsc --noEmit -p tsconfig.spec.json',
  '*.!(*spec).ts': () => ['tsc --noEmit -p tsconfig.app.json', 'yarn lint'],
  '*.{ts,js,html,scss,md,yml,json}': (filenames) =>
    `prettier --write ${filenames.join(' ')}`,
};
