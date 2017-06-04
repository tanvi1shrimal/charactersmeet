// User Controller for Profile Page

app.requires.push('ngAutocomplete');
//app.requires.push('ui.bootstrap.datetimepicker');
var iuploader, promouploader;
app.controller('eventCtrl', ['$scope', 'eventService', '$rootScope', '$window', function ($scope, eventService, $rootScope, $window) {
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

        $scope.is_profile = false;
        $scope.is_banner = false;
        $scope.is_profile_uploaded = false;
        $scope.is_banner_uploaded = false;
        $scope.banner_guid = '';
        $scope.profile_guid = '';
        $scope.LocationDetails = '';
        $scope.image_server_path = image_server_path;

        $scope.show_profile = false;
        $scope.show_banner = false;
        $scope.data = {};

        $scope.Event = {
            CostumeContest: 0,
            Visibility: 0,
            Media: [],
            PromoVideo: '',
            PromoVideoGUID: '',
            TimeZoneID: 419
        };

        //listing
        $scope.getEvents = function () {
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
            eventService.getList(reqData).then(function (response) {
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
                        $('#eventCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>' + ThereIsNoRecordToShow + '</p></div></td></tr>');
                        $('.simple-pagination').hide();
                    }

                    //Push data into Controller in view file
                    $scope.listData.push({ObjUsers: response.Data.results});

                } else if (response.ResponseCode == 517) {
                    redirectToBlockedIP();
                } else if (response.ResponseCode == 598) {
                    $('.download_link,#selectallbox').hide();
                    $('#eventCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>' + response.Message + '</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                hideLoader();

            }), function (error) {
                hideLoader();
            }
        };
        $scope.numPages = function () {
            return Math.ceil($scope.noOfObj / $scope.numPerPage);
        };
        $scope.SetItem = function (item) {
            $scope.data = item;
        }

        setTimeout(function () {
            $('select[name="TimeZoneID"]').val($scope.Event.TimeZoneID);
            $('select[name="TimeZoneID"]').trigger('chosen:updated');
        }, 100);
        //save Event relates
        $scope.get_event_detail = function (EventGUID) {
            if (EventGUID == '')
            {
                return;
            }
            var reqData = {
                AdminLoginSessionKey: $scope.AdminLoginSessionKey,
                EventGUID: EventGUID
            };
            eventService.get_details(reqData).then(function (response) {
                if (response.ResponseCode == 200) {
                    $scope.Event = response.Data;

                    setTimeout(function () {
                        $('select[name="CategoryId"]').val($scope.Event.CategoryId);
                        $('select[name="CategoryId"]').trigger('chosen:updated');

                        $('select[name="TimeZoneID"]').val($scope.Event.TimeZoneID);
                        $('select[name="TimeZoneID"]').trigger('chosen:updated');
                    }, 100);

                    //set promo video 
                    if ($scope.Event.PromoVideoGUID.length > 0)
                    {

                        //var p_image = $scope.Event.PromoVideo_image.slice(0, parseInt(fNameExt.length) * -1);
                        var fNameExt = $scope.Event.PromoVideo_image.substr($scope.Event.PromoVideo_image.lastIndexOf('.') + 1);
                        var fname = $scope.Event.PromoVideo_image.slice(0, parseInt(fNameExt.length) * -1);
                        fname += 'jpg';

                        var click_function = 'remove_video("' + $scope.Event.PromoVideoGUID + '");';
                        var html = "<li id='" + $scope.Event.PromoVideoGUID + "'><a class='smlremove' onclick='" + click_function + "'></a>";
                        html += "<img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + $scope.Event.PromoVideoGUID + "' src='" + image_server_path + 'uploads/event/150x150/' + fname + "' style='width: 128px !important;'>";

                        //$('.attached-media').prepend(html);
                        $('.attached-media-video').append(html);
                    }
                    if ($scope.Event.Media.length > 0)
                    {
                        angular.forEach($scope.Event.Media, function (data, index) {
                            var click_function = 'remove_image("' + data.MediaGUID + '");';
                            var html = "<li id='" + data.MediaGUID + "'><a class='smlremove' onclick='" + click_function + "'></a>";
                            if (data.MediaType == 'Video')
                            {
                                var fNameExt = data.ImageName.substr(data.ImageName.lastIndexOf('.') + 1);
                                var fname = data.ImageName.slice(0, parseInt(fNameExt.length) * -1);
                                fname += 'jpg';

                                html += "<img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + data.MediaGUID + "' src='" + image_server_path + 'uploads/event/150x150/' + fname + "' style=\"width: 128px;\">";
                            }
                            else
                            {
                                html += "<img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + data.MediaGUID + "' src='" + image_server_path + 'uploads/event/128x128/' + data.ImageName + "'>";
                            }

                            //$('.attached-media').prepend(html);
                            $('.attached-media-gallery').append(html);
                        });
                    }

                    if (typeof $scope.Event.ProfileImageGUID != 'undefined' && $scope.Event.ProfileImageGUID != "" && $scope.Event.ProfileImageGUID != null) {
                        $('.default-photo').hide();
                        $('.default-photo-preview').show();
                        $scope.show_profile = true;
                    }
                    if (typeof $scope.Event.ProfileBannerGUID != 'undefined' && $scope.Event.ProfileBannerGUID != "" && $scope.Event.ProfileBannerGUID != null) {
                        $('.default-cover-photo').hide();
                        $('.default-cover-photo-preview').show();
                        $scope.show_banner = true;
                    }
                } else {
                    ShowErrorMsg(response.Message, 'danger');
                }
            });
        };


        $scope.save_event = function ()
        {
            $scope.ErrorStatus = false;
            $scope.Error = {
                Title: '',
                Tagline: '',
                Description: '',
                CategoryId: '',
                StartDate: '',
                StartTime: '',
                end_date: '',
                end_time: '',
                Venue: '',
                Location: '',
                Privacy: '',
                CostumeContest: '',
                ContactPerson: '',
                ContactEmail: '',
                ContactTel: '',
                FansAttended: '',
                CompaniesAttended: '',
                MediaImpressions: '',
            };

            $scope.Event.StartDate = $('#StartDate').val();
            $scope.Event.EndDate = $('#EndDate').val();
            if (typeof $scope.Event.Title == 'undefined' || $scope.Event.Name == "") {
                $scope.ErrorStatus = true;
                $scope.Error.Title = 'Required';
            }
            if (typeof $scope.Event.Description == 'undefined' || $scope.Event.Description == "") {
                $scope.ErrorStatus = true;
                $scope.Error.Description = 'Required';
            }
            if (typeof $scope.Event.CategoryId == 'undefined' || $scope.Event.CategoryId == "") {
                $scope.ErrorStatus = true;
                $scope.Error.CategoryId = 'Required';
            }
            if (typeof $scope.Event.StartDate == 'undefined' || $scope.Event.StartDate == "") {
                $scope.ErrorStatus = true;
                $scope.Error.StartDate = 'Required';
            }
            if (typeof $scope.Event.EndDate == 'undefined' || $scope.Event.EndDate == "") {
                $scope.ErrorStatus = true;
                $scope.Error.EndDate = 'Required';
            }
            if (typeof $scope.Event.StartTime == 'undefined' || $scope.Event.StartTime == "") {
                $scope.ErrorStatus = true;
                $scope.Error.StartTime = 'Required';
            }
            if (typeof $scope.Event.EndTime == 'undefined' || $scope.Event.EndTime == "") {
                $scope.ErrorStatus = true;
                $scope.Error.EndTime = 'Required';
            }
            if ($scope.Event.StartDate && $scope.Event.EndDate)
            {
                var StartDate = new Date($scope.Event.StartDate);
                var EndDate = new Date($scope.Event.EndDate);
                if (StartDate > EndDate)
                {
                    $scope.ErrorStatus = true;
                    $scope.Error.end_date = 'End date should be greater than start date.';
                }
            }
            if (typeof $scope.Event.Location == 'undefined' || $scope.Event.Location == "") {
                $scope.ErrorStatus = true;
                $scope.Error.Location = 'Required';
            }


            if ($scope.ErrorStatus == false)
            {
                //$scope.Event.Location = Location;
                var reqData = $scope.Event;
                reqData.AdminLoginSessionKey = $scope.AdminLoginSessionKey;


                if (typeof $scope.LocationDetails.geometry != 'undefined' && typeof $scope.LocationDetails.geometry.location != 'undefined')
                {

                    reqData.Latitude = $scope.LocationDetails.geometry.location.lat();
                    reqData.Longitude = $scope.LocationDetails.geometry.location.lng();

                    //console.log($scope.LocationDetails.geometry.location.lat())
                    //console.log($scope.LocationDetails.geometry.location.lng()) 
                }
                /*
                 reqData.StartDate = moment(reqData.StartDate + ' ' + reqData.StartTime).utc().format('YYYY-MM-DD');
                 reqData.StartTime = moment(reqData.StartDate + ' ' + reqData.StartTime).utc().format('HH:mm');
                 
                 reqData.EndDate = moment(reqData.EndDate + ' ' + reqData.EndTime).utc().format('YYYY-MM-DD');
                 reqData.EndTime = moment(reqData.EndDate + ' ' + reqData.EndTime).utc().format('HH:mm');
                 */


                showLoader();
                $('#btnpublish').addClass('login-loading');
                eventService.save(reqData).then(function (response) {
                    if (response.ResponseCode == 200) {
                        $scope.Event.EventGUID = response.Data.EventGUID;
                        var show_msg = true;
                        if ($scope.is_banner)
                        {
                            $scope.cropAndSave(response.Data.EventGUID, response.Message, 'banner');
                            show_msg = false;
                        }
                        else {
                            $scope.is_banner_uploaded = true;
                        }

                        if ($scope.is_profile)
                        {
                            $scope.cropAndSave(response.Data.EventGUID, response.Message, 'profile');
                            show_msg = false;
                        }
                        else
                        {
                            $scope.is_profile_uploaded = true;
                        }

                        if (show_msg)
                        {
                            $('#btnpublish').removeClass('login-loading');
                            hideLoader();
                            ShowSuccessMsg(response.Message, 'success');
                            setTimeout(function () {
                                window.location = base_url + 'admin/event';
                            }, 500);
                        }
                    } else {
                        hideLoader();
                        ShowErrorMsg(response.Message, 'danger');
                    }
                });
            }
        };
        $scope.change_status = function (status) {
            var reqData = {
                'EventGUID': $scope.data.event_guid,
                'AdminLoginSessionKey': $scope.AdminLoginSessionKey
            };
            //showButtonLoader('advertise_deleted');
            eventService.delete(reqData).then(function (response) {
                //hideButtonLoader('advertise_deleted');
                closePopDiv('delete_popup', 'bounceOutUp');
                if (response.ResponseCode == 200) {
                    ShowSuccessMsg(response.Message, 'success');
                    $scope.getEvents();
                } else {
                    ShowErrorMsg(response.Message, 'danger');
                }
            });
        };

        $scope.cropAndSave = function (ModuleEntityGUID, Message, ImageType) {
            //console.log(ModuleEntityGUID)
            var up_type = 'event';
            if (ImageType == 'profile')
            {
                var img = $('#image-cropper').cropit('export', {type: 'image/jpeg', quality: .9, originalSize: true});
            }
            else
            {
                var img = $('#cover-image-cropper').cropit('export', {type: 'image/jpeg', quality: .9, originalSize: true});
                up_type = 'profilebanner';
            }
            /*var top                 = $('#photo6-large').css('top').replace('px','');
             var left                = $('#photo6-large').css('left').replace('px','');*/
            var ImageName = '';
            var MediaGUID = '';
            //var ModuleEntityGUID = $('#entity_id').val();
            var reqData = {
                ImageData: img,
                ImageUrl: img,
                LoginSessionKey: $scope.AdminLoginSessionKey,
                ImageName: ImageName,
                ModuleID: 14,
                ModuleEntityGUID: ModuleEntityGUID,
                Type: up_type,
                DeviceType: 'native',
            };
            //showButtonLoader('sign_up_btn');
            eventService.uploadImage(reqData).then(function (response) {
                if (response.ResponseCode == 200) {
                    if (ImageType == 'profile')
                    {
                        $scope.is_profile_uploaded = true;
                        $scope.profile_guid = response.Data.MediaGUID;
                    }
                    else
                    {
                        $scope.banner_guid = response.Data.MediaGUID;
                        $scope.is_banner_uploaded = true;
                    }

                    if ($scope.is_profile_uploaded && $scope.is_banner_uploaded)
                    {
                        $scope.save_event_images(Message);
                    }

                } else {
                    //showResponseMessage(response.Message, 'alert-danger');
                    //alertify.error(response.Message);
                    hideLoader();
                    ShowErrorMsg(response.Message, 'danger');
                }
                //hideButtonLoader('sign_up_btn');
            });
        };
        $scope.save_event_images = function (Message) {
            //$scope.Event.Location = Location;
            var reqData = $scope.Event;
            reqData.AdminLoginSessionKey = $scope.AdminLoginSessionKey;
            reqData.banner_guid = $scope.banner_guid;
            reqData.profile_guid = $scope.profile_guid;
            eventService.save(reqData).then(function (response) {
                hideLoader();
                $('#btnpublish').removeClass('login-loading');
                //ShowSuccessMsg(Message, 'success');
                //event
                if (response.ResponseCode == 200) {
                    ShowSuccessMsg(response.Message, 'success');
                    setTimeout(function () {
                        window.location = base_url + 'admin/event';
                    }, 500);
                } else {
                    ShowErrorMsg(response.Message, 'danger');
                }
            });
        }

        $scope.initCropper = function () {
            $('#image-cropper').cropit({
                onFileChange: function () {
                    $('#image-cropper').show();
                    $('.default-photo').hide();
                    $scope.is_profile = true;
                }
            });
            // When user clicks select image button,
            // open select file dialog programmatically
            $('#prfImg').click(function () {
                $('#image-cropper').children('.cropit-image-input').click();
            });
            $('.image-cropper-close').click(function () {
                $('#image-cropper').hide();
                $('.default-photo').show();
                $('#image-cropper').cropit('destroy');
                var control = $('#image-cropper').children('.cropit-image-input');
                control.replaceWith(control = control.clone(true));
                //reinit
                $('#image-cropper').cropit({
                    onFileChange: function () {
                        $('#image-cropper').show();
                        $('.default-photo').hide();
                        $scope.is_profile = true;
                    }
                });
                $scope.is_profile = false;
            });
            /////////
            $('#cover-image-cropper').cropit({
                onFileChange: function () {
                    //console.log('dasd');
                    $('#cover-image-cropper').show();
                    $('.default-cover-photo').hide();
                    $scope.is_banner = true;
                }
            });
            $('#coverImg').click(function () {
                $('#cover-image-cropper').children('.cropit-image-input').trigger('click');
            });
            $('.banner-cropper-close').click(function () {
                $('#cover-image-cropper').hide();
                $('.default-cover-photo').show();
                $('#cover-image-cropper').cropit('destroy');
                var control = $('#cover-image-cropper').children('.cropit-image-input');
                control.replaceWith(control = control.clone(true));
                //reinit
                $('#image-cropper').cropit({
                    onFileChange: function () {
                        $('#banner-cropper-cropper').show();
                        $('.default-cover-photo').hide();
                        $scope.is_banner = true;
                    }
                });
                $scope.is_banner = false;
            });
        };
        $scope.initCropper();

        $scope.clear_profile_image = function (event) {
            var reqData = {
                AdminLoginSessionKey: $scope.AdminLoginSessionKey,
                MediaGUID: event.ProfileImageGUID
            };
            eventService.removeMedia(reqData).then(function (response) {
                if (response.ResponseCode == 200) {
                    $('.default-photo').show();
                    $scope.is_profile = false;
                    $scope.show_profile = false;
                    $scope.profile_guid = '';
                }
            });
        };
        $scope.clear_banner_image = function (event) {
            var reqData = {
                AdminLoginSessionKey: $scope.AdminLoginSessionKey,
                MediaGUID: event.ProfileBannerGUID
            };
            eventService.removeMedia(reqData).then(function (response) {
                if (response.ResponseCode == 200) {
                    $('.default-cover-photo').show();
                    $scope.is_banner = false;
                    $scope.show_banner = false;
                    $scope.banner_guid = '';
                }
            });
        };

        $scope.initialize_upload = function ()
        {
            //$scope.upload_image = new qq.FineUploaderBasic({
            iuploader = new qq.FineUploaderBasic({
                multiple: true,
                autoUpload: true,
                title: "Attach Photos",
                button: $("#blog_photo")[0],
                request: {
                    endpoint: base_url + "api/uploadimage",
                    /*customHeaders: {
                     "Accept-Language": accept_language
                     },*/
                    params: {
                        Type: 'event',
                        unique_id: function () {
                            return '';
                        },
                        LoginSessionKey: $scope.AdminLoginSessionKey,
                        //Position: $('input[name=ad_position]:checked').val(),
                        DeviceType: 'Native'
                    }
                },
                validation: {
                    //allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'],
                    allowedExtensions: ['avi', 'AVI', 'flv', 'FLV', 'mpeg', 'MPEG', 'mpg', 'MPG', 'wmv', 'WMV', 'swf', 'SWF', 'asf', 'ASF', 'mov', 'mp4', 'MP4', 'ogg', 'OGG', 'webm', 'WEBM', 'jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'], //array of valid extensions
                    sizeLimit: 5242880 // 4mb
                },
                callbacks: {
                    onUpload: function (id, fileName) {
                        $scope.isImageUploaded = true;
                        //$('.attached-media').html('');
                        var temp_id = 'li_img_' + id;
                        //var html = "<li id='"+temp_id+"' class='loading-class wallloading'><div class='loader-box'><div id='ImageThumbLoader' class='uplaodLoader'><img src='" + base_url + "assets/admin/img/loading22.gif' id='spinner'></div></div></li>";
                        var html = '<li id="' + temp_id + '" class="loading-class wallloading"><div data-rel="allshow" class="active media-holder"><div class="loader loader-attach-file" style="width:48px;height:48px;margin:-25px 0 0 -25px;"></div></div></li>';
                        $('.attached-media-gallery').append(html);
                        //console.log(html)
                    },
                    onProgress: function (id, fileName, loaded, total) {
                    },
                    onComplete: function (id, fileName, responseJSON) {
                        if (responseJSON.Message == 'Success')
                        {
                            //$('.attached-media').html('');
                            $scope.isImageUploaded = true;
                            var temp_id = '#li_img_' + id;
                            $(temp_id).remove();
                            $(temp_id).hide();
                            var click_function = 'remove_image("' + responseJSON.Data.MediaGUID + '");';
                            var html = "<li id='" + responseJSON.Data.MediaGUID + "'><a class='smlremove' onclick='" + click_function + "'></a>";
                            if (responseJSON.Data.MediaType == 'Video')
                            {
                                html += "<img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + responseJSON.Data.MediaGUID + "' src='" + base_url + 'assets/img/video-thumb-default-228x164.jpg' + "' style=\"width: 128px;\">";
                            }
                            else
                            {
                                html += "<img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + responseJSON.Data.MediaGUID + "' src='" + responseJSON.Data.ImageServerPath + '/128x128/' + responseJSON.Data.ImageName + "'>";
                            }

                            //$('.attached-media').prepend(html);
                            $('.attached-media-gallery').append(html);

                            //$scope.Advertisement.MediaGUID = responseJSON.Data.MediaGUID;
                            $scope.Event.Media.push(responseJSON.Data);
                        }
                        else if (responseJSON.ResponseCode !== 200)
                        {
                            //$('.attached-media').html('');
                            $scope.isImageUploaded = true;
                            //PermissionError(responseJSON.Message, 'danger');
                            ShowErrorMsg(responseJSON.Message);
                            //alert(responseJSON.Message);
                            var temp_id = 'li_img_' + id;
                            $('#' + temp_id).remove();
                            //$('#'+temp_id).remove();
                        }

                    },
                    onSubmit: function (id, fileName) {
                        //fileCount++;
                    },
                    onValidate: function (b) {
                        var validExtensions = ['avi', 'AVI', 'flv', 'FLV', 'mpeg', 'MPEG', 'mpg', 'MPG', 'wmv', 'WMV', 'swf', 'SWF', 'asf', 'ASF', 'mov', 'mp4', 'MP4', 'ogg', 'OGG', 'webm', 'WEBM', 'jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG']; //array of valid extensions
                        var fileName = b.name;
                        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                        if ($.inArray(fileNameExt, ['avi', 'AVI', 'flv', 'FLV', 'mpeg', 'MPEG', 'mpg', 'MPG', 'wmv', 'WMV', 'swf', 'SWF', 'asf', 'ASF', 'mov', 'mp4', 'MP4', 'ogg', 'OGG', 'webm', 'WEBM']) == -1) {
                            iuploader.setEndpoint(base_url + "api/uploadimage");
                            //console.log(base_url + "api/uploadimage");
                            //$scope.upload_image.fineUploader('setEndpoint', base_url + "api/uploadimage");
                            if (b.size > 5242880) {
                                ShowErrorMsg('Image file ' + fileName + ' should be less than 5 MB', 'alert-danger');
                                return false;
                            }
                        } else {
                            iuploader.setEndpoint(base_url + "api/uploadvideo");
                            //console.log(base_url + "api/uploadvideo");
                            //$scope.upload_image.fineUploader('setEndpoint', base_url + "api/uploadvideo");
                            if (b.size > 41943040) {
                                ShowErrorMsg('Video file ' + fileName + ' should be less than 40 MB', 'alert-danger');
                                return false;
                            }
                        }
                    },
                    onError: function (error) {
                        //alert(error);
                    }
                }
            });


            //cropper for promo video
        };

        $scope.remove_image = function (MediaGUID) {
            angular.forEach($scope.Event.Media, function (val, index) {
                if (MediaGUID == val.MediaGUID)
                {
                    $('#' + MediaGUID).remove();
                    $scope.Event.Media.splice(index, 1);
                }
            });
        };

        $scope.isPromoUploaded = false;
        $scope.initialize_promo_upload = function ()
        {
            //$scope.upload_image = new qq.FineUploaderBasic({
            promouploader = new qq.FineUploaderBasic({
                multiple: false,
                autoUpload: true,
                title: "Attach Photos",
                button: $("#event_video")[0],
                request: {
                    endpoint: base_url + "api/uploadvideo",
                    /*customHeaders: {
                     "Accept-Language": accept_language
                     },*/
                    params: {
                        Type: 'event',
                        unique_id: function () {
                            return '';
                        },
                        LoginSessionKey: $scope.AdminLoginSessionKey,
                        //Position: $('input[name=ad_position]:checked').val(),
                        DeviceType: 'Native'
                    }
                },
                validation: {
                    //allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'],
                    allowedExtensions: ['avi', 'AVI', 'flv', 'FLV', 'mpeg', 'MPEG', 'mpg', 'MPG', 'wmv', 'WMV', 'swf', 'SWF', 'asf', 'ASF', 'mov', 'mp4', 'MP4', 'ogg', 'OGG', 'webm', 'WEBM'], //array of valid extensions
                    sizeLimit: 5242880 // 4mb
                },
                callbacks: {
                    onUpload: function (id, fileName) {
                        $('#isPromoUploaded').hide();
                        $('.attached-media-video').html('');
                        var temp_id = 'li_vid_' + id;
                        //var html = "<li id='"+temp_id+"' class='loading-class wallloading'><div class='loader-box'><div id='ImageThumbLoader' class='uplaodLoader'><img src='" + base_url + "assets/admin/img/loading22.gif' id='spinner'></div></div></li>";
                        var html = '<li id="' + temp_id + '" class="loading-class wallloading"><div data-rel="allshow" class="active media-holder"><div class="loader loader-attach-file" style="width:48px;height:48px;margin:-25px 0 0 -25px;"></div></div></li>';
                        $('.attached-media-video').append(html);
                        //console.log(html)
                    },
                    onProgress: function (id, fileName, loaded, total) {
                    },
                    onComplete: function (id, fileName, responseJSON) {
                        if (responseJSON.Message == 'Success')
                        {
                            //$('.attached-media').html('');
                            $scope.isPromoUploaded = true;
                            $('#isPromoUploaded').hide();
                            var temp_id = 'li_vid_' + id;
                            $('#' + temp_id).remove();
                            click_function = 'remove_video("' + responseJSON.Data.MediaGUID + '");';
                            var html = "<li id='" + responseJSON.Data.MediaGUID + "'><a class='smlremove' onclick='" + click_function + "'></a>";
                            html += "<img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='" + responseJSON.Data.MediaGUID + "' src='" + base_url + 'assets/img/video-thumb-default-228x164.jpg' + "' style=\"width: 128px;\">";

                            //$('.attached-media').prepend(html);
                            $('.attached-media-video').append(html);

                            //$scope.Advertisement.MediaGUID = responseJSON.Data.MediaGUID;
                            $scope.Event.PromoVideoGUID = responseJSON.Data.MediaGUID;
                        }
                        else if (responseJSON.ResponseCode !== 200)
                        {
                            //$('.attached-media').html('');
                            $scope.isPromoUploaded = false;
                            $('#isPromoUploaded').show();
                            //PermissionError(responseJSON.Message, 'danger');
                            ShowErrorMsg(responseJSON.Message);
                            //alert(responseJSON.Message);
                            var temp_id = 'li_vid_' + id;
                            $('#' + temp_id).remove();
                            //$('#'+temp_id).remove();
                        }

                    },
                    onSubmit: function (id, fileName) {
                        //fileCount++;
                    },
                    onValidate: function (b) {
                        var validExtensions = ['avi', 'AVI', 'flv', 'FLV', 'mpeg', 'MPEG', 'mpg', 'MPG', 'wmv', 'WMV', 'swf', 'SWF', 'asf', 'ASF', 'mov', 'mp4', 'MP4', 'ogg', 'OGG', 'webm', 'WEBM', 'jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG']; //array of valid extensions
                        var fileName = b.name;
                        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                        if (b.size > 41943040) {
                            $scope.isPromoUploaded = false;
                            $('#isPromoUploaded').show();
                            ShowErrorMsg('Video file ' + fileName + ' should be less than 40 MB', 'alert-danger');
                            return false;
                        }
                    },
                    onError: function (error) {
                        //alert(error);
                        $('#isPromoUploaded').show();
                    }
                }
            });
            //cropper for promo video
        };
        $scope.remove_video = function (MediaGUID) {
            $scope.Event.PromoVideoGUID = '';
            $('#' + MediaGUID).remove();
            $('#isPromoUploaded').show();
        };
    }]);

function remove_image(MediaGUID)
{
    //console.log($('#advertisementCtrl'))
    angular.element('#eventCtrl').scope().remove_image(MediaGUID);
}
function remove_video(MediaGUID)
{
    //console.log($('#advertisementCtrl'))
    angular.element('#eventCtrl').scope().remove_video(MediaGUID);
}


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

    $('#StartTime').timepicker();
    $('#EndTime').timepicker();

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