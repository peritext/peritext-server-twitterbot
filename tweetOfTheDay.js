const fs = require('fs');
const path = require('path');
const publishImage = require('./scripts/publishImage');
const config = require('./config');

const tweet = function() {

  console.log('bip bip bip. Waking up to publish stuff');
  /*
   * Runs every weekday (Monday through Friday)
   * at 19:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
  const sum = fs.readFileSync('data/summary.json', 'utf8');
   try{
    const summary = JSON.parse(sum);
      const activeDate = new Date();
      const dayStamp = activeDate.getFullYear() + '-' + activeDate.getMonth() + '-' + activeDate.getDate();
      const tweetOfTheDay = summary[dayStamp];
      
      if (tweetOfTheDay) {
        let tweetContent = tweetOfTheDay.message;
        const alt = tweetOfTheDay.text.length < 140 ? tweetOfTheDay.text : tweetOfTheDay.text.substr(0, 137) + '...';
        publishImage(
          path.resolve(__dirname + '/images/' + tweetOfTheDay.id  + '.jpg'), 
          alt, 
          tweetContent,
          (err) => {
            if (err) {
              console.log('error while publishing : ', err);

            } else {
              console.log('published !');
            }
        })
      } else {
        console.log('oups, tweet not found');
      }
    } catch(e) {
      console.log('json invalid', e);
    }
}

module.exports = tweet;