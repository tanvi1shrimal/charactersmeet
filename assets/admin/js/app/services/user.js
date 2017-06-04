/*
 |-------------------------------------------
 | Function for Get Data for a user profile
 | getUser
 |-------------------------------------------
 */
app.factory('userData', function ($q, $http, appInfo) {
    
    return {
        getUser: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
            $http.post(base_url + 'admin_api/user/profile_info', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        autoLoginUser: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/users/autologin_user', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});