var allUsers = ["jerichoactual", "freecodecamp", "eriksantv", "FilthyNerd", "RocketLeague", "reynad27"];
var onlineUsers = [];
var html = '';

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

for (var i = 0; i < allUsers.length; i++) {
	var offlineUsers = [];
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
				html = '<li class="online"><a href=' + arr.url + ' target="_blank"><img class="logo" src=' + arr.logo+ ">  " + arr.display_name + '</a>' + arr.status + '</li>';
	       		$(".users").append(html);
	       		allUsers.splice($.inArray(streams.stream.channel.display_name, arr), 1);
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