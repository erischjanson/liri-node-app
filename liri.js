require("dotenv").config();


var twitter = require("twitter");
var spotify = require("node-spotify-api");
var keys = require("./keys.js");



//console.log(keys);
// console.log(keys.twitter);


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
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    }
	  } else {
	  	console.log("error");
	  }
	});

};

function spotifyMe(){
	console.log("spotify");
};

function movie(){
	console.log("movie");
};

function random(){
	console.log("random");
}

var command = process.argv[2];

if (command==="my-tweets"){
	tweet();	
} else if (command==="spotify-this-song"){
	spotifyMe();	
} else if (command==="movie-this"){
	movie();	
} else if (command==="do-what-it-says"){
	random();
};



