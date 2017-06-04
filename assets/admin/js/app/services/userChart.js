
/*
 |------------------------------------------------------------------
 | Function for Get Data for user Login cahrt and device chart data
 | getUserLoginChart
 |------------------------------------------------------------------
 */
app.factory('userLoginChartData', function ($q, $http, appInfo) {
    return {
        getUserLoginChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get user login graph and device garph info */  //{UserGUID: UserGUID,FromDate:FromDate, ToDate:ToDate}
            $http.post(base_url + 'admin_api/user/login_graph_info',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});