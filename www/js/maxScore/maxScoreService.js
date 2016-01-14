define(function() {
	var maxScoreService = function() {
		var obj = {
			set2LocalStorage: function(key, value) {
				localStorage[key] = value;
			},
			/**
			 * 存储最到分数到本地
			 */
			stroeMaxScore: function(value) {
				var curScore = window.localStorage.getItem('maxScore');
				parseInt(curScore) > parseInt(value) ? console.log('没有破记录') : window.localStorage.setItem('maxScore', value);
			},
			readMaxScore: function() {
				var maxScore = window.localStorage.getItem('maxScore') || 0;
				return maxScore;
			},
			getLocalStorage: function() {

			}

		}

		return obj;
	}

	return maxScoreService;
})