var search="love";
var randomElements;
var arry =new Array();
var counter;
var scrollcounter =0;
var itemHeight;
var limit=20; //limit of the count of json data is 20 
$(document).ready(function() {
		//Function to add a selected class to the menu on the left side of the site 
		//It also fire the query for the new json data to twitter search
		function addClass() {
			//console.log("addclass called");
			$('.'+search).addClass('selected');
			$('div#topics h2').click(function() {
				$('h2.selected').removeClass('selected');
					$(this).addClass('selected');
					search = $(this).text();
					getJson();
			});
		}
		//function to generate random tag on the left side when the json data is over 
		function random(){
			
			randomElements = jQuery("span").get().sort(function(){ 
				return Math.round(Math.random())-0.1
			}).slice(0,1)
			
		}
		//funtion to send query to twitter and receive json data.
		function getJson()
		{
			
			counter=0;
			//console.log("getJSON start search=>"+search);
			$.getJSON('http://search.twitter.com/search.json?rpp='+limit+'&callback=?&q=%23'+search ,function(data){
				arry = data;
				//console.log("getJSON end with arry");//+JSON.stringify(arry));
			});
		}
//function LiAdd to take the json data and append to the UL element in the page 
		function LiAdd()
		{
		if(counter>(limit-2)){
				random();
				search = $(randomElements).text();
				$('h2.selected').removeClass('selected');
				$('.'+search).addClass('selected');
				getJson();
			}
			//console.log("LiAdd function enter counter"+counter);
				{
					var tweeter = arry.results[counter].from_user;
					var tweetText = arry.results[counter].text;
					var tweetText = tweetText.substring(0, 139);
					//following commented line are to replace and add anchor tag to the hash tags 
					tweetText = tweetText.replace(/http:\/\/\S+/g, '<a href="$&" target="_blank">$&</a>');
					tweetText = tweetText.replace(/(@)(\w+)/g, ' $1<a href="http://twitter.com/$2" target="_blank">$2</a>');
					tweetText = tweetText.replace(/(#)(\w+)/g, ' $1<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$2</a>');
					//	tweetText = tweetText.replace(search, '<span style="font-size:40px; color:pink;">love</span>');
						$('#tw').append('<li style="height:4em;" class="tweet"><div style="float:left;" class="tweetImage"><a href="http://twitter.com/'+tweeter+'" target="_blank"><img   src="'+arry.results[counter].profile_image_url+'"  border="0" /></a></div><div  class="tweetBody">'+tweetText+'</div></li>');
				}
				counter++;
				//console.log("LiAdd function end counter"+counter);
		}
//function to scroll the Ul element in upward direction 
		function autoScroll() {
			//console.log("autoScroll enter scrollcounter"+scrollcounter+"counter"+counter);
			itemHeight = $('#tw li').outerHeight();
			var moveFactor = parseInt($('#tw').css('bottom'))+itemHeight;
			/* animate the carousel */
			$('#tw').animate({'bottom' : moveFactor}, 'slow', 'linear', function(){
				if(scrollcounter>12) $("#tw li:first").remove();
				$('#tw').css({'bottom' : '-3em'});
				LiAdd();
				scrollcounter++;
			});
			//console.log("autoScroll end scrollcounter"+scrollcounter+"counter"+counter);
		};
		var start = addClass();
		getJson();
		/* make the carousel scroll automatically when the page loads */
		var moveScroll = setInterval(autoScroll, 4000);
});


