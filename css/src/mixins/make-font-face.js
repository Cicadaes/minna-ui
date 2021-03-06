/*
  @FONT-FACE RULE MAKER

  Generates a @font-face rule for a font. You need to call this mixin as many
  times as you have fonts. This uses the `font-display: optional` property which
  means unless the font is already downloaded and loads instantly, it will not
  flash from unstyled to styled (no FOUT).

  USAGE:
    @mixin make-font-face <family>, <name>, [style], [weight], [directory];

*/

'use strict';

/**
 * PostCSS mixin to generate an @font-family rule.
 * @param {any} mixin
 * @param {string} fontFamily
 * @param {string} fontName
 * @param {string} [fontStyle]
 * @param {string} [fontWeight]
 * @param {string} [fontDir]
 * @returns {object}
 */
module.exports = (
  mixin,
  fontFamily,
  fontName,
  fontStyle = 'normal',
  fontWeight = 'normal',
  fontDir = '/fonts',
) => ({
  '@font-face': {
    'font-family': fontFamily,
    src: `local("${fontName}"),
      url("${fontDir}/${fontName}.woff2") format("woff2"),
      url("${fontDir}/${fontName}.woff") format("woff")`,
    'font-style': fontStyle,
    'font-weight': fontWeight,
    'font-display': 'optional',
  },
});
