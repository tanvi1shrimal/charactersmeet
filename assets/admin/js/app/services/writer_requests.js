/*
 |--------------------------------------------------------------------------
 | Function for Get Data for users serivce
 | getUserlist
 |--------------------------------------------------------------------------
 */
app.factory('getData', function ($q, $http, appInfo) {
    return {
        getUserlist: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/writer_requests', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        updateUsersStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/writer_requests/update_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
    }
});
