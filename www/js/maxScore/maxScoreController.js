define(function () {
	return function ($scope, $location, $ionicPopup, maxScoreService) {
		console.log('maxscoreController');
		$scope.maxScore = maxScoreService.readMaxScore();
		$scope.curScore = maxScoreService.readCurScore();
	}
});