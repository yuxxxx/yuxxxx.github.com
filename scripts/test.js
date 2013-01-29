$(function(){
	$('.my_affix').affix({
		offset: {
			top: 300,
			bottom: 300
		}
	});
	$('.content>article').waypoint({
		handler: function(d){
			$(this).addClass("show").prevAll().removeClass("show");
			$(this).nextAll().removeClass("show");
		},
		offset: '40%'
	});
	$('#fb-wall').fbWall({
		id:'397290813690591',
		accessToken:'AAAC7gAoWDQ0BAAgZADXaXs3K47FEQp3imHm1Vfj6YauWdX6m1rRP7fK6OfzvCi6cYZBhtIasmNLAAAlPf7N4YO8tuyyj0vUEyGkqIz5bpTqARTNkN3',
		showGuestEntries:false,
		showComments:false,
		max:5,
		timeConversion:24,
		translateLikeThis:'がいいね！といっております。', // 2人以上が、いいねを押している時
        translateLikesThis:'さんがいいね！といっております。', // 1人だけが、いいねを押している時
        translateAt:'時刻', // 日付と時刻の間の at を置き換える
        translateErrorNoData:'エラーっす', // エラーのときの表示
        translatePeople:'人' // 5 people の people部分を換える
	});
});