$(function() {

	(function() {
		$('.j_toClass').each(function(index, el) {
			var $it = $(this);
			var targetTo = $it.attr('data-target');
			var thisTo = $it.attr('data-this');
			var targetId = $it.attr('href');
			var $target = $(targetId);
			var _fn = {
				on: function() {
					$target.addClass(targetTo);
					$it.addClass(thisTo);
				},
				off: function() {
					$target.removeClass(targetTo);
					$it.removeClass(thisTo);
				}
			};
			targetTo = targetTo && targetTo !== '' ? targetTo : 'on';
			thisTo = thisTo && thisTo !== '' ? thisTo : 'on';
			$it.on('click', function(e) {
				e.preventDefault;
			}).on('mouseenter', function() {
				_fn.on();
				return false;
			}).on('mouseleave', function() {
				_fn.off();
				return false;
			});
		});
	})();

	$('.j-tab').on('click','a',function(e){
		e.preventDefault();
		var $it=$(this);
		var targetId=$it.attr('href');
		var $target=$(targetId);
		$it.addClass('on').siblings('.on').removeClass('on');
		$target.addClass('on').siblings('.on').removeClass('on');
		$target.find('img[data-src]').each(function(index, el) {
			var $it=$(this);
			var src=$it.attr('data-src');
			$it.attr('src',src).removeAttr('data-src');
		});
	});

	//弹出框	
	$('body').on('click','.modal-close, .modal .j-close',function(e){
		e.preventDefault();
		var $it=$(this);
		var $moldal=$it.parents('.modal');
		$it.parents('.modal').removeClass('on');
	}).on('click','.j-modal',function(e){
		e.preventDefault();
		var $it=$(this);
		var targetId=$it.attr('href');
		var $target=$(targetId);
		$target.addClass('on');
	});


});