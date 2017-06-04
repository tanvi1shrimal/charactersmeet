// User Controller for Profile Page

app.requires.push('ngAutocomplete');
app.controller('advertisementCtrl', ['$scope', 'advertisementService', '$rootScope', '$window', function ($scope, advertisementService, $rootScope, $window) {
        $scope.listData = [];

        $scope.totalRecord = 0;
        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = pagination;
        $scope.maxSize = pagination_links;
        $scope.orderByField = '';
        $scope.reverseSort = false;
        $scope.isImageUploaded = false;
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $scope.Advertisement = {
            'Type': '1',
            'Position': '1',
            'Locations': [{'address': ''}]
        };

        $scope.Error = {
            advertisement_name: '',
            redirect_link: '',
            start_date: '',
            end_date: '',
        };

        $scope.ErrorLocation = [];

        $scope.AdStatus = 'active';
        $scope.setAdFilter = function (AdStatus) {
            $scope.AdStatus = AdStatus;
            $scope.getAdvertisements();
        }

        $scope.getAdvertisements = function () {
            intilizeTooltip();
            showLoader();
            $scope.globalChecked = false;
            $('#ItemCounter').fadeOut();

            //get starting date and end date from top selected date and apply in query
            $scope.startDate = $('#SpnFrom').val();
            $scope.endDate = $('#SpnTo').val();
            $scope.searchKey = '';
            if ($('#searchField').val()) {
                $scope.searchKey = $.trim($('#searchField').val());
                $('#searchButtonA').addClass('selected');
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
                SortBy: $scope.orderByField,
                OrderBy: $scope.reverseSort,
                //Send AdminLoginSessionKey
                AdminLoginSessionKey: $scope.AdminLoginSessionKey,
                AdStatus: $scope.AdStatus,
            }
            var reqUrl = reqData[1]
            //Call getUserlist in services.js file
            advertisementService.getList(reqData).then(function (response) {
                $scope.listData = [];
                //If no. of records greater then 0 then show
                $('.download_link,#selectallbox').show();
                $('#noresult_td').remove();
                $('.simple-pagination').show();

                //$scope.showButtonGroup = false;
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");

                if (response.ResponseCode == 200) {
                    $scope.noOfObj = response.Data.total_records
                    $scope.totalRecord = $scope.noOfObj;

                    //If no of records equal 0 then hide
                    if ($scope.noOfObj == 0) {
                        $('.download_link,#selectallbox').hide();
                        $('#advertisementCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>' + ThereIsNoRecordToShow + '</p></div></td></tr>');
                        $('.simple-pagination').hide();
                    }

                    //Push data into Controller in view file
                    $scope.listData.push({ObjUsers: response.Data.results});

                } else if (response.ResponseCode == 517) {
                    redirectToBlockedIP();
                } else if (response.ResponseCode == 598) {
                    $('.download_link,#selectallbox').hide();
                    $('#advertisementCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>' + response.Message + '</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                hideLoader();

            }), function (error) {
                hideLoader();
            }
        };
        //$scope.getAdvertisements();
        
        $scope.save_advertisement = function ()
        {
            $scope.ErrorStatus = false;
            $scope.Error = {
                advertisement_name: '',
                redirect_link: '',
                start_date: '',
                end_date: '',
            };

            var Location = ';';
            //parse location
            angular.forEach($scope.Advertisement.Locations, function (val, index) {
                if (val.address == '' && $scope.Advertisement.Type == '1') {
                    $scope.ErrorLocation[index] = 'Required';
                    $scope.ErrorStatus = true;
                } else {
                    $scope.ErrorLocation[index] = '';
                    Location = Location + val.address + ';';
                }
            });
            $scope.Advertisement.StartDate = $('#StartDate').val();
            $scope.Advertisement.EndDate = $('#EndDate').val();
            if (typeof $scope.Advertisement.Name == 'undefined' || $scope.Advertisement.Name == "") {
                $scope.ErrorStatus = true;
                $scope.Error.advertisement_name = 'Required';
            }
            if (typeof $scope.Advertisement.StartDate == 'undefined' || $scope.Advertisement.StartDate == "") {
                $scope.ErrorStatus = true;
                $scope.Error.start_date = 'Required';
            }
            if (typeof $scope.Advertisement.EndDate == 'undefined' || $scope.Advertisement.EndDate == "") {
                $scope.ErrorStatus = true;
                $scope.Error.end_date = 'Required';
            }
            if (typeof $scope.Advertisement.RedirectLink == 'undefined' || $scope.Advertisement.RedirectLink == "") {
                $scope.ErrorStatus = true;
                $scope.Error.redirect_link = 'Required';
            }
            if ($scope.Advertisement.StartDate && $scope.Advertisement.EndDate)
            {
                var StartDate = new Date($scope.Advertisement.StartDate);
                var EndDate = new Date($scope.Advertisement.EndDate);
                if (StartDate > EndDate)
                {
                    $scope.ErrorStatus = true;
                    $scope.Error.end_date = 'End date should be greater than start date.';
                }
            }
            if ((typeof $scope.Advertisement.MediaGUID == 'undefined' || $scope.Advertisement.MediaGUID == '') && $scope.ErrorStatus == false)
            {
                $scope.ErrorStatus = true;
                ShowErrorMsg('Please upload image for ad.', 'danger');
            }

            if ($scope.ErrorStatus == false)
            {
                $scope.Advertisement.Location = Location;
                var reqData = $scope.Advertisement;
                reqData.AdminLoginSessionKey = $scope.AdminLoginSessionKey;

                advertisementService.save(reqData).then(function (response) {
                    if (response.ResponseCode == 200) {
                        ShowSuccessMsg(response.Message, 'success');
                        setTimeout(function () {
                            window.location = base_url + 'admin/advertisement/';
                        }, 500);
                    } else {
                        ShowErrorMsg(response.Message, 'danger');
                    }
                });
            }
        }

        $scope.add_location = function () {
            $scope.Advertisement.Locations.push({'address': ''});
        };
        $scope.remove_location = function (index) {
            $scope.Advertisement.Locations.splice(index, 1);
        };
        $scope.numPages = function () {
            return Math.ceil($scope.noOfObj / $scope.numPerPage);
        };

        $scope.initialize_upload = function ()
        {
            //$scope.upload_image = new qq.FineUploaderBasic({
            var iuploader = new qq.FineUploaderBasic({
                multiple: false,
                autoUpload: true,
                title: "Attach Photos",
                button: $("#blog_photo")[0],
                request: {
                    endpoint: base_url + "api/uploadimage",
                    /*customHeaders: {
                     "Accept-Language": accept_language
                     },*/
                    params: {
                        Type: 'advertisement',
                        unique_id: function () {
                            return '';
                        },
                        LoginSessionKey: $scope.AdminLoginSessionKey,
                        //Position: $('input[name=ad_position]:checked').val(),
                        Position: $scope.Advertisement.Position,
                        DeviceType: 'Native'
                    }
                },
                validation: {
                    allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'],
                    sizeLimit: 5242880 // 4mb
                },
                callbacks: {
                    onUpload: function (id, fileName) {
                        $scope.isImageUploaded = true;
                        $scope.Advertisement.MediaGUID = '';
                        $('.attached-media').html('');
                        var html = "<li id='dummy_img' class='load-wrap'><div class='loader-box'><div id='ImageThumbLoader' class='uplaodLoader'><img src='" + base_url + "assets/admin/img/loading22.gif' id='spinner'></div></div></li>";
                        $('.attached-media').prepend(html);
                    },
                    onProgress: function (id, fileName, loaded, total) {
                    },
                    onComplete: function (id, fileName, responseJSON) {
                        if (responseJSON.Message == 'Success')
                        {
                            $('.attached-media').html('');
                            $scope.isImageUploaded = true;
                            $('#dummy_img').remove();
                            click_function = 'remove_image("' + responseJSON.Data.MediaGUID + '");';
                            var html = "<li style='width:auto'><a id='" + responseJSON.Data.MediaGUID + "' class='smlremove' onclick='" + click_function + "'></a>";
                            //html += "<figure><img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + responseJSON.Data.MediaGUID + "' src='" + responseJSON.Data.ImageServerPath + '/196x196/' + responseJSON.Data.ImageName + "'></figure>";
                            html += "<img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + responseJSON.Data.MediaGUID + "' src='" + responseJSON.Data.ImageServerPath + '/' + responseJSON.Data.ImageName + "'>";
                            //html += "<span class='radio'><input class='set_cover_pic' type='radio' name='coverpic' id='coverpicId1'><label for='coverpicId1'>COVER PIC</label></span></li>";
                            $('.attached-media').prepend(html);
                            var $items = $('.img-full');
                            if ($items.length > 4)
                            {
                                $("#blog_photo input[name='file']").prop("disabled", true);
                            }
                            $("#blog_video input[name='file']").prop("disabled", true);
                            $("#embed_code").prop("disabled", true);
                            $scope.Advertisement.MediaGUID = responseJSON.Data.MediaGUID;
                        }
                        else if (responseJSON.ResponseCode !== 200)
                        {
                            $('.attached-media').html('');
                            $scope.isImageUploaded = true;
                            PermissionError(responseJSON.Message, 'danger');
                        }

                    },
                    onSubmit: function (id, fileName) {
                        //fileCount++;
                    },
                    onValidate: function (b) {
                        var pos = $('input[name=ad_position]:checked').val();
                        iuploader.setParams({
                            Type: 'advertisement',
                            unique_id: function () {
                                return '';
                            },
                            LoginSessionKey: $scope.AdminLoginSessionKey,
                            //Position: $('input[name=ad_position]:checked').val(),
                            Position: pos,
                            DeviceType: 'Native'
                        });
                        /*if ($scope.isImageUploaded) {
                         ShowErrorMsg('Only one image allowed.', 'danger');
                         //console.log('dads');
                         return false;
                         }*/
                        var validExtensions = ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG']; //array of valid extensions
                        var fileName = b.name;
                        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                        if ($.inArray(fileNameExt, validExtensions) == -1) {
                            $("html, body").animate({scrollTop: 0}, "slow");
                            PermissionError('Allowed file types only jpeg, jpg, gif and png.');
                            return false;
                        }
                        if (b.size > 5242880) {
                            $scope.ErrorStatus = true;
                            //$scope.Error.error_Schollyme_Thumbnail = required_song_thumb;
                            $("html, body").animate({scrollTop: 0}, "slow");
                            PermissionError('Image file ' + fileName + ' should be less than 5 MB.');
                        }

                    },
                    onError: function (error) {
                        //alert(error);
                    }
                }
            });
        };

        $scope.SetItem = function (item) {
            $scope.data = item;
        }

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
                    StartDate: $scope.startDate,
                    EndDate: $scope.endDate,
                    SearchKey: $scope.searchKey,
                    //UserStatus: $scope.userStatus,
                    SortBy: $scope.orderByField,
                    OrderBy: $scope.reverseSort,
                    //Send AdminLoginSessionKey
                    AdminLoginSessionKey: $scope.AdminLoginSessionKey
                }
                $scope.getAdvertisements();
            }
        };

        $scope.change_status = function (status) {
            var reqData = {
                'AdGUID': $scope.data.advertisement_guid,
                'AdminLoginSessionKey': $scope.AdminLoginSessionKey
            };
            //showButtonLoader('advertise_deleted');
            advertisementService.delete(reqData).then(function (response) {
                //hideButtonLoader('advertise_deleted');
                closePopDiv('delete_popup', 'bounceOutUp');
                if (response.ResponseCode == 200) {
                    ShowSuccessMsg(response.Message, 'success');
                    $scope.getAdvertisements();
                } else {
                    ShowErrorMsg(response.Message, 'danger');
                }
            });
        };

        $scope.get_advertisement_detail = function (advertisement_guid) {
            if (advertisement_guid != '')
            {
                var reqData = {
                    'AdGUID': advertisement_guid,
                    'AdminLoginSessionKey': $scope.AdminLoginSessionKey
                };
                advertisementService.get_details(reqData).then(function (response) {
                    if (response.ResponseCode == 200) {
                        $scope.Advertisement = response.Data;
                        $scope.Advertisement.AdGUID = $scope.Advertisement.AdvertisementGUID;
                        //console.log($scope.Advertisement)
                        if ($scope.Advertisement.ImageName && $scope.Advertisement.ImageName != '')
                        {
                            var click_function = 'remove_image("' + response.Data.MediaGUID + '");';
                            var html = "<li style='width:auto'><a id='" + response.Data.MediaGUID + "' class='smlremove' onclick='" + click_function + "'></a>";
                            //html += "<figure><img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + responseJSON.Data.MediaGUID + "' src='" + responseJSON.Data.ImageServerPath + '/196x196/' + responseJSON.Data.ImageName + "'></figure>";
                            html += "<img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + response.Data.MediaGUID + "' src='" + response.Data.ImageServerPath + '/' + response.Data.ImageName + "'>";
                            //html += "<span class='radio'><input class='set_cover_pic' type='radio' name='coverpic' id='coverpicId1'><label for='coverpicId1'>COVER PIC</label></span></li>";
                            $('.attached-media').prepend(html);
                        }
                    } else {
                        ShowErrorMsg(response.Message, 'danger');
                    }
                });
            }
        };

        $scope.remove_image = function () {
            $scope.Advertisement.MediaGUID = '';
            $scope.isImageUploaded = false;
        };
    }]);

$(document).ready(function () {
    $('#StartDate').datepicker({
        minDate: new Date(),
        onSelect: function (date) {
            var selectedDate = new Date(date);
            var msecsInADay = 86400000;
            var endDate = new Date(selectedDate.getTime() + msecsInADay);
            $("#EndDate").datepicker("option", "minDate", endDate);
        },
        onClose: function () {
            $('#StartDate').trigger('blur');
        }
    });
    $('#EndDate').datepicker({
        minDate: new Date(),
        onClose: function () {
            $('#EndDate').trigger('blur');
        }
    });
//    $('#ui-datepicker-div').mouseup(function (e) {
//        return false;
//    });
    //console.log($('#StartDate').datepicker())

    $('#searchButtonA').on('click', function () {
        if ($('#searchButtonA').hasClass('selected')) {
            angular.element($('#advertisementCtrl')).scope().getAdvertisements();
        } else {
            $('#searchButtonA').addClass('selected');
            $('.search-block').show();
        }
    });
    $('#clearText').click(function () {
        if ($('#searchButtonA').hasClass('selected')) {
            $('#searchButtonA').removeClass('selected');
            $('#searchField').val('').trigger('change');
            angular.element($('#advertisementCtrl')).scope().getAdvertisements();
        }
    });
});
/*--------Function to remove uploaded image----------*/
function remove_image(element)
{
    //console.log($('#advertisementCtrl'))
    angular.element($('#advertisementCtrl')).scope().remove_image();
    if (element == 'VIDEO' || element == 'YOUTUBE')
    {
        $('.attached-media').html('');
        if (element == 'YOUTUBE')
        {
            $('#embed_code').val('');
        }
    }
    else
    {

        $('#' + element).parent().remove();
        var $items = $('.img-full');
        if ($items.length < 5)
        {
            $("#blog_photo input[name='file']").prop("disabled", false);
        }
    }
    var $items = $('.img-full');
    if ($items.length < 1)
    {
        $("#blog_photo input[name='file']").prop("disabled", false);
        $("#blog_video input[name='file']").prop("disabled", false);
        $("#embed_code").prop("disabled", false);
    }
}


app.controller('googleAdCtrl', ['$scope', 'advertisementService', '$rootScope', '$window', function ($scope, advertisementService, $rootScope, $window) {
        $scope.listData = [];

        $scope.totalRecord = 0;
        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = pagination;
        $scope.maxSize = pagination_links;
        $scope.orderByField = '';
        $scope.reverseSort = false;
        $scope.isImageUploaded = false;
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $scope.Advertisement = {
            'Type': '1',
            'Position': '1',
            'Locations': [{'address': ''}]
        };

        $scope.Error = {
            advertisement_name: '',
            redirect_link: '',
            start_date: '',
            end_date: '',
        };

        $scope.ErrorLocation = [];

        $scope.getAdvertisements = function () {
            intilizeTooltip();
            showLoader();
            $scope.globalChecked = false;
            $('#ItemCounter').fadeOut();

            //get starting date and end date from top selected date and apply in query
            $scope.startDate = $('#SpnFrom').val();
            $scope.endDate = $('#SpnTo').val();
            $scope.searchKey = '';
            if ($('#searchField').val()) {
                $scope.searchKey = $.trim($('#searchField').val());
                $('#searchButtonA').addClass('selected');
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
                SortBy: $scope.orderByField,
                OrderBy: $scope.reverseSort,
                //Send AdminLoginSessionKey
                AdminLoginSessionKey: $scope.AdminLoginSessionKey
            }
            var reqUrl = reqData[1]
            //Call getUserlist in services.js file
            advertisementService.getGoogleCodeList(reqData).then(function (response) {
                $scope.listData = [];
                //If no. of records greater then 0 then show
                $('.download_link,#selectallbox').show();
                $('#noresult_td').remove();
                $('.simple-pagination').show();

                //$scope.showButtonGroup = false;
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");

                if (response.ResponseCode == 200) {
                    $scope.noOfObj = response.Data.total_records
                    $scope.totalRecord = $scope.noOfObj;

                    //If no of records equal 0 then hide
                    if ($scope.noOfObj == 0) {
                        $('.download_link,#selectallbox').hide();
                        $('#advertisementCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>' + ThereIsNoRecordToShow + '</p></div></td></tr>');
                        $('.simple-pagination').hide();
                    }

                    //Push data into Controller in view file
                    $scope.listData.push({ObjUsers: response.Data.results});

                } else if (response.ResponseCode == 517) {
                    redirectToBlockedIP();
                } else if (response.ResponseCode == 598) {
                    $('.download_link,#selectallbox').hide();
                    $('#advertisementCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>' + response.Message + '</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                hideLoader();

            }), function (error) {
                hideLoader();
            }
        };
        //$scope.getAdvertisements();

        $scope.itemToEdit = {};
        $scope.SaveCode = function ()
        {
            $scope.hasError = false;
            $scope.errorDescriptionMessage = '';
            var AdvertisementValue = $scope.itemToEdit.AdvertisementValue;
            if (AdvertisementValue == "" || typeof AdvertisementValue == 'undefined' || AdvertisementValue == null) {
                $scope.showDescriptionError = true;
                $scope.errorDescriptionMessage = 'Please enter code.';
                $scope.hasError = true;
            }
            if ($scope.hasError == true)
            {
                return false;
            }
            else
            {
                var reqData = {
                    AdvertisementGoogle: $scope.itemToEdit.AdvertisementGoogle,
                    AdvertisementValue: $scope.itemToEdit.AdvertisementValue,
                    AdminLoginSessionKey: $scope.AdminLoginSessionKey
                }
                showLoader();
                advertisementService.saveGoogleCode(reqData).then(function (response) {
                    hideLoader();
                    if (response.ResponseCode == 200) {
                        ShowSuccessMsg(response.Message);
                        closePopDiv('addCodePopup', 'bounceOutUp');
                    } else {
                        ShowErrorMsg(response.Message);
                        closePopDiv('addCodePopup', 'bounceOutUp');
                    }

                });
            }
        };
        $scope.show_update_modal = function (item)
        {
            $scope.itemToEdit = item;
            openPopDiv('addCodePopup');
        };
        $scope.ClearData = function () {
            $scope.itemToEdit = {};
        };
        
        $scope.numPages = function () {
            return Math.ceil($scope.noOfObj / $scope.numPerPage);
        };
    }]);


app.controller('adDetailsCtrl', ['$scope', 'advertisementService', '$rootScope', '$window', function ($scope, advertisementService, $rootScope, $window) {
        $scope.listData = [];

        $scope.totalRecord = 0;
        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = pagination;
        $scope.maxSize = pagination_links;
        $scope.orderByField = '';
        $scope.reverseSort = false;
        $scope.isImageUploaded = false;
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $scope.Advertisement = {
            'Type': '1',
            'Position': '1',
            'Locations': [{'address': ''}]
        };

        $scope.Error = {
            advertisement_name: '',
            redirect_link: '',
            start_date: '',
            end_date: '',
        };

        $scope.ErrorLocation = [];

        $scope.advertisement_guid = '';
        $scope.Type = '';
        //Get no. of pages for data
        
        $scope.getDetails = function (advertisement_guid, Type) {
            intilizeTooltip();
            showLoader();

            $scope.advertisement_guid = advertisement_guid;
            $scope.Type = Type;

            $scope.globalChecked = false;
            $('#ItemCounter').fadeOut();

            //get starting date and end date from top selected date and apply in query
            $scope.startDate = $('#SpnFrom').val();
            $scope.endDate = $('#SpnTo').val();
            $scope.searchKey = '';
            if ($('#searchField').val()) {
                $scope.searchKey = $.trim($('#searchField').val());
                $('#searchButtonA').addClass('selected');
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
                SortBy: $scope.orderByField,
                OrderBy: $scope.reverseSort,
                AdminLoginSessionKey: $scope.AdminLoginSessionKey,
                AdvertisementGUID: advertisement_guid,
                Type: Type,
            }
            var reqUrl = reqData[1]
            //Call getUserlist in services.js file
            advertisementService.getAdViewDetailsList(reqData).then(function (response) {
                $scope.listData = [];
                //If no. of records greater then 0 then show
                $('.download_link,#selectallbox').show();
                $('#noresult_td').remove();
                $('.simple-pagination').show();

                //$scope.showButtonGroup = false;
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");

                if (response.ResponseCode == 200) {
                    $scope.noOfObj = response.Data.total_records
                    $scope.totalRecord = $scope.noOfObj;

                    //If no of records equal 0 then hide
                    if ($scope.noOfObj == 0) {
                        $('.download_link,#selectallbox').hide();
                        $('#advertisementCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>' + ThereIsNoRecordToShow + '</p></div></td></tr>');
                        $('.simple-pagination').hide();
                    }

                    //Push data into Controller in view file
                    $scope.listData.push({ObjUsers: response.Data.results});

                } else if (response.ResponseCode == 517) {
                    redirectToBlockedIP();
                } else if (response.ResponseCode == 598) {
                    $('.download_link,#selectallbox').hide();
                    $('#advertisementCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>' + response.Message + '</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                hideLoader();

            }), function (error) {
                hideLoader();
            }
        };
        //$scope.getAdvertisements();

        $scope.itemToEdit = {};
        $scope.SaveCode = function ()
        {
            $scope.hasError = false;
            $scope.errorDescriptionMessage = '';
            var AdvertisementValue = $scope.itemToEdit.AdvertisementValue;
            if (AdvertisementValue == "" || typeof AdvertisementValue == 'undefined' || AdvertisementValue == null) {
                $scope.showDescriptionError = true;
                $scope.errorDescriptionMessage = 'Please enter code.';
                $scope.hasError = true;
            }
            if ($scope.hasError == true)
            {
                return false;
            }
            else
            {
                var reqData = {
                    AdvertisementGoogle: $scope.itemToEdit.AdvertisementGoogle,
                    AdvertisementValue: $scope.itemToEdit.AdvertisementValue,
                    AdminLoginSessionKey: $scope.AdminLoginSessionKey
                }
                showLoader();
                advertisementService.saveGoogleCode(reqData).then(function (response) {
                    hideLoader();
                    if (response.ResponseCode == 200) {
                        ShowSuccessMsg(response.Message);
                        closePopDiv('addCodePopup', 'bounceOutUp');
                    } else {
                        ShowErrorMsg(response.Message);
                        closePopDiv('addCodePopup', 'bounceOutUp');
                    }

                });
            }
        };
        $scope.show_update_modal = function (item)
        {
            $scope.itemToEdit = item;
            openPopDiv('addCodePopup');
        };
        $scope.ClearData = function () {
            $scope.itemToEdit = {};
        };

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
                    StartDate: $scope.startDate,
                    EndDate: $scope.endDate,
                    SearchKey: $scope.searchKey,
                    //UserStatus: $scope.userStatus,
                    SortBy: $scope.orderByField,
                    OrderBy: $scope.reverseSort,
                    //Send AdminLoginSessionKey
                    AdminLoginSessionKey: $scope.AdminLoginSessionKey,
                    AdvertisementGUID: $scope.advertisement_guid,
                    Type: $scope.Type,
                }
                $scope.getDetails($scope.advertisement_guid, $scope.Type);
            }
        };
        
        $scope.numPages = function () {
            return Math.ceil($scope.noOfObj / $scope.numPerPage);
        };
    }]);