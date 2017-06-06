var allUsers = ["jerichoactual", "freecodecamp", "eriksantv", "FilthyNerd", "RocketLeague", "reynad27"];
var onlineUsers = [];
var html = '';
var offlineUsers = [];

function User(username, id, status, game, url, logo) 
	{
		this.username = username;
		this.id = id;
		this.status = status;
		this.game = game;
		this.url = url;
		this.logo = logo;
		this.online = 1;
	}
//iterate user list
// var channels = ["freecodecamp","test_channel","ESL_SC2"];

// function getChannelInfo() {
//   channels.forEach(function(channel) {
//     function makeURL(type, name) {
//       return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
//     };
//     $.getJSON(makeURL("streams", channel), function(data) {
//       var game,
//           status;
//       if (data.stream === null) {
//         game = "Offline";
//         status = "offline";
//       } else if (data.stream === undefined) {
//         game = "Account Closed";
//         status = "offline";
//       } else {
//         game = data.stream.game;
//         status = "online";
//       };
//       $.getJSON(makeURL("channels", channel), function(data) {
//         var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
//           	name = data.display_name != null ? data.display_name : channel,
//           	description = status === "online" ? ': ' + data.status : "";
//           	html = '<div class="row ' + 
// 	          	status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' + 
// 	          	logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' + 
// 	          	data.url + '" target="_blank">' + 
// 	          	name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+ 
// 	          	game + '<span class="hidden-xs">' + 
// 	          	description + '</span></div></div>';
//         status === "online" ? $(".users").prepend(html) : $(".users").append(html);
//       });
//     });
//   });
// };

//MY CODE STARTS HERE
for (var i = 0; i < allUsers.length; i++) {
	var offlineUsers2 = [];
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/streams/' + allUsers[i],
		headers: {
		   'Client-ID': 'x4pt0ckcpk9t0xlyw89hwllzjs2ewn'
		 },
		success: function(streams) {
			console.log(streams);
			if(streams.stream !== null) {
				var arr = streams.stream.channel;
				onlineUsers.push(new User(arr.display_name, arr._id, arr.status, arr.url, arr.logo, 0))
				html = '<li class="online"><a href=' + arr.url + '"target="_blank"><img class="logo" src=' + arr.logo+ ">  " + arr.display_name + '</a>' + arr.status + '</li>';
	       		$(".users").append(html);
	       		allUsers.splice($.inArray(streams.stream.channel.display_name, arr), 1);
			} else {
			}
		}
	})

	$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/channels/' + allUsers[i],
		 headers: {
		   'Client-ID': 'x4pt0ckcpk9t0xlyw89hwllzjs2ewn'
		 },
		 success: function(data) {
		   console.log(data);
	       		var resArr = data;
	       		for (var r = 0; r < 1; r++) {
       				offlineUsers.push(new User(resArr.display_name, resArr._id, resArr.game, resArr.url, resArr.logo));
       				html = '<li class="offline"><a href=' + resArr.url + '"target="_blank"><img class="logo" src=' + resArr.logo+ ">  " + resArr.display_name + '</a><p>offline</p></li>';
       				$(".users").append(html);
       				console.log(offlineUsers);	
		 }
	}
	});
}
//MY CODE ENDS HERE

//add new user to list
$("input[type='text']").keypress(function(event){
	if(event.which == 13) {
		//Grabbing new user text from input
		var username = ($(this).val());
		console.log(username);
		//Create a new li and add to ul
		allUsers.push(username);
	}
});