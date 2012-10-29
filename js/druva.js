var search='love';
var arr= new Array();
var index=-1;
//var flag=0;
//console.log("start"+flag);
function addClass() {
	$('#topics h2:first').addClass('selected');
	$('div#topics h2').click(function() {
		$('h2.selected').removeClass('selected');
			$(this).addClass('selected');
			search = $(this).text();
			getJson();
	});
}
function getJson(){
	var pm_url = "http://search.twitter.com/search.json?q="+search+"&rpp=50&result_type=recent";
	console.log(pm_url);
	$.ajax({
		url: pm_url,
		dataType: 'jsonp',
		jsonpCallback: 'photos',
		jsonp: 'callback',
	});

}

function photos (data) {
					$.each(data.results, function(i){
					index=index+1;
					arr.splice(index,0,data.results[i]);
					console.log(arr[index].text);
//					$('#items').append("<li style='height:auto'><img style=' float: left;  'src='"+data.results[i].profile_image_url+"'><span style='color:#999;'>"+data.results[i].from_user+"</span><p> Tweet -: "+data.results[i].text+"</p></li>"); });
					$('#items').append("<li style='height:auto'><img style=' float: left;  'src='"+arr[index].profile_image_url+"'><span style='color:#999;'>"+arr[index].from_user+"</span><p> Tweet -: "+arr[index].text+"</p></li>");
					 });
//flag =1;
//console.log("photo"+flag);
				};

//function to dispaly all tweets with animation
function anim()
	{
		$( '.ticker' ).jCarouselLite(
		{
			vertical:true,
			visible: 28,
			auto:		1500,
			speed:	1000,
		});
	}


