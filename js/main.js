var difficulty = [{level:3,rating:"S",score:943333},
                  {level:6,rating:"B",score:843132},
                  {level:10,rating:"なし",score:"未プレー"}];
var achieve = [{date:"2012/4/1",achieve:"NO GRAY",difficulty:"BASIC",title:"ダイナマイト"},{date:"2012/4/1",achieve:"FULL COMBO",difficulty:"BASIC",title:"ダイナマイト"},{date:"2012/4/1",achieve:"FULL COMBO",difficulty:"BASIC",title:"Fellow"},{date:"2012/4/1",achieve:"FULL COMBO",difficulty:"ADVANCED",title:"Fellow"},{date:"2012/4/1",achieve:"NO GRAY",difficulty:"BASIC",title:"FLOWER"},{date:"2012/4/1",achieve:"FULL COMBO",difficulty:"BASIC",title:"FLOWER"},{date:"2012/04/03",achieve:"NO GRAY",title:"fellow",difficulty:"BASIC"},{date:"2012/04/03",achieve:"FULL COMBO",title:"WONDER WALKER",difficulty:"BASIC"},{date:"2012/04/03",achieve:"NO GRAY",title:"WONDER WALKER",difficulty:"BASIC"},{date:"2012/03/19",achieve:"FULL COMBO",title:"THIS NIGHT (jubeat EDITION)",difficulty:"ADVANCED"},{date:"2012/03/19",achieve:"NO GRAY",title:"THIS NIGHT (jubeat EDITION)",difficulty:"ADVANCED"},{date:"2012/03/14",achieve:"FULL COMBO",title:"GOOD LUCKY!!!!!",difficulty:"ADVANCED"},{date:"2012/03/14",achieve:"NO GRAY",title:"GOOD LUCKY!!!!!",difficulty:"ADVANCED"},{date:"2012/03/14",achieve:"FULL COMBO",title:"天体観測",difficulty:"BASIC"},{date:"2012/03/14",achieve:"NO GRAY",title:"天体観測",difficulty:"BASIC"},{date:"2012/03/14",achieve:"FULL COMBO",title:"ちっぽけな勇気",difficulty:"ADVANCED"},{date:"2012/03/14",achieve:"NO GRAY",title:"ちっぽけな勇気",difficulty:"ADVANCED"}];

$("#news").live("pageinit", function(event){
    var news = Enumerable.From(achieve)
                         .OrderBy("new Date($.date)")
                         .Reverse()
                         .GroupBy(function(f){
                             var d = new Date(f.date);
                             return d.getFullYear()+"/"+(d.getMonth()+1);
                         })
                         .ToArray();
    $("#newsTemplate").tmpl(news).appendTo("#news-list");
    $("#news-list").listview("refresh");
});
$("#achieve").live("pageinit", function(event){
    var a = Enumerable.From(achieve).GroupBy("$.achieve").ToArray();
    $("#listTemplate").tmpl(a).appendTo("#achieve-list");
    $("#achieve-list").listview("refresh");
});
function setMusicData(url, option){
    var title = url.hash.replace(/.*id=/,"");
    var mdata = Enumerable.From(achieve)
                         .Where("$.title=='"+title+"'")
                         .GroupBy("$.difficulty")
                         .Select(function(d){
                             var r = {difficulty:d.Key(),data:{}};
                             d.source.map(function(x){r.data[x.achieve] = x.date;});
                             return r;
                         })
                         .ToArray();
    var pageSelector = url.hash.replace(/\?.*$/,"");
    if(mdata.length > 0){
	var $page = $(pageSelector);
	var $header = $page.children(":jqmData(role=header)");
	$header.children("h2").text(title);
	$page.page();
	options.dataUrl = url.href;
	$("#music-list").empty().append($("#musicTemplate").tmpl(mdata)).listview();
	$.mobile.changePage($page, options);
	$("#music-list").listview("refresh");
    }
}
$(document).bind("pagebeforechange",function(event,data){
  if ( typeof data.toPage === "string" ) {
    var u = $.mobile.path.parseUrl( data.toPage ),
      // 楽曲情報のページを更新
        mu = /^#music/;
    if ( u.hash.search(mu) !== -1 ) {
      setMusicData( u, data.options );
      event.preventDefault();
    }
  }
});
$("#regdata").live("click", function(e){
    var text = $("#datatext")[0].value;
    //$.ajax()
});
