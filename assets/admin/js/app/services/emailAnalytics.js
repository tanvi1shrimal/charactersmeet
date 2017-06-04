/*
 |------------------------------------------------
 | Function for Get Data for Email Analytics Data
 |------------------------------------------------
 */
app.factory('emailAnalyticsChartData', function ($q, $http, appInfo) {
    return {
        emailAnalyticsData: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get Email Anlytics data */
            $http.post(base_url + 'admin_api/emailanalytics/email_analytics',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        emailAnalyticsLineChart: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get Login Anlytics data */
            $http.post(base_url + 'admin_api/emailanalytics/line_chart',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getEmailAnalyticsStatistcs: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get Login Anlytics data */
            $http.post(base_url + 'admin_api/emailanalytics/statistcs_list',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getSentEmailsStatistcs: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get Login Anlytics data */
            $http.post(base_url + 'admin_api/emailanalytics/sent_emails_statistcs',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getEmailsClickUrlList: function (reqData) {
            var deferred = $q.defer();
            
            /* Make HTTP request for get Login Anlytics data */
            $http.post(base_url + 'admin_api/emailanalytics/email_click_url_list',reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        resendCommunication: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/communication/resend_communication', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            fetchedData = deferred.promise;
            return fetchedData;
        }
    }
});