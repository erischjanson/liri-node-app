//dependencies
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

//twitter api call
function tweet(){	
	var client = new twitter(keys.twitter);
	
	var params = {screen_name: "muscatelgrapes1", limit: 20};

	client.get("statuses/user_timeline", params, function(error, tweets, response) {
	  if (!error) {
	    for(var i =0; i < tweets.length; i++){	    	
	    	console.log("TWEET TIME: ", tweets[i].created_at);
	    	console.log("TWEET TEXT: ", tweets[i].text);
	    }
	  } else {
	  	console.log("error");
	  }
	});
};

//spotify api call
function spotifyMe(){	
	var spotify = new Spotify(keys.spotify);
	
	if(commandParameters){
	spotify.search({type: "track", query: commandParameters, limit: 1}, function(err, data){
		if(err){
			console.log(err);
			return;
		}	
	
		for (var i = 0; i < data.tracks.items.length; i++){
			console.log('SONG NAME', data.tracks.items[i].name);
			console.log('ARTIST NAME', data.tracks.items[i].artists[0].name);
			console.log('ALBUM NAME', data.tracks.items[i].album.name);
			console.log('PREVIEW LINK', data.tracks.items[i].preview_url);
		}	
	});
	} else if (!commandParameters){
		spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE').then(function(data) {    
		    console.log("SONG NAME", data.name);
		    console.log("ARTIST NAME", data.artists[0].name);
		    console.log("ALBUM NAME", data.album.name);
		    console.log("PREVIEW LINK", data.preview_url);   
		  }).catch(function(err) {
		    console.error('Error occurred: ' + err); 
		  });
	}
};

//omdb api call
function movie(){	
	request("http://www.omdbapi.com/?t=" + commandParameters + "&y=&plot=short&apikey=trilogy", function(error,response,body){
		if(!error && response.statusCode===200 && commandParameters){			
			console.log("Movie: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Ratings: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		} else {
			request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body){
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

//file-reading function that calls spotifyMe function using contents of the text file as parameter
function random(){	
	fs.readFile("random.txt", "utf8", function(error, data){		
		var newData = data.split(",");		
		command=newData[0];	
		commandParameters=newData[1];		
		spotifyMe();
	})
};

//conditions to determine which function to call
if (command==="my-tweets"){
	tweet();	
} else if (command==="spotify-this-song"){
	spotifyMe();	
} else if (command==="movie-this"){
	movie();	
} else if (command==="do-what-it-says"){
	random();
};



