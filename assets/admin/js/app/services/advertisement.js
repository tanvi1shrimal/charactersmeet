/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.factory('advertisementService', ['$q', '$http', function ($q, $http) {
        return {
            getList: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/advertisement/list', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            save: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/advertisement/save', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            delete: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/advertisement/delete', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            get_details: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/advertisement/details', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            getGoogleCodeList: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/advertisement/google_code_list', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            saveGoogleCode: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/advertisement/save_google_code', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            getAdViewDetailsList: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/advertisement/ad_view_details', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
        }
    }]);