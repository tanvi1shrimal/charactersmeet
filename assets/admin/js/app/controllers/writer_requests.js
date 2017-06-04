// UserList Controller
app.controller('UserListCtrl', function ($scope, $rootScope, getData, $window) {
    $scope.totalRecord = 0;
    $scope.filteredTodos = [],
    $scope.currentPage = 1,
    $scope.numPerPage = pagination,
    $scope.maxSize = pagination_links;
    $scope.orderByField = '';
    $scope.reverseSort = false;
    $scope.currentUserRoleId = {};
    $scope.currentUserStatusId = {};
    $rootScope.currentUserName = '';
    $scope.currentUser = {};
    $rootScope.totalUsers = 0;
    $scope.useraction = '';
        
    $scope.globalChecked = false;
    $scope.showButtonGroup = false;
    $scope.selectedUsers = {};
    $scope.selectedUsersIndex = {};
    $scope.confirmationMessage = '';    
                    
    $scope.registeredUsers = function () {
        intilizeTooltip();
        showLoader();
        $scope.selectedUsers = {};
        $scope.globalChecked = false;
        $('#ItemCounter').fadeOut();
        
        //get starting date and end date from top selected date and apply in query
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.searchKey = '';
        if ($('#searchField').val()) {
            $scope.searchKey = $.trim($('#searchField').val());
            $('#searchButton').addClass('selected');
        }
        
        $scope.userStatus = '';
        if ($('#hdnUserStatus').val()) {
            $scope.userStatus = $('#hdnUserStatus').val();
        }
        /* Here we check if current page is not equal 1 then set new value for var begin */
        var begins = '';
        if ($scope.currentPage == 1) {
            //Make request data parameter for users listing
            begins = 0;//$scope.currentPage;
        } else {
            begins = (($scope.currentPage - 1) * $scope.numPerPage)
        }

        /* Send AdminLoginSessionKey in every request */
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        var reqData = {
            Begin: begins, //$scope.currentPage,
            End: $scope.numPerPage,
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            SearchKey: $scope.searchKey,
            UserStatus: $scope.userStatus,
            SortBy: $scope.orderByField,
            OrderBy: $scope.reverseSort,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        var reqUrl = reqData[1]
        //Call getUserlist in services.js file
        getData.getUserlist(reqData).then(function (response) {
            $scope.listData = [];
            //If no. of records greater then 0 then show
            $('.download_link,#selectallbox').show();
            $('#noresult_td').remove();
            $('.simple-pagination').show();

            //$scope.showButtonGroup = false;
            $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");            
            
            if(response.ResponseCode == 200){
                $scope.noOfObj = response.Data.total_records
                $rootScope.totalUsers = $scope.totalRecord = $scope.noOfObj;

                //If no of records equal 0 then hide
                if ($scope.noOfObj == 0) {
                    $('.download_link,#selectallbox').hide();
                    $('#UserListCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>'+ThereIsNoUserToShow+'</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                
                //Push data into Controller in view file
                $scope.listData.push({ObjUsers: response.Data.results});
                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                $('.download_link,#selectallbox').hide();
                $('#UserListCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>'+response.Message+'</p></div></td></tr>');
                $('.simple-pagination').hide();
            }
            hideLoader();            
            
        }), function (error) {
            hideLoader();
        }
    };
    
    
    
    //Apply Sort by and mamke request data
    $scope.sortBY = function (column_id) {
        if($("table.users-table #noresult_td").length == 0)
        {
            $(".shortdiv").children('.icon-arrowshort').addClass('hide');
            $(".shortdiv").parents('.ui-sort').removeClass('selected');
            if($scope.reverseSort == true){
                $("#"+column_id).addClass('selected').children('.shortdiv').removeClass('sortedDown').addClass('sortedUp').children('.icon-arrowshort').removeClass('hide');
            }else{
                $("#"+column_id).addClass('selected').children('.shortdiv').removeClass('sortedUp').addClass('sortedDown').children('.icon-arrowshort').removeClass('hide');                
            }
            
            reqData = {
                Begin: $scope.currentPage,
                End: $scope.numPerPage,
                StartDate: $scope.startDate,
                EndDate: $scope.endDate,
                SearchKey: $scope.searchKey,
                UserStatus: $scope.userStatus,
                SortBy: $scope.orderByField,
                OrderBy: $scope.reverseSort,
                //Send AdminLoginSessionKey
                AdminLoginSessionKey :$scope.AdminLoginSessionKey
            }
            $scope.registeredUsers();
        }
    };
    //Get no. of pages for data
    $scope.numPages = function () {
        return Math.ceil($scope.noOfObj / $scope.numPerPage);
    };
    //Call function for get pagination data with new request data
    $scope.$watch('currentPage + numPerPage', function () {
        begins = (($scope.currentPage - 1) * $scope.numPerPage)
        reqData = {
            Begin: begins,
            End: $scope.numPerPage,
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            SearchKey: $scope.searchKey,
            SortBy: $scope.sort_by,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        //$scope.registeredUsers();
        SetUserStatus($('#hdnUserStatus').val());
    });
    //Function for set user id
    $scope.SetUser = function (userlist) {
        $rootScope.currentUserName = userlist.username;
        $scope.currentUserRoleId = userlist.userroleid.split(',');;
        $scope.currentUserStatusId = userlist.statusid;
        $scope.currentUser = userlist;
        //console.warn(userlist);
        $('#hdnUserID').val(userlist.userid);
        $('#hdnUserGUID').val(userlist.userguid);
    }
    //Function for set class for each TR
    $scope.cls = function (idx) {
        return idx % 2 === 0 ? 'odd' : 'even';
    }
   
    $scope.statusToUpdate  = null;
    $scope.show_confirm_message= function (ApprovalStatus){
        $scope.statusToUpdate = ApprovalStatus;
        if(ApprovalStatus==0){
            $scope.confirm_message = 'Are you sure you want to reject';
        }else{
            $scope.confirm_message = 'Are you sure you want to approve ';
        }
        
        openPopDiv('confirm_popup', 'bounceInDown');
    }
    
    $scope.change_request_status = function (){
        var reqData = {
            AdminLoginSessionKey :$scope.AdminLoginSessionKey,
            ApprovalStatus: $scope.statusToUpdate,
            UserGUID:$scope.currentUser.userguid
        };
        showLoader();
        getData.updateUsersStatus(reqData).then(function(response){
            if(response.ResponseCode == 200){
                $scope.registeredUsers();
                 ShowSuccessMsg(response.Message, 'success');
            }else{
                 ShowErrorMsg(response.Message, 'danger');
            }
            hideLoader();
            closePopDiv('confirm_popup', 'bounceOutUp');
        });
        $scope.statusToUpdate = null;
    }
});