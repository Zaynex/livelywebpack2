const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  plugins: [
    // require('stylelint')(),
    require('postcss-import')(),
    require('autoprefixer')('last 2 versions', 'IOS 7'),
  ].concat(DEBUG ? [
    require('postcss-reporter')(),
    require('postcss-browser-reporter')(),
  ] : []),
}
