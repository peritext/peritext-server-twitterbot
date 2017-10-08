Peritext server twitterbot
===

This server app daily publishes on twitter excerpts of a peritext document.

# Before installation

First you need to have [phantomjs](http://phantomjs.org/) installed.

Then you will need your `story.json` file, formatted according to the peritext specification.

* copy-paste your peritext-formatted `story.json` in the `data` folder
* run `npm run build` to build fragments' data

Then you will need to [setup a new twitter app](https://apps.twitter.com/) in order to access the API.

Then you're set !

*Note: it is strongly advised to build the fragments locally before deploying the app. If you want to build your excerpts on the remote server directly you will have to have phatomjs installed on it and to add to your `package.json` a postinstall hook that runs a `npm run build`.*

# Installation

```
git clone https://github.com/peritext/peritext-server-twitterbot
cd peritext-server-twitterbot
npm install
cp secrets.sample.json secrets.json
# Fill secrets.json with your data
```

# Deployment to heroku

First [create a new app on heroku](https://dashboard.heroku.com/new-app).

Then delete the git record of the project and create the new one for your own app.

```
# delete the git record
rm -rf .git
# init a new git record
git init
# follow heroku instruction from this point
# git add .
# ...
```

In order to have the app work in production, you will have to setup your twitter credentials as environment variables, and to setup a `cron` task to trigger the tweet script each day.

I setup a bash script that does everything to properly set the app on the distant server. First you have to set your data:

```
cp heroku.sample.sh heroku.sh
# Fill heroku.sh with your data (twitter credentials + app name)
```

Then you can launch the script after having given it write permissions:

```
# give permissions to the script
chmod u+rw heroku.sh
# let's roll
./heroku.sh
```

At the end of its execution the script opens the page of the `heroku scheduler` add-on. You will have to :

* click on "add a new job"
* in the command input enter the following comment: `node tweet.js`
* set the UTC date corresponding to the moment in the day when to publish new excerpts