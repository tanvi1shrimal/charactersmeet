/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.factory('eventService', ['$q', '$http', function ($q, $http) {
        return {
            getList: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/event/list', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            save: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/event/save', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            delete: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/event/delete', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            get_details: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/event/details', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            uploadImage: function (reqData) {
                var deferred = $q.defer();
                $http.post(base_url + 'api/uploadimage/saveFileFromUrl', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            updateEvent: function (reqData) {
                var deferred = $q.defer();
                $http.post(base_url + 'api/event/update', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            getList: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/event/list', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            removeMedia: function (reqData) {
                var deferred = $q.defer();
                /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
                $http.post(base_url + 'admin_api/event/remove_media', reqData).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        }
    }]);