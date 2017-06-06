var allUsers = ["jerichoactual", "freecodecamp", "eriksantv", "FilthyNerd", "RocketLeague", "reynad27", "SuperMCGamer"];
var onlineUsers = [];
var html = '';
var onlineUsernames = [];

function User(username, id, status, game, url, logo, viewers) 
	{
		this.username = username;
		this.id = id;
		this.status = status;
		this.game = game;
		this.url = url;
		this.logo = logo;
		//option to set viewers equal to a certain number, and only show allUsers in the offline mode if viewers is equal to 0
		this.viewers;
	}

//iterate user list
for (var i = 0; i < allUsers.length; i++) {
	
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
				onlineUsers.push(new User(arr.display_name, arr._id, arr.status, arr.game, arr.url, arr.logo, streams.stream.viewers))
				html = '<li class="online"><a href=' + arr.url + ' target="_blank"><img class="logo" src=' + arr.logo+ ">  " + arr.display_name + '</a> ' + arr.status + '</li>';
	       		$(".users").append(html);
	       		var name = arr.display_name;
	       		console.log(onlineUsers);
	       		onlineUsernames.push(name);
	       		allUsers.splice($.inArray(streams.stream.channel.display_name, arr), 1);
			} 
		}
	})
	//option to make a new "offline users" array using onlineUsers and allUsers
	// console.log(onlineUsernames);
	// //make offline users list from online users and all users
	var offlineUsers = [];
	// for (var k = 0; k < allUsers.length; k++) {
	//     if (onlineUsernames.indexOf(allUsers[k]) === -1){
	//       offlineUsers.push(allUsers[k]);
	//     }
	//   }
	//   console.log(offlineUsers);
	//   console.log(allUsers);
	// for (var j = 0; j < onlineUsers.length; j++) {
	//     if (allUsers.indexOf(onlineUsernames[j]) === -1){
	//       offlineUsers.push(onlineUsernames[j]);
	//     }
	//   }
	// console.log(offlineUsers)


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
       				offlineUsers.push(new User(resArr.display_name, resArr._id, resArr.game, resArr.url, resArr.logo, resArr.delay));
       				html = '<li class="offline"><a href=' + resArr.url + ' target="_blank"><img class="logo" src=' + resArr.logo+ ">  " + resArr.display_name + '</a> offline</li>';
       				$(".users").append(html);
       				console.log(offlineUsers);	
		 }
	}
	});
}

//add new user to list
$("input[type='text']").keypress(function(event){
	if(event.which == 13) {
		//Grabbing new user text from input
		var username = ($(this).val());
		console.log(username);
		//Add user to allUsers
		allUsers.push(username);
	}
});