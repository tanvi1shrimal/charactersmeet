/*
 |--------------------------------------------------------------------------
 | Function for Get Data for culture info
 | getCultureInfoList
 |--------------------------------------------------------------------------
 */
app.factory('cultureInfo', function ($q, $http, appInfo) {
    return {
        getCultureInfoList: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for smtp setting list */
            $http.post(base_url + 'admin_api/configuration/cultureinfo', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});
