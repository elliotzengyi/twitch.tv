var $users = [
		"ESL_SC2", 
		"OgamingSC2", 
		"cretetion", 
		"freecodecamp", 
		"storbeck", 
		"habathcx", 
		"RobotCaleb", 
		"noobs2ninjas"];

var $userObj = [{}];
var $counter = 0;

function createLis() {
	$("#twitchList").html("");

	$users.forEach(function(user){

		var $html = "";

		$html = "<li id='li-" + user + "' class='" + $userObj[user].status + "'>";
		$html += "<a href='" + $userObj[user].url + "' target='_blank' style='background-image: url(";
		$html += $userObj[user].img + ")'><div class='user-info'>";
		$html += "<div class='user-name'><b>" + user;
		$html += "</b><span>" + $userObj[user].status + "</span>";
		$html += "</div></div></a></li>";

		$("#twitchList").append($html);

	});

}

function showLis(attr) {
	$("#twitchList li").hide();
	$(".active").removeClass("active");
	$("#nav-" + attr).addClass("active");
	$(".tab-title").text($("#nav-" + attr).text() + " Streamers");

	if( attr === "all" ) {
		$("#twitchList li").show();
	} else {
		$("#twitchList li." + attr).show();
	}
}

$(document).ready(function(){

	$users.forEach(function(user, index, array){

		$userObj[user] = {};
		$userObj[user].name = user;

		$.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + user + "?callback=?", function(data) {

			//console.log(data.stream);

			if ( data.stream === null ) {
				$userObj[user].status = "offline";
			} else {
				$userObj[user].status = "online";
			}
			
			$.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + user + "?callback=?", function(channelData) {

				if( channelData.logo ) {
					$userObj[user].img = channelData.logo;
				} else {
					$userObj[user].img = "https://via.placeholder.com/175x175/AED581/ffffff?text=No%20Photo";
				}

				$userObj[user].url = channelData.url;

				//console.log($userObj[user].url);

				$counter++;

				if( $counter === array.length ) {
					$("#loading").hide();
					createLis();
					//console.log($userObj);

					$('#search').bind('input propertychange', function() {
						$("#twitchList li").hide();
						if( $("#search").val() ) {
							$("#twitchList li[id*='" + $("#search").val() + "']").show();
						} else {
							$("#twitchList li").fadeIn();
						}
					});

					$("#nav-all").click(function(){showLis("all");});
					$("#nav-online").click(function(){showLis("online");});
					$("#nav-offline").click(function(){showLis("offline");});
				}
			});

		});

	});
	
});