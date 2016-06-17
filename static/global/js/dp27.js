;
(function($, window, document, undefined) {
	var pluginName = "dp27";
	var defaults = {
		year: false,
		month: false,
		yearLen: 5,
		on: 'on',
		getData: function(callback) {
			callback(data);
		},
		getTarget: function($it) {
			var $target = $it.next();
			return $target;
		},
		setTd: function(day, d) {
			var html = "";
			var dayString = day < 10 ? '0' + day : day;
			if (d.opend) {
				html = '<td data-day="' + day + '">' + dayString + '<span>' + d.price + '<br>元/晚</span></td>';
			} else {
				html = '<td data-day="' + day + '" class="s_dis">' + dayString + '<span>已购买</span></td>';
			}
			return html;
		},
		afterSel: function($it, info) {
			// console.log(info);
		}
	};

	function Obj(element, options) {
		this.el = element;
		this.opt = $.extend({}, defaults, options);
		this.init();
	};

	Obj.prototype.getYearHtml = function() {
		var _it = this;
		var _o = this.opt;
		var thisYear = _o.thisYear;
		var year = _o.year;
		var yearLen = _o.yearLen;
		var html = "";
		for (var i = thisYear, len = thisYear + yearLen + 1; i < len; i++) {
			var selected = (year === i) ? 'selected="selected"' : '';
			html += '<option value="' + i + '" ' + selected + '>' + i + '</option>';
		}
		html = '<select class="s_year" name="year">' + html + '</select>';
		return html;
	};

	Obj.prototype.getMonthHtml = function() {
		var _it = this;
		var _o = this.opt;
		var html = "";
		for (var i = 1, len = 13; i < len; i++) {
			var selected = (i === _o.month) ? 'selected="selected"' : '';
			html += '<option value="' + i + '"  ' + selected + '>' + i + '</option>';
		}
		html = '<select class="s_month" name="year">' + html + '</select>';
		return html;
	};


	Obj.prototype.getTdHtml = function(index, monthInfo) {
		var _it = this;
		var _o = _it.opt;
		var data = _o.data;
		var html = "";		
		if( index < monthInfo.week  || index > monthInfo.endDay + monthInfo.week -1 ){
			html = '<td class="s_dis"></td>';
		}else{
			var day = index - monthInfo.week;
			var d = data[day];
			html = _o.setTd(day + 1, d);
		}
		return html;
	};

	Obj.prototype.getBdHtml = function() {
		var _it = this;
		var _o = _it.opt;
		var monthInfo = _it.getMonthInfo();
		var html = [];
		var row= Math.ceil((monthInfo.week + monthInfo.endDay) / 7);
		for (var i = 0; i < row; i++) {
			var tr = "";
			for (var k = 0; k < 7; k++) {
				var index = i * 7 + k;
				tr += _it.getTdHtml(index, monthInfo);
			}
			html += '<tr>' + tr + '</tr>';	
		}
		html = '<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead><tbody>' + html + '</tbody>';
		html = '<div class="s_bd"><table>' + html + '</table></div>';
		return html;
	};

	Obj.prototype.getHtml = function() {
		var _it = this;
		var hdHtml = '<div class="s_hd">' + _it.getYearHtml() + '年' + _it.getMonthHtml() + '月' +
			'<a href="javascript:;" class="i s_prev">上个月</a>' +
			'<a href="javascript:;" class="i s_next">下个月</a>' +
			'</div>';
		var ftHtml = '<div class="s_ft"><a href="javascript:;" class="bt bt-default s_sure">确定</a></div>';
		var bdHtml = _it.getBdHtml();
		var html = hdHtml + bdHtml + ftHtml;
		return html;
	};

	Obj.prototype.setDate = function(year, month) {
		var _it = this;
		var _o = this.opt;
		var date = new Date();
		var thisYear = date.getFullYear();
		var thisMonth = date.getMonth() + 1;
		_o.thisYear = thisYear;

		if (!year && !month) {
			_o.year = thisYear;
			_o.month = thisMonth;
		}
		month && (_o.month = month);
		if (year) {
			var maxYear = thisYear + _o.yearLen;
			if (year > maxYear) {
				_o.year = maxYear;
			} else if (year < thisYear) {
				_o.year = thisYear
			} else {
				_o.year = year;
			}
		}
		_it.render();
	};

	Obj.prototype.getMonthInfo = function () {
		var _it = this;
		var _o = _it.opt;
		var getDaysInMonth = function getDaysInMonth(year, month) {
			month = parseInt(month, 10) + 1;
			var temp = new Date(year + "/" + month + "/0");
			return temp.getDate();
		};
		return {
			week: (new Date(_o.year, _o.month - 1, 1)).getDay(),
			endDay: getDaysInMonth(_o.year, _o.month)
		};
	};

	Obj.prototype.setHtml = function() {
		var _it = this;
		var _o = _it.opt;
		var html = _it.getHtml();
		_o.$it.html(html);
	};

	Obj.prototype.go = function(data) {
		var _it = this;
		var _o = _it.opt;
		_o.data = data;
		_it.setHtml();
		// console.log(_o);
	};

	Obj.prototype.next = function() {
		var _it = this;
		var _o = _it.opt;
		var year = _o.year;
		var month = _o.month;
		if (month === 12) {
			month = 1;
			year++;
		} else {
			month++;
		}
		_it.setDate(year, month);
	};

	Obj.prototype.prev = function() {
		var _it = this;
		var _o = _it.opt;
		var year = _o.year;
		var month = _o.month;
		if (month === 1) {
			month = 12;
			year--;
		} else {
			month--;
		}
		_it.setDate(year, month);
	};

	Obj.prototype.render = function() {
		var _it = this;
		var _o = _it.opt;
		_o.getData(_o.year, _o.month, function(data) {
			_it.go(data);
		});
	};

	Obj.prototype.bindEvent = function() {
		var _it = this;
		var _o = _it.opt;

		_o.$it.on('click', '.s_next', function(e) {
			e.preventDefault();
			_it.next();
		}).on('click', '.s_prev', function(e) {
			e.preventDefault();
			_it.prev();
		}).on('click', 'td:not(.s_dis)', function(e) {
			e.preventDefault();
			var $it = $(this);
			$it.toggleClass(_o.on);
			var $on = _o.$it.find('td.on');
			if ($on.length > 0) {
				var startDay = parseInt($on.first().attr('data-day'));
				_o.afterSel(_o.$it, {
					startDay: startDay < 10 ? '0' + startDay : startDay,
					year: _o.year,
					month: _o.month < 10 ? '0' + _o.month : _o.month,
					len: $on.length
				});
			} else {
				_o.afterSel(_o.$it, false);
			}
		}).on('change', '.s_year', function(e) {
			var val = parseInt(this.value);
			_it.setDate(val);
		}).on('change', '.s_month', function(e) {
			var val = parseInt(this.value);
			_it.setDate(false, val);
		}).on('click', '.s_sure', function(e) {
			e.preventDefault();
			_o.$it.hide();
		});
	};

	Obj.prototype.init = function() {
		var _it = this;
		var _o = _it.opt;
		_o.$it = $(_it.el);
		_it.setDate();
		_it.bindEvent();
	};

	$.fn[pluginName] = function(options) {
		this.each(function() {
			new Obj(this, options);
		});
		return this;
	};
})(Zepto, window, document);