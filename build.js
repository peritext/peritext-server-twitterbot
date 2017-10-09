const path = require('path');
const fs = require('fs');
const generator = require('peritext-generator-twitter').default;

const config = require('./config');

var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(path.resolve(__dirname + '/images'));
fs.mkdirSync('images');

try{
  const str = fs.readFileSync(path.resolve(__dirname + '/data/story.json'), 'utf8');
  const cssStyle = fs.readFileSync(path.resolve(__dirname + '/data/style.css'), 'utf8');
  const story = JSON.parse(str.trim());
  const contextualizers = config.contextualizers;


  const stopWordsFr = fs.readFileSync(path.resolve(__dirname + '/data/french-stop-words.txt'), 'utf8');

  generator({
    story: story,
    cssStyle: cssStyle,
    contextualizers: contextualizers,
    imagesFolder: path.resolve(__dirname + '/images/'),
    dataPath: path.resolve(__dirname + '/data/tweets.json'),
    tagsStopWords: stopWordsFr.split('\n'),
    prefix: 'Doc excerpt ',
    locale: 'fr',
    suffix: '#peritext_doc', // tweet body suffix
    fontUrl: 'https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i',
    makeLink: function(block) {
      return `http://www.mysite.com/sections/${block.sectionId}?block=${block.blocks[0].key}`;
    },
    callback: function(err, tweets) {
      console.log('done, preparing consumable tweets');
      const date = new Date();
      let activeDate = date;
      const summary = {};
      tweets.forEach(tweet => {
        const displayDate = activeDate.getFullYear() + '-' + activeDate.getMonth() + '-' + activeDate.getDate();
        summary[displayDate] = tweet;
        const dat = new Date(activeDate.valueOf());
        dat.setDate(dat.getDate() + 1);
        activeDate = dat;
      });

      fs.writeFileSync(path.resolve(__dirname + '/data/summary.json'), JSON.stringify(summary, null, 2), 'utf8');
      console.log('all set !');
    }
  });
} catch(e) {
  console.log(e);
}