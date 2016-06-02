$(function () {
	var $cartF = $('#cartF');
	var $cartTotal = $('#cartTotal');

	var setTotal = function () {
		var total = 0;
		$cartF.find('li').each(function (index, el) {
			var $li = $(this);
			var checked = $li.find('input[type="checkbox"]')[0].checked;
			if (!checked) {
				return false;
			}
			var $num = $li.find('input[name="num"]');
			var num = parseInt($num.val());
			var price = parseFloat($num.attr('data-price'));
			total += price * num;
		});
		$cartTotal.html('&yen;' + total.toFixed(2));
	};

	//增加减少
	$cartF.on('click', '.s_num button', function (e) {
		e.preventDefault();
		var $it = $(this);
		var $box = $it.parents('.s_txt');
		var $int = $box.find('input[name="num"]');
		var num = parseInt($int.val());
		var add1 = function () {
			num++;
		};
		var red1 = function () {
			num--;
			if (!(num > 1)) {
				num = 1;
			}
		};
		if ($it.hasClass('int-f')) {
			red1();
		} else if ($it.hasClass('int-l')) {
			add1();
		}
		$int.val(num);
		//更新价格
		var $price = $box.find('.s_num_show');
		$price.text(num);
		setTotal();
	});
	//删除
	$cartF.on('click', '.s_del', function (e) {
		e.preventDefault();
		var $it = $(this);
		var $li = $it.parents('li');
		$li.remove();
		setTotal();
	});
	//选中
	$cartF.on('change', 'input[type="checkbox"]', function (e) {
		setTotal();
	});
});