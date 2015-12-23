define(['jqueryColor'], function() {
	var baseService = function() {
		// var girdItme = '<li class="col col-25 base-cell-item"></li>'
		var itemGroup = $('.base-cell-item');
		var sTimer = null; // timeInterval timer
		var msTimer = null; 
		var totleTime = 60;
		var obj = {
			score: 0,
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
			},

			handleClick: function() {
				// alert('handleClick');
				var self = this;
				$('body').on('click', '.right-cell', function(e) {
					// count++;
					// alert('handleClick click right-cell');
					var score = $('.score').text();
					score++;
					$('.score').text(score);
					self.sucessClickAnim();
					var curNum = parseInt($('.right-cell').text());
					$(this).html('').removeClass('has-num right-cell');
					self.reDraw(curNum);
				});
				$('body').on('click', '.base-cell-item:not(.right-cell)', function() {
					var that = $(this);
					self.errorClickAnim(that);
				})
			},
			handleBack: function() {
				// alert('use cordova');
				ionic.Platform.ready(function() {
					if(window.cordova) {
						document.addEventListener("backbutton", function() {
							// alert('reset');
							this.reset();
						}, false);
					} else {
						// alert('cordova');
					}
				});
			},
			randomAgain: function(curNum, base) {
				var newNum = Math.ceil(Math.random() * 10) + 1;
				return newNum + curNum;
			},
			reDraw: function(curNum) {
				// alert('reDraw');
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
			timeDown: function(cont) {
				var cont = cont || false;
				if(cont) {
					var counter = $('.time-down-num').text();
				} else {
					console.log(cont);
					var counter = 59;
					$('.time-down-num').text(59);
				}
				sTimer = setInterval(function() {
					if(counter <= 1) {
						clearInterval(sTimer);
					}
					--counter;
					$('.time-down-num').text(counter);
				}, 1000);
			},

			msTimeDown: function(cont) {
				// var counter = 100;
				var cont = cont || false;
				if(cont) {
					var counter = $('.time-down-ms-num').text();
				} else {
					var counter = 100;
				}
				var self = this;
				// var secTime = parseInt($('.time-down-num').text());
				msTimer = setInterval(function() {
					var secTime = parseInt($('.time-down-num').text());
					if(counter <= 1) {
						if(secTime > 0) {
							counter = 100;
						} else {
							clearInterval(msTimer);
							self.unbindHandleClick();
						}
					}
					--counter; //位置
					$('.time-down-ms-num').text(counter);
				}, 10)
			},

			//start time 点击任意方块开始计时
			start: function(cont) {
				var self = this;
				var totleTime = totleTime;
				if(arguments.length == 0) {
					$('body').on('click', '.base-cell-item', function() {
						$('.time-down-num').text(--totleTime);
						self.timeDown();
						self.msTimeDown();
						$('body').off('click', '.base-cell-item');
					})	
				} else {
					self.timeDown(cont);
					self.msTimeDown(cont);
				}

			},

			refrest: function() {
				clearInterval(sTimer);
				clearInterval(msTimer);
				$('body').off('click', '*'); //base-cell-item
			},

			pause: function() {
				window.clearInterval(sTimer);
				window.clearInterval(msTimer);
			},
			reset: function() {
				// this.pause();
				$('body').off('click', '.base-cell-item'); //base-cell-item
				// this.initInsertNum();
				// this.start();
				// $('.time-down-num').text(totleTime);
				// $('.time-down-ms-num').text('00');
			},
			sucessClickAnim: function() {
				var tar = $('body');
    			var i = $("<b>").text("+" + 1);
			    var y = event.pageY, x = event.pageX;
			    i.css({
			        top: y-50,
			        left: x,
			        "font-size": "24px",
			        "font-weight": "400",
			        position: "absolute",
			        'z-index': '999',	

			        color: "red"
			    });
			    tar.append(i);
			    i.animate({
			        top: y-150,
			        left: x,
			        opacity: 0,
			        "font-size": "1.4em"
			    }, 600,function(){ i.remove(); });

			    event.stopPropagation();
			},
			errorClickAnim: function(that) {
				that.animate({
			        backgroundColor: "red"
			    }, 150, function() {
			        var self = that;
			        setTimeout(function(){
			                self.css("background", "");
			        },50);
			    });
			},
			unbindHandleClick: function() {
				$('body').off('click', '.right-cell');
				$('body').off('click', '.base-cell-item:not(.right-cell)');
			}

		}
		return obj;
	}

	return baseService;
});
