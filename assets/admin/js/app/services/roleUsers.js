/*
 |--------------------------------------------------------------------------
 | Function for Get Data for role users serivce
 |--------------------------------------------------------------------------
 */
app.factory('getRoleUserData', function ($q, $http, appInfo) {
    return {
        getRoles: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles/get_role_list', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getRoleUsersList: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles/get_role_users', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        SaveUserInfo: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/roles/save_user_info', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            fetchedData = deferred.promise;
            return fetchedData;
        },
        updateUserStatus: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/users/change_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            fetchedData = deferred.promise;
            return fetchedData;
        },
        updateMultipleUsersStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/users/update_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getUserRoles: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles/get_user_roles', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});
