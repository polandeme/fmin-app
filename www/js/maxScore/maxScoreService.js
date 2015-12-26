define(function() {
	var maxScoreService = function() {
		var obj = {
			store2LocalStorage: function(key, value) {
				localStorage[key] = value;
			}
		}

		return obj;
	}

	return maxScoreService;
})