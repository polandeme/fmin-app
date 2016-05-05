define(['jqueryColor'], function() {
    var baseService = function($window, $location, $cordovaDevice,maxScoreService) {

        var sTimer = null; // timeInterval timer
        var msTimer = null; 
        var type = 'base';
        var obj = {
            getDevice: function() {
                document.addEventListener("deviceready", function () {
                var device = $cordovaDevice.getDevice();
                var cordova = $cordovaDevice.getCordova();
                var model = $cordovaDevice.getModel();
                var platform = $cordovaDevice.getPlatform();
                var uuid = $cordovaDevice.getUUID();
                var version = $cordovaDevice.getVersion();
                window.localStorage.setItem('uuid', uuid);
                alert(device);
                alert(uuid);
              }, false);
            }
        };
        return obj;
    }

    return baseService;
});
