$(function() {
	$('body').on('click', '.date-box td', function() {
		var $it = $(this);
		if (!($it.find('.s_em').length > 0)) {
			$it.toggleClass('on');
		}
	}).on('click', '.j-date', function() {
		var $it = $(this).blur();
		var $row = $it.parents('.f-row');
		var html = $('#dateTpl').html();
		$row.after(html);
	}).on('click', '.date-box .j-date-sub', function(e) {
		e.preventDefault();
		$(this).parents('.date-box').remove();
	});
});