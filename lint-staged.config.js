module.exports = {
  '*.{ts,js,html,scss,md,yml,json}': (filenames) =>
    `prettier --write ${filenames.join(' ')}`,
};
