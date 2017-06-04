/*
 |------------------------------------------------
 | Function for Get Data for Signup Analytics Data
 |------------------------------------------------
 */
app.factory('signupAnalyticsChartData', function ($q, $http, appInfo) {
    return {
        //Get data for Signup Line chart
        signupAnalyticsData: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get Anlytics data */
            $http.post(base_url + 'admin_api/analytics/signup_line_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        //Get data source of signup chart
        signupSourceSignupChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get source of signup data */
            $http.post(base_url + 'admin_api/analytics/signup_sourcesignup_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        //Get data type of signup chart
        signupTypeChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get type of signup data */
            $http.post(base_url + 'admin_api/analytics/signup_type_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        //Get data device chart
        signupDeviceChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get Device chart data */
            $http.post(base_url + 'admin_api/analytics/signup_device_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        //Get data for visits v/s signups chart
        signupVisitSignupChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get visits v/s signups chart data */
            $http.post(base_url + 'admin_api/analytics/signup_visits_signup_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        //Get data for Signup time chart
        signupTimeChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get Signup time chart data */
            $http.post(base_url + 'admin_api/analytics/signup_time_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        //Get data for popular Days signup chart
        signupPopDaysChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get popular Days signup data */
            $http.post(base_url + 'admin_api/analytics/signup_popular_days_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        //Get data for popular Time signup chart
        signupPopTimeChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get popular Time signup chart data */
            $http.post(base_url + 'admin_api/analytics/signup_popular_time_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        //Get data for signup Geo chart
        signupGeoChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get signup Geo chart data */
            $http.post(base_url + 'admin_api/analytics/signup_geo_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
    }
});