/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// IP Controller
app.controller('CategoryCtrl', function ($scope, $rootScope, categoryData, $window, $timeout) {
    $scope.totalRecord = 0;
    $scope.currentPage = 1,
            $scope.numPerPage = pagination,
            $scope.maxSize = pagination_links;
    $scope.orderByField = '';
    $scope.reverseSort = false;
    $rootScope.totalIps = 0;
    $scope.isDefaultIP = 0;
    $scope.IpFor = 1;
    $scope.pageHeading = Category;
    $scope.globalChecked = false;
    $scope.IpStatus = {};
    $scope.ip_status = 2;
    $scope.currentData = {};
    $scope.currentIsActive = 0;
    $scope.allCategories = {};
    $scope.ModuleID = "";
    
    $scope.init_module = function (ModuleID){
        $scope.ModuleID=ModuleID;
        //console.log(ModuleID)
        $scope.DataList();
    }
    
    $scope.DataList = function () {
        intilizeTooltip();
        showLoader();

        //get starting date and end date from top selected date and apply in query
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();

        /* Here we check if current page is not equal 1 then set new value for var begin */
        var begins = '';
        if ($scope.currentPage == 1) {
            //Make request data parameter for smtp listing
            begins = 0;//$scope.currentPage;
        } else {
            begins = (($scope.currentPage - 1) * $scope.numPerPage)
        }

        /* Send AdminLoginSessionKey in every request */
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        var reqData = {
            Begin: begins, //$scope.currentPage,
            End: $scope.numPerPage,
            SortBy: $scope.orderByField,
            OrderBy: $scope.reverseSort,
            IpFor: $scope.IpFor,
            ModuleID:$scope.ModuleID,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey: $scope.AdminLoginSessionKey
        }

        //Call getIpList in services.js file
        categoryData.getList(reqData).then(function (response) {
            $scope.listData = [];
            $("#ipdenieddiv").html('');
            if (response.ResponseCode == 200) {
                $scope.totalRecord = $scope.noOfObj = response.Data.total_records

                $rootScope.totalResults = $scope.noOfObj;

                //If no. of records greater then 0 then show            
                $('#noresult_td').remove();
                $('.simple-pagination').show();

                //If no of records equal 0 then hide
                if ($scope.noOfObj == 0) {
                    $('#CategoryCtrl table>tbody').append('<tr id="noresult_td"><td colspan="3"><div class="no-content text-center"><p>' + ThereIsNoCategoryToShow + '</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }

                //Push data into Controller in view file
                $scope.listData.push({ObjIP: response.Data.results});
                $scope.getAllCategories();
            } else if (response.ResponseCode == 517) {
                redirectToBlockedIP();
            } else if (response.ResponseCode == 598) {
                //Show error message
                PermissionError(response.Message);
                $("#ipdenieddiv").html(response.DeniedHtml);
            }

            hideLoader();

        }), function (error) {
            hideLoader();
        }
    };
    //Apply Sort by and mamke request data
    $scope.sortBY = function (column_id) {
        if ($("table.users-table #noresult_td").length == 0)
        {
            $(".shortdiv").children('.icon-arrowshort').addClass('hide');
            $(".shortdiv").parents('.ui-sort').removeClass('selected');
            if ($scope.reverseSort == true) {
                $("#" + column_id).addClass('selected').children('.shortdiv').removeClass('sortedDown').addClass('sortedUp').children('.icon-arrowshort').removeClass('hide');
            } else {
                $("#" + column_id).addClass('selected').children('.shortdiv').removeClass('sortedUp').addClass('sortedDown').children('.icon-arrowshort').removeClass('hide');
            }
            reqData = {
                Begin: $scope.currentPage,
                End: $scope.numPerPage,
                SortBy: $scope.orderByField,
                OrderBy: $scope.reverseSort,
                //Send AdminLoginSessionKey
                AdminLoginSessionKey: $scope.AdminLoginSessionKey
            }
            $scope.DataList();
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
            SortBy: $scope.sort_by,
            ModuleID:$scope.ModuleID,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey: $scope.AdminLoginSessionKey
        }
        //$scope.DataList();
    });
    //Function for set class for each TR
    $scope.cls = function (idx) {
        return idx % 2 === 0 ? 'odd' : 'even';
    };

    //Function for set Ip details in scope variables
    $scope.SetDetail = function (data) {
        $scope.currentData = data;
    };

    $scope.resetPopup = function () {
        $scope.currentData = {'category_id': "", "name": "", "parent_id": "0", "module_id": "","description":""};
    }

    $scope.getAllCategories = function (category_id) {
        if (typeof category_id == 'undefined') {
            category_id = '';
        }
        reqData = {
            ModuleID:$scope.ModuleID,
            AdminLoginSessionKey: $scope.AdminLoginSessionKey,
            CategoryId: category_id
        }
        categoryData.getAllCategory(reqData).then(function (response) {
            if (response.ResponseCode == 200) {
                $scope.allCategories = response.Data.results;
                $scope.currentData.parent_id = $scope.allCategories[0];
            }
        });
    }

    $scope.AddDetailsPopUp = function () {
        //$scope.getAllCategories();
        $scope.resetPopup();
        $("#chkActive").attr('checked', true).parent('span').addClass('icon-checked');
        $scope.showIpError = false;
        $scope.errorIpMessage = null;
        $scope.showCategoryError = false;
        $scope.showDescriptionError = false;
        openPopDiv('addIpPopup', 'bounceInDown');
    };

    $scope.EditDetailsPopUp = function () {
        //$scope.getAllCategories();
        reqData = {
            ModuleID: 14,
            AdminLoginSessionKey: $scope.AdminLoginSessionKey,
            CategoryId: $scope.currentData.category_id
        }
        showLoader();
        categoryData.getAllCategory(reqData).then(function (response) {
            if (response.ResponseCode == 200) {
                $scope.allCategories = response.Data.results;
                $scope.set_parent_selected($scope.currentData.parent_id);
                $scope.currentData.module_id = $scope.currentData.ModuleID;
            }
            //console.log($scope.allCategories);
            $scope.showIpError = false;
            $scope.errorIpMessage = null;
            $scope.showCategoryError = false;
            $scope.showDescriptionError = false;
            openPopDiv('addIpPopup', 'bounceInDown');
            hideLoader();
        });

    };

    $scope.filter_module = function()
    {
        $scope.ModuleID = $scope.category.filter_module;
        $scope.DataList();
    }

    $scope.set_parent_selected = function (category_id) {
        if (category_id == null || category_id == 0) {
            $scope.currentData.parent_id = $scope.allCategories[0];
        }else{
            //console.log(category_id,$scope.allCategories);
            angular.forEach($scope.allCategories, function(val, index){
                if(val.category_id==category_id){
                    $scope.currentData.parent_id = $scope.allCategories[index];
                }
            });
        }
    }

    $scope.SaveCommission = function () {
        var CategoryName = $scope.currentData.name;
        var Description = $scope.currentData.description;
        var module_id = $scope.currentData.module_id;
        var module_id = $scope.ModuleID;
        var show_error = 0;
        $scope.hasError = false;
        $scope.errorCategoryMessage = '';
        $scope.errorModuleMessage = '';
        $scope.errorDescriptionMessage = '';
        if (CategoryName == "") {
            $scope.showCategoryError = true;
            $scope.errorCategoryMessage = 'Please enter valid category name.';
            $scope.hasError = true;
        }
        if (module_id == "" || module_id == undefined) {
            $scope.showModuleError = true;
            $scope.errorModuleMessage = 'Please select module name.';
            $scope.hasError = true;
        }
        if(Description == "" || Description == undefined) {
            $scope.showDescriptionError = true;
            $scope.errorDescriptionMessage = 'Please enter description.';
            $scope.hasError = true;
        }
        //console.log($scope.hasError);
        if($scope.hasError==true)
        {
            return false;
        }
        else {
            $('.loader_ip').show();
            //send message
            $scope.showCategoryError = false;
            $scope.errorCategoryMessage = null;
            $scope.showDescriptionError = false;
            $scope.errorDescriptionMessage = null;
            var reqData = {
                //'CommisionGUID':$scope.currentCommission.CommisionGUID,
                'CategoryID': $scope.currentData.category_id,
                'Name': $scope.currentData.name,
                'Description': $scope.currentData.description,
                'ParentID': $scope.currentData.parent_id.category_id,
                'ModuleID': module_id,
                'AdminLoginSessionKey': $scope.AdminLoginSessionKey
            };
            categoryData.Save(reqData).then(function (response) {
                if (response.ResponseCode == 200) {
                    //Show Success message
                    ShowSuccessMsg(response.Message);
                    $scope.resetPopup();
                    $scope.DataList();
                    closePopDiv('addIpPopup', 'bounceOutUp');

                } else if (response.ResponseCode == 517) {
                    redirectToBlockedIP();
                } else if (response.ResponseCode == 598) {
                    //Show error message
                    closePopDiv('addIpPopup', 'bounceOutUp');
                    PermissionError(response.Message);
                } else {
                    $scope.showCategoryError = true;
                    $scope.errorCategoryMessage = response.Message;
                    //$scope.showDescriptionError = true;
                    //$scope.errorDescriptionMessage = response.Message;
                }
                $('.loader_ip').hide();
            });
        }

        $timeout(function () {
            $scope.showIpError = false;
            $scope.errorIpMessage = null;
        }, 5000);

    };


    $scope.SetStatus = function (action) {
        if (action == 2) {
            $rootScope.confirmationMessage = Sure_Active + ' ?';
        } else if (action == 4) {
            $rootScope.confirmationMessage = Sure_Block + ' ?';
        } else if (action == 3) {
            $rootScope.confirmationMessage = Sure_Delete + ' ?';
        }
        $scope.currentIsActive = action;
        openPopDiv('confirmeCommissionPopup', 'bounceInDown');
    };

    $rootScope.updateStatus = function () {
        showLoader();
        var reqData = {
            'StatusID': $scope.currentIsActive,
            'CategoryID': $scope.currentData.category_id,
            'AdminLoginSessionKey': $scope.AdminLoginSessionKey
        };
        //console.log(reqData)
        closePopDiv('confirmeCommissionPopup', 'bounceOutUp');
        showLoader();
        categoryData.updateStatus(reqData).then(function (response) {
            if (response.ResponseCode == 200)
            {
                hideLoader();
                ShowSuccessMsg(response.Message);
                $scope.DataList();

            } else if (response.ResponseCode == 517) {
                redirectToBlockedIP();
            } else if (response.ResponseCode == 598) {
                //Show error message
                PermissionError(response.Message);
            } else {
                ShowErrorMsg(response.Message);
            }
            hideLoader();
            $("html, body").animate({scrollTop: 0}, "slow");

        }), function (error) {
            hideLoader();
        }
    };

});

app.filter('htmlString', function () {
    return function (text) {
        return text.replace(/&nbsp;/g, " ");
    }
});
