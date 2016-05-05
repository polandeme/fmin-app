define(function() {
	var maxScoreService = function($http) {
		var curType = 'base';
		var obj = {
			set2LocalStorage: function(key, value) {
				localStorage[key] = value;
			},
			/**
			 * 存储最到分数到本地
			 */
			stroeMaxScore: function(value, type) {
				console.log(type);
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

				var allData = {};
				allData[type] = data;;
				//
				var allScore = JSON.parse(window.localStorage.getItem('score')) || {};
				allScore[type] = data;

				window.localStorage.setItem('score', JSON.stringify(allScore));
				 // ? (window.localStorage.setItem('score',JSON.stringify({'curScore': value, 'maxScore': curScore}))) : (window.localStorage.setItem('score', JSON.stringify({'maxScore': value, 'curScore': value})));
			},
			readMaxScore: function() {
				var score = JSON.parse(window.localStorage.getItem('score'));//.stringfly()
				var score = score && score[curType];
				var maxScore = score ? score.maxScore : 0;//window.localStorage.getItem('maxScore') || 0;
				return maxScore;
			},
			//读取当前分数
			readCurScore: function() {
				var score = JSON.parse(window.localStorage.getItem('score'));
				var score = score && score[curType];
				var curScore = score ? score.curScore : 0;//window.localStorage.getItem('curScore') || 0;
				return curScore;
			},
			returnType: function() {
				return curType;
			},
			postScore: function() {
				var data = {};
				data.name = window.localStorage.getItem('name') || '123';
				data.device_id = window.localStorage.getItem('uuid') || 'null';
				var score = JSON.parse(window.localStorage.getItem('score'));
				console.log(score);
				data.max_base = (score.base && score.base.maxScore) || 0;
				data.max_chs = (score.chs && score.chs.maxScore) || 0;
				data.max_speed = (score.speed && score.speed.maxScore) || 0;
				console.log(data);
				console.log('-------------------');
				$http({
					url: "http://192.168.0.66:3000/api/v1/rank/postScore/",
					method: "POST",
					data: data
					}).success(function(data, status, headers, config) {
						console.log('post success');
					}).error(function(data, status, headers, config) {
						console.log('post error');
				});
			}

		}

		return obj;
	}

	return maxScoreService;
})