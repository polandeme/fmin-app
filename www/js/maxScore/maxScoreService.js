define(function() {
	var maxScoreService = function() {
		var curType = 'base';
		var obj = {
			set2LocalStorage: function(key, value) {
				localStorage[key] = value;
			},
			/**
			 * 存储最到分数到本地
			 */
			stroeMaxScore: function(value, type) {
				curType = type;
				var curScore = this.readMaxScore();//window.localStorage.getItem('maxScore');

				var data = {
					'maxScore': 0,
					'curScore': 0
				};


				if(parseInt(curScore) > parseInt(value)) {
					data.maxScore = curScore;
					data.curScore = value;
				} else {
					data.maxScore = value;
					data.curScore = value;
				}
				console.log(data);
				var allData = {};
				allData[type] = data;;

				//
				var allScore = JSON.parse(window.localStorage.getItem('score'));
				allScore[type] = data;

				window.localStorage.setItem('score', JSON.stringify(allScore));
				 // ? (window.localStorage.setItem('score',JSON.stringify({'curScore': value, 'maxScore': curScore}))) : (window.localStorage.setItem('score', JSON.stringify({'maxScore': value, 'curScore': value})));
			},
			readMaxScore: function() {
				var score = JSON.parse(window.localStorage.getItem('score'));//.stringfly()
				var score = score[curType];
				console.log(score);
				var maxScore = score ? score.maxScore : 0;//window.localStorage.getItem('maxScore') || 0;
				return maxScore;
			},
			//读取当前分数
			readCurScore: function() {
				var score = JSON.parse(window.localStorage.getItem('score'));
				var score = score[curType];
				var curScore = score ? score.curScore : 0;//window.localStorage.getItem('curScore') || 0;
				return curScore;
			},
			returnType: function() {
				return curType;
			}

		}

		return obj;
	}

	return maxScoreService;
})