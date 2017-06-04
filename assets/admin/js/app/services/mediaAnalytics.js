/*
 |--------------------------------------------------------------------------
 | Function for Get Data for users serivce
 | getUserlist
 |--------------------------------------------------------------------------
 */
app.factory('mediaAnalyticData', function ($q, $http, appInfo) {
    return {
        getMediaAnalyticsList: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/media/media_analytics', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        downloadMediaAnalyticsData: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/media/download_media_analytics', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getMediaAnalyticsReport: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/media/media_analytics_report', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        updateUsersStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/users/update_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});
