define(function() {
	return function($scope, $window, $ionicPopup, cssInjector, chsService) {
		// $scope.updateCell = function() {
		// 	console.log('test updateCell');
		// }
		// cssInjector.add('../../css/chs.css?v=0117');
		chsService.unbindHandleClick();
		chsService.init();
		chsService.handleBack();


        //显示帮助，根据是否阅读过(本地存储)
        // TODO 关闭按钮
        // 专注，急速
        var helpTips = function() {
            var popTpl = '<div class="main"> \
            				<div class="main-text"> \
            					用最快的速度点击屏幕中<span>最小</span>的数字。\
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
				$window.localStorage.setItem('know-chs', 'true');
				popup.close();
	        };
		}
		// window.localStorage.setItem('know': 'false');
		var know = window.localStorage.getItem('know-chs');
		// if(know != 'true') {
        	helpTips();
		// }

	}
})