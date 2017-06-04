/*
 |--------------------------------------------------------------------------
 | Function for Get Data for roles serivce
 |--------------------------------------------------------------------------
 */
app.factory('getRolesData', function ($q, $http, appInfo) {
    return {
        getRoleslist: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        saveRoleInfo: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/roles/save_roles_info', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            fetchedData = deferred.promise;
            return fetchedData;
        },
        getRolesPermissions: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles/get_role_permissions', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        updateRoleStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/roles/update_status', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        SaveManagedRolePermissions: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/roles/save_roles_permissions', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            fetchedData = deferred.promise;
            return fetchedData;
        },
        getRoleListExceptSelected: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles/rolelistexceptselected', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});
