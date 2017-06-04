/*
 |--------------------------------------------------------------------------
 | Function for Get Data for role permissions serivce
 |--------------------------------------------------------------------------
 */
app.factory('getPermissionData', function ($q, $http, appInfo) {
    return {
        getApplicationsList: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles/get_applications_list', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getRolePermissionList: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles/get_permission_list', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getRightsPermissionRole: function (reqData) {
            var deferred = $q.defer();

            /* Make HTTP request for roles listing */
            $http.post(base_url + 'admin_api/roles/get_right_permission_roles', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        SavePermissionsRole: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/roles/save_permissions_roles', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            fetchedData = deferred.promise;
            return fetchedData;
        }
    }
});
