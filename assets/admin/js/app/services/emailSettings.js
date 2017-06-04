/*
 |--------------------------------------------------------------------------
 | Function for Get Data for email setting serivce
 | getSmtpEmailList
 |--------------------------------------------------------------------------
 */
app.factory('emailSettingData', function ($q, $http, appInfo) {
    return {
        getSmtpSettingEmailList: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for smtp setting list */
            $http.post(base_url + 'admin_api/emailsetting', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },        
        CreateSmtpSetting: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for create smtp setting */
            $http.post(base_url + 'admin_api/emailsetting/create_smtp_setting', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },        
        getSmtpSettingDetails: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for smtp setting details */
            $http.post(base_url + 'admin_api/emailsetting/get_smtp_setting_details', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        updateSmtpSettingStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for update status */
            $http.post(base_url + 'admin_api/emailsetting/update_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getEmailTypeList: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for smtp email type list */
            $http.post(base_url + 'admin_api/emailsetting/emailtype', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        updateSmtpEmailsStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for update status */
            $http.post(base_url + 'admin_api/emailsetting/update_emailtype_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getEmailDataService: function (reqData) {
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/emailsetting/email_setting_param.json', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        updateEmailDetails: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/emailsetting/update_emailtype_details', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            fetchedData = deferred.promise;
            return fetchedData;
        }
    }
});
