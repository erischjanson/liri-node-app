require("dotenv").config();

var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

//takes in user's command and parameters(e.g. movie title)
var command = process.argv[2];
var commandParameters = "";
for(var i = 3; i < process.argv.length; i++){
	commandParameters += " " + process.argv[i];
};





//console.log(keys);
// console.log(keys.twitter);

//twitter api call
function tweet(){	
	var client = new twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	console.log("twitter");
	var params = {screen_name: "muscatelgrapes1"};

	client.get("statuses/user_timeline", params, function(error, tweets, response) {
	  if (!error) {
	    for(var i =0; i < tweets.length; i++){
	    	console.log(tweets[i]);
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    }
	  } else {
	  	console.log("error");
	  }
	});

};


//spotify api call
function spotifyMe(){
	console.log("spotify");
	var spotify = new Spotify({
		  id: process.env.SPOTIFY_ID,
	  	  secret: process.env.SPOTIFY_SECRET 
	});

	//console.log(spotify);
	spotify.search({type: "track", query: "All the Small Things", limit: 1}).then(function(response){
		console.log(JSON.stringify(response.tracks.items[0].artists[0], null, " "));		
	}).catch(function(err){
		console.log(err);
	});
};

//omdb api call
function movie(){
	console.log("movie");
	//var title = process.argv
	request("http://www.omdbapi.com/?t=" + commandParameters + "&y=&plot=short&apikey=trilogy", function(error,response,body){
		if(!error && response.statusCode===200 && commandParameters){
			//console.log(JSON.parse(body));
			console.log("Movie: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Ratings: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		} else {
			request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body){
			console.log("Movie: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
			})
		}
	})

};


//file reading function
function random(){
	console.log("random");
}



if (command==="my-tweets"){
	tweet();	
} else if (command==="spotify-this-song"){
	spotifyMe();	
} else if (command==="movie-this"){
	movie();	
} else if (command==="do-what-it-says"){
	random();
};



