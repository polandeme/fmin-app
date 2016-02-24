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
				var curScore = this.readMaxScore();//window.localStorage.getItem('maxScore');

				var data = {
					'maxScore': 0,
					'curScore': 0
					//type
				};


				if(parseInt(curScore) > parseInt(value)) {
					data.maxScore = curScore;
					data.curScore = value;
				} else {
					data.maxScore = value;
					data.curScore = value;
				}
				console.log(data);
				window.localStorage.setItem('score', JSON.stringify(data));
				 // ? (window.localStorage.setItem('score',JSON.stringify({'curScore': value, 'maxScore': curScore}))) : (window.localStorage.setItem('score', JSON.stringify({'maxScore': value, 'curScore': value})));
			},
			readMaxScore: function() {
				var score = JSON.parse(window.localStorage.getItem('score'));//.stringfly()
				var maxScore = score ? score.maxScore : 0;//window.localStorage.getItem('maxScore') || 0;
				return maxScore;
			},
			//读取当前分数
			readCurScore: function() {
				var score = JSON.parse(window.localStorage.getItem('score'));
				var curScore = score ? score.curScore : 0;//window.localStorage.getItem('curScore') || 0;
				return curScore;
			}

		}

		return obj;
	}

	return maxScoreService;
})