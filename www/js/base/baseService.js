define(function() {
	var baseService = function() {
		// var girdItme = '<li class="col col-25 base-cell-item"></li>'
		var itemGroup = $('.base-cell-item');
		var obj = {

			createRandomNum: function(base) {
				var base = base || 10;
				var num_one = Math.floor(Math.random() * base);
				var num_two = Math.floor(Math.random() * base);
				while(num_one === num_two) {
					num_two = Math.floor(Math.random() * base);
				}
				return {
					num_one: num_one,
					num_two: num_two
				}
			},
			//create grid
			initInsertNum: function() {
				$('.base-cell-item').html('').removeClass('has-num right-cell wrong-cell');
				var index_one = Math.floor(Math.random() * 16);
				var index_two = Math.floor(Math.random() * 16);
				while(index_two === index_one) {
					index_two = Math.floor(Math.random() * 16);
				}
				var randomNum = this.createRandomNum();
				var num_one = randomNum.num_one;
				var num_two = randomNum.num_two;

				//(num_two = [num_one, num_one = num_two][0]) swap two num
				(num_one > num_two) ? (num_two = [num_one, num_one = num_two][0]) : null;

				$('.base-cell-item').eq(index_one)
							   .addClass('has-num right-cell')
							   .html('<span>' + num_one + '</span>');

				$('.base-cell-item').eq(index_two)
				               .addClass('has-num wrong-cell')
				               .html('<span>' + num_two + '</span>');
				console.log('initGrid');
			},

			handleClick: function() {
				var self = this;
				$('body').on('click', '.right-cell', function() {
					// count++;
					var score = $('.score').text();
					// score++;
					// $('.score').text(score);
					// scoreAnim();
					var curNum = parseInt($('.right-cell').text());
					$(this).html('').removeClass('has-num right-cell');
					self.reDraw(curNum);
				});
				$('body').on('click', '.base-cell-item:not(.right-cell)', function() {
					var that = $(this);
					// errorClickHandle(that);
				})
			},
			randomAgain: function(curNum, base) {
				var newNum = Math.ceil(Math.random() * 10) + 1;
				return newNum + curNum;
			},
			reDraw: function(curNum) {
				var n = n || 15;
				var index = Math.floor(Math.random() * n);
				var num = Math.floor(Math.random() * 10);
				// var curNum = parseInt($('.right-cell').text());
				var num = this.randomAgain(curNum);
				var wrong_num = parseInt($('.wrong-cell').text());

				while(wrong_num == num) {
					num = this.randomAgain(curNum);
				}
				var html = '<span>' + num + '</span>';
				if(num < wrong_num) {
					$('.base-cell-item:not(.wrong-cell)').eq(index).addClass('has-num right-cell').html(html);
				} else {
					$('.wrong-cell').addClass('right-cell');
					$('.base-cell-item').removeClass('wrong-cell');//.addClass('right-cell');
					$('.base-cell-item:not(.right-cell)').eq(index).addClass('has-num wrong-cell').html(html);
				}
			},

			//倒计时模块 
			timeDown: function() {
				var counter = 9;
				var timer = setInterval(function() {
					if(counter <= 1) {
						clearInterval(timer);
					}
					--counter;
					$('.time-down-num').text(counter);
				}, 1000);
			},

			msTimeDown: function() {
				var counter = 100;
				// var secTime = parseInt($('.time-down-num').text());
				var timer = setInterval(function() {
					var secTime = parseInt($('.time-down-num').text());
					console.log(secTime);
					if(counter <= 1) {
						if(secTime > 0) {
							counter = 100;
						} else {
							clearInterval(timer);
						}
					}
					--counter; //位置
					$('.time-down-ms-num').text(counter);
				}, 10)
			},

			//start time 点击任意方块开始计时
			start: function() {
				var self = this;
				var totleTime = $('.time-down-num').text();
				$('body').one('click', '.base-cell-item', function() {
					$('.time-down-num').text(--totleTime);
					self.timeDown();
					self.msTimeDown();
				})
			}

		}
		return obj;
	}

	return baseService;
});
