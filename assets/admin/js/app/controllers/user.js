// User Controller for Profile Page
app.controller('userCtrl', function ($scope, userData, $rootScope, $window) {
    $rootScope.overviewTabLoad = '1';
    $rootScope.communicateTabLoad = '0';
    $rootScope.mediaTabLoad = '0';
    $scope.user = {};
    $scope.getUser = function () {
        //get starting date and end date from top selected date and apply in query
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.userID = $('#hdnUserID').val();
        
        /* Send AdminLoginSessionKey in every request */
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            UserID: $scope.userID,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        userData.getUser(reqData).then(function (response) {
            if(response.ResponseCode == 200){
                $scope.user = response.Data;
                if($rootScope.tabSelected != "media"){
                    $rootScope.$broadcast('getUserEvent', response.Data);
                }
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }
        });
    };
    //Function for set StatusClass, Tooltip on profile page
    $scope.statusClass = function (id) {
        var cls = 'verified';
        switch (id) {
            case '1':
                cls = 'pending';
                break;
            case '4':
                cls = 'blocked';
                break;
            case '2':
            case '5':
                cls = 'verified';
                break;
            case '3':
                cls = 'deleted';
                break;
            default :
                cls = 'verified';
        }
        return cls;
    };
    
    $scope.statusTitle = function (id) {
        var title = 'Verified';
        switch (id) {
            case '1':
                title = 'Pending';
                break;
            case '4':
                title = 'Blocked';
                break;
            case '2':
            case '5':
                title = 'Verified';
                break;
            case '3':
                title = 'Deleted';
                break;
            default :
                title = 'Verified';
        }
        return title;
    };
    
    //Function for view user profile of a particular user
    $scope.autoLoginUser = function (userid) {
        
        //If UserID is Undefined
        if (typeof userid === 'undefined') {
            userid = $('#hdnUserID').val();
        }
        
        /* Send AdminLoginSessionKey in every request */
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        var reqData = {
            userid: userid,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        };
        
        //Call autoLoginUser in services.js file
        userData.autoLoginUser(reqData).then(function (response) {
            
            if (response.ResponseCode == 200) {
                $window.open(base_url + 'usersite/signin','_blank');
                //$window.location.href = base_url + 'usersite/signin';
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }else{
                alert(response.Message);
            }

        }), function (error) {
            hideLoader();
        }
    }
});

app.controller('usrTabController', function ($scope, $rootScope) {
    $scope.tabSelected = null;
    
    $scope.loadUserProfileTab = function(tabl_id){
        if(tabl_id != ""){
            setTimeout(function(){
                $("#"+tabl_id).trigger("click");
            }, 500);
        }
    };
    
    $scope.selectTab = function (tabSelected) {
        changeTabs(tabSelected);
        $rootScope.tabSelected = tabSelected;
        
        if($rootScope.tabSelected == "overview" && $rootScope.overviewTabLoad == 0){
            $rootScope.overviewTabLoad = 1;
        }
        
        if($rootScope.tabSelected == "communicate" && $rootScope.communicateTabLoad == 0){
            $rootScope.communicateTabLoad = 1;
            if($("#allowCommunicationTab").val() != 0){
                angular.element(document.getElementById('communicationTabCtrl')).scope().userCommunication();
            }
        }
        
        if($rootScope.tabSelected == "media" && $rootScope.mediaTabLoad == 0){
            $rootScope.mediaTabLoad = 1;
            angular.element(document.getElementById('mediaCtrl')).scope().getMediaSummary();
            angular.element(document.getElementById('mediaCtrl')).scope().getSearchBox();
        }
        $rootScope.$emit('getTabEvent', tabSelected);
    }
});