module.exports = {
  tweetSuffix: " #PhDBot #notes #citations",
  cronFreq: "00 30 08 * * 1-6",
  contextualizers: {
    bib: require('peritext-contextualizer-bib'),
    codefiles: require('peritext-contextualizer-codefiles'),
    vegalite: require('peritext-contextualizer-vegalite'),
    p5: require('peritext-contextualizer-p5'),
    glossary: require('peritext-contextualizer-glossary'),
    video: require('peritext-contextualizer-video'),
    embed: require('peritext-contextualizer-embed'),
    image: require('peritext-contextualizer-image'),
    table: require('peritext-contextualizer-table'),
    dicto: require('peritext-contextualizer-dicto'),
    webpage: require('peritext-contextualizer-webpage'),
    'data-presentation': require('peritext-contextualizer-data-presentation'),
  }
}