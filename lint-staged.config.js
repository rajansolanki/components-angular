module.exports = {
  '*.ts': () => ['tsc --noEmit -p tsconfig.app.json', 'yarn lint'],
  '*.{ts,js,html,scss,md,yml,json}': (filenames) =>
    `prettier --write ${filenames.join(' ')}`,
};
