define(function() {
    var rankService = function($http) {

        var type = 'rank';
        var obj = {
            getRankList: function() {
                $http({
                    url: "http://192.168.0.66:3000/api/v1/rank/getRank/",
                    method: "GET"
                    }).success(function(data, status, headers, config) {
                        console.log('get success');
                        console.log(data);
                    }).error(function(data, status, headers, config) {
                        console.log('post error');
                });
            }
        };
        return obj;
    }

    return rankService;
});
