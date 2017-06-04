/*
 |------------------------------------------------------------------
 | Function for Get Data for user Ips
 | getUserIps
 |------------------------------------------------------------------
 */
app.factory('userIpsData', function ($q, $http, appInfo) {
    return {
        getUserIps: function (reqData) {
            var deferred = $q.defer(); 
                        
            /* Make HTTP request for get user ip's info */ //{UserGUID: UserGUID,FromDate:FromDate, ToDate:ToDate}
            $http.post(base_url + 'admin_api/user/ips_info', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});