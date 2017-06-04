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
    
    $scope.downloadUsers = function () {
        showLoader();
        
        //get starting date and end date from top selected date and apply in query
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.dateFilterText = $("#dateFilterText").text();
        $scope.searchKey = '';
        if ($('#searchField').val()) {
            $scope.searchKey = $('#searchField').val();
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
            dateFilterText:$scope.dateFilterText,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        
        //Call downloadUsers in services.js file
        getData.downloadUsers(reqData).then(function (response) {
            if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.csv_url){
                window.location.href = response.csv_url;
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
        $rootScope.$broadcast('getUserEvent', userlist);
        $scope.currentUser = userlist;
        //console.warn(userlist);
        $('#hdnUserID').val(userlist.userid);
        $('#hdnUserGUID').val(userlist.userguid);
    }
    //Function for set class for each TR
    $scope.cls = function (idx) {
        return idx % 2 === 0 ? 'odd' : 'even';
    }
    //Function for view user profile of a particular user
    $scope.viewUserProfile = function (userguid) {
        //If UserGUID is Undefined
        if (typeof userguid === 'undefined') {
            userguid = $('#hdnUserGUID').val();
        }
        //Useful for set breadcrumb
        $window.location.href = base_url + 'admin/users/user_profle/' + userguid;
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
        getData.autoLoginUser(reqData).then(function (response) {
            
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
    
    /**
     * Set li selected
     * @param {type} user
     * @returns {undefined}
     */
    $scope.selectCategory = function (user) {
        if (user.userid in $scope.selectedUsers) {
            delete $scope.selectedUsers[user.userid];
        } else {
            $scope.selectedUsers[user.userid] = user;            
        }
        if (Object.keys($scope.selectedUsers).length > 0) {
            setTimeout(function(){ $scope.globalChecked == true; }, 1);
            $('#ItemCounter').fadeIn();            
        } else {
            $scope.showButtonGroup = false;
            $('#ItemCounter').fadeOut();
        }
        
        setTimeout(function(){
            if($(".registered-user tr.selected").length == $scope.listData[0].ObjUsers.length){
                setTimeout(function(){ $scope.globalChecked = true; }, 1);
                $("#selectallbox").addClass("focus").children("span").addClass("icon-checked");
            }else{
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");
            }
        }, 1);
        
        var ItemCount = Object.keys($scope.selectedUsers).length;
        var txtCount = ItemsSelected;
        if(ItemCount == 1)
            txtCount = ItemSelected;
        $('#ItemCounter .counter').html(ItemCount+txtCount);
        //console.log($scope.selectedUsers);
    }
    
    /**
     * SHow selected css
     * @param {type} user
     * @returns {undefined}
     */
    $scope.isSelected = function (user) {
        if (user.userid in $scope.selectedUsers) {
            return true;
        } else {
            $scope.globalChecked = false;
            return false;            
        }        
    };

    $scope.globalCheckBox = function () {
        $scope.globalChecked = ($scope.globalChecked == false) ? true : false;        
        if ($scope.globalChecked) {
            $scope.selectedUsers = {};
            var listData = $scope.listData[0].ObjUsers;
            angular.forEach(listData, function (val, key) {
                if (typeof $scope.selectedUsers[key]) {                    
                    $scope.selectCategory(val, key);
                }
            });
        } else {
            angular.forEach($scope.selectedUsers, function (val, key) {
                $scope.selectCategory(val, key);
            });
        }    
                
    };
    
    /*
    $scope.selectCategory = function (user) {
        var mIndex = $scope.listData[0].ObjUsers.indexOf(user);
        if (user.userid in $scope.selectedUsers) {
            delete $scope.selectedUsers[user.userid];
            delete $scope.selectedUsersIndex[mIndex];
        } else {
            $scope.selectedUsers[user.userid] = user;
            $scope.selectedUsersIndex[mIndex] = mIndex;
        }
        if (Object.keys($scope.selectedUsers).length > 0) {
            $scope.showButtonGroup = true;
            $scope.globalChecked = true;
            $('#ItemCounter').fadeIn();            
        } else {
            $scope.globalChecked = false;
            $scope.showButtonGroup = false;
            $('#ItemCounter').fadeOut();
        }    
        
        var ItemCount = Object.keys($scope.selectedUsers).length;
        $('#ItemCounter .counter').html(ItemCount);
        //console.log($scope.selectedUsers);
    }
    
    $scope.isSelected = function (user) {
        if (user.userid in $scope.selectedUsers) {
            return true;
        } else {
            return false;
        }        
    };

    $scope.globalCheckBox = function () {
        $scope.globalChecked = ($scope.globalChecked == false) ? true : false;        
        if ($scope.globalChecked) {
            var listData = $scope.listData[0].ObjUsers;
            angular.forEach(listData, function (val, key) {
                if (typeof $scope.selectedUsers[key]) {                    
                    $scope.selectCategory(val, key);
                }
            });
        } else {
            angular.forEach($scope.selectedUsers, function (val, key) {
                $scope.selectCategory(val, key);
            });
        }    
                
    };*/
    
    $scope.SetMultipleUserStatus = function (action) {
        var userstatus = '';
        if (action == "approve") {
            userstatus = 2;
            $rootScope.confirmationMessage = Sure_Approve+' ?';
        }else if (action == "unblock") {
            userstatus = 2;
            $rootScope.confirmationMessage = Sure_Unblock+' ?';
        }else if (action == "block") {
            userstatus = 4;
            $rootScope.confirmationMessage = Sure_Block+' ?';
        } else if (action == "delete"){
            userstatus = 3;
            $rootScope.confirmationMessage = Sure_Delete+' ?';
        }
        openPopDiv('confirmeMultipleUserPopup', 'bounceInDown');
        $scope.statusUserIds = {};
        $scope.indexToUpdate = {};
        $scope.statusUserIds = Object.keys($scope.selectedUsers);//$scope.selectedMedia;
        $scope.userstatus = userstatus;
        $scope.useraction = action;
        
        angular.forEach($scope.selectedUsers, function (user, key) {
            var mIndex = $scope.listData[0].ObjUsers.indexOf(user);
            $scope.indexToUpdate[mIndex] = mIndex;
        })

    };
    
    $rootScope.updateUsersStatus = function () {
        var reqData = {
            users: $scope.statusUserIds,
            userstatus: $scope.userstatus,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        };
        closePopDiv('confirmeMultipleUserPopup', 'bounceOutUp');
        showLoader();
        getData.updateUsersStatus(reqData).then(function (response) {
            
            if (response.ResponseCode == 200) {
                //Reset all
                $scope.indexToUpdate = {};
                $scope.statusUserIds = {};
                $scope.globalChecked = true;
                $scope.globalCheckBox();
                $scope.selectedUsers = {};
                $scope.selectedUsersIndex = {};

                var msg =  $scope.useraction;            
                msg = ucwords(msg);
                $("#spn_noti").html("");
                sucessMsz();
                $("#spn_noti").html("  "+msg+" successfully.");

                $scope.registeredUsers();
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }else{
                alert(response.Message);
            }            
            hideLoader();
            
        }), function (error) {
            hideLoader();
        }
    };
    
    $scope.CommunicateMultipleUsers = function () {        
        
        var listData = $scope.selectedUsers;
        var userArr = [],arrLength;
        var userIds = '';
        var html = '';
        var htmlAll = '';        
        $("#dvmorelist").html(''); 
        $("#dvtipcontent").html('');
                
        htmlAll += "<i class=\"icon-tiparrow\">&nbsp;</i>";
        
        angular.forEach(listData, function (user, key) {
            userArr.push(user);
            userIds += key+',';
        });
        
        arrLength = userArr.length;
        
        for (var i = 0; i < arrLength; i++) {
            if (i < 3) {
                html += "<a href=\"javascript:void(0);\" class=\"name-tag\"><span>" + userArr[i].username + "</span></a>";                    
            }
            if (i >= 3) {
                htmlAll += "<a href=\"javascript:void(0);\">" + userArr[i].username + "</a>";
            }
        }
        
        if (arrLength > 3) {
            html += "<a href=\"javascript:void(0);\" class=\"name-tag morelist\" data-tip=\"tooltip\"><span>+ " + parseInt(arrLength - 3) + "  More </span></a>";
        }
        
        $("#dvmorelist").append(html);
        $("#dvtipcontent").append(htmlAll);
        $("#hdnUsersId").val(userIds);

        $("#subject").val("");
        $("#multipleComu").val("");
        
        openPopDiv('communicateMultiple', 'bounceInDown');
        communicateMorelist();
    };
    
    $scope.show_confirm_message= function (ApprovalStatus){
        $scope.statusToUpdate = ApprovalStatus;
        if(ApprovalStatus==0){
            $scope.confirm_message = 'Are you sure you want to remove from writer to ';
        }else{
            $scope.confirm_message = 'Are you sure you want to make writer to ';
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
        getData.updateUsersWriterStatus(reqData).then(function(response){
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