// Module(s)
angular.module("vsocial", ['ngTagsInput'])  
 
 .controller('messageCtrl', ['$scope','$http', function( $scope, $http ){
  $scope.tags = [ 
            { text: 'Suresh Patidar' } 
          ];
   
   $scope.loadTags = function(query) {
     // return $http.get('http://103.15.66.186/webdesign/vsocial/app/json/tags.js'); 
      return $http.get('http://localhost/CommonsocialHTML/html/app/json/tags.js'); 
    }; 

  
//New Message To

  $scope.tagsto = [];
  
  $scope.loadFriendslist = function($query) {
   // return $http.get('http://103.15.66.186/webdesign/vsocial/app/json/friendslist.js', { cache: true}).then(function(response) {
    return $http.get('http://localhost/CommonsocialHTML/html/app/json/friendslist.js', { cache: true}).then(function(response) {
      
      var friendsList = response.data;
      return friendsList.filter(function(flist) {
        return flist.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
    });
  }; 

}])
 