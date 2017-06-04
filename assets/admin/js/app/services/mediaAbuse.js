/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 |----------------------------------------------------
 | Function for Media Abused Data for abused dashboard
    getCommunication, sendCommunication
 |----------------------------------------------------
 */
app.factory('mediaAbuseData', function ($q, $http) {
    return {
        getSummary: function (reqData) {
            var deferred = $q.defer();
            /* Make HTTP request for abused media count */
            $http.post(base_url + 'admin_api/media/abused_total_count', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        
        getMedia: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/media/abused_list', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        
        setStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/media/update_abuse', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getDBCount: function (reqData){
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/media/update_media', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getCount: function(reqData){
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/media/abused_media_count', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getAbuserMediaDetail: function(reqData){
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/media/abused_media_detail', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getAbuserMediaComments: function(reqData){
            var deferred = $q.defer(reqData);
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/media/abused_media_comments', reqData).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});