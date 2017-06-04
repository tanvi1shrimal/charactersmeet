/*
 |--------------------------------------------------------------------------
 | Function for Get Data for support and error log serivce
 |--------------------------------------------------------------------------
 */
app.factory('supportData', function ($q, $http, appInfo) {
    return {
        getErrorLoglist: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/support', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        updateErrorLogStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for update status */
            $http.post(base_url + 'admin_api/support/update_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        downloadErrorLogs: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/support/download_error_logs', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getErrorLogDetail: function(reqData){
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/support/error_log_detail', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});
