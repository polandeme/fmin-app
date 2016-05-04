define(function () {
	return function ($scope, $location, $window, $ionicPopup, cssInjector, baseService) {
		console.log(cssInjector);
		cssInjector.add('/css/base.css?v=0117');
		baseService.unbindHandleClick();
		// baseService.refrest();
		baseService.initInsertNum();
		baseService.handleClick();
		baseService.start();

        //显示帮助，根据是否阅读过(本地存储)
        // TODO 关闭按钮
        var helpTips = function() {
            var popTpl = '<div class="main"> \
            				<div class="main-text"> \
            					以最快的速度点击出现的两个数字中的<span>较小</span>的一个。\
            				</div> \
            				<div> \
            				<div class="text-easy">很简单，但是很耐玩。</div>\
            				<div> 看你和朋友谁拿的分数最高吧。\
            				</div> \
            				<p class="notes">注意： 游戏过程中可能会出现小惊喜和小意外 </p> \
            				<div class="btn-wrap"> <button class="know" ng-click="closeHelp()"> 朕知道了 </button></div> \
                        </div>';
            var popup = $ionicPopup.show({
                template: popTpl,
                cssClass: 'base-help',
                title: '帮助',
                scope: $scope
            });

	        $scope.closeHelp = function () {
				$window.localStorage.setItem('know', 'true');
				popup.close();
	        };
		}
		// window.localStorage.setItem('know': 'false');
		var know = window.localStorage.getItem('know');
		console.log(know);
		console.log(typeof know);
		if(know != 'true') {
        	helpTips();
		}


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
			$scope.closePopup = function () {
				popup.close();
			}
			// return popup;
		}

		//restart
		$scope.restart = function() {
			this.closePopup();
			$('.score').text(0);
			baseService.initInsertNum();
			var con = false;
			baseService.handleClick();
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
	}
});