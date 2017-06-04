/*
 |--------------------------------------------------------------------------
 | Function for Get Data for beta nvite users serivce
 |--------------------------------------------------------------------------
 */
app.factory('getBetainviteData', function ($q, $http, appInfo) {
    return {
        getBetaInvitedUsersList: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/betainvite', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        updateBetaInviteUserStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for update status */
            $http.post(base_url + 'admin_api/betainvite/update_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        CheckEmailExist: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/betainvite/checkemailexist', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        SendBetaInvite: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/betainvite/sendbetainvite', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        downloadBetaUsers: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/betainvite/download_beta_users', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        deleteCsvFiles: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for users listing */
            $http.post(base_url + 'admin_api/betainvite/delete_csv_file', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});
