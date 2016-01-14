define(function() {
	var chsService = function() {
		var obj ={
			initCell: function() {
				var list = $('.chs-cell-item');
				var arr = [];
				var len = list.length;
				for(var i = 0; i < len; i++) {
					arr.push(i);
				}
				for(i = 0; i < len; i++) {
					var index = Math.floor(Math.random() * arr.length); // [0, 25)
					list.eq(i).text(arr[index]);
					arr.splice(index, 1);
				}



			},
			updateCell: function() {
				var min = 0;
				var max = 24;
				$('body').on('click', '.chs-cell-item', function() {
					if($(this).text() == min) {
						min++;
						max++;
						$(this).text(max);
					}
				});	
			},
			init: function() {
				this.initCell();
				this.updateCell();
			}
		};
		return obj;
	}

	return chsService;
})