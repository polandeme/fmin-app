define(function () {
	return function ($scope, $location, $ionicPopup, $window, baseService) {
		baseService.initInsertNum();
		baseService.handleClick();
		baseService.start();
		// $window.location.reload()
		// $scope.reloadPage = $route.reload();
		baseService.handleBack();
		$scope.pause = function() {
			baseService.pause();
			var popTpl = '<div class="row"> \
							<button class="button button-full button-positive restart" ng-click="restart()">重新开始</button>\
						 </div>\
						 <div class="row">\
							<button class="button button-full button-positive continue" ng-click="continueGame()">继续游戏</button>\
						</div>\
						<div class="row">\
							<button class="button button-full button-positive go-back" ng-click="transTo()">返回</button>\
						</div>';

			var popup = $ionicPopup.show({
				template: popTpl,
				cssClass: 'pasue-popup',
				title: '暂停',
				scope: $scope
			});
			$scope.closePopup = function() {
				popup.close();
			}
			// return popup;
		}

		//restart
		$scope.restart = function() {
			this.closePopup();
			var con = false;
			baseService.start(con);
		}
		$scope.continueGame = function() {
			this.closePopup();
			var con = true;
			baseService.start(con);
		}
		$scope.transTo = function() {
			this.closePopup();
			baseService.reset();
			$location.path('#/home');
		}
		// $scope.profile = baseService.profile;
		// $scope.login = baseService.login;
	}
});