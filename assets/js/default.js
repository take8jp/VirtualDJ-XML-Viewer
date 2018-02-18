//ファイルチェック
$.ajax({
    url:'assets/xml/database.xml',
    type:'HEAD',
    error: function()
    {
			alert("指定された場所にdatabase.xmlファイルはありません!!");
    }
});

//ロード
$(function() {
  var h = $(window).height();
  $('#wrap').css('display','none');
  $('#loader-bg ,#loader').height(h).css('display','block');
});
 
$(window).load(function () { //全ての読み込みが完了したら実行
  $('#loader-bg').delay(900).fadeOut(800);
  $('#loader').delay(600).fadeOut(300);
  $('#wrap').css('display', 'block');
});
 
//10秒たったら強制的にロード画面を非表示
$(function(){
  setTimeout('stopload()',10000);
});
 
function stopload(){
  $('#wrap').css('display','block');
  $('#loader-bg').delay(900).fadeOut(800);
  $('#loader').delay(600).fadeOut(300);
}

//検索
   (function($) {
     $(document).ready(function() {
       $('input[name="q"]').search('ul li', function(on) {
					 on.all(function(results) {
								var size = results ? results.size() : 0
								$('#count').text(size + '件見つかりました');
								});
					 on.reset(function() {
								$('#none').hide();
								$('ul li').show();
								});
					 on.empty(function() {
								$('#none').show();
								$('ul li').hide();
								});
					 on.results(function(results) {
								$('#none').hide();
								$('ul li').hide();
								results.show();
								});
					 });
       });
     })(jQuery);
     
 	
$(function() {
	//エンターでsubmitを防ぐ
  $(document).on("keypress", "input:not(.allow_submit)", function(event) {return event.which !== 13;});
	
	//xml読み込み
	$.ajax({
		type: "GET",
		url: "assets/xml/database.xml",
		dataType: "xml",
		success: function(xml) {
			console.log("success");
			console.log(xml);
			readXML(xml);
		},
		error: function(xml) {
			console.log("fail");
		} 
	});
	
	


	function readXML(xml) {
		$(xml).find("Song").each(function() {
			$("#result").append(
				"<li>" +
					"<table>"+
					"<tr><th>ディレクトリとファイル名</th><td>" + $(this).attr("FilePath") +　"</td></tr>"+
					"<tr><th>アーティスト名</th><td>" + $(this).find("Tags").attr("Author") + 
					"　<a href='https://www.amazon.com/s/ref=nb_sb_noss/142-0344665-0977821?url=search-alias%3Dpopular&field-keywords=" + $(this).find("Tags").attr("Author") + "' target='_blank'>Amazonで検索</a>" + 
					"　<a href='http://www.hmv.co.jp/search/music/adv_1/category_1/keyword_" + $(this).find("Tags").attr("Author") + "/target_MUSIC/type_sr/' target='_blank'>HMVで検索</a></td></tr>" +
					"<tr><th>曲名</th><td>" + $(this).find("Tags").attr("Title") + 
					"　<a href='https://www.amazon.com/s/ref=nb_sb_noss/142-0344665-0977821?url=search-alias%3Dpopular&field-keywords=" + $(this).find("Tags").attr("Title") + "' target='_blank' class='title'>Amazonで検索</a>" + 
					"　<a href='http://www.hmv.co.jp/search/music/adv_1/category_1/keyword_" + $(this).find("Tags").attr("Title") + "/target_MUSIC/type_sr/' target='_blank'>HMVで検索</a></td></tr>"+
					"<tr><th>アルバム名</th><td class='Album'>" + $(this).find("Tags").attr("Album") + 
					"　<a href='https://www.amazon.com/s/ref=nb_sb_noss/142-0344665-0977821?url=search-alias%3Dpopular&field-keywords=" + $(this).find("Tags").attr("Album") + "' target='_blank'>Amazonで検索</a>" + 
					"　<a href='http://www.hmv.co.jp/search/music/adv_1/category_1/keyword_" + $(this).find("Tags").attr("Album") + "/target_MUSIC/type_sr/' target='_blank'>HMVで検索</a></td></tr>"+
					"<tr><th>Movie</th><td><a href='https://www.youtube.com/results?search_query=" + $(this).find("Tags").attr("Title") + "' target='_blank'>Youtube</a>　<a href='http://www.dailymotion.com/jp/relevance/search/" + $(this).find("Tags").attr("Title") + "' target='_blank'>dailymotion</a>　<a href='https://www.google.co.jp/search?tbm=vid&hl=ja&source=hp&biw=&bih=&q=" + $(this).find("Tags").attr("Title") + "' target='_blank'>GoogleVideo</a></td></tr>"+
					"<tr><th>コメント</th><td class='comment'>" + $(this).find("Comment").text() + "</td></tr>"+
				"</table></li>"
			);														 
		});
	$(".comment").each(function(){
   //http、httpsなどで始まる文字列を正規表現でリンクに置換する
   $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a> ') );
    });
	}
});