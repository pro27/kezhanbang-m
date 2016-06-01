$(function() {

	$('body').on('click','.date-box td',function(){
		$(this).toggleClass('on');
	}).on('click','.j-date',function(){
		var $it=$(this).blur();
		var targetId=$it.attr('rel');
		var $target=$(targetId);
		$target.addClass('on');
	});
});