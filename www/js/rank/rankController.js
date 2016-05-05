define(function () {
	return function ($scope, rankService) {
		console.log('rank controller')
		rankService.getRankList();
	}
});