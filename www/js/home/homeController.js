define(function () {
	return function ($scope, $location, $window, $ionicPopup, cssInjector, homeService) {

		// <input type="text" id="word" placeholder="写下此时的心情或者想说的（漂流）" ng-model="data.word"> \
		 var helpTips = function() {
            var popTpl = '<div class="main"> \
            				<input type="text" id="name" placeholder="昵称" ng-model="data.name"> \
            				\
            				<div class="btn-wrap"> <button class="know" ng-click="closeHelp()"> 快速开始 </button></div> \
                        </div>';
            var popup = $ionicPopup.show({
                template: popTpl,
                cssClass: 'base-help home-pop',
                title: '快速开始',
                scope: $scope
            });

            console.log($scope.data);
            homeService.getDevice();
	        $scope.closeHelp = function () {
	        	var name = document.querySelector('#name').value;
	        	if(name) {
	        		window.localStorage.setItem('name', name);
					popup.close();
	        	} else {
	        		alert('请填写姓名');
	        	}
	        };
		}
		var name = window.localStorage.getItem('name');
		if(!name) {
        	helpTips();
        }

	}
});