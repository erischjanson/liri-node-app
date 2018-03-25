# liri-node-app

Description:

LIRI is a Language Interpretation and Recognition Interface. It is a command line node app that takes in commands and returns data based on those commands.

Using Node.js and the APIs and npm packages listed at the bottom of this README, Liri responds to the four commands below: 

```my-tweets```

```spotify-this-song '<song name here>```

```movie-this '<movie name here>'```

```do-what-it-says```

The beauty of this app is that it brings back targeted data so as not to overwhelm you with superfluous details. In short, it is a simple and fast way to find pertinent information.

Instructions:

```node liri.js my-tweets```
This will display your last 20 tweets as well as when they were created/tweeted.

```node liri.js spotify-this-song '<song name here>'```
This will show the song name, artist name, a link to preview the song in Spotify, and the album the song is on.

```node liri.js movie-this '<movie name here>'```
This will display targeted information about any movie title you search for, i.e., The movie title, year of release, IMBD rating, Rotten Tomatoes rating, country where the movie was produced, language, plot summary, and main actors.
If no movie is specified in the command, the information for "Mr. Nobody" will be returned.

```node liri.js do-what-it-says```
Displays information for the Backstreet Boys song "I want it that way".

APIs and NPM packages used:

Twitter API and npm Twitter package
Spotify API and npm Spotify package
OMDB API and npm Request package
